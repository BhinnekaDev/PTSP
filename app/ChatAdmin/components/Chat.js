"use client";
import { Button, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
// ICONS
import { BiSolidChat, BiSolidSend, BiWind } from "react-icons/bi";
import { BsCheck, BsCheckAll, BsEmojiSmile } from "react-icons/bs";
import {
  FaChevronUp,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
} from "react-icons/fa";
import { FaCloudBolt, FaMountain } from "react-icons/fa6";
import { FiPaperclip } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
// MODULE
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
// DIALOG
import DialogHapusChat from "@/hooks/Frontend/useDialogHapusChat";
// HOOK
import useChatAdmin from "@/hooks/Backend/useChatAdmin";
import { firestore } from "@/lib/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

function AdminChat() {
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const contextMenuRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [tampilkanEmoji, setTampilkanEmoji] = useState(false);
  const [chatTerakhir, setChatTerakhir] = useState({});
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const {
    pesan,
    setPesan,
    selectedFile,
    handleFileChange,
    handleRemoveFile,
    daftarAdmin,
    selectedAdminId,
    handleAdminSelect,
    chatMessages,
    formatTimestamp,
    hitungJumlahPesan,
    updateStatusDibaca,
    chatTerakhir: chatTerakhirState,
    pesanList,
    handleSendMessage,
    getFileNamaDariURL,
    penggunaSaatIni,
    hapusPesan,
    jumlahBelumDibacaPerAdmin,
  } = useChatAdmin();

  const groupMessagesByDate = (messages) => {
    return (
      messages?.reduce((acc, message) => {
        if (!message?.Timestamp) return acc;
        const dateKey = new Date(message.Timestamp).toLocaleDateString(
          "id-ID",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(message);
        return acc;
      }, {}) || {}
    );
  };

  const [stasiunTerpilih, setStasiunTerpilih] = useState(null);
  const [selengkapnya, setSelengkapnya] = useState([]);
  const batasTeksPesan = 200;

  useEffect(() => {
    const unsubscribe = () => {};
    return () => unsubscribe();
  }, [selectedAdminId, chatMessages]);

  useEffect(() => {
    if (penggunaSaatIni) {
      console.log("penggunaSaatIni di komponen:", penggunaSaatIni);
    }
  }, [penggunaSaatIni]);

  const ambilChatTerakhir = async () => {
    const chatTerakhirObj = {};
    const penggunaSaatIni = localStorage.getItem("ID");

    for (const admin of daftarAdmin) {
      const q = query(
        collection(firestore, "chat_admin"),
        where("id", "==", admin.id),
        where("ID", "==", penggunaSaatIni)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const messages = snapshot.docs.map((doc) => ({
          ...doc.data(),
          Timestamp: doc.data().Timestamp?.toDate().getTime() || null,
        }));
        chatTerakhirObj[admin.id] = messages[0];
      }
    }
    setChatTerakhir(chatTerakhirObj);
  };

  useEffect(() => {
    ambilChatTerakhir();
  }, [daftarAdmin]);

  const handleContextMenu = (e, adminId) => {
    e.preventDefault();
    setStasiunTerpilih(adminId);
    setIsContextMenuOpen(true);
  };

  const handleLeftClick = (adminId) => {
    handleAdminSelect(adminId);
    setStasiunTerpilih(adminId);
    setIsContextMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setIsContextMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const groupedMessages = groupMessagesByDate(pesanList);

  const toggleSelengkapnya = (index) => {
    setSelengkapnya((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleBukaEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const batasTeks = (text, maxLength) => {
    return text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const namaAdmin =
    daftarAdmin?.find((admin) => admin.id === selectedAdminId)?.Nama_Pengguna ||
    "Nama tidak ditemukan";

  const handleDelete = async () => {
    console.log("Delete dijalankan");
    if (!penggunaSaatIni || !selectedAdminId) {
      console.error(
        "Gagal menghapus pesan: penggunaSaatIni atau selectedAdminId tidak valid"
      );
      toast.error(
        "Gagal menghapus pesan. Pastikan pengguna dan admin dipilih.",
        {
          position: "top-right",
          duration: 5000,
        }
      );
      return;
    }

    const success = await hapusPesan(selectedAdminId, penggunaSaatIni);

    if (success) {
      console.log("Pesan berhasil dihapus.");
      toast.success("Pesan berhasil dihapus!", {
        position: "top-right",
        duration: 5000,
      });
    } else {
      console.error("Gagal menghapus pesan.");
      toast.error("Gagal menghapus pesan. Silakan coba lagi.", {
        position: "top-right",
        duration: 5000,
      });
    }
    setIsDialogOpen(false);
    setIsContextMenuOpen(false);
    setStasiunTerpilih(null);
  };

  const sendMessage = async () => {
    handleSendMessage(message, selectedAdminId, selectedFile);
    setMessage("");
  };

  return (
    <div className="w-screen h-screen px-24">
      <div className="h-[90%] flex items-center justify-start shadow-xl rounded-lg border-2 border-[#D9D9D9]/80">
        <div className="flex flex-col h-full items-center justify-start w-[30%] border-r-2 border-[#D9D9D9]/80">
          <div className="flex w-full border-b-2 p-3.5 border-[#D9D9D9]/80">
            <Typography className="text-black font-bold text-3xl">
              Pesan
            </Typography>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full justify-start items-center py-1 px-4 gap-2 cursor-pointer"
          >
            <FaChevronUp
              className={`text-black transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
            <Typography className="text-black text-lg font-bold">
              Pesan Saya ({daftarAdmin?.length || 0}) {/* daftarAdmin */}
            </Typography>
          </div>
          <div className="flex flex-col transition-all duration-300">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {daftarAdmin?.map((admin) => (
                  <motion.div
                    key={admin.id}
                    onClick={() => handleLeftClick(admin.id)}
                    onContextMenu={(e) => handleContextMenu(e, admin.id)}
                    className="relative w-full flex flex-col gap-3 p-4 cursor-pointer hover:bg-[#808080]/30 hover:scale-105 hover:rounded-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        {/* Ikon berdasarkan instansi */}
                        {admin.Instansi === "Meteorologi" && (
                          <FaMountain className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                        )}
                        {admin.Instansi === "Klimatologi" && (
                          <FaCloudBolt className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                        )}
                        {admin.Instansi === "Geofisika" && (
                          <BiWind className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                        )}
                      </div>
                      <div>
                        <Typography className="text-black font-bold text-lg">
                          {admin.Instansi || "Instansi tidak ditemukan"}
                        </Typography>
                        <Typography className="text-[#808080]/70 line-clamp-1">
                          {chatTerakhirState[admin.id]?.Pesan
                            ? batasTeks(chatTerakhirState[admin.id]?.Pesan, 20)
                            : chatTerakhirState[admin.id]?.File
                            ? `Mengirimkan File`
                            : "Belum ada pesan"}
                        </Typography>
                        <div className="flex flex-col items-center">
                          <Typography className="text-[#808080]/70 text-sm font-bold">
                            {chatTerakhirState[admin.id]?.Timestamp
                              ? new Date(
                                  chatTerakhirState[admin.id]?.Timestamp
                                ).toLocaleTimeString()
                              : "Belum ada pesan"}
                          </Typography>
                          <div
                            key={admin.ID_Admin}
                            onClick={() =>
                              handleAdminSelect(admin.ID_Admin, penggunaSaatIni)
                            }
                          >
                            {(jumlahBelumDibacaPerAdmin?.[admin.ID_Admin] ??
                              0) > 0 && (
                              <Typography className="text-white bg-red-600 px-1.5 py-px rounded-full text-xs">
                                {jumlahBelumDibacaPerAdmin[admin.ID_Admin]}
                              </Typography>
                            )}
                          </div>
                        </div>
                      </div>
                      {isContextMenuOpen && stasiunTerpilih === admin.id && (
                        <motion.div
                          ref={contextMenuRef}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="w-full rounded-lg border-2 border-black/20 bg-white shadow-md z-10 absolute top-10 left-0"
                        >
                          <Tooltip content="Hapus Chat" placement="right">
                            <Button
                              onClick={() => setIsDialogOpen(true)}
                              className="shadow-none text-black bg-[#D9D9D9] text-sm py-2 px-4 gap-1 flex items-center justify-center capitalize tracking-wider w-full"
                            >
                              <MdDelete className="w-5 h-5" />
                              Hapus
                            </Button>
                          </Tooltip>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        {!stasiunTerpilih ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <BiSolidChat className="w-40 h-40 text-[#808080]/60" />
            <Typography className="text-[#808080] font-bold text-2xl">
              Selamat Datang di Fitur Live Chat!
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start w-full h-full">
            {/* Header Chat */}
            <div className="p-2 border-b border-gray-300 w-full">
              {/* Nama Pengguna */}
              {daftarAdmin?.find((admin) => admin.id === selectedAdminId)
                ?.Nama_Pengguna ? (
                <Typography className="text-black font-bold text-xl">
                  {
                    daftarAdmin.find((admin) => admin.id === selectedAdminId)
                      .Nama_Pengguna
                  }
                </Typography>
              ) : (
                <Typography className="text-black font-bold text-xl">
                  Nama tidak ditemukan
                </Typography>
              )}
              {/* Menampilkan status online */}
              <GoDotFill className="w-4 h-4 text-green-400 inline-block" />
              <span className="text-green-400">Online</span>
            </div>
            {/* Daftar Pesan */}
            <div
              className="flex flex-col flex-1 max-w-full overflow-hidden"
              style={{
                backgroundImage: "url('/assets/img/bgChat.png')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="w-full flex justify-center items-center gap-3 py-1 px-8">
                  <div className="flex items-center gap-3 w-1/3">
                    <div className="w-1/2 h-px bg-black rounded-full" />
                    <div className="w-2.5 h-2 border border-black rounded-full" />
                    <div className="w-3 h-2 border border-black rounded-full" />
                    <div className="w-3 h-2 bg-black rounded-full" />
                    <div className="w-3 h-2 bg-black rounded-full" />
                    <div className="w-1/2 h-px bg-black rounded-full" />
                  </div>
                </div>

                {console.log("Pengguna Saat Ini:", penggunaSaatIni)}
                {console.log("Grouped Messages:", groupedMessages)}

                {penggunaSaatIni && groupedMessages ? (
                  Object.keys(groupedMessages).length > 0 ? (
                    Object.keys(groupedMessages).map((dateKey) => (
                      <div key={dateKey} className="space-y-2">
                        {/* Header Hari/Tanggal */}
                        <Typography className="text-black font-bold text-md bg-black/15 px-5 py-1 rounded-lg">
                          {dateKey}
                        </Typography>

                        {/* Pesan */}
                        {groupedMessages[dateKey]?.length > 0 ? (
                          groupedMessages[dateKey].map((pesan, index) => {
                            const pesanId = `${dateKey}-${index}`;
                            const isExpanded = selengkapnya.includes(pesanId);
                            const shouldShowReadMore =
                              pesan.Pesan?.length > batasTeksPesan;

                            console.log("Pesan:", pesan);

                            const isPengguna =
                              pesan.Dikirim_Oleh === penggunaSaatIni;

                            return (
                              <div
                                key={pesan.id}
                                className={`flex ${
                                  isPengguna ? "justify-end" : "justify-start"
                                } px-8 py-2`}
                              >
                                <motion.div
                                  layout
                                  className={`flex flex-col w-1/2 p-3 rounded-lg gap-1 ${
                                    isPengguna ? "bg-green-500" : "bg-blue-500"
                                  }`}
                                >
                                  {/* Tampilkan Pesan Teks */}
                                  <motion.div
                                    initial={{ height: 50, opacity: 0.8 }}
                                    animate={{
                                      height: isExpanded ? "auto" : 50,
                                      opacity: 1,
                                    }}
                                    exit={{ height: 50, opacity: 0.8 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut",
                                    }}
                                    className="overflow-hidden"
                                  >
                                    <Typography className="text-white break-words">
                                      {pesan.Pesan}
                                    </Typography>
                                  </motion.div>

                                  {/* Tombol "Baca Selengkapnya" */}
                                  {shouldShowReadMore && (
                                    <motion.button
                                      initial={{ opacity: 0.5, y: 5 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ height: 50, opacity: 0.8 }}
                                      transition={{ duration: 0.2 }}
                                      className={`text-sm text-start underline ml-1 ${
                                        isPengguna
                                          ? "text-white"
                                          : "text-green-600"
                                      }`}
                                      onClick={() =>
                                        setSelengkapnya((prev) =>
                                          prev.includes(pesanId)
                                            ? prev.filter(
                                                (id) => id !== pesanId
                                              )
                                            : [...prev, pesanId]
                                        )
                                      }
                                    >
                                      {isExpanded
                                        ? "Tampilkan Lebih Sedikit"
                                        : "Baca Selengkapnya"}
                                    </motion.button>
                                  )}

                                  {/* Tampilkan File Jika Ada */}
                                  {pesan.File && (
                                    <a
                                      href={pesan.File}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-white hover:text-blue-600 font-medium"
                                    >
                                      <FaFileAlt className="w-5 h-5 text-gray-700" />
                                      Lihat File
                                    </a>
                                  )}

                                  {/* Timestamp & Status Pesan */}
                                  <div className="flex justify-end items-center">
                                    <div className="bg-white flex rounded-full px-1">
                                      <span className="text-sm text-black">
                                        {formatTimestamp(pesan.Timestamp)}
                                      </span>
                                      {isPengguna &&
                                        (pesan.terbaca ? (
                                          <BsCheckAll className="text-blue-600 w-5 h-5" />
                                        ) : (
                                          <BsCheck className="text-blue-600 w-5 h-5" />
                                        ))}
                                    </div>
                                  </div>
                                </motion.div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-gray-500 text-center py-2">
                            Belum Ada Pesan
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-center py-2">
                      Belum Ada Pesan
                    </div>
                  )
                ) : (
                  <div className="text-gray-500 text-center py-2">
                    Memuat pesan...
                  </div>
                )}
              </div>
            </div>

            {/* Input Pesan */}
            <div className="p-2 w-full flex relative">
              {tampilkanEmoji && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-full left-0 right-0 px-12 bg-transparent shadow-none z-10"
                >
                  <EmojiPicker
                    className="!border-2 !border-[#808080]/30"
                    onEmojiClick={handleBukaEmoji}
                  />
                </div>
              )}
              <div className="flex p-2 rounded-lg border-2 border-[#808080]/30 gap-2 w-full bg-white">
                <div className="flex gap-2">
                  <FiPaperclip
                    className="bg-[#808080]/40 rounded-full p-2 w-9 h-9 text-black cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <BsEmojiSmile
                    className="bg-[#808080]/40 rounded-full p-2 w-9 h-9 text-black cursor-pointer"
                    onClick={() => setTampilkanEmoji(!tampilkanEmoji)}
                  />
                </div>
                {selectedFile && (
                  <div className="flex items-center bg-[#808080]/30 px-2 py-1 rounded-md text-sm w-72">
                    {selectedFile.type.startsWith("image/") ? (
                      <FaFileImage className="w-5 h-5 text-blue-500 mr-2" />
                    ) : selectedFile.type.startsWith("video/") ? (
                      <FaFileVideo className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <FaFileAlt className="w-5 h-5 text-[#808080] mr-2" />
                    )}
                    <span className="text-black">
                      {selectedFile.name.length > 15
                        ? selectedFile.name.slice(0, 17) + "..."
                        : selectedFile.name}
                    </span>
                    <IoIosClose
                      className="ml-2 w-5 h-5 text-black cursor-pointer bg-black/15 rounded-full"
                      onClick={handleRemoveFile}
                    />
                  </div>
                )}
                <input
                  type="text"
                  className="w-full text-black focus:outline-none p-2 rounded-md"
                  placeholder="Ketik pesan"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </div>
              <div className="flex items-center px-8">
                <BiSolidSend
                  onClick={sendMessage}
                  className="bg-[#808080]/40 rounded-full p-2 w-9 h-9 text-black cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Dialog Konfirmasi */}
      <DialogHapusChat
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={handleDelete}
        namaAdmin={namaAdmin}
      />
    </div>
  );
}

export default AdminChat;

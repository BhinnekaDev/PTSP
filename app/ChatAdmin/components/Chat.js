"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { BiSolidChat, BiSolidSend, BiWind, BiArrowBack } from "react-icons/bi";
import { FaFileImage, FaFileVideo } from "react-icons/fa6";
import { FaFileAlt, FaDownload } from "react-icons/fa";
import { FiPaperclip } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useMengirimChat from "@/hooks/Backend/useMengirimPesan";
import { useStationsWithChatRooms } from "@/hooks/Backend/useChatRoomList";
import usePesanChatRoom from "@/hooks/Backend/useAmbilPesan";

const StationList = ({
  setStasiunTerpilih,
  handleContextMenu,
  stasiunTerpilih,
  isContextMenuOpen,
  setIsContextMenuOpen,
  setChatRoomId,
  onSelectStation, // tambahan untuk mobile
}) => {
  const stationsWithRoom = useStationsWithChatRooms();

  const handlePilihStasiun = (namaStasiun) => {
    setStasiunTerpilih(namaStasiun);
    const stasiun = stationsWithRoom.find((s) => s.nama === namaStasiun);
    if (stasiun) {
      setChatRoomId(stasiun.chatRoomId || null);
    }
    setIsContextMenuOpen(false);
    if (onSelectStation) {
      onSelectStation(); // panggil callback untuk mobile
    }
  };

  return (
    <>
      <div className="flex flex-col transition-all duration-300">
        {stationsWithRoom.map((s, i) => (
          <motion.div
            key={i}
            onClick={() => handlePilihStasiun(s.nama)}
            onContextMenu={(e) => handleContextMenu(e, s.nama)}
            animate={{
              y: isContextMenuOpen && stasiunTerpilih === s.nama ? 10 : 0,
            }}
            className="relative w-full flex flex-col gap-3 p-4 border-b border-[#D9D9D9]/80 cursor-pointer hover:bg-[#808080]/30 hover:scale-105 hover:rounded-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3 w-full">
              <div className="text-2xl flex-shrink-0">{s.icon}</div>
              <div className="flex-1 min-w-0">
                <Typography className="text-black font-bold text-base lg:text-md truncate">
                  {s.nama}
                </Typography>
                <Typography className="text-[#808080]/70 text-sm truncate">
                  {s.chatRoomData?.pesanTerakhir
                    ? `${s.chatRoomData?.pesanTerakhir}`
                    : "Belum ada chat di stasiun ini."}
                </Typography>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <Typography className="text-[#808080]/70 text-sm whitespace-nowrap">
                  {s.chatRoomData?.terakhirDiperbarui
                    ? s.chatRoomData.terakhirDiperbarui
                        .toDate()
                        .toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                    : ""}
                </Typography>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

const ChatHeader = ({ stasiun, onBack }) => (
  <div className="p-2 border-b-2 border-[#D9D9D9]/80 w-full flex-shrink-0 flex items-center gap-3">
    {/* Tombol back untuk mobile */}
    <button
      onClick={onBack}
      className="lg:hidden p-1 hover:bg-[#808080]/20 rounded-full transition-colors"
    >
      <BiArrowBack className="w-6 h-6 text-black" />
    </button>
    <div className="flex-1">
      <Typography className="text-black font-bold text-2xl">
        {stasiun}
      </Typography>
      <div className="flex items-center">
        <GoDotFill className="w-4 h-4 text-green-400" />
        <Typography className="text-green-400 font-bold text-sm">
          Online
        </Typography>
      </div>
    </div>
  </div>
);

const ChatMessages = ({ pesanList, selengkapnya2, toggleSelengkapnya2 }) => {
  const batasTeksPesan = 200;
  const containerRef = useRef(null);
  const imageExt = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
  const videoExt = ["mp4", "webm", "avi", "mov", "mkv"];
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();

    if (imageExt.includes(ext)) {
      return <FaFileImage className="w-5 h-5 text-blue-500 mr-2" />;
    } else if (videoExt.includes(ext)) {
      return <FaFileVideo className="w-5 h-5 text-green-500 mr-2" />;
    } else {
      return <FaFileAlt className="w-5 h-5 text-[#808080] mr-2" />;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [pesanList]);

  return (
    <div ref={containerRef} className="space-y-1 overflow-y-auto h-full pr-2">
      {pesanList.map((pesan, index) => {
        const isExpanded = selengkapnya2.includes(index);
        const showMore = pesan.teks && pesan.teks.length > batasTeksPesan;

        const isPengirimPersonal =
          pesan.tipePengirim === "perorangan" ||
          pesan.tipePengirim === "perusahaan";

        const adaTeks = pesan.teks && pesan.teks.trim() !== "";
        const adaFile = pesan.namaFile && pesan.urlFile;

        if (!adaTeks && !adaFile) return null;
        return (
          <div
            key={pesan.id || index}
            className={`w-full flex px-4 lg:px-8 py-2 ${
              isPengirimPersonal ? "justify-end" : "justify-start"
            }`}
          >
            <motion.div
              className={`flex flex-col max-w-[70%] lg:max-w-[50%] p-3 rounded-lg gap-1 ${
                isPengirimPersonal ? "bg-secondary" : "bg-primary"
              }`}
            >
              {adaTeks && (
                <motion.div
                  initial={{ height: 30, opacity: 0.8 }}
                  animate={{ height: isExpanded ? "auto" : 30, opacity: 1 }}
                  className="overflow-hidden"
                >
                  <Typography className="text-white whitespace-pre-wrap break-words">
                    {pesan.teks}
                  </Typography>
                </motion.div>
              )}

              {showMore && (
                <button
                  onClick={() => toggleSelengkapnya2(index)}
                  className="text-white text-sm underline text-start"
                >
                  {isExpanded ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
                </button>
              )}

              {adaFile &&
                (imageExt.includes(
                  pesan.namaFile.split(".").pop().toLowerCase(),
                ) ? (
                  <Image
                    src={pesan.urlFile}
                    alt={pesan.namaFile}
                    className="rounded-md max-w-full max-h-56 object-contain cursor-pointer hover:opacity-90 transition"
                    onClick={() => window.open(pesan.urlFile, "_blank")}
                  />
                ) : (
                  <a
                    href={pesan.urlFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/40 hover:bg-white/30 transition-colors px-3 py-2 rounded-md text-black text-sm w-fit"
                  >
                    {getFileIcon(pesan.namaFile)}
                    <span className="underline">{pesan.namaFile}</span>
                    <FaDownload className="h-4 w-4 ml-1 flex-shrink-0" />
                  </a>
                ))}

              <div className="flex justify-end items-center">
                <span className="text-sm text-white">
                  {pesan.waktu
                    ? pesan.waktu.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

const ChatInput = ({
  message,
  setMessage,
  fileInputRef,
  selectedFile,
  handleFileChange,
  handleRemoveFile,
  tampilkanEmoji,
  setTampilkanEmoji,
  handleBukaEmoji,
  handleSendMessage,
  emojiPickerRef,
  isLoading,
}) => (
  <div className="p-2 w-full flex relative flex-shrink-0">
    {tampilkanEmoji && (
      <div
        ref={emojiPickerRef}
        className="absolute bottom-full left-0 right-0 px-4 lg:px-12 bg-transparent shadow-none z-10"
      >
        <EmojiPicker
          className="!border-2 !border-[#808080]/30"
          onEmojiClick={handleBukaEmoji}
        />
      </div>
    )}
    <div className="flex p-2 rounded-lg border-2 border-[#808080]/30 gap-2 w-full bg-white">
      <div className="flex gap-2 flex-shrink-0">
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
        <div className="flex items-center bg-[#808080]/30 px-2 py-1 rounded-md text-sm flex-shrink-0 max-w-[150px] lg:max-w-[200px]">
          {selectedFile.type.startsWith("image/") ? (
            <FaFileImage className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" />
          ) : selectedFile.type.startsWith("video/") ? (
            <FaFileVideo className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
          ) : (
            <FaFileAlt className="w-5 h-5 text-[#808080] mr-2 flex-shrink-0" />
          )}
          <span className="text-black truncate">
            {selectedFile.name.length > 12
              ? selectedFile.name.slice(0, 14) + "..."
              : selectedFile.name}
          </span>
          <IoIosClose
            className="ml-2 w-5 h-5 text-black cursor-pointer bg-black/15 rounded-full flex-shrink-0"
            onClick={handleRemoveFile}
          />
        </div>
      )}
      <input
        type="text"
        className="w-full text-black focus:outline-none p-2 rounded-md min-w-[50px] text-sm lg:text-base"
        placeholder="Ketik pesan"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !isLoading) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
        disabled={isLoading}
      />
    </div>
    <div className="flex items-center px-3 lg:px-8 flex-shrink-0">
      <button
        onClick={handleSendMessage}
        disabled={isLoading || (!message.trim() && !selectedFile)}
        className={`bg-secondary/50 rounded-full p-2 w-9 h-9 text-white cursor-pointer hover:bg-secondary hover:text-white transition-all duration-200 flex items-center justify-center ${
          isLoading || (!message.trim() && !selectedFile)
            ? "opacity-50 cursor-not-allowed hover:bg-secondary/50"
            : ""
        }`}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <BiSolidSend className="w-5 h-5" />
        )}
      </button>
    </div>
  </div>
);

function AdminChat() {
  const { apakahSudahLogin } = useVerifikasiLogin();
  const { kirimChat } = useMengirimChat();
  const [chatRoomId, setChatRoomId] = useState(null);
  const { pesanList: pesanDariFirestore, loading: loadingPesan } =
    usePesanChatRoom(chatRoomId);

  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const contextMenuRef = useRef(null);

  const [message, setMessage] = useState("");
  const [selengkapnya2, setSelengkapnya2] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tampilkanEmoji, setTampilkanEmoji] = useState(false);
  const [stasiunTerpilih, setStasiunTerpilih] = useState("");
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false); // state untuk mobile

  const handleContextMenu = (e, stasiunNama) => {
    e.preventDefault();
    setStasiunTerpilih(stasiunNama);
    setChatRoomId(null);
    setIsContextMenuOpen(true);
  };

  const handleFileChange = (e) => setSelectedFile(e.target.files[0] || null);
  const handleRemoveFile = () => {
    setSelectedFile(null);
    fileInputRef.current && (fileInputRef.current.value = "");
  };
  const handleSendMessage = async () => {
    if (!message.trim() && !selectedFile) return;
    if (isLoading) return;

    setIsLoading(true);
    try {
      await kirimChat(message, stasiunTerpilih, selectedFile);
      setMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBukaEmoji = (emoji) => setMessage((prev) => prev + emoji.emoji);
  const toggleSelengkapnya2 = (index) => {
    setSelengkapnya2((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // Fungsi untuk menangani pemilihan stasiun di mobile
  const handleSelectStation = () => {
    setShowChat(true);
  };

  // Fungsi untuk kembali ke daftar stasiun di mobile
  const handleBackToList = () => {
    setShowChat(false);
  };

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target))
        setIsContextMenuOpen(false);
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target))
        setTampilkanEmoji(false);
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  return (
    <div className="w-full h-screen px-2 lg:px-24 overflow-hidden">
      <div className="h-[90%] flex flex-col lg:flex-row shadow-xl rounded-none lg:rounded-lg border-2 border-[#D9D9D9]/80 overflow-hidden relative">
        {/* Sidebar kiri - daftar stasiun */}
        <div
          className={`
            flex flex-col w-full lg:w-[30%] border-r-2 border-[#D9D9D9]/80 h-full overflow-hidden
            transition-transform duration-300 ease-in-out
            ${showChat ? "-translate-x-full lg:translate-x-0" : "translate-x-0"}
            absolute lg:relative top-0 left-0 bg-white z-10 lg:z-0
          `}
        >
          <div className="flex w-full border-b-2 p-3.5 border-[#D9D9D9]/80 flex-shrink-0">
            <Typography className="text-black font-bold text-lg lg:text-3xl">
              Pesan
            </Typography>
          </div>
          {apakahSudahLogin && (
            <div ref={contextMenuRef} className="flex-1 overflow-y-auto">
              <StationList
                setStasiunTerpilih={setStasiunTerpilih}
                handleContextMenu={handleContextMenu}
                stasiunTerpilih={stasiunTerpilih}
                isContextMenuOpen={isContextMenuOpen}
                setIsContextMenuOpen={setIsContextMenuOpen}
                setChatRoomId={setChatRoomId}
                onSelectStation={handleSelectStation}
              />
            </div>
          )}
        </div>

        {/* Konten kanan - chat area */}
        <div
          className={`
            flex flex-col w-full lg:w-[70%] h-full overflow-hidden bg-white
            transition-transform duration-300 ease-in-out
            ${showChat ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
            absolute lg:relative top-0 left-0 z-20 lg:z-0
          `}
        >
          {!stasiunTerpilih ? (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <BiSolidChat className="w-40 h-40 text-[#808080]/60" />
              <Typography className="text-[#808080] font-bold text-xl lg:text-2xl text-center px-4">
                Selamat Datang di Fitur Live Chat!
              </Typography>
              <Typography className="text-[#808080]/70 text-sm lg:text-base text-center px-4 mt-2">
                Pilih stasiun untuk memulai percakapan
              </Typography>
            </div>
          ) : (
            <>
              <ChatHeader stasiun={stasiunTerpilih} onBack={handleBackToList} />
              <div className="flex-1 overflow-y-auto p-2 bg-[url('/assets/img/bgChat.png')]">
                <ChatMessages
                  pesanList={pesanDariFirestore}
                  selengkapnya2={selengkapnya2}
                  toggleSelengkapnya2={toggleSelengkapnya2}
                />
              </div>
              <div className="flex-shrink-0 bg-white">
                <ChatInput
                  message={message}
                  setMessage={setMessage}
                  fileInputRef={fileInputRef}
                  selectedFile={selectedFile}
                  handleFileChange={handleFileChange}
                  handleRemoveFile={handleRemoveFile}
                  tampilkanEmoji={tampilkanEmoji}
                  setTampilkanEmoji={setTampilkanEmoji}
                  handleBukaEmoji={handleBukaEmoji}
                  handleSendMessage={handleSendMessage}
                  emojiPickerRef={emojiPickerRef}
                  isLoading={isLoading}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminChat;

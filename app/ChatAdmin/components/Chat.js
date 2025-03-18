"use client";
import React, { useState, useRef, useEffect } from "react";
import { Typography, Tooltip, Button } from "@material-tailwind/react";
// ICONS
import { BiSolidChat, BiSolidSend, BiWind } from "react-icons/bi";
import { FaCloudBolt, FaMountain } from "react-icons/fa6";
import { FiPaperclip } from "react-icons/fi";
import { BsEmojiSmile, BsCheckAll, BsCheck } from "react-icons/bs";
import {
  FaChevronUp,
  FaFileAlt,
  FaFileImage,
  FaFileVideo,
} from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
// MODULE
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
// DIALOG
import DialogHapusChat from "@/hooks/Frontend/useDialogHapusChat";

function AdminChat() {
  const batasTeksPesan = 200;
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const contextMenuRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selengkapnya1, setSelengkapnya1] = useState([]);
  const [selengkapnya2, setSelengkapnya2] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tampilkanEmoji, setTampilkanEmoji] = useState(false);
  const [stasiunTerpilih, setStasiunTerpilih] = useState(null);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const handleContextMenu = (e, stasiunNama) => {
    e.preventDefault();

    setStasiunTerpilih(stasiunNama);
    setIsContextMenuOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setIsContextMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDelete = () => {
    setIsDialogOpen(false);
    setIsContextMenuOpen(false);

    toast.success("Chat berhasil dihapus!", {
      position: "top-right",
      duration: 3000,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || selectedFile) {
      console.log("Mengirim pesan:", message);

      if (selectedFile) {
        console.log("Mengirim file:", selectedFile);
      }
      setMessage("");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleBukaEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setTampilkanEmoji(false);
      }
    };

    if (tampilkanEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tampilkanEmoji]);

  const pesanList = [
    {
      teks: "COntoh   Pesan Belum Terbaca.",
      waktu: "10:30 AM",
      terbaca: false,
      stasiun: "Stasiun A",
    },
    {
      teks: "Contoh Pesan Panjang........ Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula,  ",
      waktu: "11:00 AM",
      terbaca: false,
      stasiun: "Stasiun A",
    },
    {
      teks: "Contoh Pesan Terbaca.",
      waktu: "12:00 PM",
      terbaca: true,
      stasiun: "Stasiun B",
    },
  ];

  const toggleSelengkapnya1 = (index) => {
    setSelengkapnya1((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelengkapnya2 = (index) => {
    setSelengkapnya2((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const batasTeks = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
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
              Pesan Saya (3)
            </Typography>
          </div>
          <div
            className="flex flex-col transition-all duration-300"
            onContextMenu={(e) => e.preventDefault()}
          >
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {[
                  {
                    nama: "Stasiun Meteorologi",
                    icon: (
                      <FaMountain className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                    ),
                  },
                  {
                    nama: "Stasiun Klimatologi",
                    icon: (
                      <FaCloudBolt className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                    ),
                  },
                  {
                    nama: "Stasiun Geofisika",
                    icon: (
                      <BiWind className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                    ),
                  },
                ].map((stasiun, index) => (
                  <motion.div
                    key={index}
                    onClick={() => setStasiunTerpilih(stasiun.nama)}
                    onContextMenu={(e) => handleContextMenu(e, stasiun.nama)}
                    animate={{
                      y:
                        isContextMenuOpen && stasiunTerpilih === stasiun.nama
                          ? 10
                          : 0,
                    }}
                    transition={{ duration: 0 }}
                    className="relative w-full flex flex-col gap-3 p-4 cursor-pointer hover:bg-[#808080]/30 hover:scale-105 hover:rounded-lg transition-all duration-300"
                  >
                    {isContextMenuOpen && stasiunTerpilih === stasiun.nama && (
                      <motion.div
                        ref={contextMenuRef}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full rounded-lg border-2 border-black/20 bg-white shadow-md z-10"
                      >
                        <Tooltip
                          onClick={() => setIsContextMenuOpen(false)}
                          content="Hapus Chat"
                          placement="right"
                        >
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

                    <div className="flex items-center gap-3">
                      <div>{stasiun.icon}</div>
                      <div>
                        <Typography className="text-black font-bold text-lg">
                          {stasiun.nama}
                        </Typography>
                        <Typography className="text-[#808080]/70 line-clamp-1">
                          {batasTeks(
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                            25
                          )}
                        </Typography>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            <DialogHapusChat
              open={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              handleDelete={handleDelete}
            />
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
            <div className="p-2 border-b-2 border-[#D9D9D9]/80 w-full">
              <Typography className="text-black font-bold text-2xl">
                {stasiunTerpilih}
              </Typography>
              <div className="flex items-center">
                <GoDotFill className="w-4 h-4 text-green-400" />
                <Typography className="text-green-400 font-bold text-sm">
                  Online
                </Typography>
              </div>
            </div>
            <div className="h-auto overflow-auto p-2">
              <div className="space-y-1">
                {pesanList.map((pesan, index) => {
                  const isExpanded = selengkapnya1.includes(index);
                  const shouldShowReadMore = pesan.teks.length > batasTeksPesan;

                  return (
                    <div
                      key={index}
                      className="w-full flex justify-end px-8 py-2"
                    >
                      <motion.div
                        layout
                        className="flex flex-col w-1/2 p-3 bg-[#72C02C] rounded-lg gap-1"
                      >
                        <motion.div
                          initial={{ height: 50, opacity: 0.8 }}
                          animate={{
                            height: isExpanded ? "auto" : 50,
                            opacity: 1,
                          }}
                          exit={{ height: 50, opacity: 0.8 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <Typography className="text-white">
                            {pesan.teks}
                          </Typography>
                        </motion.div>
                        {shouldShowReadMore && (
                          <motion.button
                            initial={{ opacity: 0.5, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0.5, y: 5 }}
                            transition={{ duration: 0.2 }}
                            className="text-[#3182B7] text-sm text-start underline ml-1"
                            onClick={() => toggleSelengkapnya1(index)}
                          >
                            {isExpanded
                              ? "Tampilkan Lebih Sedikit"
                              : "Baca Selengkapnya"}
                          </motion.button>
                        )}
                        <div className="flex justify-end items-center">
                          <div className="bg-white flex rounded-full px-1">
                            <span className="text-sm text-black">
                              {pesan.waktu}
                            </span>
                            {pesan.terbaca ? (
                              <BsCheckAll className="text-[#3182B7] w-5 h-5" />
                            ) : (
                              <BsCheck className="text-[#3182B7] w-5 h-5" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
              <div className="space-y-1">
                {pesanList.map((pesan, index) => {
                  const isExpanded = selengkapnya2.includes(index);
                  const shouldShowReadMore = pesan.teks.length > batasTeksPesan;

                  return (
                    <div
                      key={index}
                      className="w-full flex justify-start px-8 py-2"
                    >
                      <motion.div className="flex flex-col w-1/2 p-3 bg-[#3182B7] rounded-lg gap-1">
                        <motion.div
                          initial={{ height: 50, opacity: 0.8 }}
                          animate={{
                            height: isExpanded ? "auto" : 50,
                            opacity: 1,
                          }}
                          exit={{ height: 50, opacity: 0.8 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <Typography className="text-white">
                            {pesan.teks}
                          </Typography>
                        </motion.div>
                        {shouldShowReadMore && (
                          <motion.button
                            initial={{ opacity: 0.5, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0.5, y: 5 }}
                            transition={{ duration: 0.2 }}
                            className="text-[#72C02C] text-sm text-start underline ml-1"
                            onClick={() => toggleSelengkapnya2(index)}
                          >
                            {isExpanded
                              ? "Tampilkan Lebih Sedikit"
                              : "Baca Selengkapnya"}
                          </motion.button>
                        )}
                        <div className="flex justify-end items-center">
                          <span className="text-sm text-white">
                            {pesan.waktu}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
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
                />
              </div>
              <div className="flex items-center px-8">
                <BiSolidSend
                  onClick={handleSendMessage}
                  className="bg-[#808080]/40 rounded-full p-2 w-9 h-9 text-black cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChat;

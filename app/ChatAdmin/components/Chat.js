"use client";
import React, { useState, useRef, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { BiSolidChat, BiSolidSend, BiWind } from "react-icons/bi";
import {
  FaCloudBolt,
  FaMountain,
  FaChevronUp,
  FaFileImage,
  FaFileVideo,
} from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
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
  isOpen,
  setIsOpen,
  setStasiunTerpilih,
  handleContextMenu,
  stasiunTerpilih,
  isContextMenuOpen,
  setIsContextMenuOpen,
  setChatRoomId,
}) => {
  const stationsWithRoom = useStationsWithChatRooms();

  const handlePilihStasiun = (namaStasiun) => {
    setStasiunTerpilih(namaStasiun);
    const stasiun = stationsWithRoom.find((s) => s.nama === namaStasiun);
    if (stasiun) {
      setChatRoomId(stasiun.chatRoomId || null);
    }
    setIsContextMenuOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-start items-center gap-2 py-1 px-4 cursor-pointer"
      >
        <FaChevronUp
          className={`text-black text-lg transition duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <Typography className="text-black font-bold text-lg">
          Pesan Saya
        </Typography>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col transition-all duration-300"
        >
          {stationsWithRoom.map((s, i) => (
            <motion.div
              key={i}
              onClick={() => handlePilihStasiun(s.nama)}
              onContextMenu={(e) => handleContextMenu(e, s.nama)}
              animate={{
                y: isContextMenuOpen && stasiunTerpilih === s.nama ? 10 : 0,
              }}
              className="relative w-full flex flex-col gap-3 p-4 cursor-pointer hover:bg-[#808080]/30 hover:scale-105 hover:rounded-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 justify-between">
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <Typography className="text-black font-bold text-lg">
                    {s.nama}
                  </Typography>
                  <Typography className="text-[#808080]/70 line-clamp-1 text-sm">
                    {s.chatRoomData?.pesanTerakhir
                      ? `${s.chatRoomData?.pesanTerakhir}`
                      : "Belum ada chat di stasiun ini."}
                  </Typography>
                </div>
                <div className="flex flex-col items-center">
                  <Typography className="text-[#808080]/70 text-sm font-bold">
                    {s.chatRoomData?.terakhirDiperbarui
                      ? s.chatRoomData.terakhirDiperbarui
                          .toDate()
                          .toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                      : ""}
                  </Typography>
                  <Typography className="text-white bg-red-600 px-1.5 py-px rounded-full text-xs">
                    ...
                  </Typography>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

const ChatHeader = ({ stasiun }) => (
  <div className="p-2 border-b-2 border-[#D9D9D9]/80 w-full">
    <Typography className="text-black font-bold text-2xl">{stasiun}</Typography>
    <div className="flex items-center">
      <GoDotFill className="w-4 h-4 text-green-400" />
      <Typography className="text-green-400 font-bold text-sm">
        Online
      </Typography>
    </div>
  </div>
);

// Komponen: Chat Messages
const ChatMessages = ({
  pesanList,
  selengkapnya2,
  toggleSelengkapnya2,
  setChatRoomId,
}) => {
  const batasTeksPesan = 200;

  return (
    <div className="space-y-1">
      {pesanList.map((pesan, index) => {
        const isExpanded = selengkapnya2.includes(index);
        const showMore = pesan.teks.length > batasTeksPesan;

        return (
          <div key={index} className="w-full flex justify-start px-8 py-2">
            <motion.div className="flex flex-col w-1/2 p-3 bg-[#3182B7] rounded-lg gap-1">
              <motion.div
                initial={{ height: 50, opacity: 0.8 }}
                animate={{ height: isExpanded ? "auto" : 50, opacity: 1 }}
                className="overflow-hidden"
              >
                <Typography className="text-white">{pesan.teks}</Typography>
              </motion.div>
              {showMore && (
                <button
                  onClick={() => toggleSelengkapnya2(index)}
                  className="text-[#72C02C] text-sm underline text-start ml-1"
                >
                  {isExpanded ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
                </button>
              )}
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
}) => (
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
  const [isOpen, setIsOpen] = useState(false);
  const [selengkapnya2, setSelengkapnya2] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tampilkanEmoji, setTampilkanEmoji] = useState(false);
  const [stasiunTerpilih, setStasiunTerpilih] = useState("");
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

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

    try {
      await kirimChat(message, stasiunTerpilih, selectedFile);
      setMessage("");
      setSelectedFile(null);
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    }
  };
  const handleBukaEmoji = (emoji) => setMessage((prev) => prev + emoji.emoji);
  const toggleSelengkapnya2 = (index) => {
    setSelengkapnya2((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
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
    <div className="w-screen h-screen px-24">
      <div className="h-[90%] flex shadow-xl rounded-lg border-2 border-[#D9D9D9]/80">
        <div className="flex flex-col w-[30%] border-r-2 border-[#D9D9D9]/80">
          <div className="flex w-full border-b-2 p-3.5 border-[#D9D9D9]/80">
            <Typography className="text-black font-bold text-3xl">
              Pesan
            </Typography>
          </div>
          {apakahSudahLogin && (
            <div ref={contextMenuRef} className="flex flex-col">
              <StationList
                {...{
                  isOpen,
                  setIsOpen,
                  setStasiunTerpilih,
                  handleContextMenu,
                  stasiunTerpilih,
                  isContextMenuOpen,
                  setIsContextMenuOpen,
                  setChatRoomId,
                }}
              />
            </div>
          )}
        </div>
        {!stasiunTerpilih ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <BiSolidChat className="w-40 h-40 text-[#808080]/60" />
            <Typography className="text-[#808080] font-bold text-2xl">
              Selamat Datang di Fitur Live Chat!
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full">
            <ChatHeader stasiun={stasiunTerpilih} />
            <div className="h-full w-full overflow-auto p-2 bg-[url('/assets/img/bgChat.png')]">
              <ChatMessages
                pesanList={pesanDariFirestore}
                selengkapnya2={selengkapnya2}
                toggleSelengkapnya2={toggleSelengkapnya2}
                setChatRoomId={setChatRoomId}
              />
            </div>
            <ChatInput
              {...{
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
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChat;

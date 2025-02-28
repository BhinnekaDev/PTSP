"use client";
import React, { useState, useRef } from "react";
import { Typography } from "@material-tailwind/react";
// ICONS
import { BiSolidChat, BiSolidSend, BiWind } from "react-icons/bi";
import { FaCloudBolt, FaMountain } from "react-icons/fa6";
import { FiPaperclip } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
// MODULE
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";

function AdminChat() {
  const batasTeksPesan = 200;
  const [selengkapnya1, setSelengkapnya1] = useState([]);
  const [selengkapnya2, setSelengkapnya2] = useState([]);
  const [tampilkanEmoji, setTampilkanEmoji] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBukaFile = () => {
    fileInputRef.current.click();
  };

  const handleBukaEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const pesanList = [
    "Pesan pertaLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.ma yang pendek dan tidak butuh 'Baca Selengkapnya'.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.",
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
      <div className="h-4/5 flex items-center justify-start shadow-xl rounded-lg border-2 border-[#D9D9D9]/80">
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
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full flex items-center gap-3 p-4 cursor-pointer hover:bg-[#808080]/30 hover:scale-105 hover:rounded-lg transition-all duration-300">
                <FaMountain className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                <div>
                  <Typography className="text-black font-bold text-lg">
                    Stasiun Meterologi
                  </Typography>
                  <Typography className="text-[#808080]/70 line-clamp-1">
                    {batasTeks(
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                      25
                    )}
                  </Typography>
                </div>
              </div>
              <div className="w-full flex items-center gap-3 p-4 cursor-pointer hover:bg-[#808080]/30 hover:scale-105 hover:rounded-lg transition-all duration-300">
                <FaCloudBolt className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                <div>
                  <Typography className="text-black font-bold text-lg">
                    Stasiun Klimatologi
                  </Typography>
                  <Typography className="text-[#808080]/70">
                    {batasTeks(
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                      25
                    )}
                  </Typography>
                </div>
              </div>
              <div className="w-full flex items-center gap-3 p-4 cursor-pointer hover:bg-[#808080]/30 hover:scale-105 hover:rounded-lg transition-all duration-300">
                <BiWind className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
                <div>
                  <Typography className="text-black font-bold text-lg">
                    Stasiun Geofisika
                  </Typography>
                  <Typography className="text-[#808080]/70">
                    {batasTeks(
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                      25
                    )}
                  </Typography>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:hidden">
          <BiSolidChat className="w-32 h-32 text-[#808080]/60" />
          <Typography className="text-[#808080] font-bold text-2xl">
            Selamat Datang di Fitur Live Chat!
          </Typography>
        </div>
        <div className="flex flex-col items-start justify-start w-full h-full">
          <div className="p-2 border-b-2 border-[#D9D9D9]/80 w-full">
            <Typography className="text-black font-bold text-2xl">
              Stasiun Meterologi
            </Typography>
            <Typography className="text-black font-bold text-sm">
              Online
            </Typography>
          </div>
          <div className="h-auto overflow-auto p-2">
            <div className="space-y-1">
              {pesanList.map((pesan, index) => {
                const isExpanded = selengkapnya1.includes(index);
                const shouldShowReadMore = pesan.length > batasTeksPesan;

                return (
                  <div
                    key={index}
                    className="w-full flex justify-end px-8 py-2"
                  >
                    <div className="flex flex-col w-1/2 p-3 bg-[#72C02C] rounded-lg gap-1">
                      <div className="flex items-center">
                        <Typography className="text-white">
                          {isExpanded || !shouldShowReadMore
                            ? pesan
                            : pesan.slice(0, batasTeksPesan) + "... "}
                          {shouldShowReadMore && (
                            <button
                              className="text-[#3182B7] text-sm underline ml-1"
                              onClick={() => toggleSelengkapnya1(index)}
                            >
                              {isExpanded
                                ? "Tampilkan Lebih Sedikit"
                                : "Baca Selengkapnya"}
                            </button>
                          )}
                        </Typography>
                      </div>
                      <span className="text-end text-sm">19.00</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-1">
              {pesanList.map((pesan, index) => {
                const isExpanded = selengkapnya2.includes(index);
                const shouldShowReadMore = pesan.length > batasTeksPesan;

                return (
                  <div
                    key={index}
                    className="w-full flex justify-start px-8 py-2"
                  >
                    <div className="flex flex-col w-1/2 p-3 bg-[#3182B7] rounded-lg gap-1">
                      <div className="flex items-center">
                        <Typography className="text-white">
                          {isExpanded || !shouldShowReadMore
                            ? pesan
                            : pesan.slice(0, batasTeksPesan) + "... "}
                          {shouldShowReadMore && (
                            <button
                              className="text-[#72C02C] text-sm underline ml-1"
                              onClick={() => toggleSelengkapnya2(index)}
                            >
                              {isExpanded
                                ? "Tampilkan Lebih Sedikit"
                                : "Baca Selengkapnya"}
                            </button>
                          )}
                        </Typography>
                      </div>
                      <span className="text-end text-sm">19.00</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="p-2 w-full flex relative">
            {tampilkanEmoji && (
              <div className="absolute bottom-full left-0 right-0 px-12 bg-transparent shadow-none z-10">
                <EmojiPicker
                  className="!border-2 !border-[#808080]/30"
                  onEmojiClick={handleBukaEmoji}
                />
              </div>
            )}
            <div className="flex p-2 rounded-lg border-2 border-[#808080]/30 gap-2 w-full bg-white">
              <FiPaperclip
                className="bg-[#808080]/40 rounded-full p-2 w-9 h-9 text-black cursor-pointer"
                onClick={handleBukaFile}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => console.log(e.target.files[0])}
              />
              <BsEmojiSmile
                className="bg-[#808080]/40 rounded-full p-2 w-9 h-9 text-black cursor-pointer"
                onClick={() => setTampilkanEmoji(!tampilkanEmoji)}
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-black focus:outline-none"
                placeholder="Ketik pesan"
              />
            </div>
            <div className="flex items-center px-8">
              <BiSolidSend className="bg-[#808080]/40 rounded-full p-2 w-9 h-9 text-black cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminChat;

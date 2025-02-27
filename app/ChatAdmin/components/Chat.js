"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import { BiSolidChat, BiWind } from "react-icons/bi";
import { FaCloudBolt, FaMountain } from "react-icons/fa6";

function AdminChat() {
  const batasTeksPesan = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="w-screen h-screen px-24">
      <div className="h-4/5 flex items-center justify-start shadow-xl rounded-lg border-2 border-[#D9D9D9]/80">
        <div className="flex flex-col h-full items-center justify-start w-[30%] border-r-2 border-[#D9D9D9]/80">
          <div className="flex w-full border-b-2 p-3 border-[#D9D9D9]/80">
            <Typography className="text-black font-bold text-2xl">
              Pesan
            </Typography>
          </div>
          <div className="w-full flex items-center gap-3 p-4">
            <FaMountain className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
            <div className="">
              <Typography className="text-black font-bold text-lg">
                Stasiun Meterologi
              </Typography>
              <Typography className="text-[#808080]/70 line-clamp-1">
                {batasTeksPesan(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                  25
                )}
              </Typography>
            </div>
          </div>
          <div className="w-full flex items-center gap-3 p-4">
            <FaCloudBolt className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
            <div className="">
              <Typography className="text-black font-bold text-lg">
                Stasiun Klimatologi
              </Typography>
              <Typography className="text-[#808080]/70">
                {batasTeksPesan(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                  25
                )}
              </Typography>
            </div>
          </div>
          <div className="w-full flex items-center gap-3 p-4">
            <BiWind className="text-[#3182B7] bg-[#D9D9D9] w-12 h-12 p-2.5 rounded-full" />
            <div className="">
              <Typography className="text-black font-bold text-lg">
                Stasiun Geofisika
              </Typography>
              <Typography className="text-[#808080]/70">
                {batasTeksPesan(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
                  25
                )}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <BiSolidChat className="w-32 h-32 text-[#808080]/60" />
          <Typography className="text-[#808080] font-bold text-3xl">
            Selamat Datang di Fitur Live Chat!
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default AdminChat;

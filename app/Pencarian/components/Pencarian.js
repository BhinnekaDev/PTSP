"use client";
import React from "react";
import {
  FaMountain,
  FaArrowLeftLong,
  FaArrowRightLong,
  FaCartShopping,
  FaCircleInfo,
} from "react-icons/fa6";
import {
  Card,
  CardBody,
  Button,
  IconButton,
  Popover,
  Typography,
  PopoverHandler,
  PopoverContent,
} from "@/app/MTailwind";
import { Toaster } from "react-hot-toast";

export default function PencarianProduk() {
  return (
    <div className="max-w-screen-xl mx-auto my-6 p-8 bg-gradient-to-br from-primary via-white to-secondary rounded-md">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-extrabold text-center mb-6 uppercase">
        Hasil Pencarian
      </h1>
      <h5 className="text-center uppercase mb-8">Informasi dan Jasa</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card
            className="border-2 hover:shadow-2xl transition relative py-6"
            key={index}
          >
            <Popover>
              <PopoverHandler>
                <div className="absolute top-4 right-4">
                  <FaCircleInfo
                    size={20}
                    className="text-gray-500 cursor-pointer hover:text-secondary"
                  />
                </div>
              </PopoverHandler>
              <PopoverContent>
                <Typography variant="small">
                  Produk akan menjadi Rp 0 jika mengambil ajukan gratis.
                </Typography>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverHandler>
                <div className="flex flex-col items-center my-6">
                  <FaMountain
                    size={100}
                    className="text-secondary cursor-pointer hover:text-secondary"
                  />
                </div>
              </PopoverHandler>
              <PopoverContent>
                <Typography variant="small" className="text-lg font-semibold">
                  Detail Produk
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  Deskripsi
                </Typography>
              </PopoverContent>
            </Popover>
            <CardBody>
              <h2 className="text-lg font-semibold text-center">Nama Produk</h2>
              <div className="flex flex-col justify-between items-center my-2 space-y-5">
                <p className="text-gray-500 mb-5">Rp 0</p>
                <Button className="button-effect">
                  <FaCartShopping size={15} />
                  <span className="text-sm">Masukkan ke keranjang</span>
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-10">
        <Button variant="text" className="flex items-center gap-2 text-black">
          <FaArrowLeftLong strokeWidth={2} className="h-4 w-4" />
          Sebelumnya
        </Button>
        <div className="flex items-center gap-2 text-primary">
          {[1, 2, 3].map((page) => (
            <IconButton key={page}>{page}</IconButton>
          ))}
        </div>
        <Button variant="text" className="flex items-center gap-2 text-black">
          Selanjutnya
          <FaArrowRightLong strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

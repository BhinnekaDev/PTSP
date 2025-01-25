import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
} from "@/app/MTailwind";
import { toast, Toaster } from "react-hot-toast";

const UnduhDokumen = ({ open, onClose, pemesanan }) => {
  if (!pemesanan) return null;
  return (
    <Dialog
      open={open}
      handler={onClose}
      className="fixed z-50 w-screen h-full"
      size="lg"
    >
      <DialogHeader>Dokumen Pesanan Anda</DialogHeader>
      <DialogBody className="overflow-y-auto h-full w-full py-5 absolute">
        <div className="grid grid-cols-1">
          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-2">Detail Pesanan</h1>
            <Typography>Nomor Pesanan : #{pemesanan.id || "N/A"}</Typography>
            <Typography className="mb-6">
              Tanggal Pesanan :{" "}
              {new Date(
                pemesanan.ajukanDetail.Tanggal_Pembuatan_Ajukan.seconds * 1000
              ).toLocaleString()}
            </Typography>
            <div className="rounded-lg p-5 bg-gradient-to-bl from-secondary to-primary text-white">
              {pemesanan.Data_Keranjang.map((produk, index) => (
                <div
                  className="grid grid-cols-2 items-center mb-4"
                  key={produk.produkId || index}
                >
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 mb-5 text-center">
                      <Typography className="font-semibold" variant="h6">
                        {produk.Nama}
                      </Typography>
                      <Typography className="font-bold" variant="h6">
                        <a
                          href={produk.File}
                          target="_blank"
                          download
                          className="text-black bg-white p-3 rounded-2xl border-2 border-black hover:bg-black hover:text-white"
                        >
                          Unduh Dokumen
                        </a>
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
              <hr className="my-2" />
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default UnduhDokumen;

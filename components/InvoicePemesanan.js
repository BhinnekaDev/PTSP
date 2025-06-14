import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  Typography,
} from "@/app/MTailwind";

const InvoicePesanan = ({
  open,
  onClose,
  pemesanan,
  userData,
  ajukanDetail,
}) => {
  if (!pemesanan) return null;
  return (
    <Dialog
      open={open}
      handler={onClose}
      className="fixed z-50 w-screen h-full"
      size="xl"
    >
      <DialogHeader className="flex justify-between items-center text-lg lg:text-xl">
        <span>Dokumen Pesanan Anda</span>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &#x2715;
        </button>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll h-full w-full py-5 absolute">
        <div className="bg-gray-100 min-h-screen p-2">
          <div className="mx-auto bg-white rounded-lg shadow-lg border-2 border-gray p-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-y-3 pb-4 border-b">
              <Typography
                variant="h5"
                className="font-bold text-center text-gray-700 text-base lg:text-xl"
              >
                Nomor Pesanan # {pemesanan.id}
              </Typography>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  pemesanan.Status_Pembayaran === "Menunggu Pembayaran"
                    ? "bg-red-500 text-white"
                    : pemesanan.Status_Pembayaran === "Sedang Ditinjau"
                    ? "bg-yellow-800 text-white"
                    : pemesanan.Status_Pembayaran === "Lunas"
                    ? "bg-secondary text-white"
                    : pemesanan.Status_Pembayaran === "Ditolak"
                    ? "bg-red-600 text-white"
                    : pemesanan.Status_Pembayaran === "Menunggu Admin"
                    ? "bg-blue-gray-400 text-white"
                    : "bg-blue-gray-400 text-white"
                }`}
              >
                {pemesanan.Status_Pembayaran === "Menunggu Pembayaran"
                  ? "Menunggu Pembayaran"
                  : pemesanan.Status_Pembayaran === "Ditolak"
                  ? "Belum Bayar"
                  : pemesanan.Status_Pembayaran === "Sedang Ditinjau"
                  ? "Sedang Ditinjau"
                  : pemesanan.Status_Pembayaran === "Lunas"
                  ? "Lunas"
                  : pemesanan.Status_Pembayaran === "Menunggu Admin"
                  ? "Kadaluwarsa"
                  : "Status Tidak Diketahui"}
              </span>
            </div>

            <div className="py-6">
              <Typography variant="h6" className="font-bold text-gray-800">
                Tanggal Pembayaran :{" "}
                {pemesanan.ajukanDetail.Jenis_Ajukan === "Gratis"
                  ? "GRATIS"
                  : pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar"
                  ? pemesanan.Status_Pembayaran === "Sedang Ditinjau"
                    ? "Pembayaran sedang ditinjau"
                    : pemesanan.Status_Pembayaran === "Ditolak"
                    ? "Pembayaran Anda Ditolak"
                    : pemesanan.transaksiDetail?.Tanggal_Pengiriman_Bukti
                    ? new Date(
                        pemesanan.transaksiDetail.Tanggal_Pengiriman_Bukti
                          .seconds * 1000
                      ).toLocaleString()
                    : "-"
                  : ""}
              </Typography>
            </div>

            {/* Billing Details */}
            <div className="mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <Typography
                    variant="small"
                    className="text-gray-600 font-semibold"
                  >
                    Nomor Pesanan
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-800">
                    {pemesanan.id}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="text-gray-600 font-semibold"
                  >
                    Nomor Ajukan
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-800">
                    {pemesanan.ID_Ajukan}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="text-gray-600 font-semibold"
                  >
                    Email Perusahaan
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-800">
                    {userData.Email_Perusahaan
                      ? `${userData.Email} || ${userData.Email_Perusahaan}`
                      : userData.Email}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="text-gray-600 font-semibold"
                  >
                    Detail Penerima
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-800">
                    {userData.Nama_Perusahaan
                      ? `${userData.Nama_Lengkap} || ${userData.Nama_Perusahaan}`
                      : userData.Nama_Lengkap}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="text-gray-600 font-semibold"
                  >
                    Tanggal Pemesanan
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-800">
                    {new Date(
                      pemesanan.Tanggal_Pemesanan.seconds * 1000
                    ).toLocaleString()}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="text-gray-600 font-semibold"
                  >
                    Tanggal Pengajuan
                  </Typography>
                  <Typography variant="paragraph" className="text-gray-800">
                    {new Date(
                      ajukanDetail.Tanggal_Pembuatan_Ajukan.seconds * 1000
                    ).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </div>
            <Card className="overflow-x-scroll lg:overflow-hidden mb-4">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-200 text-gray-600 font-semibold uppercase text-sm border-b text-center">
                  <tr>
                    <th className="py-3 px-5">Nama Produk</th>
                    <th className="py-3 px-5">Nama Instansi</th>
                    <th className="py-3 px-5">Kuantitas</th>
                    <th className="py-3 px-5">Harga Produk</th>
                    <th className="py-3 px-5">Total Harga per Produk</th>
                  </tr>
                </thead>
                <tbody>
                  {pemesanan?.Data_Keranjang?.map((produk, index) => (
                    <tr key={produk.produkId || index}>
                      <td className="py-3 px-5">{produk.Nama}</td>
                      <td className="py-3 px-5 text-center">
                        {produk.Pemilik}
                      </td>
                      <td className="py-3 px-5 text-center">
                        {produk.Kuantitas}
                      </td>
                      <td className="py-3 px-5 text-center">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(produk.Harga)}
                      </td>
                      <td className="py-3 px-5 text-center">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(produk.Harga * produk.Kuantitas)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            {/* Summary */}
            <div className="flex justify-end space-y-1 text-right">
              <div className="w-full md:w-1/2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    {" "}
                    <>
                      Total Pesanan :{" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(pemesanan.Total_Harga_Pesanan)}
                    </>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div>
                <Typography variant="small" className="font-bold text-gray-700">
                  Catatan
                </Typography>
                <Typography variant="paragraph" className="break-words">
                  Jika ada permasalahan atau kesalahan dalam dokumen ini,
                  silakan hubungi stasiun sesuai pesanan anda.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default InvoicePesanan;

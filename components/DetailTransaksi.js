"use client";
import React from "react";
import {
  Typography,
  Badge,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Input,
} from "@/app/MTailwind";
import { FaFileAlt, FaBox, FaPaperPlane, FaDollarSign } from "react-icons/fa";
import DialogPerbaikanDokumen from "@/components/PerbaikanDokumen";
import DialogPengisianIkm from "@/components/PengisianIKM";
import DialogUnduhDokumen from "@/components/UnduhDokumen";
import DialogPengirimanBuktiTransfer from "@/components/PengirimanBuktiTransfer";
import DialogInvoicePemesanan from "@/components/InvoicePemesanan";
import DialogKonfirmasiVABaru from "@/components/KonfirmasiVABaru";
import constDetailTransaksi from "@/constant/constDetailTransaksi";
import useInvoicePDF from "@/hooks/Backend/useInvoicePDF";

const DetailTransaksi = ({
  isOpen,
  onClose,
  pemesanan,
  userData,
  ajukanDetail,
}) => {
  const { handleDownload } = useInvoicePDF();
  const {
    bukaPerbaikanDokumen,
    setBukaPerbaikanDokumen,
    bukaPengisianIkm,
    setBukaPengisianIkm,
    bukaPengisianBuktiTransaksi,
    setBukaPengisianBuktiTransaksi,
    bukaUnduhDokumen,
    setBukaUnduhDokumen,
    bukaInvoicePemesanan,
    setBukaInvoicePemesanan,
    bukaKonfirmasiVABaru,
    setBukaKonfirmasiVABaru,
  } = constDetailTransaksi();
  const now = new Date();
  const tanggalKadaluwarsa = new Date(
    pemesanan.ajukanDetail.Tanggal_Kadaluwarsa
  );

  const sudahKedaluwarsa = now > tanggalKadaluwarsa;

  const bolehKirimBukti =
    pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar" &&
    pemesanan.ajukanDetail.Status_Ajuan === "Diterima" &&
    ["Menunggu Pembayaran", "Ditolak"].includes(pemesanan.Status_Pembayaran) &&
    !sudahKedaluwarsa;
  const validasiRequestVABaru =
    sudahKedaluwarsa &&
    ["Menunggu Pembayaran", "Ditolak"].includes(pemesanan.Status_Pembayaran);

  if (!pemesanan) return null;
  return (
    <Dialog
      open={isOpen}
      handler={onClose}
      className="fixed z-50 w-screen h-screen"
      size="xl"
    >
      <DialogHeader className="flex justify-between items-center">
        <span>Tracking Pesanan Anda</span>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &#x2715;
        </button>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll h-screen w-full lg:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] pb-20">
          <div>
            <Timeline>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon
                    className={`p-2 ${
                      pemesanan.ajukanDetail.Status_Ajuan === "Ditolak"
                        ? "bg-red-500"
                        : pemesanan.ajukanDetail.Status_Ajuan ===
                          "Sedang Ditinjau"
                        ? "bg-yellow-800"
                        : "bg-secondary"
                    }`}
                  >
                    <FaFileAlt className="h-4 w-4" />
                  </TimelineIcon>
                  <Typography variant="h5" color="blue-gray">
                    Status Pengajuan
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-4 px-1 break-words">
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    Jenis Kegiatan : {pemesanan.ajukanDetail.Nama_Ajukan}
                  </Typography>
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    Status Pengajuan : {pemesanan.ajukanDetail.Status_Ajuan}
                  </Typography>
                  {pemesanan.ajukanDetail.Status_Ajuan === "Ditolak" && (
                    <Typography
                      color="gray"
                      className="font-normal text-gray-600"
                    >
                      Keterangan Ditolak: {pemesanan.ajukanDetail.Keterangan}
                    </Typography>
                  )}
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    Tanggal Ajuan :{" "}
                    {new Date(
                      pemesanan.ajukanDetail.Tanggal_Pembuatan_Ajukan.seconds *
                        1000
                    ).toLocaleString()}
                  </Typography>
                  {pemesanan.ajukanDetail.Status_Ajuan === "Ditolak" && (
                    <Button
                      size="sm"
                      onClick={() => setBukaPerbaikanDokumen(true)}
                      className="bg-primary border-2 border-blue-gray-300 shadow-xl text-white mt-2"
                    >
                      Perbaikan Dokumen
                    </Button>
                  )}
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon
                    className={`p-2 ${
                      pemesanan.ajukanDetail.Jenis_Ajukan === "Gratis"
                        ? pemesanan.ajukanDetail.Status_Ajuan === "Diterima"
                          ? "bg-secondary"
                          : "bg-primary"
                        : pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar"
                        ? pemesanan.Status_Pembayaran === "Menunggu Pembayaran"
                          ? "bg-primary"
                          : pemesanan.Status_Pembayaran === "Sedang Ditinjau"
                          ? "bg-yellow-800"
                          : pemesanan.Status_Pembayaran === "Lunas"
                          ? "bg-secondary"
                          : pemesanan.Status_Pembayaran === "Ditolak"
                          ? "bg-red-500"
                          : "bg-primary"
                        : "bg-primary"
                    }`}
                  >
                    <FaDollarSign className="h-4 w-4" />
                  </TimelineIcon>
                  <Typography variant="h5" color="blue-gray">
                    Status Pembayaran
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-4 px-1 break-words">
                  {pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar" &&
                    pemesanan.ajukanDetail.Status_Ajuan === "Diterima" && (
                      <Typography
                        color="gray"
                        className="font-normal text-blue-gray-600"
                      >
                        Tanggal Billing : {""}
                        {pemesanan.ajukanDetail.Tanggal_Masuk
                          ? new Date(
                              pemesanan.ajukanDetail.Tanggal_Masuk?.seconds
                                ? pemesanan.ajukanDetail.Tanggal_Masuk.seconds *
                                  1000
                                : pemesanan.ajukanDetail.Tanggal_Masuk
                            ).toLocaleString()
                          : "-"}
                      </Typography>
                    )}
                  {pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar" &&
                    pemesanan.ajukanDetail.Status_Ajuan === "Diterima" && (
                      <Typography
                        color="gray"
                        className="font-normal text-blue-gray-600"
                      >
                        Tanggal Kadaluwarsa : {""}
                        {pemesanan.ajukanDetail.Tanggal_Kadaluwarsa
                          ? new Date(
                              pemesanan.ajukanDetail.Tanggal_Kadaluwarsa
                                ?.seconds
                                ? pemesanan.ajukanDetail.Tanggal_Kadaluwarsa
                                    .seconds * 1000
                                : pemesanan.ajukanDetail.Tanggal_Kadaluwarsa
                            ).toLocaleString()
                          : "-"}
                      </Typography>
                    )}
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    Status Pembayaran :{" "}
                    {(() => {
                      const status = pemesanan.Status_Pembayaran;

                      if (sudahKedaluwarsa) {
                        if (status === "Menunggu Admin") {
                          return "Menunggu Virtual Account Baru";
                        }
                        if (
                          ["Menunggu Pembayaran", "Ditolak"].includes(status)
                        ) {
                          return "Kedaluwarsa";
                        }
                        if (status === "Lunas") {
                          return "Lunas";
                        }
                        if (status === "Sedang Ditinjau") {
                          return "Sedang Ditinjau";
                        }
                      } else {
                        if (status === "Lunas") {
                          return "Lunas";
                        }
                        return status;
                      }

                      return status;
                    })()}
                  </Typography>
                  {pemesanan.ajukanDetail.Jenis_Ajukan !== "Berbayar" && (
                    <Typography
                      color="gray"
                      className="font-normal text-gray-600"
                    >
                      {pemesanan.ajukanDetail.Status_Ajuan === "Diterima"
                        ? `Tanggal Pembayaran : Gratis`
                        : "Tanggal Pembayaran : ..."}
                    </Typography>
                  )}
                  {pemesanan.Status_Pembayaran === "Ditolak" && (
                    <Typography
                      color="gray"
                      className="font-normal text-gray-600"
                    >
                      Keterangan Ditolak: {pemesanan.Keterangan}
                    </Typography>
                  )}
                  {pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar" &&
                    pemesanan.ajukanDetail.Status_Ajuan === "Diterima" &&
                    (pemesanan.Status_Pembayaran === "Lunas" ||
                      pemesanan.Status_Pembayaran === "Sedang Ditinjau") && (
                      <Typography
                        color="gray"
                        className="font-normal text-gray-600"
                      >
                        Tanggal Pembayaran :{" "}
                        {pemesanan.transaksiDetail?.Tanggal_Pengiriman_Bukti
                          ?.seconds
                          ? new Date(
                              pemesanan.transaksiDetail.Tanggal_Pengiriman_Bukti
                                .seconds * 1000
                            ).toLocaleString()
                          : "..."}
                      </Typography>
                    )}
                  {bolehKirimBukti && (
                    <Button
                      size="sm"
                      onClick={() => setBukaPengisianBuktiTransaksi(true)}
                      className="bg-primary border-2 border-blue-gray-300 shadow-xl text-white"
                    >
                      Kirim Bukti Pembayaran
                    </Button>
                  )}

                  {validasiRequestVABaru && (
                    <Button
                      size="sm"
                      onClick={() => setBukaKonfirmasiVABaru(true)}
                      className="bg-yellow-800 border-2 border-white shadow-xl text-white"
                    >
                      Request Virtual Account Baru
                    </Button>
                  )}
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon
                    className={`p-2 ${
                      pemesanan.Status_Pembayaran === "Lunas" &&
                      pemesanan.Status_Pembuatan === "Menunggu Pembuatan" &&
                      pemesanan.ajukanDetail.Status_Ajuan === "Diterima"
                        ? "bg-yellow-800"
                        : pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar" ||
                          pemesanan.ajukanDetail.Jenis_Ajukan === "Gratis"
                        ? pemesanan.Status_Pembuatan === "Selesai Pembuatan"
                          ? "bg-secondary"
                          : "bg-primary"
                        : "bg-primary"
                    }`}
                  >
                    <FaBox className="h-4 w-4" />
                  </TimelineIcon>
                  <Typography variant="h5" color="blue-gray">
                    Status Pembuatan{" "}
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-4 px-1 break-words">
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    Status Pembuatan : {""}
                    {pemesanan.Status_Pembayaran === "Lunas" &&
                      `${pemesanan.Status_Pembuatan}`}
                  </Typography>
                </TimelineBody>
              </TimelineItem>
              <TimelineItem>
                <TimelineHeader>
                  {pemesanan?.Status_Pesanan === "Belum Selesai" ? (
                    <TimelineIcon className="p-2 bg-primary">
                      <FaPaperPlane className=" h-4 w-4" />
                    </TimelineIcon>
                  ) : (
                    <TimelineIcon className="p-2 bg-secondary">
                      <FaPaperPlane className=" h-4 w-4" />
                    </TimelineIcon>
                  )}
                  <Typography variant="h5" color="blue-gray">
                    Pesanan Selesai
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-4 px-1 break-words">
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    Status Pengisian IKM : {""}
                    {pemesanan.Status_Pengisian_IKM !== "Telah Diisi"
                      ? "IKM Belum Diisi"
                      : "IKM Sudah Diisi"}
                  </Typography>
                  <Typography
                    color="gray"
                    className="font-normal text-gray-600"
                  >
                    Status Pesanan : {""}
                    {pemesanan.Status_Pesanan === "Belum Selesai"
                      ? "Pesanan Belum Selesai"
                      : "Pesanan selesai"}
                  </Typography>
                  <Button
                    className="border-2 border-white bg-primary text-white"
                    size="sm"
                    onClick={() => setBukaPengisianIkm(true)}
                    hidden={
                      pemesanan.Status_Pengisian_IKM === "Telah Diisi" ||
                      pemesanan.Status_Pembuatan !== "Selesai Pembuatan"
                    }
                  >
                    Pengisian IKM
                  </Button>
                  <Button
                    className="border-2 border-white bg-secondary text-white"
                    size="sm"
                    onClick={() => setBukaUnduhDokumen(true)}
                    hidden={pemesanan.Status_Pesanan === "Belum Selesai"}
                  >
                    Unduh Dokumen
                  </Button>
                </TimelineBody>
              </TimelineItem>
            </Timeline>
          </div>
          <div className="w-full">
            <h1 className="text-2xl font-semibold mb-2">Detail Pesanan</h1>
            <Typography className="text-gray-500 mb-6">
              Dipesan pada tanggal{" "}
              <span className="font-bold">
                {new Date(
                  pemesanan.ajukanDetail.Tanggal_Pembuatan_Ajukan.seconds * 1000
                ).toLocaleString()}
              </span>
            </Typography>
            <div className="grid grid-cols-1 lg:grid-cols-2 mb-6 gap-2">
              <div className="bg-gradient-to-br from-secondary to-primary text-white p-4 rounded-lg shadow-xl border-2">
                <h2 className="font-semibold mb-4">Alamat Pengiriman</h2>
                <Typography>
                  {userData.Nama_Lengkap && userData.Nama_Perusahaan ? (
                    <>
                      {userData.Nama_Lengkap} - {userData.Nama_Perusahaan}
                    </>
                  ) : (
                    userData.Nama_Lengkap || userData.Nama_Perusahaan || "N/A"
                  )}
                </Typography>
                <Typography>
                  {userData.No_Hp && userData.No_Hp_Perusahaan ? (
                    <>
                      {userData.No_Hp} - {userData.No_Hp_Perusahaan}
                    </>
                  ) : (
                    userData.No_Hp || userData.No_Hp_Perusahaan || "N/A"
                  )}
                </Typography>
                <Typography>
                  {" "}
                  {userData.Email && userData.Email_Perusahaan ? (
                    <>
                      {userData.Email} - {userData.Email_Perusahaan}
                    </>
                  ) : (
                    userData.Email || userData.Email_Perusahaan || "N/A"
                  )}
                </Typography>
              </div>
              <div className="bg-gradient-to-br from-secondary to-primary text-white p-4 rounded-lg shadow-xl border-2">
                <h2 className="font-semibold mb-4">Ringkasan Pesanan</h2>
                <Typography>
                  Total Pesanan :{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(pemesanan.Total_Harga_Pesanan)}
                </Typography>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              <div className="rounded-lg p-6 pb-10 bg-gradient-to-bl from-secondary to-primary text-white">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-4">
                  <div className="flex flex-col">
                    <Typography>
                      Nomor Pesanan : #{pemesanan.id || "N/A"}
                    </Typography>
                    <Typography>
                      Tanggal Pesanan :{" "}
                      {new Date(
                        pemesanan.ajukanDetail.Tanggal_Pembuatan_Ajukan
                          .seconds * 1000
                      ).toLocaleString()}
                    </Typography>
                  </div>
                  <div className="flex flex-row gap-2 mb-5 lg:mb-0">
                    <Button
                      className="border-2 bg-white text-black"
                      size="sm"
                      onClick={() => setBukaInvoicePemesanan(true)}
                    >
                      Cek Invoice
                    </Button>
                    <Button
                      className="border-2 bg-white text-black"
                      size="sm"
                      onClick={() =>
                        handleDownload(pemesanan, userData, ajukanDetail)
                      }
                    >
                      Unduh Invoice
                    </Button>
                  </div>
                </div>

                {/* Produk list */}
                {pemesanan.Data_Keranjang.map((produk, index) => (
                  <div
                    className="grid grid-cols-2 items-center mb-4"
                    key={produk.produkId || index}
                  >
                    <div>
                      <Typography className="font-medium" variant="h6">
                        {produk.Nama}
                      </Typography>
                    </div>
                    <div className="text-end">
                      <Typography className="font-semibold" variant="h6">
                        {produk.Pemilik}
                      </Typography>
                    </div>
                    {pemesanan.ajukanDetail.Jenis_Ajukan === "Berbayar" && (
                      <div className="col-span-2">
                        <Typography className="font-semibold" variant="h6">
                          Virtual Account Produk :{" "}
                          {sudahKedaluwarsa &&
                          [
                            "Menunggu Pembayaran",
                            "Ditolak",
                            "Menunggu Admin",
                          ].includes(pemesanan.Status_Pembayaran)
                            ? "-"
                            : produk.Nomor_VA}
                        </Typography>
                      </div>
                    )}
                    <div className="col-span-2">
                      <Typography variant="body1">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(produk.Harga)}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <div className="grid grid-cols-2">
                        <Typography variant="body1" className="font-bold">
                          x{produk.Kuantitas}
                        </Typography>
                        <Typography
                          variant="body1"
                          className="font-bold text-end"
                        >
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(produk.Total_Harga)}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}

                <hr className="" />
              </div>
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogPerbaikanDokumen
        open={bukaPerbaikanDokumen}
        onClose={() => setBukaPerbaikanDokumen(false)}
        ajukanID={pemesanan.ID_Ajukan}
        Keterangan={pemesanan.ajukanDetail.Keterangan}
        namaAjukan={pemesanan.ajukanDetail.Nama_Ajukan}
      />
      <DialogInvoicePemesanan
        open={bukaInvoicePemesanan}
        onClose={() => setBukaInvoicePemesanan(false)}
        pemesanan={pemesanan}
        transaksiDetail={pemesanan.transaksiDetail}
        ajukanDetail={pemesanan.ajukanDetail}
        userData={userData}
      />
      <DialogPengisianIkm
        open={bukaPengisianIkm}
        onClose={() => setBukaPengisianIkm(false)}
        pemesanan={pemesanan}
      />
      <DialogUnduhDokumen
        open={bukaUnduhDokumen}
        onClose={() => setBukaUnduhDokumen(false)}
        pemesanan={pemesanan}
      />
      <DialogPengirimanBuktiTransfer
        open={bukaPengisianBuktiTransaksi}
        onClose={() => setBukaPengisianBuktiTransaksi(false)}
        pemesanan={pemesanan}
        ID_Pemesanan={pemesanan.id}
        ID_Transaksi={pemesanan.ID_Transaksi}
      />
      <DialogKonfirmasiVABaru
        open={bukaKonfirmasiVABaru}
        onClose={() => setBukaKonfirmasiVABaru(false)}
        ID_Pemesanan={pemesanan.id}
        ID_Transaksi={pemesanan.ID_Transaksi}
      />
    </Dialog>
  );
};

export default DetailTransaksi;

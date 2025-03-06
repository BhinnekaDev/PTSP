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
import useSearchResults from "@/hooks/Backend/useTampilanPencarian";
import useMasukanKeKeranjangJasa from "@/hooks/Backend/useMasukanKekeranjangJasa";
import useMasukanKeKeranjangInformasi from "@/hooks/Backend/useMasukanKekeranjangInformasi";
import usePagination from "@/hooks/Frontend/usePagination";

export default function PencarianProduk() {
  const { results, loading } = useSearchResults();
  const {
    memuatMasukKeKeranjang: loadingJasa,
    masukanKeKeranjang: tambahJasa,
  } = useMasukanKeKeranjangJasa();
  const {
    memuatMasukKeKeranjang: loadingInformasi,
    masukanKeKeranjang: tambahInformasi,
  } = useMasukanKeKeranjangInformasi();

  const formatHarga = (harga) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(harga || 0);
  };

  const handleTambahKeKeranjang = (item) => {
    if (item.Kategori === "Jasa") {
      tambahJasa(item.id);
    } else if (item.Kategori === "Informasi") {
      tambahInformasi(item.id);
    }
  };

  const {
    itemTerkini,
    activePage,
    totalHalaman,
    nextPage,
    prevPage,
    getItemProps,
  } = usePagination(results, 6);

  return (
    <div className="max-w-screen-xl mx-auto my-6 p-8 bg-gradient-to-br from-primary via-white to-secondary rounded-md">
      <Toaster position="top-right" reverseOrder={false} />
      <Typography
        variant="h1"
        className="text-3xl font-extrabold text-center mb-6 uppercase"
      >
        Hasil Pencarian
      </Typography>
      <Typography
        variant="h5"
        className="text-black/60 text-lg text-center uppercase mb-8"
      >
        Informasi dan Jasa
      </Typography>
      {loading ? (
        <Typography variant="lead" className="text-center text-gray-500">
          Loading...
        </Typography>
      ) : itemTerkini.length === 0 ? (
        <Typography variant="lead" className="text-center text-gray-500">
          Tidak ada hasil ditemukan
        </Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {itemTerkini.map((item) => (
            <Card
              className="border-2 hover:shadow-2xl transition relative py-6"
              key={item.id}
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
                    {item.Deskripsi || "Deskripsi tidak tersedia"}
                  </Typography>
                </PopoverContent>
              </Popover>
              <CardBody>
                <h2 className="text-lg font-semibold text-center">
                  {item.Nama}
                </h2>
                <div className="flex flex-col justify-between items-center my-2 space-y-5">
                  <p className="text-gray-500 mb-5">
                    {formatHarga(item.Harga)}
                  </p>
                  <Button
                    className="button-effect flex items-center gap-2"
                    onClick={() => handleTambahKeKeranjang(item)}
                    disabled={loadingJasa || loadingInformasi}
                  >
                    <FaCartShopping size={15} />
                    <span className="text-sm">
                      {loadingJasa || loadingInformasi
                        ? "Menambahkan..."
                        : "Masukkan ke Keranjang"}
                    </span>
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      {/* Pagination */}
      {totalHalaman > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <Button
            variant="text"
            className="flex items-center gap-2 text-black"
            onClick={prevPage}
            disabled={activePage === 1}
          >
            <FaArrowLeftLong strokeWidth={2} className="h-4 w-4" />
            Sebelumnya
          </Button>
          <div className="flex items-center gap-2 text-primary">
            {Array.from({ length: totalHalaman }, (_, i) => i + 1).map(
              (page) => (
                <IconButton key={page} {...getItemProps(page)}>
                  {page}
                </IconButton>
              )
            )}
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2 text-black"
            onClick={nextPage}
            disabled={activePage === totalHalaman}
          >
            Selanjutnya
            <FaArrowRightLong strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

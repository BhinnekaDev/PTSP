import React from "react";
import useTampilanInformasiKlimatologi from "@/hooks/Backend/useTampilanInformasiKlimatologi";
import usePagination from "@/hooks/Frontend/usePagination";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import Image from "next/image";
import {
  FaArrowLeftLong,
  FaArrowRightLong,
  FaCartShopping,
  FaCircleInfo,
} from "react-icons/fa6";
import iconInformasiKlimatologi from "@/assets/img/Icon/Informasi-Klimatologi.png";
import {
  Card,
  CardBody,
  Button,
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@/app/MTailwind";
import { Toaster, Toast } from "react-hot-toast";
import { PiStarFill } from "react-icons/pi";
// PENGAIT KAMI
import useMasukanKekeranjangInformasi from "@/hooks/Backend/useMasukanKekeranjangInformasi";
// KOMPONEN KAMI
import Memuat from "@/components/Memuat";

export default function InformasiKlimatologi() {
  const apakahSudahLogin = useVerifikasiLogin();
  const { produkInformasiKlimatologi, loading, error } =
    useTampilanInformasiKlimatologi();
  const { memuatMasukKeKeranjang, masukanKeKeranjang } =
    useMasukanKekeranjangInformasi();
  const {
    itemTerkini,
    activePage,
    totalHalaman,
    nextPage,
    prevPage,
    getItemProps,
  } = usePagination(produkInformasiKlimatologi);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-gradient-to-br from-primary via-white to-secondary rounded-md overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-extrabold text-center mb-6 uppercase">
        Informasi
      </h1>
      <h5 className="text-center uppercase mb-8">Stasiun Klimatologi</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {itemTerkini.map((product) => (
          <Card
            className="border-2 hover:shadow-2xl transition relative py-6 pl-6"
            key={product.id}
          >
            {product.Status === "Top" && (
              <div className="absolute top-4 left-4 text-yellow-400 drop-shadow-[0_0_1px_black]">
                <PiStarFill size={20} />
              </div>
            )}
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
                  <Image
                    src={iconInformasiKlimatologi}
                    alt="Informasi Klimatologi"
                    className="w-45 h-45"
                    width={130}
                    height={130}
                    quality={100}
                    priority
                  />
                </div>
              </PopoverHandler>
              <PopoverContent>
                <Typography variant="small" className="text-lg font-semibold">
                  Detail Produk
                </Typography>
                <Typography variant="small" className="text-gray-600">
                  {product.Deskripsi}
                </Typography>
              </PopoverContent>
            </Popover>
            <CardBody>
              <h2 className="text-lg font-semibold text-center">
                {product.Nama}
              </h2>
              <div className="flex flex-col justify-between items-center my-2 space-y-5">
                <p className="text-gray-500 mb-5">
                  {" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(product.Harga)}
                </p>
                <Button
                  className={`button-effect ${
                    memuatMasukKeKeranjang ? "opacity-50" : "opacity-100"
                  }`}
                  onClick={() => masukanKeKeranjang(product.id)}
                  disabled={
                    !apakahSudahLogin ||
                    product.Status === "Tidak Tersedia" ||
                    memuatMasukKeKeranjang
                  }
                >
                  <FaCartShopping size={30} className="hidden lg:block" />
                  <span className="text-sm">
                    {memuatMasukKeKeranjang ? (
                      <Memuat />
                    ) : (
                      "Masukkan ke keranjang"
                    )}
                  </span>
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-10">
        <Button
          variant="text"
          className="items-center gap-2 text-black hidden lg:flex"
          onClick={prevPage}
          disabled={activePage === 1}
        >
          <FaArrowLeftLong strokeWidth={2} className="h-4 w-4" /> Sebelumnya
        </Button>
        <div className="flex items-center gap-2 text-primary">
          {[...Array(totalHalaman)].map((_, index) => (
            <IconButton {...getItemProps(index + 1)} key={index + 1}>
              {index + 1}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="hidden lg:flex items-center gap-2 text-black"
          onClick={nextPage}
          disabled={activePage === totalHalaman}
        >
          Selanjutnya
          <FaArrowRightLong strokeWidth={2} className="h-4 w-4 " />
        </Button>
      </div>
    </div>
  );
}

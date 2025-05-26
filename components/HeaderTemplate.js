"use client";
import React from "react";
import Image from "next/image";
import HeaderImage from "@/assets/img/Slider/2.png";
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function HeaderTemplate() {
  const { navbarAktif } = useNavbarAktif();
  const [loading, setLoading] = React.useState(true);

  const content = {
    "/Produk": {
      desc: "PTSP BMKG Provinsi Bengkulu",
      title: "Katalog Produk",
    },
    "/PengaturanProfil": {
      desc: "Pengaturan Data Anda",
      title: "Pengaturan Profil",
    },
    "/Keranjang": {
      desc: "Daftar Belanja Anda",
      title: "Keranjang Anda",
    },
    "/Pemesanan": {
      desc: "Konfirmasi Daftar Belanja Anda",
      title: "Keranjang Anda",
    },
    "/Transaksi": {
      desc: "Daftar Pesanan Anda",
      title: "Pesanan Anda",
    },
    "/Ajukan": {
      desc: "Daftar Pengajuan",
      title: "Pengajuan Anda",
    },
    "/Pencarian": {
      desc: "Hasil Pencarian",
      title: "Hasil Pencarian Anda",
    },
    "/PengajuanKunjungan": {
      desc: "Kunjungan Online ke PTSP BMKG",
      title: "Pengajuan Kunjungan Online",
    },
  };

  const currentContent = content[navbarAktif] || {
    desc: "Default Deskripsi",
    title: "Default Judul",
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-10">
      <Image
        src={HeaderImage}
        alt="image 2"
        className="lg:h-[70vh] h-[40vh] w-full object-cover brightness-50"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(7,33,46,0.8)] blur-[10px] z-2 "></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:p-4 p-0 text-white text-xl font-bold animate-slide-fade-in">
        <div className="uppercase text-center tracking-widest">
          {loading ? (
            <>
              <Skeleton className="mb-2" width={200} height={20} />
              <Skeleton width={300} height={40} />
            </>
          ) : (
            <>
              <h3 className="text-xl lg:text-lg text-primary uppercase">
                {currentContent.desc}
              </h3>
              <h3 className="text-lg lg:text-5xl text-white capitalize">
                {currentContent.title}
              </h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderTemplate;

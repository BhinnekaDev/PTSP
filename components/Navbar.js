"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@/app/MTailwind";
import { useRouter } from "next/navigation";
import {
  FaGear,
  FaCartShopping,
  FaMagnifyingGlass,
  FaAddressCard,
  FaCreditCard,
} from "react-icons/fa6";
import LogoBMKG from "@/assets/img/Logo/logo.png";
import useKeluar from "@/hooks/Backend/useKeluarAkun";
import useHitungKeranjangSesuaiID from "@/hooks/Backend/useHitungKeranjangSesuaiID";
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import useNavbarEfek from "@/hooks/Frontend/useNavbarEfek";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useDialogPanduan from "@/hooks/Frontend/useDialogPanduan";
import { useDialogRegulasi } from "@/hooks/Frontend/useDialogRegulasi";
import useMasukkanPencarian from "@/hooks/Backend/useMasukkanPencarian";

function Navigation() {
  const { navbarAktif, handlenavbarAktif, handlenavbarAktifLink } =
    useNavbarAktif();
  const router = useRouter();
  const { navbarBg, openPengaturan, setOpenPengaturan } = useNavbarEfek();
  const { apakahSudahLogin } = useVerifikasiLogin();
  const { keluarAkun } = useKeluar();
  const { jumlahKeranjang, memuatHitungKeranjangSesuaiID } =
    useHitungKeranjangSesuaiID();
  const {
    DialogAlurLayanan,
    DialogStandarLayanan,
    DialogRegulasiPelayanan,
    DialogTarifLayanan,
    handleDialogOpenAlurLayanan,
    handleDialogOpenStandarLayanan,
    handleDialogOpenRegulasiPelayanan,
    handleDialogOpenTarifLayanan,
  } = useDialogRegulasi();
  const { DialogPanduan, handleDialogOpenPanduan } = useDialogPanduan();
  const { query, setQuery, handleSearch, suggestions, setSuggestions } =
    useMasukkanPencarian();

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 uppercase">
      <Typography
        as="li"
        className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${
          navbarAktif === "/Beranda" ? "text-secondary" : "text-white"
        }`}
      >
        <a
          className="flex items-center"
          onClick={() => handlenavbarAktif("/Beranda")}
        >
          Beranda
        </a>
      </Typography>
      <Menu>
        <MenuHandler>
          <Typography
            as="li"
            className="flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer"
          >
            <a className="flex items-center">Layanan</a>
          </Typography>
        </MenuHandler>
        <MenuList className="bg-primary text-white uppercase text-sm lg:text-base lg:w-52 w-full">
          <MenuItem
            className="hover:!bg-secondary hover:!text-white"
            onClick={handleDialogOpenAlurLayanan}
          >
            Alur Layanan
          </MenuItem>
          <MenuItem
            className="hover:!bg-secondary hover:!text-white"
            onClick={handleDialogOpenStandarLayanan}
          >
            Standar Layanan
          </MenuItem>
          <MenuItem
            className="hover:!bg-secondary hover:!text-white"
            onClick={handleDialogOpenRegulasiPelayanan}
          >
            Regulasi Pelayanan
          </MenuItem>
          <MenuItem
            className="hover:!bg-secondary hover:!text-white"
            onClick={handleDialogOpenTarifLayanan}
          >
            Tarif Pelayanan
          </MenuItem>
          <MenuItem
            className="hover:!bg-secondary hover:!text-white"
            onClick={handleDialogOpenPanduan}
          >
            Panduan Pelayanan
          </MenuItem>
        </MenuList>
      </Menu>
      <Typography
        as="li"
        className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${
          navbarAktif === "/Produk" ? "text-secondary" : "text-white"
        }`}
      >
        <a
          className="flex items-center"
          onClick={() => handlenavbarAktif("/Produk")}
        >
          Produk
        </a>
      </Typography>
      <Menu>
        <MenuHandler>
          <Typography
            as="li"
            className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${
              navbarAktif === "/Saran" || navbarAktif === "/Pengaduan"
                ? "text-secondary"
                : "text-white"
            }`}
          >
            <a className="flex items-center">Saran & Pengaduan</a>
          </Typography>
        </MenuHandler>
        <MenuList className="bg-primary text-white uppercase text-sm lg:text-base lg:w-52 w-full">
          <MenuItem
            className={`hover:!bg-secondary hover:!text-white p-2 font-semibold cursor-pointer ${
              navbarAktif === "/Saran"
                ? "text-white bg-secondary"
                : "text-white"
            }`}
            onClick={() => handlenavbarAktif("/Saran")}
          >
            Saran
          </MenuItem>
          <MenuItem
            className={`hover:!bg-secondary hover:!text-white p-2 font-semibold cursor-pointer ${
              navbarAktif === "/Pengaduan"
                ? "text-white bg-secondary"
                : "text-white"
            }`}
            onClick={() => handlenavbarAktif("/Pengaduan")}
          >
            Pengaduan
          </MenuItem>
          <MenuItem
            className="hover:!bg-secondary hover:!text-white p-2 font-semibold cursor-pointer"
            onClick={() => handlenavbarAktifLink("https://www.lapor.go.id/")}
          >
            SP4N Lapor
          </MenuItem>
        </MenuList>
      </Menu>
      <Typography
        as="li"
        className="flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer"
      >
        <a
          className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${
            navbarAktif === "/PengajuanKunjungan"
              ? "text-secondary"
              : "text-white"
          }`}
          onClick={() => handlenavbarAktif("/PengajuanKunjungan")}
        >
          Kunjungan
        </a>
      </Typography>
      <Typography
        as="li"
        className="flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer"
      >
        <a
          className={`flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer ${
            navbarAktif === "/Faq" ? "text-secondary" : "text-white"
          }`}
          onClick={() => handlenavbarAktif("/Faq")}
        >
          FAQ
        </a>
      </Typography>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative lg:px-0 px-8">
          <Typography
            as="li"
            className="flex items-center bg-white rounded-full gap-x-2 font-bold lg:text-xl cursor-pointer lg:w-72 w-full "
          >
            <Input
              type="text"
              placeholder="Cari Produk"
              className="rounded-full border-none focus:ring-0 w-full"
              labelProps={{ className: "hidden" }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
            />
            <Button
              type="submit"
              className="bg-secondary p-2 rounded-full translate-x-3 ml-2"
            >
              <FaMagnifyingGlass className="h-6 w-6 text-white" />
            </Button>
          </Typography>
          {suggestions.length > 0 && (
            <ul className="fixed mt-3 lg:mt-2 left-4 right-4 z-[100] bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto lg:absolute lg:top-full lg:left-0 lg:w-[350px] lg:z-50">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="p-2 hover:bg-gray-100 text-sm cursor-pointer text-black hover:text-primary"
                  onClick={() =>
                    router.push(
                      `/Pencarian?query=${encodeURIComponent(item.Nama)}`
                    )
                  }
                >
                  {item.Nama}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </ul>
  );

  return (
    <Navbar
      className={`max-w-[98rem] w-full fixed top-0 left-1/2 transform -translate-x-1/2 z-20 px-4 py-2 ${navbarBg} border-none shadow-none backdrop-filter-none`}
    >
      {DialogAlurLayanan}
      {DialogStandarLayanan}
      {DialogRegulasiPelayanan}
      {DialogTarifLayanan}
      {DialogPanduan}
      <div className="flex items-center justify-between text-white">
        <div
          className="lg:ml-6 cursor-pointer py-1.5 text-white flex items-center gap-x-2 uppercase font-bold"
          onClick={() => handlenavbarAktif("/Beranda")}
        >
          <Image
            src={LogoBMKG}
            alt="Logo BMKG"
            className="lg:w-full lg:h-full"
            width={130}
            height={130}
            quality={100}
            priority
          />
        </div>
        <div className="hidden lg:block">{navList}</div>
        <div>
          <div className="hidden sm:flex items-center gap-x-5">
            <a
              className={`relative font-bold hover:text-secondary cursor-pointer ${
                navbarAktif === "/Keranjang" || navbarAktif === "/Pemesanan"
                  ? "text-secondary"
                  : "text-white"
              }`}
              onClick={() => handlenavbarAktif("/Keranjang")}
            >
              {apakahSudahLogin ? (
                <div className="relative">
                  <FaCartShopping className="w-5 h-5" />
                  <span className="absolute -top-4 -right-4 border-2 border-white bg-primary text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                    {jumlahKeranjang > 0 ? jumlahKeranjang : "0"}
                  </span>
                </div>
              ) : null}
            </a>

            <Menu
              animate={{
                mount: { y: 5 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <a
                  className={`font-bold hover:text-secondary cursor-pointer ${
                    navbarAktif === "/PengaturanProfil" ||
                    navbarAktif === "/Transaksi"
                      ? "text-secondary"
                      : "text-white"
                  }`}
                  onClick={() => handlenavbarAktif("/PengaturanProfil")}
                >
                  {apakahSudahLogin ? <FaGear className="w-5 h-5" /> : null}
                </a>
              </MenuHandler>
              <MenuList className="text-white text-base bg-primary border-2 border-white uppercase ">
                <MenuItem
                  className={`hover:!bg-secondary hover:!text-white ${
                    navbarAktif === "/PengaturanProfil"
                      ? "bg-secondary text-white"
                      : ""
                  }`}
                  onClick={() => handlenavbarAktif("/PengaturanProfil")}
                >
                  Profile Saya
                </MenuItem>
                <MenuItem
                  className={`hover:!bg-secondary hover:!text-white ${
                    navbarAktif === "/Transaksi"
                      ? "bg-secondary text-white"
                      : ""
                  }`}
                  onClick={() => handlenavbarAktif("/Transaksi")}
                >
                  Pesanan Saya
                </MenuItem>
                <hr className="my-1" />
                <MenuItem
                  onClick={keluarAkun}
                  className="hover:!bg-secondary hover:!text-white"
                >
                  Keluar
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className="sm:flex items-center gap-x-5">
          {!apakahSudahLogin ? (
            <Button
              className="lg:block hidden border-2 border-white uppercase font-bold bg-secondary rounded-full"
              onClick={() => handlenavbarAktif("/Login")}
            >
              Login
            </Button>
          ) : null}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenPengaturan(!openPengaturan)}
          >
            {openPengaturan ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openPengaturan}>
        <div className="block lg:hidden">
          {navList}
          <div className="flex flex-col items-center gap-4 py-4">
            {!apakahSudahLogin ? (
              <Button
                className="border-2 border-white uppercase font-bold bg-secondary rounded-full"
                onClick={() => handlenavbarAktif("/Login")}
              >
                Login
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-2">
                {/* Baris icon */}
                <div className="flex items-center gap-6">
                  {/* Icon Keranjang */}
                  <a
                    className={`relative font-bold hover:text-secondary cursor-pointer ${
                      navbarAktif === "/Keranjang" ||
                      navbarAktif === "/Pemesanan"
                        ? "text-secondary"
                        : "text-white"
                    }`}
                    onClick={() => handlenavbarAktif("/Keranjang")}
                  >
                    {apakahSudahLogin && (
                      <div className="relative">
                        <FaCartShopping className="w-5 h-5" />
                        <span className="absolute -top-3 -right-3 border-2 border-white bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {jumlahKeranjang > 0 ? jumlahKeranjang : "0"}
                        </span>
                      </div>
                    )}
                  </a>

                  {/* Icon Profil */}
                  <a
                    className={`relative font-bold hover:text-secondary cursor-pointer ${
                      navbarAktif === "/PengaturanProfil"
                        ? "text-secondary"
                        : "text-white"
                    }`}
                    onClick={() => handlenavbarAktif("/PengaturanProfil")}
                  >
                    <FaAddressCard className="w-5 h-5" />
                  </a>

                  {/* Icon Transaksi */}
                  <a
                    className={`relative font-bold hover:text-secondary cursor-pointer ${
                      navbarAktif === "/Transaksi"
                        ? "text-secondary"
                        : "text-white"
                    }`}
                    onClick={() => handlenavbarAktif("/Transaksi")}
                  >
                    <FaCreditCard className="w-5 h-5" />
                  </a>
                </div>

                {/* Tombol Keluar di baris terpisah */}
                <Button
                  onClick={keluarAkun}
                  className="bg-secondary rounded-full mt-2"
                >
                  Keluar
                </Button>
              </div>
            )}
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}

export default Navigation;

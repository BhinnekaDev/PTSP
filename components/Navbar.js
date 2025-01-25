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
} from "@/app/MTailwind";
import { FaGear, FaCartShopping } from "react-icons/fa6";
import LogoBMKG from "@/assets/img/Logo/logo.png";
import useKeluar from "@/hooks/Backend/useKeluarAkun";
import useHitungKeranjangSesuaiID from "@/hooks/Backend/useHitungKeranjangSesuaiID";
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import useNavbarEfek from "@/hooks/Frontend/useNavbarEfek";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useDialogPanduan from "@/hooks/Frontend/useDialogPanduan";
import { useDialogRegulasi } from "@/hooks/Frontend/useDialogRegulasi";

function Navigation() {
  const { navbarAktif, handlenavbarAktif } = useNavbarAktif();
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
            <a className="flex items-center">Regulasi</a>
          </Typography>
        </MenuHandler>
        <MenuList className="bg-primary text-white uppercase text-sm lg:text-base">
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
      <Typography
        as="li"
        className="flex items-center gap-x-2 p-1 font-bold hover:translate-y-1 lg:text-xl cursor-pointer"
      >
        <a className="flex items-center" onClick={handleDialogOpenPanduan}>
          Panduan Pelayanan
        </a>
      </Typography>
    </ul>
  );
  return (
    <div>
      <Navbar
        className={`mx-auto max-w-screen-2xl px-4 py-2 lg:px-3 lg:py-4 lg:fixed lg:left-1/2 lg:transform lg:-translate-x-1/2 z-20 absolute ${navbarBg} border-none shadow-none backdrop-filter-none transition-all duration-300`}
      >
        {DialogAlurLayanan}
        {DialogStandarLayanan}
        {DialogRegulasiPelayanan}
        {DialogTarifLayanan}
        {DialogPanduan}
        <div className="container mx-auto flex items-center justify-between text-white">
          <Typography
            className="mr-4 cursor-pointer py-1.5 text-white flex items-center gap-x-2 uppercase font-bold"
            onClick={() => handlenavbarAktif("/Beranda")}
          >
            <Image
              src={LogoBMKG}
              alt="Logo BMKG"
              className="w-14 h-16"
              width={256}
              height={75}
              quality={100}
              priority
            />
            PTSP BMKG Bengkulu
          </Typography>
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
          <div className="hidden sm:flex items-center gap-x-5">
            {!apakahSudahLogin ? (
              <Button
                className="border-2 border-white uppercase font-bold bg-secondary rounded-full"
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
          <div className="container mx-auto hidden">
            {navList}
            <div className="flex justify-center items-center gap-x-20">
              <a
                className="font-bold text-white hover:text-primary"
                onClick={() => handlenavbarAktif("/Keranjang")}
              >
                <FaCartShopping className="w-5 h-5" />
              </a>
              <Menu
                animate={{
                  mount: { y: 30 },
                  unmount: { y: 50 },
                }}
              >
                <MenuHandler>
                  <a className="font-bold text-white">
                    <FaGear className="w-5 h-5" />
                  </a>
                </MenuHandler>
                <MenuList className="text-white text-base bg-primary border-2 border-white uppercase">
                  <MenuItem
                    className="hover:!bg-secondary hover:!text-white"
                    onClick={() => handlenavbarAktif("/ProfileSetting")}
                  >
                    Profile Saya
                  </MenuItem>
                  <MenuItem
                    className="hover:!bg-secondary hover:!text-white"
                    onClick={() => handlenavbarAktif("/Transaksi")}
                  >
                    Pesanan Saya
                  </MenuItem>
                  <hr className="my-1" />
                  <MenuItem className="hover:!bg-secondary hover:!text-white">
                    Keluar
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
            <div className="flex justify-center items-center gap-x-20">
              {!apakahSudahLogin && (
                <Button
                  className="button-effect"
                  onClick={() => handlenavbarAktif("/Login")}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;

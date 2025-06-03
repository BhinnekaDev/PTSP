"use client";

import React, { useState } from "react";
import { Input, Button } from "@/app/MTailwind";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import LoginIcon from "@/assets/img/Icon/Login.png";
// PENGAIT KAMI
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import useMasukDenganGoogle from "@/hooks/Backend/useMasukDenganGoogle";
// KOMPONEN KAMI
import Memuat from "@/components/Memuat";

function AuthPage() {
  const { navbarAktif, handlenavbarAktif } = useNavbarAktif("/Beranda");
  const { masukDenganGoogle, sedangMemuatMasukDenganGoogle } =
    useMasukDenganGoogle();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col-reverse lg:flex-row w-full max-w-4xl h-auto lg:h-[60vh] shadow-lg rounded-none lg:rounded-lg overflow-hidden bg-white">
        {navbarAktif === "/Login" ? (
          <>
            <div className="flex flex-1 flex-col justify-center items-center p-8">
              <h2 className="text-3xl font-semibold text-primary underline underline-offset-8 uppercase mb-6">
                Silahkan Masuk
              </h2>

              {sedangMemuatMasukDenganGoogle ? (
                <Memuat />
              ) : (
                <Button
                  onClick={masukDenganGoogle}
                  className="w-full max-w-sm mb-4 !border-2 !border-secondary text-black text-sm flex items-center justify-center space-x-2"
                >
                  <FcGoogle />
                  <span>Continue with Google</span>
                </Button>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-center items-center bg-primary text-white py-8 px-6 lg:mt-0">
              <div className="text-center lg:text-right">
                <h3 className="text-2xl font-semibold mt-4">
                  Penasaran Bagaimana Kami
                </h3>
                <p className="mb-4">
                  Kami punya sesuatu yang baru dan segar. Silahkan kunjungi
                  beranda kami.
                </p>
                <Button
                  className="mt-4 bg-secondary hover:bg-secondary/80"
                  color="white"
                  variant="outlined"
                  onClick={() => handlenavbarAktif("/Beranda")}
                >
                  Cek Beranda
                </Button>
              </div>
              <Image
                className="w-80 h-80 mt-6"
                src={LoginIcon}
                alt="Login Icon"
                priority
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default AuthPage;

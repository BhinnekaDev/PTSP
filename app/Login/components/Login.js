"use client";

import React, { useState } from "react";
import { Input, Button } from "@/app/MTailwind";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
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
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden w-full max-w-4xl">
        {/* Login */}
        {navbarAktif === "/Login" && (
          <div className="w-1/2 p-8 flex items-center justify-center">
            <div className="page-login text-center">
              <h2 className="text-3xl font-semibold text-primary underline underline-offset-8 uppercase my-6">
                Silahkan Masuk
              </h2>
              <Button
                onClick={masukDenganGoogle}
                className="w-full mb-4 !border-2 !border-secondary text-black text-sm flex items-center justify-center space-x-2"
              >
                <FcGoogle />
                <span>Continue with Google</span>
              </Button>
            </div>
          </div>
        )}
        {navbarAktif === "/Login" && (
          <div className="w-1/2 bg-primary text-white flex items-center justify-center py-8">
            <div className="p-1 flex flex-col items-center justify-center">
              <div className="text-end px-4">
                <h3 className="text-2xl font-semibold mb-2">
                  Penasaran Bagaimana Kami
                </h3>
                <p className="mb-4">
                  Kami punya sesuatu yang baru dan segar. Silahkan kunjungi
                  beranda kami
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
                className="w-80 h-80 mt-4"
                src={LoginIcon}
                alt="Login Icon"
                priority
              />
            </div>
          </div>
        )}
        {navbarAktif === "/LupaPassword" && (
          <div className="w-1/2 p-8">
            <div className="page-login">
              <h2 className="text-3xl font-semibold text-gray-800 mb-12 ">
                Lupa Password
              </h2>
              <p className="text-center text-black font-bold mb-6">
                Masukkan Alamat Email Anda dibawah ini
              </p>
              <form>
                <div className="mb-4">
                  <Input
                    type="email"
                    label="Email"
                    color="blue"
                    placeholder="Email"
                    required
                  />
                </div>
                <Button className="w-full" color="green" type="submit">
                  Submit
                </Button>
              </form>
              <p className="mt-4 text-center text-gray-500">
                Sudah punya akun?{" "}
                <a href="/Login" className="text-blue-500">
                  Login
                </a>
              </p>
            </div>
          </div>
        )}

        {navbarAktif === "/LupaPassword" && (
          <div className="w-1/2 bg-primary text-white flex items-center justify-center py-8">
            <div className="p-1 flex flex-col items-center justify-center">
              <div className="text-end px-4">
                <h3 className="text-2xl font-semibold mb-2">
                  Penasaran Bagaimana Kami
                </h3>
                <p className="mb-4">
                  Kami punya sesuatu yang baru dan segar. Silahkan kunjungi
                  beranda kami
                </p>
                <Button
                  className="mt-4"
                  color="white"
                  variant="outlined"
                  onClick={() => handlenavbarAktif("/Beranda")}
                >
                  Cek Beranda
                </Button>
              </div>
              <Image
                className="w-80 h-80 mt-4"
                src={LoginIcon}
                alt="Forgot Password Icon"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;

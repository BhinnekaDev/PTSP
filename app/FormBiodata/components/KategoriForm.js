"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardBody, Button } from "@/app/MTailwind";
import LogoPerorangan from "@/assets/img/Icon/Logo-Perorangan.png";
import LogoPerusahaan from "@/assets/img/Icon/Logo-Perusahaan.png";
import FormPerorangan from "@/app/FormBiodata/components/FormPerorangan";
import FormPerusahaan from "@/app/FormBiodata/components/FormPerusahaan";

function Registration() {
  const [pilihanKategoriDaftar, setKategoriDaftar] = useState(null);

  const handleButtonClick = (kategori) => {
    setKategoriDaftar(kategori);
  };
  return (
    <>
      {!pilihanKategoriDaftar ? (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary">
          <h1 className="text-3xl font-extrabold tracking-widest mb-12 text-white">
            PENDAFTARAN
          </h1>
          <div className="flex space-x-8">
            <Card className="w-80">
              <CardBody className="flex flex-col items-center">
                <Image
                  src={LogoPerorangan}
                  width={300}
                  height={300}
                  alt="Perorangan"
                  className="w-60 h-60 mb-4"
                  priority
                />
                <h2 className="text-black text-lg font-bold mb-2">
                  PERORANGAN
                </h2>
                <p className="text-black text-sm mb-4 text-center">
                  Pendaftaran untuk pengguna perorangan
                </p>
                <Button
                  color="blue"
                  onClick={() => handleButtonClick("perorangan")}
                >
                  Daftar Perorangan
                </Button>
              </CardBody>
            </Card>

            <Card className="w-80">
              <CardBody className="flex flex-col items-center">
                <Image
                  src={LogoPerusahaan}
                  width={300}
                  height={300}
                  alt="Perusahaan/Instansi"
                  className="w-60 h-60 mb-4"
                  priority
                />
                <h2 className="text-black text-lg font-bold mb-2">
                  PERUSAHAAN/INSTANSI
                </h2>
                <p className="text-black text-sm mb-4 text-center">
                  Pendaftaran untuk perusahaan atau instansi
                </p>
                <Button
                  color="green"
                  onClick={() => handleButtonClick("perusahaan")}
                >
                  Daftar Perusahaan
                </Button>
              </CardBody>
            </Card>
          </div>
        </section>
      ) : (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary to-secondary">
          {pilihanKategoriDaftar === "perorangan" && <FormPerorangan />}
          {pilihanKategoriDaftar === "perusahaan" && <FormPerusahaan />}
        </section>
      )}
    </>
  );
}

export default Registration;

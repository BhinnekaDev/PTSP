"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
} from "@/app/MTailwind";
import PenanggulanganBencanaForm from "@/constant/constFormPenanggulanganBencana";
import KegiatanKeagamaanForm from "@/constant/constFormKeagamaan";
import KegiatanSosialForm from "@/constant/constFormSosial";
import KegiatanPertahananForm from "@/constant/constFormPertahanan";
import KegiatanPemerintahanForm from "@/constant/constFormPemerintahan";
import KegiatanPendidikanPenelitianForm from "@/constant/constFormPendidikan";
import KegiatanTarifPNBPForm from "@/constant/constFormPNBP";
import useAjukanFormSubmit from "@/hooks/Backend/useMasukanAjukan";

function FormAjukan() {
  const [sectionAktif, setSectionAktif] = useState(1);
  const [keranjang, setKeranjang] = useState({ ID_Ajukan: [] });
  const { handleFormSubmit } = useAjukanFormSubmit(keranjang);

  const sectionComponents = {
    1: <PenanggulanganBencanaForm onSubmit={handleFormSubmit} />,
    2: <KegiatanKeagamaanForm onSubmit={handleFormSubmit} />,
    3: <KegiatanSosialForm onSubmit={handleFormSubmit} />,
    4: <KegiatanPertahananForm onSubmit={handleFormSubmit} />,
    5: <KegiatanPemerintahanForm onSubmit={handleFormSubmit} />,
    6: <KegiatanPendidikanPenelitianForm onSubmit={handleFormSubmit} />,
    7: <KegiatanTarifPNBPForm onSubmit={handleFormSubmit} />,
  };

  return (
    <div className="container mx-auto mt-10 mb-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Form Pengajuan Kegiatan
      </h1>
      <div className="mb-4">
        <Menu>
          <MenuHandler>
            <Button className="w-full bg-primary text-white">
              Pilih Jenis Kegiatan
            </Button>
          </MenuHandler>
          <MenuList className="w-3/4 bg-white text-black">
            <MenuItem
              onClick={() => setSectionAktif(1)}
              className="flex items-center"
            >
              <span className="mr-10">Penanggulangan Bencana</span>
              <Badge className="w-14 h-5 bg-primary" content="Gratis" />
            </MenuItem>
            <MenuItem
              onClick={() => setSectionAktif(2)}
              className="flex items-center"
            >
              <span className="mr-10">Kegiatan Keagamaan</span>
              <Badge className="w-14 h-5 bg-primary" content="Gratis" />
            </MenuItem>
            <MenuItem
              onClick={() => setSectionAktif(3)}
              className="flex items-center"
            >
              <span className="mr-10">Kegiatan Sosial</span>
              <Badge className="w-14 h-5 bg-primary" content="Gratis" />
            </MenuItem>
            <MenuItem
              onClick={() => setSectionAktif(4)}
              className="flex items-center"
            >
              <span className="mr-10">Kegiatan Pertahanan dan Keamanan</span>
              <Badge className="w-14 h-5 bg-primary" content="Gratis" />
            </MenuItem>
            <MenuItem
              onClick={() => setSectionAktif(5)}
              className="flex items-center"
            >
              <span className="mr-10">Kegiatan Pemerintahan</span>
              <Badge className="w-14 h-5 bg-primary" content="Gratis" />
            </MenuItem>
            <MenuItem
              onClick={() => setSectionAktif(6)}
              className="flex items-center"
            >
              <span className="mr-10">
                Kegiatan Pendidikan dan Penelitian Non Komersil
              </span>
              <Badge className="w-14 h-5 bg-primary" content="Gratis" />
            </MenuItem>
            <MenuItem
              onClick={() => setSectionAktif(7)}
              className="flex items-center"
            >
              <span className="mr-10">
                Pelayanan Informasi dengan Tarif PNBP
              </span>
              <Badge className="w-16 h-5 bg-red-500" content="Berbayar" />
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      {sectionComponents[sectionAktif]}
    </div>
  );
}

export default FormAjukan;

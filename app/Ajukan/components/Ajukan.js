"use client";
import React, { useState } from "react";
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

export const dynamic = "force-dynamic";

function FormAjukan() {
  const [sectionAktif, setSectionAktif] = useState(null); // null = belum pilih
  const [keranjang, setKeranjang] = useState({ ID_Ajukan: [] });
  const { handleFormSubmit } = useAjukanFormSubmit(keranjang);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectSection = (sectionNumber) => {
    setSectionAktif(sectionNumber);
    setMenuOpen(false); // tutup menu setelah pilih
  };

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
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center">
        Form Pengajuan Kegiatan
      </h1>
      <div className="mb-4">
        <Menu open={menuOpen} handler={setMenuOpen}>
          <MenuHandler>
            <Button
              className="w-full bg-gradient-to-r from-[#1475BA] via-[#399385] to-[#6BBC3F] text-white text-base lg:text-lg"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {sectionAktif
                ? `Jenis Kegiatan: ${
                    {
                      1: "Penanggulangan Bencana",
                      2: "Kegiatan Keagamaan",
                      3: "Kegiatan Sosial",
                      4: "Kegiatan Pertahanan dan Keamanan",
                      5: "Kegiatan Pemerintahan",
                      6: "Kegiatan Pendidikan dan Penelitian Non Komersil",
                      7: "Pelayanan Informasi dengan Tarif PNBP",
                    }[sectionAktif]
                  }`
                : "Pilih Jenis Kegiatan"}
            </Button>
          </MenuHandler>
          {menuOpen && (
            <MenuList className="w-full lg:w-3/4 bg-white text-black overflow-x-hidden p-4 lg:p-4 ">
              <MenuItem
                onClick={() => handleSelectSection(1)}
                className="flex items-center"
              >
                <span className="mr-8 lg:mr-10">Penanggulangan Bencana</span>
                <Badge className="w-14 h-5 bg-primary" content="Gratis" />
              </MenuItem>
              <MenuItem
                onClick={() => handleSelectSection(2)}
                className="flex items-center"
              >
                <span className="mr-8 lg:mr-10">Kegiatan Keagamaan</span>
                <Badge className="w-14 h-5 bg-primary" content="Gratis" />
              </MenuItem>
              <MenuItem
                onClick={() => handleSelectSection(3)}
                className="flex items-center"
              >
                <span className="mr-8 lg:mr-10">Kegiatan Sosial</span>
                <Badge className="w-14 h-5 bg-primary" content="Gratis" />
              </MenuItem>
              <MenuItem
                onClick={() => handleSelectSection(4)}
                className="flex items-center"
              >
                <span className="mr-8 lg:mr-10">
                  Kegiatan Pertahanan dan Keamanan
                </span>
                <Badge className="w-14 h-5 bg-primary" content="Gratis" />
              </MenuItem>
              <MenuItem
                onClick={() => handleSelectSection(5)}
                className="flex items-center"
              >
                <span className="mr-8 lg:mr-10">Kegiatan Pemerintahan</span>
                <Badge className="w-14 h-5 bg-primary" content="Gratis" />
              </MenuItem>
              <MenuItem
                onClick={() => handleSelectSection(6)}
                className="flex items-center"
              >
                <span className="mr-20 lg:mr-10">
                  Kegiatan Pendidikan dan Penelitian Non Komersil
                </span>
                <Badge className="w-14 h-5 bg-primary" content="Gratis" />
              </MenuItem>
              <MenuItem
                onClick={() => handleSelectSection(7)}
                className="flex items-center"
              >
                <span className="mr-9 lg:mr-10">
                  Pelayanan Informasi dengan Tarif PNBP
                </span>
                <Badge className="w-16 h-5 bg-red-500" content="Berbayar" />
              </MenuItem>
            </MenuList>
          )}
        </Menu>
      </div>

      {sectionAktif && sectionComponents[sectionAktif]}
    </div>
  );
}

export default FormAjukan;

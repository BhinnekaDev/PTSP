import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Alert,
} from "@/app/MTailwind";
import { FaTrash } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import usePerbaikiDokumen from "@/hooks/Backend/usePerbaikanDokumen";
import PenanggulanganBencanaForm from "@/constant/constPerbaikanFormPenanggulanganBencana";
import KeagamaanForm from "@/constant/constPerbaikanFormKeagamaan";
import PemerintahanForm from "@/constant/constPerbaikanFormPemerintahan";
import PendidikanForm from "@/constant/constPerbaikanFormPendidikan";
import SosialForm from "@/constant/constPerbaikanFormSosial";
import PNBPForm from "@/constant/constPerbaikanFormPNBP";
import PertahananForm from "@/constant/constPerbaikanFormPertahanan";

const DialogPerbaikanDokumen = ({
  open,
  onClose,
  namaAjukan,
  Keterangan,
  ajukanID,
}) => {
  const { handlePerbaikiDokumen } = usePerbaikiDokumen();

  const getFormContent = () => {
    switch (namaAjukan) {
      case "Kegiatan Penanggulangan Bencana":
        return {
          instructions:
            "*Upload Kembali File Surat Pengantar Permintaan Data Yang Sudah Diperbaiki",
          component: (
            <PenanggulanganBencanaForm
              ID_Ajukan={ajukanID}
              onSubmit={handlePerbaikiDokumen}
            />
          ),
        };
      case "Kegiatan Keagamaan":
        return {
          instructions:
            "*Upload Kembali File Surat Permintaan Ditandatangani Camat atau Pejabat Setingkat Yang Sudah Diperbaiki",
          component: (
            <KeagamaanForm
              ID_Ajukan={ajukanID}
              onSubmit={handlePerbaikiDokumen}
            />
          ),
        };
      case "Kegiatan Pertahanan dan Keamanan":
        return {
          instructions:
            "*Upload Kembali File Surat Permintaan Ditandatangani Camat atau Pejabat Setingkat Yang Sudah Diperbaiki",
          component: (
            <PertahananForm
              ID_Ajukan={ajukanID}
              onSubmit={handlePerbaikiDokumen}
            />
          ),
        };
      case "Kegiatan Sosial":
        return {
          instructions:
            "*Upload Kembali File Surat Permintaan Ditandatangani Camat atau Pejabat Setingkat Yang Sudah Diperbaiki",
          component: (
            <SosialForm ID_Ajukan={ajukanID} onSubmit={handlePerbaikiDokumen} />
          ),
        };
      case "Kegiatan Pendidikan dan Penelitian Non Komersil":
        return {
          instructions:
            "*Upload Kembali File Identitas Diri KTP / KTM / SIM / Paspor, Surat Pengantar dari Kepala Sekolah / Rektor / Dekan, Surat Pernyataan Tidak Digunakan Untuk Kepentingan Lain, Proposal Penelitian Berisi Maksud dan Tujuan Penelitian yang Telah Disetujui Yang Sudah Diperbaiki",
          component: (
            <PendidikanForm
              ID_Ajukan={ajukanID}
              onSubmit={handlePerbaikiDokumen}
            />
          ),
        };
      case "Kegiatan Pemerintahan Pusat atau Daerah":
        return {
          instructions:
            "*Upload Kembali File Mempunyai Perjanjian Kerjasama dengan BMKG tentang Kebutuhan Informasi MKKuG, Surat Pengantar Yang Sudah Diperbaiki",
          component: (
            <PemerintahanForm
              ID_Ajukan={ajukanID}
              onSubmit={handlePerbaikiDokumen}
            />
          ),
        };
      case "Kegiatan Tarif PNBP":
        return {
          instructions:
            "*Upload Kembali File Identitas KTP, Surat Pengantar Yang Sudah Diperbaiki",
          component: (
            <PNBPForm ID_Ajukan={ajukanID} onSubmit={handlePerbaikiDokumen} />
          ),
        };
      default:
        return "*Surat Pernyataan";
    }
  };

  const { instructions, component } = getFormContent();
  return (
    <Dialog
      open={open}
      handler={onClose}
      className="fixed inset-0 items-center justify-center w-full h-auto mx-auto overflow-y-scroll"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xl"
    >
      <DialogHeader className="flex justify-between items-center text-base lg:text-xl">
        <span>Perbaiki Dokumen Ajukan</span>
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          &#x2715;
        </button>
      </DialogHeader>
      <DialogBody>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="w-full p-0 lg:p-6 bg-white rounded-lg shadow-md ">
          <Alert className="bg-red-200 border-2 border-red-800 mb-4 p-4">
            <div className="flex items-center mb-2">
              <IoWarningOutline className="text-red-800 mr-2 w-5 h-5" />
              <Typography
                variant="paragraph"
                className="text-red-800 uppercase font-bold"
              >
                Upload Dokumen Hasil Perbaikan
              </Typography>
            </div>
            <hr className="border-[1px] text-red-800 mb-2"></hr>
            <Typography
              variant="paragraph"
              color="black"
              className="font-semibold"
            >
              {Keterangan}
            </Typography>
          </Alert>
          <Typography
            variant="small"
            className="text-lg font-semibold mb-4 text-red-900"
          >
            {instructions}
          </Typography>
          {component}
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DialogPerbaikanDokumen;

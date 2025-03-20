"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";

const storage = getStorage(app);
const db = getFirestore(app);

const usePengirimanPengajuanKunjungan = () => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async ({
    Stasiun,
    File,
    Keterangan,
    TanggalKunjungan,
    JamKunjungan,
    NoSurat,
    TujuanBerkunjung,
    JumlahPengunjung,
    dataUser,
  }) => {
    setLoading(true);

    console.log("DATA MASUK:", {
      Stasiun,
      File,
      Keterangan,
      TanggalKunjungan,
      JamKunjungan,
      NoSurat,
      TujuanBerkunjung,
      JumlahPengunjung,
      dataUser,
    });

    const penggunaSaatIni = localStorage.getItem("ID");

    if (!penggunaSaatIni) {
      toast.error("Anda harus masuk untuk mengajukan.");
      setLoading(false);
      return false;
    }

    if (!Stasiun?.trim()) {
      toast.error("Field Stasiun kosong!");
      setLoading(false);
      return false;
    }

    if (!File) {
      toast.error("File belum diupload!");
      setLoading(false);
      return false;
    }

    if (!Keterangan?.trim()) {
      toast.error("Keterangan kosong!");
      setLoading(false);
      return false;
    }

    if (!TanggalKunjungan) {
      toast.error("Tanggal Kunjungan kosong!");
      setLoading(false);
      return false;
    }

    if (!JamKunjungan) {
      toast.error("Jam Kunjungan kosong!");
      setLoading(false);
      return false;
    }

    if (!NoSurat?.trim()) {
      toast.error("No Surat kosong!");
      setLoading(false);
      return false;
    }

    if (!TujuanBerkunjung?.trim()) {
      toast.error("Tujuan Berkunjung kosong!");
      setLoading(false);
      return false;
    }

    const jumlah = parseInt(JumlahPengunjung, 10);

    if (isNaN(jumlah) || jumlah < 1) {
      toast.error("Jumlah Pengunjung harus diisi minimal 1!");
      setLoading(false);
      return false;
    }

    try {
      toast.loading("Mengirim pengajuan...", { id: "kirimPengajuan" });

      // Daftar field yang tidak ingin disimpan
      const fieldsToExclude = [
        "alamatPerusahaan",
        "emailPerusahaan",
        "jenisKelamin",
        "kabupatenKotaPerusahaan",
        "namaLengkap",
        "namaPerusahaan",
        "nomorHP",
        "nomorHpPerusahaan",
        "nomorIdentitas",
        "npwpPerusahaan",
        "pekerjaan",
        "pendidikanTerakhir",
        "provinsiPerusahaan",
      ];

      const filteredDataUser = Object.keys(dataUser || {}).reduce(
        (acc, key) => {
          if (!fieldsToExclude.includes(key)) {
            acc[key] = dataUser[key];
          }
          return acc;
        },
        {}
      );

      const storageRef = ref(
        storage,
        `pengajuan_kunjungan/${Date.now()}_${File.name}`
      );

      await uploadBytes(storageRef, File);

      const fileURL = await getDownloadURL(storageRef);

      const dataToSave = {
        userId: penggunaSaatIni,
        Stasiun,
        Keterangan,
        TanggalKunjungan,
        JamKunjungan,
        NoSurat,
        TujuanBerkunjung,
        JumlahPengunjung: jumlah,
        dataUser: filteredDataUser,
        fileURL,
        timestamp: Timestamp.now(),
      };

      const pengajuanRef = collection(db, "pengajuan_kunjungan");
      await addDoc(pengajuanRef, dataToSave);

      toast.success("Pengajuan berhasil dikirim!", { id: "kirimPengajuan" });

      const res = await fetch("/api/postPengajuanKunjungan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (!res.ok) {
        throw new Error("Gagal mengirim email ke stasiun.");
      }

      toast.success("Email berhasil dikirim ke stasiun!");

      return true;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Terjadi kesalahan saat mengirim pengajuan.", {
        id: "kirimPengajuan",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleFormSubmit,
    loading,
  };
};

export default usePengirimanPengajuanKunjungan;

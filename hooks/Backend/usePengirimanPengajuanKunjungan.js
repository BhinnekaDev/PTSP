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
const database = getFirestore(app);

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
    Instansi,
    NamaInstansi,
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
      Instansi,
      NamaInstansi,
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

    if (isNaN(jumlah) || jumlah < 1 || jumlah > 50) {
      toast.error("Jumlah Pengunjung harus minimal 1 dan maksimal 50 orang!");
      setLoading(false);
      return false;
    }

    if (dataUser?.type === "perorangan") {
      if (Instansi === "Umum" && NamaInstansi?.trim() !== "") {
        toast.error(
          "Jika Instansi adalah Umum, Nama Instansi harus dikosongkan."
        );
        setLoading(false);
        return false;
      }

      if (Instansi !== "Umum" && !NamaInstansi?.trim()) {
        toast.error("Keterangan Instansi harus diisi.");
        setLoading(false);
        return false;
      }
    } else {
      Instansi = null;
      NamaInstansi = null;
    }

    try {
      toast.loading("Mengirim pengajuan...", { id: "kirimPengajuan" });

      // filter field
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

      const FileURL = await getDownloadURL(storageRef);

      const dataToSave = {
        userId: penggunaSaatIni,
        Stasiun: Stasiun.trim(),
        Keterangan: Keterangan?.trim() || null,
        TanggalKunjungan,
        JamKunjungan,
        NoSurat: NoSurat.trim(),
        TujuanBerkunjung: TujuanBerkunjung.trim(),
        JumlahPengunjung: jumlah,
        dataUser: filteredDataUser,
        FileURL,
        timestamp: Timestamp.now(),
        Instansi,
        NamaInstansi,
      };

      console.log("Data yang akan dikirim ke API:", dataToSave);

      const pengajuanRef = collection(database, "pengajuan_kunjungan");
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
      console.trace();
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

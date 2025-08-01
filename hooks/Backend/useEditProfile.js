import { useState, useEffect, useCallback } from "react";
import DOMPurify from "dompurify";
import { firestore } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const labelField = {
  Jenis_Kelamin: "Jenis Kelamin",
  Nama_Lengkap: "Nama Lengkap",
  No_Hp: "No HP",
  Pekerjaan: "Pekerjaan",
  Pendidikan_Terakhir: "Pendidikan Terakhir",
  Alamat_Perusahaan: "Alamat Perusahaan",
  Email_Perusahaan: "Email Perusahaan",
  Nama_Perusahaan: "Nama Perusahaan",
  Kabupaten_Kota_Perusahaan: "Kabupaten/Kota Perusahaan",
  NPWP_Perusahaan: "NPWP Perusahaan",
  No_Hp_Perusahaan: "No HP Perusahaan",
  Provinsi_Perusahaan: "Provinsi Perusahaan",
};

function useEditProfile(inisialisasiDataProfil = {}) {
  const [detailPengguna, setDetailPengguna] = useState(inisialisasiDataProfil);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDetailPengguna(inisialisasiDataProfil);
  }, [inisialisasiDataProfil]);

  const tanganiGantiPengguna = useCallback((e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setDetailPengguna((prevDetail) => ({
      ...prevDetail,
      [name]: sanitizedValue,
    }));
  }, []);

  const tanganiSimpan = useCallback(async () => {
    const penggunaId = localStorage.getItem("ID");

    if (!penggunaId) {
      toast.error("Gagal menyimpan data: ID pengguna tidak ditemukan.");
      return;
    }

    setLoading(true);

    const fieldsPerorangan = [
      "Jenis_Kelamin",
      "Nama_Lengkap",
      "No_Hp",
      "Pekerjaan",
      "Pendidikan_Terakhir",
    ];

    const fieldsPerusahaan = [
      "Alamat_Perusahaan",
      "Email_Perusahaan",
      "Jenis_Kelamin",
      "Nama_Perusahaan",
      "Kabupaten_Kota_Perusahaan",
      "NPWP_Perusahaan",
      "Nama_Lengkap",
      "No_Hp",
      "No_Hp_Perusahaan",
      "Pekerjaan",
      "Pendidikan_Terakhir",
      "Provinsi_Perusahaan",
    ];

    const requiredFields =
      detailPengguna.type === "perorangan"
        ? fieldsPerorangan
        : fieldsPerusahaan;

    // Cari field yang kosong
    const emptyFields = requiredFields.filter(
      (field) =>
        !detailPengguna[field] || detailPengguna[field].toString().trim() === ""
    );

    if (emptyFields.length > 0) {
      const readableFields = emptyFields
        .map((field) => labelField[field] || field)
        .join(", ");
      toast.error(`Harap isi field ${readableFields}`);
      setLoading(false);
      return;
    }

    const dataToSave = Object.fromEntries(
      Object.entries(detailPengguna).filter(([key]) =>
        requiredFields.includes(key)
      )
    );

    try {
      const docRef =
        detailPengguna.type === "perorangan"
          ? doc(firestore, "perorangan", penggunaId)
          : doc(firestore, "perusahaan", penggunaId);

      await updateDoc(docRef, dataToSave);
      toast.success("Data berhasil disimpan.");
      window.location.reload();
    } catch (error) {
      toast.error("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  }, [detailPengguna]);

  return {
    detailPengguna,
    setDetailPengguna,
    tanganiGantiPengguna,
    tanganiSimpan,
    loading,
  };
}

export default useEditProfile;

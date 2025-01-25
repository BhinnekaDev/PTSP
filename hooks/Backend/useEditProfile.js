import { useState, useEffect, useCallback } from "react";
import DOMPurify from "dompurify";
import { firestore } from "@/lib/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

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
      toast.error("Gagal menyimpan data.");
      return;
    }
    setLoading(true);
    const fieldsPerorangan = [
      "Jenis_Kelamin",
      "Nama_Lengkap",
      "No_Hp",
      "No_Identitas",
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
      "Nama_Perusahaan",
      "No_Hp",
      "No_Hp_Perusahaan",
      "No_Identitas",
      "Pekerjaan",
      "Pendidikan_Terakhir",
      "Provinsi_Perusahaan",
    ];

    const dataToSave = Object.fromEntries(
      Object.entries(detailPengguna).filter(([key]) =>
        detailPengguna.type === "perorangan"
          ? fieldsPerorangan.includes(key)
          : fieldsPerusahaan.includes(key)
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

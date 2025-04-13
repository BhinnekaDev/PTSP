import { useState } from "react";
import toast from "react-hot-toast";
import { firestore } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function usePengaduanSubmit() {
  const [loading, setLoading] = useState(false);

  const submitPengaduan = async ({ Nama, Email, Pengaduan }) => {
    if (!Pengaduan.trim()) {
      toast.error("Isi pengaduan wajib diisi!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(firestore, "pengaduan"), {
        Nama,
        Email,
        Pengaduan: Pengaduan,
        Tanggal_Pembuatan: serverTimestamp(),
      });
      toast.success("Pengaduan berhasil dikirim!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Gagal kirim pengaduan:", error);
      toast.error("Terjadi kesalahan saat mengirim pengaduan.");
    } finally {
      setLoading(false);
    }
  };

  return { submitPengaduan, loading };
}

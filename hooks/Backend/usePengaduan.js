import { useState } from "react";
import toast from "react-hot-toast";
import { firestore, storage } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function usePengaduanSubmit() {
  const [loading, setLoading] = useState(false);
  const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
  const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const penggunaSaatIni =
    typeof window !== "undefined" ? localStorage.getItem("ID") : null;

  const submitPengaduan = async ({ Nama, Email, Pengaduan, File }) => {
    if (!Pengaduan.trim()) {
      toast.error("Isi pengaduan wajib diisi!");
      return;
    }

    setLoading(true);
    let fileUrl = null;

    try {
      if (File) {
        const fileExtension = File.name.split(".").pop().toLowerCase();
        const fileMimeType = File.type;

        if (!allowedExtensions.includes(fileExtension)) {
          throw new Error("File harus berformat JPG, JPEG, PNG, atau PDF.");
        }

        if (!allowedMimeTypes.includes(fileMimeType)) {
          throw new Error("Tipe file tidak diizinkan.");
        }

        if (File.size > MAX_FILE_SIZE) {
          throw new Error("Ukuran file melebihi batas 2MB.");
        }

        const sanitizedFileName = File.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const ext = sanitizedFileName.split(".").pop()?.toLowerCase() || "file";
        const uniqueFileName = `${sanitizedFileName}_${Date.now()}.${ext}`;
        const storageRef = ref(
          storage,
          `Pengaduan/${penggunaSaatIni}/${uniqueFileName}`
        );

        await uploadBytes(storageRef, File);
        fileUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(firestore, "pengaduan"), {
        Nama,
        Email,
        Pengaduan,
        File_Pengaduan: fileUrl || null,
        Tanggal_Pembuatan: serverTimestamp(),
      });

      toast.success("Pengaduan berhasil dikirim!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Gagal kirim pengaduan:", error);
      toast.error(
        error.message || "Terjadi kesalahan saat mengirim pengaduan."
      );
    } finally {
      setLoading(false);
    }
  };

  return { submitPengaduan, loading };
}

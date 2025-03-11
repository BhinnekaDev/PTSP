import { useState } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { doc, updateDoc, getDoc, deleteField } from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import toast from "react-hot-toast";

const usePerbaikiDokumen = () => {
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const SUPPORTED_FORMATS = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ];

  const handlePerbaikiDokumen = async (ID_Ajukan, newFiles) => {
    setLoading(true);

    try {
      // Validasi semua file sebelum memulai proses
      const invalidFiles = newFiles.filter(
        (file) =>
          !SUPPORTED_FORMATS.includes(file.type) || file.size > MAX_FILE_SIZE
      );

      if (invalidFiles.length > 0) {
        toast.error(
          `Gagal memperbarui dokumen. Periksa format & ukuran file (${invalidFiles
            .map((file) => file.name)
            .join(", ")})`
        );
        setLoading(false);
        return;
      }

      // Jika semua file valid, lanjutkan proses
      const ajukanRef = doc(firestore, "ajukan", ID_Ajukan);
      const ajukanSnapshot = await getDoc(ajukanRef);

      if (!ajukanSnapshot.exists()) {
        throw new Error("Dokumen ajukan tidak ditemukan.");
      }

      const ajukanData = ajukanSnapshot.data();
      const storage = getStorage();

      // Hapus file lama jika ada
      if (ajukanData.File_Ajukan && Array.isArray(ajukanData.File_Ajukan)) {
        for (let url of ajukanData.File_Ajukan) {
          try {
            const fileRef = ref(storage, url);
            await deleteObject(fileRef);
          } catch (err) {
            console.warn("Gagal menghapus file lama:", err);
          }
        }
      }

      // Unggah file baru
      const newFileUrls = [];
      for (let file of newFiles) {
        const fileExtension = file.name.split(".").pop();
        const uniqueFileName = `${
          file.name.split(".")[0]
        }_${Date.now()}_${ID_Ajukan}.${fileExtension}`;
        const storageRef = ref(
          storage,
          `File_Ajukan/${ID_Ajukan}/${uniqueFileName}`
        );

        await uploadBytes(storageRef, file);
        const newFileUrl = await getDownloadURL(storageRef);
        newFileUrls.push(newFileUrl);
      }

      // Update Firestore
      await updateDoc(ajukanRef, {
        File_Ajukan: newFileUrls,
        Status_Ajuan: "Sedang Ditinjau",
        Tanggal_Pembuatan_Ajukan: new Date(),
        Keterangan: deleteField(),
      });

      toast.success(
        "Dokumen berhasil diperbarui dan sedang ditinjau oleh admin."
      );
      window.location.reload();
    } catch (error) {
      console.error("Gagal memperbarui dokumen:", error);
      toast.error("Terjadi kesalahan saat memperbarui dokumen.");
    } finally {
      setLoading(false);
    }
  };

  return { handlePerbaikiDokumen, loading };
};

export default usePerbaikiDokumen;

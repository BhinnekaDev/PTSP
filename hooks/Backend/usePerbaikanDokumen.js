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
      const ajukanRef = doc(firestore, "ajukan", ID_Ajukan);
      const ajukanSnapshot = await getDoc(ajukanRef);

      if (!ajukanSnapshot.exists()) {
        throw new Error("Dokumen ajukan tidak ditemukan.");
      }

      const ajukanData = ajukanSnapshot.data();
      const storage = getStorage();

      if (ajukanData.File_Ajukan && ajukanData.File_Ajukan.length > 0) {
        for (let url of ajukanData.File_Ajukan) {
          const fileRef = ref(storage, url);
          await deleteObject(fileRef);
        }
      }

      const newFileUrls = [];
      for (let file of newFiles) {
        if (!SUPPORTED_FORMATS.includes(file.type)) {
          throw new Error("Format file tidak didukung.");
        }

        if (file.size > MAX_FILE_SIZE) {
          throw new Error("Ukuran file melebihi batas 2MB.");
        }

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
      toast.error(error.message || "Gagal memperbarui dokumen.");
    } finally {
      setLoading(false);
    }
  };

  return { handlePerbaikiDokumen, loading };
};

export default usePerbaikiDokumen;

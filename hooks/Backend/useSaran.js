import { useState } from "react";
import { firestore, storage } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const useSaranSubmit = () => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (
    Nama,
    Email,
    Saran,
    File,
    penggunaSaatIni
  ) => {
    if (!Saran) {
      toast.error("Saran wajib diisi.");
      return;
    }

    setLoading(true);

    let fileUrls = [];
    if (File) {
      const fileExtension = File.name.split(".").pop().toLowerCase();
      const fileMimeType = File.type;

      if (!allowedExtensions.includes(fileExtension)) {
        setLoading(false);
        toast.error("File harus berformat JPG, JPEG, PNG, atau PDF.");
        return;
      }

      if (!allowedMimeTypes.includes(fileMimeType)) {
        setLoading(false);
        toast.error("Tipe file tidak diizinkan.");
        return;
      }

      if (File.size > MAX_FILE_SIZE) {
        setLoading(false);
        toast.error("Ukuran file melebihi batas 2MB.");
        return;
      }

      const sanitizedFileName = File.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const uniqueFileName = `${sanitizedFileName}_${Date.now()}.${File.name
        .split(".")
        .pop()}`;
      const storageRef = ref(
        storage,
        `Saran/${penggunaSaatIni}/${uniqueFileName}`
      );

      await uploadBytes(storageRef, File);
      const fileUrl = await getDownloadURL(storageRef);
      fileUrls.push(fileUrl);
    }

    try {
      const saranRef = collection(firestore, "saran");
      const saranData = {
        Nama: Nama,
        Email: Email,
        Saran: Saran,
        ...(fileUrls.length > 0 && { File_Attachment: fileUrls }),
        Tanggal_Pembuatan: serverTimestamp(),
      };

      await addDoc(saranRef, saranData);

      toast.success("Saran berhasil dikirim!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Gagal mengirim saran:", error);
      toast.error("Gagal mengirim saran.");
    } finally {
      setLoading(false);
    }
  };

  return { handleFormSubmit, loading };
};

export default useSaranSubmit;

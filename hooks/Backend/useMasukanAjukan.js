import { useState } from "react";
import { firestore, storage } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const useSaranSubmit = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (
    nama,
    email,
    saran,
    file,
    penggunaSaatIni,
    formName
  ) => {
    if (!saran) {
      toast.error("Saran wajib diisi.");
      return;
    }

    setLoading(true);
    let fileUrls = [];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const fileMimeType = file.type;

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

      if (file.size > MAX_FILE_SIZE) {
        setLoading(false);
        toast.error("Ukuran file melebihi batas 2MB.");
        return;
      }

      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const uniqueFileName = `${sanitizedFileName}_${Date.now()}.${file.name
        .split(".")
        .pop()}`;
      const storageRef = ref(
        storage,
        `Saran/${penggunaSaatIni}/${uniqueFileName}`
      );

      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);
      fileUrls.push(fileUrl);
    }

    try {
      // Simpan data saran ke Firestore
      const saranRef = collection(firestore, "saran");
      const saranData = {
        Nama: nama,
        Email: email,
        Saran: saran,
        File_Attachment: fileUrls.length ? fileUrls : undefined,
        Tanggal_Pembuatan: serverTimestamp(),
      };

      await addDoc(saranRef, saranData);

      toast.success("Saran berhasil dikirim!");
      window.location.reload();
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

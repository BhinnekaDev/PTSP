import { useState } from "react";
import { firestore, storage } from "@/lib/firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteField,
} from "firebase/firestore";
import { toast } from "react-hot-toast";

const useBuatTransaksi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const SUPPORTED_FORMATS = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ];

  const handlePengirimanBuktiTransfer = async (
    files,
    ID_Transaksi,
    ID_Pemesanan
  ) => {
    if (!files || files.length === 0) {
      toast.error("Tidak ada file yang dipilih.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ✅ 1. Cek validasi semua file sebelum upload
      const invalidFiles = files.filter(
        (file) =>
          !SUPPORTED_FORMATS.includes(file.type) || file.size > MAX_FILE_SIZE
      );

      if (invalidFiles.length > 0) {
        toast.error(
          `Gagal mengunggah bukti transfer. Periksa format & ukuran file (${invalidFiles
            .map((file) => file.name)
            .join(", ")})`
        );
        setLoading(false);
        return;
      }

      // ✅ 2. Ambil data transaksi di Firestore
      const transaksiRef = doc(firestore, "transaksi", ID_Transaksi);
      const transaksiDoc = await getDoc(transaksiRef);

      // Hapus file lama jika ada
      if (transaksiDoc.exists() && transaksiDoc.data().Bukti_Pembayaran) {
        const fileUrls = transaksiDoc.data().Bukti_Pembayaran;

        const deletePromises = fileUrls.map((url) => {
          const storagePath = url.split("/o/")[1]?.split("?")[0];
          const fileRef = ref(storage, decodeURIComponent(storagePath));
          return deleteObject(fileRef)
            .then(() => console.log(`File lama dihapus: ${url}`))
            .catch((err) =>
              console.error(`Gagal menghapus file lama: ${url}`, err)
            );
        });

        await Promise.all(deletePromises);
      }

      // ✅ 3. Upload file baru
      const uploadPromises = files.map((file) => {
        const fileRef = ref(storage, `bukti-transfer/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            async () => {
              const fileURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(fileURL);
            }
          );
        });
      });

      const fileUrls = await Promise.all(uploadPromises);
      const newTransaksiDoc = {
        Bukti_Pembayaran: fileUrls,
        Tanggal_Pengiriman_Bukti: new Date(),
      };
      await setDoc(transaksiRef, newTransaksiDoc, { merge: true });

      // ✅ 4. Update status di Firestore
      const pemesananRef = doc(firestore, "pemesanan", ID_Pemesanan);
      const pemesananDoc = await getDoc(pemesananRef);

      if (!pemesananDoc.exists()) {
        console.error("Dokumen pemesanan tidak ditemukan:", ID_Pemesanan);
        return;
      }

      await updateDoc(pemesananRef, {
        Status_Pembayaran: "Sedang Ditinjau",
      });

      if (pemesananDoc.data().Keterangan) {
        await updateDoc(pemesananRef, {
          Keterangan: deleteField(),
        });
        console.log("Field Keterangan pada pemesanan berhasil dihapus");
      }

      toast.success("Bukti Transaksi berhasil dikirim!");
      window.location.reload();
    } catch (err) {
      setError(err.message);
      toast.error("Gagal memperbarui transaksi.");
      console.error("Error creating transaksi: ", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handlePengirimanBuktiTransfer,
    loading,
    error,
  };
};

export default useBuatTransaksi;

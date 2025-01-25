import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { toast } from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Script from "next/script";

const useAmbilKeranjang = () => {
  const [keranjang, setKeranjang] = useState(null);
  const [memuat, setMemuat] = useState(false);
  const ambilKeranjang = async () => {
    setMemuat(true);
    try {
      const penggunaSaatIni = localStorage.getItem("ID");
      if (!penggunaSaatIni) {
        toast.error("Anda harus masuk untuk melihat keranjang.");
        setMemuat(false);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni);
      const keranjangSnap = await getDoc(keranjangRef);

      if (keranjangSnap.exists()) {
        setKeranjang(keranjangSnap.data());
      } else {
      }
    } catch (error) {
      console.error("Gagal mengambil keranjang:", error);
      toast.error("Gagal memuat keranjang.");
    } finally {
      setMemuat(false);
    }
  };

  const hapusItemKeranjang = async (index) => {
    try {
      const penggunaSaatIni = localStorage.getItem("ID");
      if (!penggunaSaatIni) {
        toast.error("Anda harus masuk untuk menghapus item.");
        return;
      }

      if (
        !keranjang ||
        (!Array.isArray(keranjang.Informasi) && !Array.isArray(keranjang.Jasa))
      ) {
        toast.error(
          "Keranjang tidak ditemukan atau data keranjang tidak valid."
        );
        return;
      }

      const totalItems =
        (Array.isArray(keranjang.Informasi) ? keranjang.Informasi.length : 0) +
        (Array.isArray(keranjang.Jasa) ? keranjang.Jasa.length : 0);

      if (index < 0 || index >= totalItems) {
        toast.error("Item tidak ditemukan di keranjang.");
        return;
      }

      const updatedInformasi = Array.isArray(keranjang.Informasi)
        ? [...keranjang.Informasi]
        : [];
      const updatedJasa = Array.isArray(keranjang.Jasa)
        ? [...keranjang.Jasa]
        : [];

      if (index < updatedInformasi.length) {
        updatedInformasi.splice(index, 1);
      } else {
        const jasaIndex = index - updatedInformasi.length;
        updatedJasa.splice(jasaIndex, 1);
      }

      const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni);
      await updateDoc(keranjangRef, {
        Informasi: updatedInformasi,
        Jasa: updatedJasa,
      });

      setKeranjang({
        Informasi: updatedInformasi,
        Jasa: updatedJasa,
      });

      toast.success("Item berhasil dihapus dari keranjang.");
    } catch (error) {
      console.error("Gagal menghapus item dari keranjang:", error);
      toast.error("Gagal menghapus item dari keranjang.");
    }
  };

  useEffect(() => {
    ambilKeranjang();
  }, []);

  return { keranjang, memuat, ambilKeranjang, hapusItemKeranjang };
};

export default useAmbilKeranjang;

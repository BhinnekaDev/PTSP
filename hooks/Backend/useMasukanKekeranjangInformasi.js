import { useState } from "react";
import { auth, firestore } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const useMasukanKeKeranjangInformasi = () => {
  const [memuatMasukKeKeranjang, setMemuatMasukKeKeranjang] = useState(false);

  const masukanKeKeranjang = async (idInformasi) => {
    setMemuatMasukKeKeranjang(true);
    try {
      const penggunaSaatIni = auth.currentUser;
      if (!penggunaSaatIni) {
        toast.error("Anda harus masuk untuk menambahkan ke keranjang.");
        setMemuatMasukKeKeranjang(false);
        return;
      }

      const informasiRef = doc(firestore, "informasi", idInformasi);
      const informasiSnap = await getDoc(informasiRef);

      if (!informasiSnap.exists()) {
        toast.error("Informasi tidak ditemukan.");
        setMemuatMasukKeKeranjang(false);
        return;
      }

      const dataInformasi = informasiSnap.data();
      const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni.uid);
      const keranjangSnap = await getDoc(keranjangRef);

      const produkYangAda = keranjangSnap.exists()
        ? keranjangSnap.data().Informasi || []
        : [];
      const indeksProduk = produkYangAda.findIndex(
        (item) => item.ID_Informasi === idInformasi
      );

      indeksProduk >= 0
        ? ((produkYangAda[indeksProduk].Kuantitas += 1),
          (produkYangAda[indeksProduk].Total_Harga =
            produkYangAda[indeksProduk].Harga *
            produkYangAda[indeksProduk].Kuantitas))
        : produkYangAda.push({
            ID_Informasi: idInformasi,
            Nama: dataInformasi.Nama,
            Harga: dataInformasi.Harga,
            Pemilik: dataInformasi.Pemilik,
            Kuantitas: 1,
            Total_Harga: dataInformasi.Harga,
          });

      keranjangSnap.exists()
        ? await updateDoc(keranjangRef, { Informasi: produkYangAda })
        : await setDoc(keranjangRef, {
            Informasi: [
              {
                ID_Informasi: idInformasi,
                Nama: dataInformasi.Nama,
                Harga: dataInformasi.Harga,
                Pemilik: dataInformasi.Pemilik,
                Kuantitas: 1,
                Total_Harga: dataInformasi.Harga,
              },
            ],
          });
      toast.success(
        keranjangSnap.exists()
          ? "Informasi berhasil diperbarui di keranjang!"
          : "Informasi berhasil ditambahkan ke keranjang baru!"
      );
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);
      toast.error("Gagal menambahkan ke keranjang.");
    } finally {
      setMemuatMasukKeKeranjang(false);
    }
  };

  return { memuatMasukKeKeranjang, masukanKeKeranjang };
};

export default useMasukanKeKeranjangInformasi;

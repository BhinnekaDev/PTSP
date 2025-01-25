import { useState } from "react";
import { auth, firestore } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const useMasukanKeKeranjangJasa = () => {
  const [memuatMasukKeKeranjang, setMemuatMasukKeKeranjang] = useState(false);

  const masukanKeKeranjang = async (idJasa) => {
    setMemuatMasukKeKeranjang(true);
    try {
      const penggunaSaatIni = auth.currentUser;
      if (!penggunaSaatIni) {
        toast.error("Anda harus masuk untuk menambahkan ke keranjang.");
        setMemuatMasukKeKeranjang(false);
        return;
      }

      const jasaRef = doc(firestore, "jasa", idJasa);
      const jasaSnap = await getDoc(jasaRef);

      if (!jasaSnap.exists()) {
        toast.error("Jasa tidak ditemukan.");
        setMemuatMasukKeKeranjang(false);
        return;
      }

      const dataJasa = jasaSnap.data();
      const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni.uid);
      const keranjangSnap = await getDoc(keranjangRef);

      const produkYangAda = keranjangSnap.exists()
        ? keranjangSnap.data().Jasa || []
        : [];
      const indeksProduk = produkYangAda.findIndex(
        (item) => item.ID_Jasa === idJasa
      );

      indeksProduk >= 0
        ? ((produkYangAda[indeksProduk].Kuantitas += 1),
          (produkYangAda[indeksProduk].Total_Harga =
            produkYangAda[indeksProduk].Harga *
            produkYangAda[indeksProduk].Kuantitas))
        : produkYangAda.push({
            ID_Jasa: idJasa,
            Nama: dataJasa.Nama,
            Harga: dataJasa.Harga,
            Pemilik: dataJasa.Pemilik,
            Kuantitas: 1,
            Total_Harga: dataJasa.Harga,
          });

      keranjangSnap.exists()
        ? await updateDoc(keranjangRef, { Jasa: produkYangAda })
        : await setDoc(keranjangRef, {
            Jasa: [
              {
                ID_Jasa: idJasa,
                Nama: dataJasa.Nama,
                Harga: dataJasa.Harga,
                Pemilik: dataJasa.Pemilik,
                Kuantitas: 1,
                Total_Harga: dataJasa.Harga,
              },
            ],
            ID_Pengguna: penggunaSaatIni.uid,
          });
      toast.success(
        keranjangSnap.exists()
          ? "Jasa berhasil diperbarui di keranjang!"
          : "Jasa berhasil ditambahkan ke keranjang baru!"
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

export default useMasukanKeKeranjangJasa;

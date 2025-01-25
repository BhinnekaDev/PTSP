import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useHitungKeranjangSesuaiID = () => {
  const [jumlahKeranjang, setJumlahKeranjang] = useState(0);
  const [memuatHitungKeranjangSesuaiID, setMemuatHitungKeranjangSesuaiID] =
    useState(false);

  const hitungKeranjang = async () => {
    setMemuatHitungKeranjangSesuaiID(true);
    try {
      const penggunaID = localStorage.getItem("ID");
      if (!penggunaID) {
        setJumlahKeranjang(0);
        return;
      }

      const keranjangRef = doc(firestore, "keranjang", penggunaID);
      const keranjangSnap = await getDoc(keranjangRef);

      if (keranjangSnap.exists()) {
        const keranjangData = keranjangSnap.data();
        const produkYangAda = [
          ...(keranjangData.Informasi || []),
          ...(keranjangData.Jasa || []),
        ];
        setJumlahKeranjang(produkYangAda.length);
      } else {
        setJumlahKeranjang(0);
      }
    } catch (error) {
      console.error("Gagal menghitung keranjang:", error);
      setJumlahKeranjang(0);
    } finally {
      setMemuatHitungKeranjangSesuaiID(false);
    }
  };

  useEffect(() => {
    hitungKeranjang();
  }, []);

  return { jumlahKeranjang, memuatHitungKeranjangSesuaiID };
};

export default useHitungKeranjangSesuaiID;

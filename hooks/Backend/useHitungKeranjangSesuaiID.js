import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const useHitungKeranjangSesuaiID = () => {
  const [jumlahKeranjang, setJumlahKeranjang] = useState(0);
  const [memuatHitungKeranjangSesuaiID, setMemuatHitungKeranjangSesuaiID] =
    useState(true);
  useEffect(() => {
    const penggunaID = localStorage.getItem("ID");
    if (!penggunaID) {
      setJumlahKeranjang(0);
      setMemuatHitungKeranjangSesuaiID(false);
      return;
    }

    const keranjangRef = doc(firestore, "keranjang", penggunaID);

    const unsubscribe = onSnapshot(
      keranjangRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const produkYangAda = [
            ...(data.Informasi || []),
            ...(data.Jasa || []),
          ];
          setJumlahKeranjang(produkYangAda.length);
        } else {
          setJumlahKeranjang(0);
        }
        setMemuatHitungKeranjangSesuaiID(false);
      },
      (error) => {
        console.error("Gagal mengambil data keranjang:", error);
        setJumlahKeranjang(0);
        setMemuatHitungKeranjangSesuaiID(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { jumlahKeranjang, memuatHitungKeranjangSesuaiID };
};

export default useHitungKeranjangSesuaiID;

import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const useFetchPemesanan = () => {
  const [pemesananData, setPemesananData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const penggunaSaatIni = localStorage.getItem("ID");
    if (!penggunaSaatIni) {
      setLoading(false);
      toast.error("Anda harus masuk untuk melihat pemesanan.");
      return;
    }

    const unsubscribe = (() => {
      try {
        const pemesananRef = collection(firestore, "pemesanan");
        const q = query(
          pemesananRef,
          where("ID_Pengguna", "==", penggunaSaatIni)
        );

        return onSnapshot(q, async (querySnapshot) => {
          const promises = querySnapshot.docs.map(async (docSnap) => {
            const pemesanan = { id: docSnap.id, ...docSnap.data() };

            if (pemesanan.ID_Ajukan) {
              try {
                const ajukanRef = doc(firestore, "ajukan", pemesanan.ID_Ajukan);
                const ajukanSnap = await getDoc(ajukanRef);
                pemesanan.ajukanDetail = ajukanSnap.exists()
                  ? { id: ajukanSnap.id, ...ajukanSnap.data() }
                  : null;
              } catch {
                pemesanan.ajukanDetail = null;
              }
            } else {
              pemesanan.ajukanDetail = null;
            }

            if (pemesanan.ID_Transaksi) {
              try {
                const transaksiRef = doc(
                  firestore,
                  "transaksi",
                  pemesanan.ID_Transaksi
                );
                const transaksiSnap = await getDoc(transaksiRef);
                pemesanan.transaksiDetail = transaksiSnap.exists()
                  ? { id: transaksiSnap.id, ...transaksiSnap.data() }
                  : null;
              } catch {
                pemesanan.transaksiDetail = null;
              }
            } else {
              pemesanan.transaksiDetail = null;
            }

            return pemesanan;
          });

          const pemesananList = await Promise.all(promises);
          setPemesananData(pemesananList);
          setLoading(false);
        });
      } catch (err) {
        console.error("Gagal mengambil data realtime pemesanan:", err);
        setError("Gagal mengambil data realtime pemesanan.");
        toast.error("Gagal mengambil data realtime pemesanan.");
        setLoading(false);
      }
    })();

    const fetchUserData = async () => {
      try {
        const userDocRefPerorangan = doc(
          firestore,
          "perorangan",
          penggunaSaatIni
        );
        const userSnapPerorangan = await getDoc(userDocRefPerorangan);
        if (userSnapPerorangan.exists()) {
          setUserData({
            id: userSnapPerorangan.id,
            ...userSnapPerorangan.data(),
          });
          return;
        }

        const userDocRefPerusahaan = doc(
          firestore,
          "perusahaan",
          penggunaSaatIni
        );
        const userSnapPerusahaan = await getDoc(userDocRefPerusahaan);
        if (userSnapPerusahaan.exists()) {
          setUserData({
            id: userSnapPerusahaan.id,
            ...userSnapPerusahaan.data(),
          });
        } else {
          console.warn(
            "User data tidak ditemukan di 'perorangan' maupun 'perusahaan'."
          );
        }
      } catch (err) {
        console.error("Gagal mengambil data pengguna:", err);
      }
    };

    fetchUserData();

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  return { pemesananData, userData, loading, error };
};

export default useFetchPemesanan;

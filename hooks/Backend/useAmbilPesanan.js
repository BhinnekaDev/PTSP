import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const useFetchPemesanan = () => {
  const [pemesananData, setPemesananData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPemesanan = async () => {
      setLoading(true);
      const penggunaSaatIni = localStorage.getItem("ID");
      if (!penggunaSaatIni) {
        setLoading(false);
        toast.error("Anda harus masuk untuk melihat pemesanan.");
        return;
      }

      try {
        const pemesananRef = collection(firestore, "pemesanan");
        const q = query(
          pemesananRef,
          where("ID_Pengguna", "==", penggunaSaatIni)
        );
        const querySnapshot = await getDocs(q);

        const pemesananList = [];
        for (const docSnap of querySnapshot.docs) {
          const pemesanan = { id: docSnap.id, ...docSnap.data() };
          if (pemesanan.ID_Ajukan) {
            const ajukanRef = doc(firestore, "ajukan", pemesanan.ID_Ajukan);
            const ajukanSnapshot = await getDoc(ajukanRef);

            if (ajukanSnapshot.exists()) {
              pemesanan.ajukanDetail = {
                id: ajukanSnapshot.id,
                ...ajukanSnapshot.data(),
              };
            } else {
              console.warn(
                "Data ajukan tidak ditemukan untuk ID:",
                pemesanan.ID_Ajukan
              );
              pemesanan.ajukanDetail = null;
            }
          } else {
            pemesanan.ajukanDetail = null;
          }

          if (pemesanan.ID_Transaksi) {
            const transaksiRef = doc(
              firestore,
              "transaksi",
              pemesanan.ID_Transaksi
            );
            const transaksiSnapshot = await getDoc(transaksiRef);
            if (transaksiSnapshot.exists()) {
              pemesanan.transaksiDetail = {
                id: transaksiSnapshot.id,
                ...transaksiSnapshot.data(),
              };
            } else {
              console.warn(
                "Data transaksi tidak ditemukan untuk ID:",
                pemesanan.ID_Transaksi
              );
              pemesanan.transaksiDetail = null;
            }
          } else {
            pemesanan.transaksiDetail = null;
          }

          pemesananList.push(pemesanan);
        }

        setPemesananData(pemesananList);
        const userDocRefPerorangan = doc(
          firestore,
          "perorangan",
          penggunaSaatIni
        );
        const userSnapshotPerorangan = await getDoc(userDocRefPerorangan);

        if (userSnapshotPerorangan.exists()) {
          setUserData({
            id: userSnapshotPerorangan.id,
            ...userSnapshotPerorangan.data(),
          });
        } else {
          const userDocRefPerusahaan = doc(
            firestore,
            "perusahaan",
            penggunaSaatIni
          );
          const userSnapshotPerusahaan = await getDoc(userDocRefPerusahaan);

          if (userSnapshotPerusahaan.exists()) {
            setUserData({
              id: userSnapshotPerusahaan.id,
              ...userSnapshotPerusahaan.data(),
            });
          } else {
            console.warn(
              "No user data found in either 'perorangan' or 'perusahaan' for ID:",
              penggunaSaatIni
            );
          }
        }
      } catch (err) {
        console.error("Gagal mengambil data pemesanan:", err);
        setError("Gagal mengambil data pemesanan.");
        toast.error("Gagal mengambil data pemesanan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPemesanan();
  }, []);

  return { pemesananData, userData, loading, error };
};

export default useFetchPemesanan;

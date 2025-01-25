import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";

const useTampilanInformasiMeteorologi = () => {
  const [produkInformasiMeteorologi, setProdukInformasiMeteorologi] = useState(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInformasiData = async () => {
      try {
        const informasiCollection = collection(firestore, "informasi");
        const informasiSnapshot = await getDocs(informasiCollection);
        const informasiList = informasiSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredInformasiList = informasiList.filter(
          (informasi) => informasi.Pemilik === "Meteorologi"
        );

        setProdukInformasiMeteorologi(filteredInformasiList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInformasiData();
  }, []);

  return { produkInformasiMeteorologi, loading, error };
};

export default useTampilanInformasiMeteorologi;

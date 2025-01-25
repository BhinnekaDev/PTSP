import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";

const useTampilanInformasiKlimatologi = () => {
  const [produkInformasiKlimatologi, setProdukInformasiKlimatologi] = useState(
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
          (informasi) => informasi.Pemilik === "Klimatologi"
        );

        setProdukInformasiKlimatologi(filteredInformasiList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInformasiData();
  }, []);

  return { produkInformasiKlimatologi, loading, error };
};

export default useTampilanInformasiKlimatologi;

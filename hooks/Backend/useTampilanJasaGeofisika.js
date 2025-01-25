import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";

const useTampilanJasaGeofisika = () => {
  const [produkJasaGeofisika, setProdukJasaGeofisika] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJasaData = async () => {
      try {
        const jasaCollection = collection(firestore, "jasa");
        const jasaSnapshot = await getDocs(jasaCollection);
        const jasaList = jasaSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredJasaList = jasaList.filter(
          (jasa) => jasa.Pemilik === "Geofisika"
        );

        setProdukJasaGeofisika(filteredJasaList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJasaData();
  }, []);

  return { produkJasaGeofisika, loading, error };
};

export default useTampilanJasaGeofisika;

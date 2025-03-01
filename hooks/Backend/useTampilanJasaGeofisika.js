import { useEffect, useState } from "react";

const useTampilanJasaGeofisika = () => {
  const [produkJasaGeofisika, setProdukJasaGeofisika] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJasaData = async () => {
      try {
        const response = await fetch("/api/getInformasiJasa");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari API");
        }

        const data = await response.json();
        const jasaList = data.jasa || [];

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

import { useEffect, useState } from "react";

const useTampilanInformasiGeofisika = () => {
  const [produkInformasiGeofisika, setProdukInformasiGeofisika] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInformasiData = async () => {
      try {
        const response = await fetch("/api/getInformasiJasa");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari API");
        }

        const data = await response.json();
        const informasiList = data.informasi || [];

        const filteredInformasiList = informasiList.filter(
          (informasi) => informasi.Pemilik === "Geofisika"
        );

        setProdukInformasiGeofisika(filteredInformasiList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInformasiData();
  }, []);

  return { produkInformasiGeofisika, loading, error };
};

export default useTampilanInformasiGeofisika;

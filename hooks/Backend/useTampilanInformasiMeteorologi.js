import { useEffect, useState } from "react";

const useTampilanInformasiMeteorologi = () => {
  const [produkInformasiMeteorologi, setProdukInformasiMeteorologi] = useState(
    []
  );
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
          (informasi) => informasi.Pemilik === "Meteorologi"
        );

        const sortedInformasiList = filteredInformasiList.sort((a, b) => {
          const isATop = a.Status === "Top" ? 1 : 0;
          const isBTop = b.Status === "Top" ? 1 : 0;
          return isBTop - isATop;
        });

        setProdukInformasiMeteorologi(sortedInformasiList);
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

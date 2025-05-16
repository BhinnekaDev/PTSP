import { useEffect, useState } from "react";

const useTampilanInformasiKlimatologi = () => {
  const [produkInformasiKlimatologi, setProdukInformasiKlimatologi] = useState(
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
          (informasi) => informasi.Pemilik === "Klimatologi"
        );

        const sortedInformasiList = filteredInformasiList.sort((a, b) => {
          const isATop = a.Status === "Top" ? 1 : 0;
          const isBTop = b.Status === "Top" ? 1 : 0;
          return isBTop - isATop;
        });

        setProdukInformasiKlimatologi(sortedInformasiList);
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

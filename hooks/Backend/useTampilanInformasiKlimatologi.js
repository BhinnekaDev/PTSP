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

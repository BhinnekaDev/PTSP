import { useEffect, useState } from "react";

const useTampilanJasaKlimatologi = () => {
  const [produkJasaKlimatologi, setProdukJasaKlimatologi] = useState([]);
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
          (jasa) => jasa.Pemilik === "Klimatologi"
        );
        const sortedJasaList = filteredJasaList.sort((a, b) => {
          const isATop = a.Status === "Top" ? 1 : 0;
          const isBTop = b.Status === "Top" ? 1 : 0;
          return isBTop - isATop;
        });

        setProdukJasaKlimatologi(sortedJasaList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJasaData();
  }, []);

  return { produkJasaKlimatologi, loading, error };
};

export default useTampilanJasaKlimatologi;

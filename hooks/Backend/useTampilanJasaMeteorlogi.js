import { useEffect, useState } from "react";

const useTampilanJasaMeteorlogi = () => {
  const [produkJasaMeteorologi, setProdukJasaMeteorologi] = useState([]);
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
          (jasa) => jasa.Pemilik === "Meteorologi"
        );
        const sortedJasaList = filteredJasaList.sort((a, b) => {
          const isATop = a.Status === "Top" ? 1 : 0;
          const isBTop = b.Status === "Top" ? 1 : 0;
          return isBTop - isATop;
        });
        setProdukJasaMeteorologi(sortedJasaList);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJasaData();
  }, []);

  return { produkJasaMeteorologi, loading, error };
};

export default useTampilanJasaMeteorlogi;

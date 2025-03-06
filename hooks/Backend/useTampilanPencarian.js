import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function useSearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const query = decodeURIComponent(searchParams.get("query") || "").trim();

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/getInformasiJasaPencarian?search=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data && Array.isArray(data.informasi) && Array.isArray(data.jasa)) {
          const informasiWithCategory = data.informasi.map((item) => ({
            ...item,
            Kategori: "Informasi",
          }));

          const jasaWithCategory = data.jasa.map((item) => ({
            ...item,
            Kategori: "Jasa",
          }));

          console.log("ℹ️ Informasi Data:", informasiWithCategory);
          console.log("🛠 Jasa Data:", jasaWithCategory);

          setResults([...informasiWithCategory, ...jasaWithCategory]);
        } else {
          setResults([]);
        }
      } catch (error) {
        setResults([]);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return { results, loading };
}

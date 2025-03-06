import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";

export default function useSearchInput() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Fungsi pencarian utama
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/Pencarian?query=${encodeURIComponent(trimmedQuery)}`);
  };

  // Fetch data untuk autocomplete (menggunakan debounce)
  const fetchSuggestions = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `/api/getInformasiJasaPencarian?search=${encodeURIComponent(
            searchTerm
          )}`
        );
        const data = await response.json();

        console.log("🔍 Data dari API:", data); // Debugging

        if (data && Array.isArray(data.informasi) && Array.isArray(data.jasa)) {
          const combinedResults = [...data.informasi, ...data.jasa].map(
            (item) => ({
              id: item.id,
              Nama: item.Nama || "Tanpa Nama",
            })
          );
          setSuggestions(combinedResults);
        } else {
          console.error("❌ Response API tidak sesuai:", data);
          setSuggestions([]);
        }
      } catch (error) {
        console.error("❌ Error fetching suggestions:", error);
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  return { query, setQuery, handleSearch, suggestions, setSuggestions };
}

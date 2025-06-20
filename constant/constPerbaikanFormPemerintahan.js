import React, { useState } from "react";
import "@/app/globals.css";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import usePerbaikiDokumen from "@/hooks/Backend/usePerbaikanDokumen";

const KegiatanPemerintahanForm = ({ onSubmit, ID_Ajukan }) => {
  const { handlePerbaikiDokumen, loading } = usePerbaikiDokumen();
  const [files, setFiles] = useState({});
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: Array.from(selectedFiles),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = {
      SuratKerjasama_Pemerintahan:
        "Surat Perjanjian Kerjasama dengan BMKG tentang Kebutuhan Informasi MKKuG",
      SuratPengantar_Pemerintahan: "Surat Pengantar",
    };

    for (const [name, label] of Object.entries(requiredFields)) {
      if (!files[name] || files[name].length === 0) {
        toast.error(`File ${label} wajib diunggah.`);
        return;
      }
    }
    const allFiles = Object.values(files).flat();

    if (allFiles.length === 0) {
      toast.error("Silakan pilih file untuk diunggah.");
      return;
    }

    try {
      await handlePerbaikiDokumen(ID_Ajukan, allFiles);
    } catch (error) {
      console.error("Gagal memperbarui dokumen:", error);
      toast.error(error.message || "Gagal memperbarui dokumen.");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="section-pemerintahan w-full max-w-7xl p-6 bg-gray-200 rounded-lg shadow-lg"
    >
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <p className="text-sm font-bold">
              Mempunyai Perjanjian Kerjasama dengan BMKG tentang Kebutuhan
              Informasi MKKuG
            </p>
            <input
              name="SuratKerjasama_Pemerintahan"
              type="file"
              onChange={handleFileChange}
              className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
              multiple
            />
          </div>
          <div>
            <p className="text-sm font-bold">Surat Pengantar</p>
            <input
              name="SuratPengantar_Pemerintahan"
              type="file"
              onChange={handleFileChange}
              className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
              multiple
            />
          </div>
        </div>
      </div>
      <div className="text-center">
        <Button
          color="blue"
          className="w-full"
          ripple="light"
          type="submit"
          disabled={loading}
        >
          {loading ? "Sedang Diproses..." : "Ajukan Sekarang"}
        </Button>
      </div>
    </form>
  );
};

export default KegiatanPemerintahanForm;

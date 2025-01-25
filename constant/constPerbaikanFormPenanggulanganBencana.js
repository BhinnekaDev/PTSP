import React, { useState } from "react";
import "@/app/globals.css";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import usePerbaikiDokumen from "@/hooks/Backend/usePerbaikanDokumen";

const PenanggulanganBencanaForm = ({ onSubmit, ID_Ajukan }) => {
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
      className="section-penanggulanganbencana w-full max-w-7xl p-6 bg-gray-200 rounded-lg shadow-lg"
    >
      <div className="mb-6">
        <div className="mb-4">
          <p className="text-sm font-bold">Surat Pengantar Permintaan Data</p>
          <input
            name="SuratPengantar_PenanggulanganBencana"
            onChange={handleFileChange}
            type="file"
            className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
          />
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
          {loading ? "Sedang Diproses..." : "Simpan Perbaikan"}
        </Button>
      </div>
    </form>
  );
};

export default PenanggulanganBencanaForm;

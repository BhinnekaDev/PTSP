import React, { useState } from "react";
import "@/app/globals.css";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

const KegiatanPertahananForm = ({ onSubmit }) => {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      await onSubmit(allFiles, "Kegiatan Pertahanan dan Keamanan");
    } catch (error) {
      toast.error("Terjadi kesalahan saat mengunggah file.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleFormSubmit}
      className="section-pertahanan w-full max-w-7xl p-6 bg-gray-200 rounded-lg shadow-lg"
    >
      <h2 className="text-lg lg:text-2xl font-semibold text-center mb-6">
        Form Kegiatan Pertahanan dan Keamanan
      </h2>
      <div className="mb-6">
        <h3 className="text-lg lg:text-xl font-semibold mb-4">
          Data Keperluan
        </h3>
        <div className="mb-4">
          <p className="text-sm font-bold">
            Surat Permintaan Ditandatangani Camat atau Pejabat Setingkat
          </p>
          <input
            name="SuratPermintaan_PertahananKeamanan"
            className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
            type="file"
            onChange={handleFileChange}
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
          {loading ? "Sedang Diproses..." : "Ajukan Sekarang"}
        </Button>
      </div>
    </form>
  );
};

export default KegiatanPertahananForm;

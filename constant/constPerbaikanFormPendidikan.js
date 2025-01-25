import React, { useState } from "react";
import "@/app/globals.css";
import { Button } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
import usePerbaikiDokumen from "@/hooks/Backend/usePerbaikanDokumen";

const KegiatanPendidikanPenelitianForm = ({ onSubmit, ID_Ajukan }) => {
  const { handlePerbaikiDokumen, loading } = usePerbaikiDokumen();
  const [files, setFiles] = useState([]);

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
      className="section-pendidikan w-full max-w-7xl p-6 bg-gray-200 rounded-lg shadow-lg"
    >
      <div className="mb-6">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <p className="text-sm font-bold">
              Identitas Diri KTP / KTM / SIM / Paspor
            </p>
            <input
              name="IdentitasDiri_Pendidikan"
              className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <p className="text-sm font-bold">
              Surat Pengantar dari Kepala Sekolah / Rektor / Dekan
            </p>
            <input
              name="SuratPengantar_Pendidikan"
              className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <p className="text-sm font-bold">
              Surat Pernyataan Tidak Digunakan Untuk Kepentingan Lain
            </p>
            <input
              name="SuratPernyataan_Pendidikan"
              className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <p className="text-sm font-bold">
              Proposal Penelitian Berisi Maksud dan Tujuan Penelitian yang Telah
              Disetujui
            </p>
            <input
              name="Proposal_Pendidikan"
              className="file:appearance-none file:bg-green-500 file:text-white file:px-4 file:py-2 file:border-none file:rounded file:cursor-pointer file:hover:bg-green-600"
              type="file"
              onChange={handleFileChange}
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

export default KegiatanPendidikanPenelitianForm;

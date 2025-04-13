"use client";
import { useState, useEffect } from "react";
import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useSaranSubmit from "@/hooks/Backend/useSaran";

export default function Saran() {
  const { apakahSudahLogin, detailPengguna } = useVerifikasiLogin();
  const { handleFormSubmit, loading } = useSaranSubmit();

  const [Nama, setNama] = useState("");
  const [Email, setEmail] = useState("");
  const [Saran, setSaran] = useState("");
  const [File, setFile] = useState(null);

  useEffect(() => {
    if (detailPengguna) {
      setNama(detailPengguna?.Nama_Lengkap || "");
      setEmail(detailPengguna?.Email || "");
    }
  }, [detailPengguna]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(
      Nama,
      Email,
      Saran,
      File,
      localStorage.getItem("ID"),
      "Saran"
    );
  };

  return (
    <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
      <Typography
        variant="h1"
        className="text-2xl font-semibold text-primary mb-2"
      >
        Saran
      </Typography>
      <div className="w-32 h-1 bg-secondary mb-6 rounded-md"></div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">Nama</label>
          <Input
            type="text"
            className="w-full input-custom"
            value={Nama}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">Email</label>
          <Input
            type="email"
            className="w-full input-custom"
            value={Email}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">Saran</label>
          <Textarea
            rows={4}
            className="w-full input-custom"
            value={Saran}
            onChange={(e) => setSaran(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-semibold mb-1">
            Upload Lampiran (Jika ada)
          </label>
          <input type="file" className="w-full" onChange={handleFileChange} />
        </div>
        <Button
          type="submit"
          color="green"
          disabled={!apakahSudahLogin || loading}
        >
          {loading ? "Mengirim..." : "KIRIM"}
        </Button>
      </form>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { Typography, Input, Textarea, Button } from "@material-tailwind/react";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import usePengaduanSubmit from "@/hooks/Backend/usePengaduan";

export default function Saran() {
  const { apakahSudahLogin, detailPengguna } = useVerifikasiLogin();
  const { submitPengaduan, loading } = usePengaduanSubmit();
  const [Nama, setNama] = useState("");
  const [Email, setEmail] = useState("");
  const [Pengaduan, setPengaduan] = useState("");
  const [File, setFile] = useState(null);

  useEffect(() => {
    if (detailPengguna) {
      setNama(detailPengguna?.Nama_Lengkap || "");
      setEmail(detailPengguna?.Email || "");
    }
  }, [detailPengguna]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitPengaduan({
      Nama: Nama,
      Email: Email,
      Pengaduan: Pengaduan,
      File: File,
    });
    setPengaduan("");
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  return (
    <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
      <form className="pengaduan-section" onSubmit={handleSubmit}>
        <Typography
          variant="h1"
          className="text-2xl font-semibold text-primary mb-2"
        >
          Pengaduan
        </Typography>
        <div className="w-32 h-1 bg-secondary mb-6 rounded-md"></div>
        <div className="mb-4">
          <label className="block text-base lg:text-lg font-semibold mb-1">
            Nama
          </label>
          <Input
            type="text"
            className="w-full input-custom"
            labelProps={{ className: "hidden" }}
            value={Nama}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-base lg:text-lg font-semibold mb-1">
            Email
          </label>
          <Input
            type="email"
            className="w-full input-custom"
            labelProps={{ className: "hidden" }}
            value={Email}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-base lg:text-lg font-semibold mb-1">
            Pengaduan
          </label>
          <Textarea
            rows={4}
            className="w-full input-custom"
            labelProps={{ className: "hidden" }}
            value={Pengaduan}
            maxLength={1000}
            onChange={(e) => setPengaduan(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-base lg:text-lg font-semibold mb-1">
            Upload Lampiran (Jika ada)
          </label>
          <input type="file" className="w-full" onChange={handleFileChange} />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!apakahSudahLogin || loading}
            className="text-white bg-secondary lg:w-1/12 w-full text-base font-semibold py-2 px-4 rounded-md"
          >
            {loading ? "MENGIRIM..." : "KIRIM"}
          </Button>
        </div>
      </form>
    </div>
  );
}

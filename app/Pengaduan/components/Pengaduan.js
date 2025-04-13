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
    });
    setPengaduan("");
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
          <label className="block text-lg font-semibold mb-1">Nama</label>
          <Input
            type="text"
            className="w-full input-custom"
            labelProps={{ className: "hidden" }}
            value={Nama}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">Email</label>
          <Input
            type="email"
            className="w-full input-custom"
            labelProps={{ className: "hidden" }}
            value={Email}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-1">Pengaduan</label>
          <Textarea
            rows={4}
            className="w-full input-custom"
            labelProps={{ className: "hidden" }}
            value={Pengaduan}
            onChange={(e) => setPengaduan(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            color="green"
            disabled={!apakahSudahLogin || loading}
          >
            {loading ? "MENGIRIM..." : "KIRIM"}
          </Button>
        </div>
      </form>
    </div>
  );
}

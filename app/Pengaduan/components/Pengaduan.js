"use client";
import { useState } from "react";
import {
  Typography,
  Input,
  Textarea,
  Card,
  Button,
} from "@material-tailwind/react";
import { MdEditDocument } from "react-icons/md";

export default function Saran() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
      {!isSubmitted ? (
        // Pengaduan Section
        <section className="pengaduan-section">
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
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">Email</label>
            <Input
              type="email"
              className="w-full input-custom"
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-1">
              Pengaduan
            </label>
            <Textarea
              rows={4}
              className="w-full input-custom"
              labelProps={{ className: "hidden" }}
            />
          </div>
          <div className="flex justify-end">
            <Button color="green" onClick={handleSubmit}>
              KIRIM
            </Button>
          </div>
        </section>
      ) : (
        // Reply Section
        <section className="reply-section">
          <div className="flex w-full gap-8">
            <div className="w-1/4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 ">
                  <MdEditDocument className="w-8 h-8 text-blue-500" />
                  <span className="text-blue-500 font-semibold">
                    Isi Formulir
                  </span>
                </div>
                <div className="h-12 w-1 bg-green-500 ml-4"></div>
                <div className="flex items-center gap-3">
                  <MdEditDocument className="w-8 h-8 text-green-500" />
                  <span className="text-green-500 font-semibold">
                    Menunggu Konfirmasi
                  </span>
                </div>
                <div className="h-12 w-1 bg-green-500 ml-4"></div>
                <div className="flex items-center gap-3">
                  <MdEditDocument className="w-8 h-8 text-gray-400" />
                  <span className="text-gray-400 font-semibold">Selesai</span>
                </div>
              </div>
            </div>
            <Card className="w-3/4 p-6 shadow-md rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Pengaduan</h2>
              <div className="bg-blue-500 p-6 rounded-lg text-white mb-6">
                <p className="font-bold">Hengki</p>
                <p className="text-sm">Tanggal: 2025-02-27 15:15:35</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="mt-4 font-bold">Tanggapan:</p>
              </div>
              <div className="flex justify-end gap-4">
                <Button className="text-white bg-[#8a8a8a]">
                  Balas Tanggapan
                </Button>
                <Button color="green">Selesai</Button>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

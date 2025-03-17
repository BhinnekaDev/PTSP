"use client";
import { useState } from "react";
import { Typography, Input, Textarea, Button } from "@material-tailwind/react";

export default function Saran() {
  return (
    <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
      <Typography
        variant="h1"
        className="text-2xl font-semibold text-primary mb-2"
      >
        Saran
      </Typography>
      <div className="w-32 h-1 bg-secondary mb-6 rounded-md"></div>
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-1">Nama</label>
        <Input
          type="text"
          className="w-full input-custom"
          labelProps={{
            className: "hidden",
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-1">Email</label>
        <Input
          type="email"
          className="w-full input-custom"
          labelProps={{
            className: "hidden",
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-1">Saran</label>
        <Textarea
          rows={4}
          className="w-full input-custom"
          labelProps={{
            className: "hidden",
          }}
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-1">
          Upload Lampiran (Jika ada)
        </label>
        <input type="file" className="w-full" />
      </div>
      <div className="flex justify-end">
        <Button color="green">KIRIM</Button>
      </div>
    </div>
  );
}

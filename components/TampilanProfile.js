import React from "react";
import { Typography } from "@/app/MTailwind";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function TampilanProfile() {
  const { detailPengguna, loading } = useVerifikasiLogin();

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-2 text-center gap-y-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="m-0">
              <Skeleton height={20} className="mb-2" />
              <Skeleton height={30} />
            </div>
          ))}
        </div>
      ) : detailPengguna?.type === "perusahaan" ? (
        <>
          {/* Foto Profile Perusahaan */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg bg-gray-100">
                {detailPengguna?.Foto_URL ? (
                  <img
                    src={detailPengguna.Foto_URL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                    {detailPengguna?.Nama_Perusahaan?.charAt(0) ||
                      detailPengguna?.Nama_Lengkap?.charAt(0) ||
                      "?"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-x-hidden text-center">
            <Typography variant="h4">Tampilan Profile Perusahaan</Typography>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 text-center gap-y-3 mb-10">
            <div>
              <Typography variant="h6" className="mb-2">
                Nama Lengkap
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Nama_Lengkap}
              </Typography>
            </div>
            <div className="mt-0">
              <Typography variant="h6" className="mb-2">
                Pekerjaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Pekerjaan}
              </Typography>
            </div>
            <div className="grid grid-cols-1">
              <div>
                <Typography variant="h6" className="mb-2">
                  Jenis Kelamin
                </Typography>
                <Typography className="mb-2">
                  {detailPengguna?.Jenis_Kelamin}
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                No HP / Telepon
              </Typography>
              <Typography className="mb-2">{detailPengguna?.No_Hp}</Typography>
            </div>
            <div className="grid grid-cols-1">
              <div>
                <Typography variant="h6" className="mb-2">
                  Email
                </Typography>
                <Typography className="mb-2">
                  {detailPengguna?.Email}
                </Typography>
              </div>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Pendidikan Terakhir
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Pendidikan_Terakhir}
              </Typography>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 text-center gap-y-3">
            <div>
              <Typography variant="h6" className="mb-2">
                NPWP Perusahaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.NPWP_Perusahaan}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Nama Perusahaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Nama_Perusahaan}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Alamat Perusahaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Alamat_Perusahaan}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Kabupaten / Kota Perusahaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Kabupaten_Kota_Perusahaan}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Provinsi Perusahaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Provinsi_Perusahaan}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Nomor HP / No Telepon Perusahaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.No_Hp_Perusahaan}
              </Typography>
            </div>
            <div className="grid grid-cols-1">
              <div>
                <Typography variant="h6" className="mb-2">
                  Email Perusahaan
                </Typography>
                <Typography className="mb-2">
                  {detailPengguna?.Email_Perusahaan}
                </Typography>
              </div>
            </div>
          </div>
        </>
      ) : detailPengguna?.type === "perorangan" ? (
        <>
          {/* Foto Profile Perorangan */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary shadow-lg bg-gray-100">
                {detailPengguna?.Foto_URL ? (
                  <img
                    src={detailPengguna.Foto_URL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                    {detailPengguna?.Nama_Lengkap?.charAt(0) || "?"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 overflow-x-hidden text-center">
            <Typography variant="h4">Tampilan Profile Perorangan</Typography>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 text-center gap-y-6">
            <div>
              <Typography variant="h6" className="mb-2">
                Nama Lengkap
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Nama_Lengkap}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Pekerjaan
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Pekerjaan}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Email
              </Typography>
              <Typography className="mb-2">{detailPengguna?.Email}</Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Jenis Kelamin
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Jenis_Kelamin}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Nomor Handphone
              </Typography>
              <Typography className="mb-2">{detailPengguna?.No_Hp}</Typography>
            </div>
            <div>
              <Typography variant="h6" className="mb-2">
                Pendidikan Terakhir
              </Typography>
              <Typography className="mb-2">
                {detailPengguna?.Pendidikan_Terakhir}
              </Typography>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default TampilanProfile;

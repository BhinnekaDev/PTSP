"use client";
import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
  Select,
  Option,
} from "@/app/MTailwind";
import toast from "react-hot-toast";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useStepperForm from "@/hooks/Frontend/useStepperForm";
import usePengirimanPengajuanKunjungan from "@/hooks/Backend/usePengirimanPengajuanKunjungan";

function PengajuanKunjungan() {
  const { stepAktif, handleSelanjutnya, handleSebelumnya } = useStepperForm();
  const { apakahSudahLogin, detailPengguna } = useVerifikasiLogin();
  const {
    handleFormPengajuan,
    loading,
    tipePengguna,
    fields,
    formState: {
      Stasiun,
      TanggalKunjungan,
      JamKunjungan,
      JumlahPengunjung,
      TujuanBerkunjung,
      NoSurat,
      Keterangan,
      File,
      Instansi,
      NamaInstansi,
    },
    setFormState: {
      setStasiun,
      setTanggalKunjungan,
      setJamKunjungan,
      setJumlahPengunjung,
      setTujuanBerkunjung,
      setNoSurat,
      setKeterangan,
      setFile,
      setInstansi,
      setNamaInstansi,
    },
  } = usePengirimanPengajuanKunjungan();

  const handleConfirmSubmit = async () => {
    const success = await handleFormPengajuan({
      Stasiun,
      TanggalKunjungan,
      JamKunjungan,
      JumlahPengunjung,
      TujuanBerkunjung,
      NoSurat,
      Keterangan,
      File,
      dataUser: detailPengguna,
      Instansi,
      NamaInstansi,
    });

    if (success) {
      toast.success("Pengajuan berhasil dikirim!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardBody>
          <Typography variant="h4" color="blue" className="text-center mb-6">
            Form Pengajuan Kunjungan
          </Typography>

          <div className="flex flex-col md:flex-row justify-center items-start md:items-center mb-8 gap-6">
            {["Data Pemohon", "Data Tujuan"].map((label, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                    stepAktif === index
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm md:text-base font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
          {stepAktif === 0 && (
            <>
              <Typography variant="h5" className="mb-4">
                Data Pemohon
              </Typography>

              {apakahSudahLogin ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fields.map((field, idx) => (
                    <div key={idx} className="flex flex-col">
                      <label className="mb-1 text-sm font-medium text-gray-700">
                        {field.replace(/_/g, " ")}
                      </label>
                      <Input
                        label=""
                        value={detailPengguna?.[field] || ""}
                        disabled
                      />
                    </div>
                  ))}
                  {tipePengguna === "perorangan" && (
                    <>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm font-medium text-gray-700">
                          Pilih Instansi <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={Instansi}
                          onChange={(val) => {
                            setInstansi(val);
                            setNamaInstansi("");
                          }}
                        >
                          <Option value="">-- Pilih Kategori --</Option>
                          <Option value="Lembaga Penelitian">
                            Lembaga Penelitian
                          </Option>
                          <Option value="Komunitas">Komunitas</Option>
                          <Option value="Sekolah/Perguruan Tinggi">
                            Sekolah/Perguruan Tinggi
                          </Option>
                          <Option value="Media Massa">Media Massa</Option>
                          <Option value="Pekerja Independen/Freelancer">
                            Pekerja Independen/Freelancer
                          </Option>
                          <Option value="Pemerhati Lingkungan">
                            Pemerhati Lingkungan
                          </Option>
                          <Option value="Umum">Umum</Option>
                        </Select>
                      </div>
                      {Instansi === "Lembaga Penelitian" && (
                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium text-gray-700">
                            Nama Lembaga Penelitian{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={NamaInstansi}
                            onChange={(e) => setNamaInstansi(e.target.value)}
                          />
                        </div>
                      )}
                      {Instansi === "Komunitas" && (
                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium text-gray-700">
                            Nama Komunitas{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={NamaInstansi}
                            onChange={(e) => setNamaInstansi(e.target.value)}
                          />
                        </div>
                      )}
                      {Instansi === "Sekolah/Perguruan Tinggi" && (
                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium text-gray-700">
                            Nama Sekolah/Perguruan Tinggi{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={NamaInstansi}
                            onChange={(e) => setNamaInstansi(e.target.value)}
                          />
                        </div>
                      )}
                      {Instansi === "Media Massa" && (
                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium text-gray-700">
                            Nama Media Massa{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={NamaInstansi}
                            onChange={(e) => setNamaInstansi(e.target.value)}
                          />
                        </div>
                      )}
                      {Instansi === "Pekerja Independen/Freelancer" && (
                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium text-gray-700">
                            Jenis Pekerjaan / Proyek{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={NamaInstansi}
                            onChange={(e) => setNamaInstansi(e.target.value)}
                          />
                        </div>
                      )}

                      {Instansi === "Pemerhati Lingkungan" && (
                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium text-gray-700">
                            Nama Organisasi / Kegiatan{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={NamaInstansi}
                            onChange={(e) => setNamaInstansi(e.target.value)}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <Typography color="red" className="text-sm">
                  Silakan login terlebih dahulu.
                </Typography>
              )}

              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleSelanjutnya}
                  disabled={!apakahSudahLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
                >
                  Lanjutkan
                </Button>
              </div>
            </>
          )}

          {stepAktif === 1 && (
            <>
              <Typography variant="h5" className="mb-4">
                Data Tujuan Reservasi
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pilih Stasiun */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Pilih Stasiun <span className="text-red-500">*</span>
                  </label>
                  <Select value={Stasiun} onChange={(val) => setStasiun(val)}>
                    <Option value="">-- Pilih Stasiun --</Option>
                    <Option value="Meteorologi">Meteorologi</Option>
                    <Option value="Klimatologi">Klimatologi</Option>
                    <Option value="Geofisika">Geofisika</Option>
                  </Select>
                </div>

                {/* Tanggal Kunjungan */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Tanggal Kunjungan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={TanggalKunjungan}
                    onChange={(e) => setTanggalKunjungan(e.target.value)}
                  />
                </div>

                {/* Jam Kunjungan */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Jam Kunjungan <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={JamKunjungan}
                    onChange={(val) => setJamKunjungan(val)}
                  >
                    <Option value="">-- Pilih Jam --</Option>
                    <Option value="09:00 - 10:00 WIB">09:00 - 10:00 WIB</Option>
                    <Option value="10:00 - 11:00 WIB">10:00 - 11:00 WIB</Option>
                    <Option value="11:00 - 12:00 WIB">11:00 - 12:00 WIB</Option>
                    <Option value="13:00 - 14:00 WIB">13:00 - 14:00 WIB</Option>
                    <Option value="14:00 - 15:00 WIB">14:00 - 15:00 WIB</Option>
                  </Select>
                </div>

                {/* Jumlah Pengunjung */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Jumlah Pengunjung (Max 50){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={JumlahPengunjung}
                    onChange={(e) => setJumlahPengunjung(e.target.value)}
                  />
                </div>

                {/* Tujuan Berkunjung */}
                <div className="flex flex-col md:col-span-2">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Tujuan Berkunjung <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    rows={4}
                    value={TujuanBerkunjung}
                    onChange={(e) => setTujuanBerkunjung(e.target.value)}
                  />
                </div>

                {/* No Surat Permohonan */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    No Surat Permohonan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={NoSurat}
                    onChange={(e) => setNoSurat(e.target.value)}
                  />
                </div>

                {/* Upload File Surat */}
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Upload File Surat <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                      className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              cursor-pointer"
                    />
                  </div>
                </div>

                {/* Keterangan Tambahan */}
                <div className="flex flex-col md:col-span-2">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Keterangan Tambahan
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Tulis keterangan tambahan jika ada..."
                    value={Keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  onClick={handleSebelumnya}
                  className="bg-gray-500 hover:bg-gray-600 text-black font-semibold px-6 py-2 rounded-md"
                >
                  Kembali
                </Button>
                <Button
                  onClick={handleConfirmSubmit}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md flex items-center justify-center"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Kirim Pengajuan"
                  )}
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default PengajuanKunjungan;

"use client";

import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import usePengirimanPengajuanKunjungan from "@/hooks/Backend/usePengirimanPengajuanKunjungan";

const fieldsPerorangan = ["Nama_Lengkap", "No_Hp", "Email"];
const fieldsPerusahaan = [
  "Alamat_Perusahaan",
  "Email_Perusahaan",
  "Nama_Perusahaan",
  "Kabupaten_Kota_Perusahaan",
  "Nama_Lengkap",
  "Email",
  "No_Hp",
  "No_Hp_Perusahaan",
  "Provinsi_Perusahaan",
];

const PengajuanKunjungan = () => {
  const {
    apakahSudahLogin,
    detailPengguna,
    loading: loadingUser,
  } = useVerifikasiLogin();
  const { handleFormSubmit, loading } = usePengirimanPengajuanKunjungan();

  const [step, setStep] = useState(1);

  const [Stasiun, setStasiun] = useState("");
  const [TanggalKunjungan, setTanggalKunjungan] = useState("");
  const [JamKunjungan, setJamKunjungan] = useState("");
  const [JumlahPengunjung, setJumlahPengunjung] = useState("");
  const [TujuanBerkunjung, setTujuanBerkunjung] = useState("");
  const [NoSurat, setNoSurat] = useState("");
  const [Keterangan, setKeterangan] = useState("");
  const [File, setFile] = useState(null);

  const isLoggedIn = Boolean(apakahSudahLogin);

  useEffect(() => {
    if (!loadingUser && !isLoggedIn) {
      toast.error("Silakan login terlebih dahulu.");
    }
  }, [isLoggedIn, loadingUser]);

  const userType = detailPengguna?.type;
  const fields =
    userType === "perorangan" ? fieldsPerorangan : fieldsPerusahaan;

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Silakan login terlebih dahulu.");
      return;
    }

    if (!detailPengguna) {
      toast.error("Data pengguna belum tersedia, mohon tunggu...");
      return;
    }

    const success = await handleFormSubmit({
      Stasiun,
      TanggalKunjungan,
      JamKunjungan,
      JumlahPengunjung,
      TujuanBerkunjung,
      NoSurat,
      Keterangan,
      File,
      dataUser: detailPengguna,
    });

    if (success) {
      toast.success("Pengajuan berhasil dikirim!");
      setStasiun("");
      setTanggalKunjungan("");
      setJamKunjungan("");
      setJumlahPengunjung("");
      setTujuanBerkunjung("");
      setNoSurat("");
      setKeterangan("");
      setFile(null);
      setStep(1);
    } else {
      toast.error("Gagal mengirim pengajuan.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardBody>
          <Typography variant="h4" color="blue" className="text-center mb-6">
            Form Pengajuan Kunjungan
          </Typography>

          {/* STEP INDICATOR */}
          <div className="flex flex-col md:flex-row justify-center items-start md:items-center mb-8 gap-6">
            {["Data Pemohon", "Data Tujuan", "Review & Submit"].map(
              (label, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                      step === index + 1
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
              )
            )}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Typography variant="h5" className="mb-4">
                Data Pemohon
              </Typography>

              {isLoggedIn ? (
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
                        crossOrigin={undefined}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Typography color="red" className="text-sm">
                  Silakan login terlebih dahulu.
                </Typography>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  onClick={() => window.history.back()}
                  className="bg-gray-500 hover:bg-gray-600 text-black font-semibold px-6 py-2 rounded-md"
                >
                  Kembali
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={!isLoggedIn}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
                >
                  Lanjutkan
                </Button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Typography variant="h5" className="mb-4">
                Data Tujuan Reservasi
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pilih Stasiun */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Pilih Stasiun
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
                    Tanggal Kunjungan
                  </label>
                  <Input
                    type="date"
                    value={TanggalKunjungan}
                    onChange={(e) => setTanggalKunjungan(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>

                {/* Jam Kunjungan */}
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Jam Kunjungan
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
                    Jumlah Pengunjung (Max 50)
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={JumlahPengunjung}
                    onChange={(e) => setJumlahPengunjung(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>

                {/* Tujuan Berkunjung */}
                <div className="flex flex-col md:col-span-2">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Tujuan Berkunjung
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
                    No Surat Permohonan
                  </label>
                  <Input
                    value={NoSurat}
                    onChange={(e) => setNoSurat(e.target.value)}
                    crossOrigin={undefined}
                  />
                </div>

                {/* Upload File Surat */}
                <div className="flex flex-col w-full">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    Upload File Surat
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                cursor-pointer"
                      crossOrigin={undefined}
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
                  onClick={prevStep}
                  className="bg-gray-500 hover:bg-gray-600 text-black font-semibold px-6 py-2 rounded-md"
                >
                  Kembali
                </Button>

                <Button
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md"
                >
                  Lanjutkan
                </Button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Typography variant="h5" className="mb-4">
                Review & Submit
              </Typography>

              <div className="space-y-4 text-sm">
                <p>
                  <strong>Stasiun:</strong> {Stasiun}
                </p>
                <p>
                  <strong>Tanggal Kunjungan:</strong> {TanggalKunjungan}
                </p>
                <p>
                  <strong>Jam Kunjungan:</strong> {JamKunjungan}
                </p>
                <p>
                  <strong>Jumlah Pengunjung:</strong> {JumlahPengunjung}
                </p>
                <p>
                  <strong>Tujuan Berkunjung:</strong> {TujuanBerkunjung}
                </p>
                <p>
                  <strong>No Surat:</strong> {NoSurat}
                </p>
                <p>
                  <strong>File Surat:</strong> {File ? File.name : "-"}
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  onClick={prevStep}
                  className="bg-gray-500 hover:bg-gray-600 text-black font-semibold px-6 py-2 rounded-md"
                >
                  Kembali
                </Button>

                <Button
                  onClick={onSubmit}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md"
                >
                  {loading ? "Mengirim..." : "Kirim Pengajuan"}
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PengajuanKunjungan;

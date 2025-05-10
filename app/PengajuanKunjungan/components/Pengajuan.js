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
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
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
  const [showModal, setShowModal] = useState(false);
  const [penggunaId, setPenggunaId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("ID");
    if (storedId) {
      setPenggunaId(storedId);
    }
  }, []);

  const [Stasiun, setStasiun] = useState("");
  const [TanggalKunjungan, setTanggalKunjungan] = useState("");
  const [JamKunjungan, setJamKunjungan] = useState("");
  const [JumlahPengunjung, setJumlahPengunjung] = useState("");
  const [TujuanBerkunjung, setTujuanBerkunjung] = useState("");
  const [NoSurat, setNoSurat] = useState("");
  const [Keterangan, setKeterangan] = useState("");
  const [File, setFile] = useState(null);
  const [Instansi, setInstansi] = useState("");
  const [NamaInstansi, setNamaInstansi] = useState("");

  const isLoggedIn = Boolean(penggunaId);
  const userType = detailPengguna?.type || "";
  const fields =
    userType === "perorangan" ? fieldsPerorangan : fieldsPerusahaan;

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleKirimPengajuan = () => {
    console.log("isLoggedIn:", isLoggedIn);
    if (!isLoggedIn) {
      toast.error("Silakan login terlebih dahulu.");
      return;
    }
    console.log("Menampilkan modal...");
    setShowModal(true);
  };

  console.log("loading:", loading);

  const handleConfirmSubmit = async () => {
    toast.success("Pengajuan berhasil dikirim!");

    console.log("Data dikirim:", {
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
      Instansi,
      NamaInstansi,
    });

    if (success) {
      toast.success("Pengajuan berhasil dikirim!");
      setShowModal(false);
      resetForm();
    } else {
      toast.error("Gagal mengirim pengajuan.");
    }
  };

  const resetForm = () => {
    setStasiun("");
    setTanggalKunjungan("");
    setJamKunjungan("");
    setJumlahPengunjung("");
    setTujuanBerkunjung("");
    setNoSurat("");
    setKeterangan("");
    setFile(null);
    setInstansi("");
    setNamaInstansi("");
    setStep(1);
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
            {["Data Pemohon", "Data Tujuan"].map((label, index) => (
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
            ))}
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

                  {/* Hanya Perorangan */}
                  {userType === "perorangan" && (
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

                      {/* Input tambahan tergantung kategori */}
                      {Instansi === "Lembaga Penelitian" && (
                        <div className="flex flex-col">
                          <label className="mb-1 text-sm font-medium text-gray-700">
                            Nama Lembaga Penelitian{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Input
                            value={NamaInstansi}
                            onChange={(e) => setNamaInstansi(e.target.value)}
                            crossOrigin={undefined}
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
                            crossOrigin={undefined}
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
                            crossOrigin={undefined}
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
                            crossOrigin={undefined}
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
                            crossOrigin={undefined}
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
                            crossOrigin={undefined}
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
                    crossOrigin={undefined}
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
                    crossOrigin={undefined}
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
                    crossOrigin={undefined}
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
                        setFile(e.target.files[0]?.name || "");
                      }}
                      className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-600 file:text-white
              hover:file:bg-blue-700
              cursor-pointer"
                      crossOrigin={undefined}
                    />
                  </div>
                  {File && (
                    <span className="text-green-600 text-xs mt-1">{File}</span>
                  )}
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
                  onClick={() => {
                    setFile(File?.name || "");
                    prevStep();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-black font-semibold px-6 py-2 rounded-md"
                >
                  Kembali
                </Button>

                <Button
                  onClick={handleKirimPengajuan}
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

                {/* Modal Konfirmasi */}
                <Dialog open={showModal} handler={setShowModal}>
                  <DialogHeader>Konfirmasi Pengajuan</DialogHeader>
                  <DialogBody>
                    Apakah Anda yakin ingin mengajukan kunjungan?
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={() => setShowModal(false)}
                      className="mr-2"
                    >
                      Batal
                    </Button>
                    <Button
                      variant="gradient"
                      color="green"
                      onClick={() => {
                        setShowModal(false);
                        handleConfirmSubmit();
                      }}
                    >
                      {loading ? "Mengirim..." : "Ya, Kirim"}
                    </Button>
                  </DialogFooter>
                </Dialog>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default PengajuanKunjungan;

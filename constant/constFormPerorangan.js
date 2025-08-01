import React, { useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Input, Checkbox, Button, Spinner } from "@/app/MTailwind";
import { addToPeroranganCollection } from "@/hooks/Backend/useFormPerorangan";
import { formatHuruf } from "@/utils/utilsHuruf";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";
import { toast } from "react-hot-toast";

const StepFormPerorangan = ({ stepAktif, checkboxAktif, setCheckboxAktif }) => {
  const pengarah = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formDataPerorangan, setFormDataPerorangan] = useState({
    Pekerjaan: "",
    Nama_Lengkap: "",
    Pendidikan_Terakhir: "",
    Jenis_Kelamin: "",
    No_Hp: "",
    Tanggal_Pembuatan_Akun: serverTimestamp(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["Pekerjaan", "Nama_Lengkap"].includes(name)) {
      const formattedInput = formatHuruf(value);
      setFormDataPerorangan((prev) => ({
        ...prev,
        [name]: formattedInput,
      }));
      return;
    }
    if (name === "No_Hp") {
      const formattedInputNoHP = formatNoTelepon(value);
      setFormDataPerorangan((prev) => ({
        ...prev,
        [name]: formattedInputNoHP,
      }));
      return;
    }
    setFormDataPerorangan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!checkboxAktif) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const isFormValid = Object.values(formDataPerorangan).every(
      (field) => field !== ""
    );

    if (!isFormValid) {
      toast.error("Harap isi seluruh form yang ada.");
      return;
    }

    setIsLoading(true);

    try {
      await addToPeroranganCollection(formDataPerorangan);
      toast.success("Data Berhasil Disimpan!");
      pengarah.push("/Beranda");
    } catch (error) {
      console.error("Error saving data: ", error);
      toast.error("Failed to save data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  switch (stepAktif) {
    case 0:
      return (
        <div className="flex items-center justify-center">
          <div className="w-full max-w-7xl">
            <h2 className="text-center text-lg bg-primary my-4 py-2 text-white uppercase font-bold tracking-wide rounded-md">
              Data Diri
            </h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 py-2">
                <p className="text-sm font-bold">Nama Lengkap</p>
                <Input
                  name="Nama_Lengkap"
                  className="input-custom"
                  placeholder="Nama Lengkap"
                  value={formDataPerorangan.Nama_Lengkap}
                  onChange={handleInputChange}
                  size="lg"
                  maxLength={100}
                  labelProps={{ className: "hidden" }}
                  required
                />
              </div>

              <div className="w-full md:w-1/2 px-2 py-2">
                <p className="text-sm font-bold">Pekerjaan</p>
                <Input
                  name="Pekerjaan"
                  className="input-custom"
                  placeholder="Pekerjaan"
                  value={formDataPerorangan.Pekerjaan}
                  onChange={handleInputChange}
                  size="lg"
                  maxLength={50}
                  labelProps={{ className: "hidden" }}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2 py-2">
                <p className="text-sm font-bold">Pendidikan Terakhir</p>
                <select
                  name="Pendidikan_Terakhir"
                  value={formDataPerorangan.Pendidikan_Terakhir}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded-lg text-gray-500 input-custom"
                  required
                >
                  <option value="">Pilih Pendidikan Terakhir</option>
                  <option value="Tidak Sekolah">Tidak Sekolah</option>
                  <option value="SD Sederajat">
                    SD Sederajat (SD, MI, Paket A)
                  </option>
                  <option value="SMP Sederajat">
                    SMP Sederajat (SMP, MTs, Paket B)
                  </option>
                  <option value="SMA Sederajat">
                    SMA Sederajat (SMA, MA, SMK, Paket C)
                  </option>
                  <option value="D1 - D3">Diploma (D1 - D3)</option>
                  <option value="S1 / D4">
                    Sarjana / Diploma IV (S1 / D4)
                  </option>
                  <option value="S2">Magister (S2)</option>
                  <option value="S3">Doktor (S3)</option>
                  <option value="Lulusan Luar Negeri">
                    Lulusan Luar Negeri
                  </option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-2 py-2">
                <label className="block text-sm font-bold text-gray-700">
                  Jenis Kelamin
                </label>
                <select
                  name="Jenis_Kelamin"
                  value={formDataPerorangan.Jenis_Kelamin}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded-lg text-gray-500 input-custom"
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>

              <div className="w-full md:w-1/2 px-2 py-2">
                <p className="text-sm font-bold">No HP / No Telepon</p>
                <Input
                  name="No_Hp"
                  className="input-custom"
                  placeholder="No HP / No Telepon"
                  value={formDataPerorangan.No_Hp}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{ className: "hidden" }}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 w-[600px]">
              <Checkbox
                color="blue"
                label="Dengan ini saya menyetujui semua syarat dan ketentuan sebagai pengguna Web PTSP BMKG"
                checked={checkboxAktif}
                onChange={(e) => setCheckboxAktif(e.target.checked)}
              />
            </div>
            <div className="mt-4 w-[600px] p-4 text-base text-left text-white bg-gradient-to-b from-primary to-secondary rounded-xl">
              <h3 className="font-semibold mb-2">
                Ketentuan Pengguna Perseorangan:
              </h3>
              <ul className="list-disc ml-4 space-y-1">
                <li>
                  Pengguna yang terdaftar pada Web PTSP BMKG tunduk pada aturan
                  yang berlaku.
                </li>
                <li>
                  Tidak menyalahgunakan akun terdaftar kepada pihak yang tidak
                  berkepentingan dan memanfaatkannya untuk melakukan tindakan
                  kriminal.
                </li>
              </ul>
            </div>
            <div className="my-2">
              <Button
                className="bg-secondary"
                disabled={!checkboxAktif || isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    color="white"
                    size="sm"
                  />
                ) : (
                  <span>Simpan Data</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default StepFormPerorangan;

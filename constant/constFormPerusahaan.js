import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { serverTimestamp } from "firebase/firestore";
import { Input, Checkbox, Button, Spinner } from "@material-tailwind/react";
import { addToPerusahaanCollection } from "@/hooks/Backend/useFormPerusahaan";
import { formatNPWP } from "@/utils/utilsNPWP";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatHuruf } from "@/utils/utilsHuruf";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";
import { toast } from "react-hot-toast";

const StepFormPerusahaan = ({ stepAktif, checkboxAktif, setCheckboxAktif }) => {
  const pengarah = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formDataPerusahaan, setFormDataPerusahaan] = useState({
    No_Identitas: "",
    Nama_Lengkap: "",
    Pekerjaan: "",
    Pendidikan_Terakhir: "",
    Jenis_Kelamin: "",
    No_Hp: "",
    NPWP_Perusahaan: "",
    Nama_Perusahaan: "",
    Alamat_Perusahaan: "",
    Provinsi_Perusahaan: "",
    Kabupaten_Kota_Perusahaan: "",
    Email_Perusahaan: "",
    No_Hp_Perusahaan: "",
    Tanggal_Pembuatan_Akun: serverTimestamp(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "NPWP_Perusahaan") {
      const formattedInputNPWP = formatNPWP(value);
      setFormDataPerusahaan((prev) => ({
        ...prev,
        [name]: formattedInputNPWP,
      }));
      return;
    }
    if (name === "No_Identitas") {
      const formattedInputNoIdentitas = formatNoIdentitas(value);
      setFormDataPerusahaan((prev) => ({
        ...prev,
        [name]: formattedInputNoIdentitas,
      }));
      return;
    }
    if (
      [
        "Pekerjaan",
        "Nama_Lengkap",
        "Nama_Perusahaan",
        "Provinsi_Perusahaan",
        "Kabupaten_Kota_Perusahaan",
      ].includes(name)
    ) {
      const formattedInput = formatHuruf(value);
      setFormDataPerusahaan((prev) => ({
        ...prev,
        [name]: formattedInput,
      }));
      return;
    }
    if (["No_Hp", "No_Hp_Perusahaan"].includes(name)) {
      const formattedInputNoHP = formatNoTelepon(value);
      setFormDataPerusahaan((prev) => ({
        ...prev,
        [name]: formattedInputNoHP,
      }));
      return;
    }
    setFormDataPerusahaan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!checkboxAktif) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const isFormValid = Object.values(formDataPerusahaan).every(
      (field) => field !== ""
    );

    if (!isFormValid) {
      toast.error("Harap isi seluruh form yang ada.");
      return;
    }

    setIsLoading(true);

    try {
      await addToPerusahaanCollection(formDataPerusahaan);
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
            <h2 className="text-center text-lg bg-secondary my-4 py-2 text-white uppercase font-bold tracking-wide rounded-md">
              Data Diri
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold"> No Identitas</p>
                <Input
                  name="No_Identitas"
                  className="input-custom"
                  placeholder="No Identitas (KTP/SIM/KITAS/PASSPORT)"
                  value={formDataPerusahaan.No_Identitas}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-sm font-bold">Nama Lengkap</p>
                <Input
                  name="Nama_Lengkap"
                  className="input-custom"
                  placeholder="Nama Lengkap"
                  value={formDataPerusahaan.Nama_Lengkap}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-sm font-bold"> Pekerjaan</p>
                <Input
                  name="Pekerjaan"
                  className="input-custom"
                  placeholder="Pekerjaan"
                  value={formDataPerusahaan.Pekerjaan}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-sm font-bold">Pendidikan Terakhir</p>
                <Input
                  name="Pendidikan_Terakhir"
                  className="input-custom"
                  placeholder="Pendidikan Terakhir"
                  value={formDataPerusahaan.Pendidikan_Terakhir}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700">
                  Jenis Kelamin
                </label>
                <select
                  name="Jenis_Kelamin"
                  value={formDataPerusahaan.Jenis_Kelamin}
                  onChange={handleInputChange}
                  className="block w-full mt-1 p-2 border rounded-lg text-gray-500 input-custom"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-bold">No HP / No Telepon</p>
                <Input
                  name="No_Hp"
                  className="input-custom"
                  placeholder="No HP / No Telepon"
                  value={formDataPerusahaan.No_Hp}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div className="mt-4 w-[600px] p-4 text-base text-left text-white bg-gradient-to-b from-primary to-secondary rounded-xl">
              <h3 className="font-semibold mb-2">
                Ketentuan Pengguna Perusahaan:
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
          </div>
        </div>
      );
    case 1:
      return (
        <div className="flex items-center justify-center">
          <div className="w-full max-w-7xl">
            <h2 className="text-center text-lg bg-secondary my-4 py-2 text-white uppercase font-bold tracking-wide rounded-md">
              Data Perusahaan Badan Usaha
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold"> NPWP</p>
                <Input
                  name="NPWP_Perusahaan"
                  className="input-custom"
                  placeholder="NPWP_Perusahaan"
                  value={formDataPerusahaan.NPWP_Perusahaan}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-sm font-bold">Nama Perusahaan</p>
                <Input
                  name="Nama_Perusahaan"
                  className="input-custom"
                  placeholder="Nama Perusahaan"
                  value={formDataPerusahaan.Nama_Perusahaan}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
            </div>
            <div className="my-3">
              <p className="text-sm font-bold">Alamat Perusahaan</p>
              <Input
                name="Alamat_Perusahaan"
                className="input-custom"
                placeholder="Alamat Perusahaan"
                value={formDataPerusahaan.Alamat_Perusahaan}
                onChange={handleInputChange}
                size="lg"
                labelProps={{
                  className: "hidden",
                }}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-bold">Provinsi</p>
                <Input
                  name="Provinsi_Perusahaan"
                  className="input-custom"
                  placeholder="Provinsi Perusahaan"
                  value={formDataPerusahaan.Provinsi_Perusahaan}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-sm font-bold"> Kabupaten/Kota</p>
                <Input
                  name="Kabupaten_Kota_Perusahaan"
                  className="input-custom"
                  placeholder="Kabupaten/Kota Perusahaan"
                  value={formDataPerusahaan.Kabupaten_Kota_Perusahaan}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-sm font-bold"> Email Perusahaan</p>
                <Input
                  name="Email_Perusahaan"
                  className="input-custom"
                  placeholder="Email Perusahaan"
                  value={formDataPerusahaan.Email_Perusahaan}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {" "}
                  No HP / No Telepon Perusahaan
                </p>
                <Input
                  name="No_Hp_Perusahaan"
                  className="input-custom"
                  placeholder="No HP / No Telepon Perusahaan"
                  value={formDataPerusahaan.No_Hp_Perusahaan}
                  onChange={handleInputChange}
                  size="lg"
                  labelProps={{
                    className: "hidden",
                  }}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 w-[600px]">
              <Checkbox
                color="blue"
                label="Dengan ini saya menyetujui semua syarat dan ketentuan sebagai pengguna Web PTSP BMKG"
                checked={checkboxAktif}
                onChange={(e) => setCheckboxAktif(e.target.checked)}
              />
            </div>
            <div className="mt-4 w-[600px] p-4 text-base text-left text-white bg-gradient-to-b from-primary to-secondary rounded-xl">
              <h3 className="font-semibold mb-2">
                Ketentuan Pengguna Perusahaan:
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

export default StepFormPerusahaan;

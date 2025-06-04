import React from "react";
import DOMPurify from "dompurify";
import { Typography, Input, Button } from "@/app/MTailwind";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useEditProfile from "@/hooks/Backend/useEditProfile";
import { formatNPWP } from "@/utils/utilsNPWP";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatHuruf } from "@/utils/utilsHuruf";
import { formatNoTeleponPerusahaan } from "@/utils/utilsNoTeleponPerusahaan";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";

function EditProfile() {
  const { detailPengguna } = useVerifikasiLogin();
  const {
    detailPengguna: editedDetailPengguna,
    tanganiGantiPengguna,
    tanganiSimpan,
    loading,
  } = useEditProfile(detailPengguna);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);

    if (name === "NPWP_Perusahaan") {
      tanganiGantiPengguna({
        target: { name, value: formatNPWP(sanitizedValue) },
      });
      return;
    }
    if (name === "No_Identitas") {
      tanganiGantiPengguna({
        target: { name, value: formatNoIdentitas(sanitizedValue) },
      });
      return;
    }
    if (name === "No_Hp_Perusahaan") {
      tanganiGantiPengguna({
        target: { name, value: formatNoTeleponPerusahaan(sanitizedValue) },
      });
      return;
    }
    if (name === "No_Hp") {
      tanganiGantiPengguna({
        target: { name, value: formatNoTelepon(sanitizedValue) },
      });
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
      tanganiGantiPengguna({
        target: { name, value: formatHuruf(sanitizedValue) },
      });
      return;
    }
    tanganiGantiPengguna({ target: { name, value: sanitizedValue } });
  };

  return (
    <div>
      {/* PERUSAHAAN EDIT */}
      {detailPengguna?.type === "perusahaan" && (
        <>
          <div className="mb-6">
            <Typography variant="h4">Edit Profile Perusahaan</Typography>
          </div>
          <div className="flex flex-col lg:flex-row justify-center text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Nomor Identitas
              </Typography>
              <Input
                name="No_Identitas"
                className="input-custom"
                value={editedDetailPengguna.No_Identitas || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Nama Lengkap
              </Typography>
              <Input
                name="Nama_Lengkap"
                value={editedDetailPengguna.Nama_Lengkap || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Pekerjaan
              </Typography>
              <Input
                name="Pekerjaan"
                value={editedDetailPengguna.Pekerjaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Pendidikan Terakhir
              </Typography>
              <select
                name="Pendidikan_Terakhir"
                value={editedDetailPengguna.Pendidikan_Terakhir || ""}
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
                <option value="S1 / D4">Sarjana / Diploma IV (S1 / D4)</option>
                <option value="S2">Magister (S2)</option>
                <option value="S3">Doktor (S3)</option>
                <option value="Lulusan Luar Negeri">Lulusan Luar Negeri</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Jenis Kelamin
              </Typography>
              <select
                name="Jenis_Kelamin"
                value={editedDetailPengguna.Jenis_Kelamin || ""}
                onChange={(e) =>
                  tanganiGantiPengguna({
                    target: {
                      name: e.target.name,
                      value: DOMPurify.sanitize(e.target.value),
                    },
                  })
                }
                className="block w-full mt-1 p-2 border rounded-lg text-gray-500 input-custom"
              >
                <option value="" disabled>
                  Pilih Jenis Kelamin
                </option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                No. Handphone
              </Typography>
              <Input
                name="No_Hp"
                value={editedDetailPengguna.No_Hp || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                NPWP Perusahaan
              </Typography>
              <Input
                name="NPWP_Perusahaan"
                value={editedDetailPengguna.NPWP_Perusahaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Alamat Perusahaan
              </Typography>
              <Input
                name="Alamat_Perusahaan"
                value={editedDetailPengguna.Alamat_Perusahaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Nama Perusahaan
              </Typography>
              <Input
                name="Nama_Perusahaan"
                value={editedDetailPengguna.Nama_Perusahaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Provinsi Perusahaan
              </Typography>
              <Input
                name="Provinsi_Perusahaan"
                value={editedDetailPengguna.Provinsi_Perusahaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Kabupaten / Kota Perusahaan
              </Typography>
              <Input
                name="Kabupaten_Kota_Perusahaan"
                value={editedDetailPengguna.Kabupaten_Kota_Perusahaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Nomor HP / No Telepon Perusahaan
              </Typography>
              <Input
                name="No_Hp_Perusahaan"
                value={editedDetailPengguna.No_Hp_Perusahaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-start text-start gap-x-2 gap-y-3">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Email Perusahaan
              </Typography>
              <Input
                name="Email_Perusahaan"
                value={editedDetailPengguna.Email_Perusahaan || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              color="green"
              onClick={tanganiSimpan}
              disabled={loading}
              className="mt-6 w-full"
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfile;

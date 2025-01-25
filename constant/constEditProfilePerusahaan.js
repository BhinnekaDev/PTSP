import React from "react";
import DOMPurify from "dompurify";
import { Typography, Input, Button } from "@/app/MTailwind";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useEditProfile from "@/hooks/Backend/useEditProfile";
import { toast } from "react-toastify";
import { formatNPWP } from "@/utils/utilsNPWP";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatHuruf } from "@/utils/utilsHuruf";
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
    if (["No_Hp", "No_Hp_Perusahaan"].includes(name)) {
      tanganiGantiPengguna({
        target: { name, value: formatNoTelepon(sanitizedValue) },
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
          <div className="grid grid-cols-2 text-center gap-x-3 gap-y-3">
            <div>
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
            <div>
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
            <div>
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
            <div>
              <Typography variant="h6" className="mb-2">
                Pendidikan Terakhir
              </Typography>
              <Input
                name="Pendidikan_Terakhir"
                value={editedDetailPengguna.Pendidikan_Terakhir || ""}
                onChange={handleInputChange}
                className="input-custom"
              />
            </div>
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div className="col-span-2 flex justify-end">
              <Button
                color="green"
                onClick={tanganiSimpan}
                disabled={loading}
                className="mt-4"
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfile;

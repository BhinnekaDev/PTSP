import React, { useState } from "react";
import DOMPurify from "dompurify";
import { Typography, Input, Button } from "@/app/MTailwind";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import useEditProfile from "@/hooks/Backend/useEditProfile";
import { formatHuruf } from "@/utils/utilsHuruf";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";
import { storage, firestore } from "@/lib/firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function EditProfile() {
  const { detailPengguna } = useVerifikasiLogin();
  const [fotoFile, setFotoFile] = useState(null);
  const [uploadingFoto, setUploadingFoto] = useState(false);
  const {
    detailPengguna: editedDetailPengguna,
    tanganiGantiPengguna,
    tanganiSimpan,
    loading,
  } = useEditProfile(detailPengguna);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    if (["Pekerjaan", "Nama_Lengkap"].includes(name)) {
      const formattedInput = formatHuruf(sanitizedValue);
      tanganiGantiPengguna({ target: { name, value: formattedInput } });
      return;
    }

    if (name === "No_Hp") {
      const formattedInputNoHP = formatNoTelepon(sanitizedValue);
      tanganiGantiPengguna({ target: { name, value: formattedInputNoHP } });
      return;
    }

    tanganiGantiPengguna({ target: { name, value: sanitizedValue } });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File harus berupa gambar");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }
      setFotoFile(file);
    }
  };

  const uploadFotoProfil = async () => {
    if (!fotoFile) return null;

    setUploadingFoto(true);
    const userId = localStorage.getItem("ID");
    const folder =
      detailPengguna?.type === "perorangan" ? "perorangan" : "perusahaan";
    const fotoRef = ref(storage, `Foto_Profil/${folder}/${userId}`);

    try {
      // Hapus foto lama jika ada
      try {
        await deleteObject(fotoRef);
      } catch (err) {
        // Foto lama tidak ada, lanjutkan
      }

      // Upload foto baru
      await uploadBytes(fotoRef, fotoFile);
      const fotoURL = await getDownloadURL(fotoRef);

      // Update Firestore
      const userRef = doc(firestore, folder, userId);
      await updateDoc(userRef, { Foto_URL: fotoURL });

      // Update localStorage
      localStorage.setItem("Foto_URL", fotoURL);

      toast.success("Foto profil berhasil diupdate!");
      setFotoFile(null);
      return fotoURL;
    } catch (error) {
      console.error("Gagal upload foto:", error);
      toast.error("Gagal mengupload foto profil");
      return null;
    } finally {
      setUploadingFoto(false);
    }
  };

  const handleSimpanSemua = async () => {
    // Upload foto dulu jika ada
    if (fotoFile) {
      const fotoURL = await uploadFotoProfil();
      if (fotoURL) {
        tanganiGantiPengguna({ target: { name: "Foto_URL", value: fotoURL } });
      }
    }
    // Simpan data lainnya
    await tanganiSimpan();
  };

  return (
    <div>
      {detailPengguna?.type === "perorangan" && (
        <>
          <div className="mb-6">
            <Typography variant="h4">Edit Profile Perorangan</Typography>
          </div>

          {/* Foto Profile */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={editedDetailPengguna.Foto_URL || "/default-avatar.png"}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
              />
              <label className="absolute bottom-0 right-0 bg-secondary text-white p-2 rounded-full cursor-pointer hover:bg-primary transition shadow-md">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFotoChange}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </label>
            </div>
            {fotoFile && (
              <div className="mt-2 text-sm text-green-600">
                Foto baru: {fotoFile.name}
              </div>
            )}
            {uploadingFoto && (
              <div className="text-sm text-blue-500 flex items-center gap-2 mt-2">
                <svg
                  className="animate-spin h-4 w-4"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Mengupload...
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row justify-center text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Nama Lengkap
              </Typography>
              <Input
                name="Nama_Lengkap"
                value={editedDetailPengguna.Nama_Lengkap || ""}
                onChange={handleInputChange}
                className="input-custom"
                maxLength={50}
                required
              />
            </div>
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                Pekerjaan
              </Typography>
              <Input
                name="Pekerjaan"
                value={editedDetailPengguna.Pekerjaan || ""}
                onChange={handleInputChange}
                className="input-custom"
                maxLength={50}
                required
              />
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
                required
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
                Pendidikan Terakhir
              </Typography>
              <select
                name="Pendidikan_Terakhir"
                value={editedDetailPengguna.Pendidikan_Terakhir || ""}
                onChange={handleInputChange}
                className="block w-full mt-1 p-2 border rounded-lg text-gray-500 input-custom"
                required
              >
                <option value="" disabled>
                  Pilih Pendidikan Terakhir
                </option>
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
          <div className="flex flex-col lg:flex-row justify-start text-center gap-x-2 gap-y-3 mb-5">
            <div className="w-full lg:w-1/2">
              <Typography variant="h6" className="mb-2">
                No HP / No Telepon
              </Typography>
              <Input
                name="No_Hp"
                value={editedDetailPengguna.No_Hp || ""}
                onChange={handleInputChange}
                className="input-custom"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              color="green"
              onClick={handleSimpanSemua}
              disabled={loading || uploadingFoto}
              className="mt-6 w-full"
            >
              {loading || uploadingFoto ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditProfile;

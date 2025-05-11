import { useState } from "react";
import { storage, firestore } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, setDoc, addDoc, Timestamp } from "firebase/firestore";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import kirimEmailKunjunganPengguna from "@/components/EmailKunjunganPengguna";
import kirimEmailKunjunganAdmin from "@/components/EmailKunjunganAdmin";
import { formatTanggal } from "@/utils/utilsTanggal";
import toast from "react-hot-toast";

function usePengirimanPengajuanKunjungan() {
  const [loading, setLoading] = useState(false);
  const { detailPengguna } = useVerifikasiLogin();
  const fieldsPerorangan = ["Nama_Lengkap", "No_Hp", "Email"];
  const fieldsPerusahaan = [
    "Nama_Lengkap",
    "No_Hp",
    "Email",
    "Nama_Perusahaan",
    "Alamat_Perusahaan",
    "Kabupaten_Kota_Perusahaan",
    "Provinsi_Perusahaan",
    "No_Hp_Perusahaan",
    "Email_Perusahaan",
  ];
  const tipePengguna = detailPengguna?.type || "";
  const fields =
    tipePengguna === "perorangan" ? fieldsPerorangan : fieldsPerusahaan;

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

  const handleFormPengajuan = async ({
    File,
    Stasiun,
    Keterangan,
    TanggalKunjungan,
    JamKunjungan,
    NoSurat,
    TujuanBerkunjung,
    JumlahPengunjung,
    Instansi,
    NamaInstansi,
    dataUser,
  }) => {
    setLoading(true);

    const penggunaSaatIni = localStorage.getItem("ID");

    const validasiFields = [
      {
        condition: !penggunaSaatIni,
        message: "Anda harus masuk untuk mengajukan.",
      },
      { condition: !Stasiun?.trim(), message: "Field Stasiun kosong!" },
      { condition: !TanggalKunjungan, message: "Tanggal Kunjungan kosong!" },
      { condition: !JamKunjungan, message: "Jam Kunjungan kosong!" },
      {
        condition:
          isNaN(parseInt(JumlahPengunjung, 10)) ||
          parseInt(JumlahPengunjung, 10) < 1 ||
          parseInt(JumlahPengunjung, 10) > 50,
        message: "Jumlah Pengunjung harus minimal 1 dan maksimal 50 orang!",
      },
      {
        condition: !TujuanBerkunjung?.trim(),
        message: "Tujuan Berkunjung kosong!",
      },
      { condition: !NoSurat?.trim(), message: "No Surat kosong!" },
      { condition: !File, message: "File belum diupload!" },
    ];

    for (const field of validasiFields) {
      if (field.condition) {
        toast.error(field.message);
        setLoading(false);
        return false;
      }
    }

    if (dataUser?.type === "perorangan") {
      if (Instansi === "Umum" && NamaInstansi?.trim()) {
        toast.error(
          "Jika Instansi adalah Umum, Nama Instansi harus dikosongkan."
        );
        setLoading(false);
        return false;
      }

      if (Instansi !== "Umum" && !NamaInstansi?.trim()) {
        toast.error("Keterangan Nama Instansi harus diisi.");
        setLoading(false);
        return false;
      }
    }

    try {
      const fieldsToExclude = [
        "alamatPerusahaan",
        "emailPerusahaan",
        "jenisKelamin",
        "kabupatenKotaPerusahaan",
        "namaLengkap",
        "namaPerusahaan",
        "nomorHP",
        "nomorHpPerusahaan",
        "nomorIdentitas",
        "npwpPerusahaan",
        "pekerjaan",
        "pendidikanTerakhir",
        "provinsiPerusahaan",
      ];

      const filteredDataUser = Object.keys(dataUser || {}).reduce(
        (acc, key) => {
          if (!fieldsToExclude.includes(key)) {
            acc[key] = dataUser[key];
          }
          return acc;
        },
        {}
      );
      const pengajuanRef = collection(firestore, "pengajuan_kunjungan");
      const docRef = await addDoc(pengajuanRef, {});

      const storageRef = ref(
        storage,
        `pengajuan_kunjungan/${docRef.id}/${File.name}`
      );
      await uploadBytes(storageRef, File);
      const FileURL = await getDownloadURL(storageRef);

      const dataPengajuanKunjungan = {
        Data_Pengguna: filteredDataUser,
        Stasiun: Stasiun.trim(),
        TanggalKunjungan,
        JamKunjungan,
        JumlahPengunjung,
        TujuanBerkunjung: TujuanBerkunjung.trim(),
        NoSurat: NoSurat.trim(),
        FileURL,
        Tanggal_Pengajuan_Kunjungan: Timestamp.now(),
      };

      if (dataUser?.type === "perorangan") {
        if (Instansi === "Umum") {
          dataPengajuanKunjungan.Instansi = "Umum";
        } else if (Instansi && NamaInstansi?.trim()) {
          dataPengajuanKunjungan.Instansi = Instansi;
          dataPengajuanKunjungan.NamaInstansi = NamaInstansi.trim();
        }
      }

      if (Keterangan?.trim()) {
        dataPengajuanKunjungan.Keterangan = Keterangan.trim();
      }

      await setDoc(docRef, dataPengajuanKunjungan);

      const Tanggal_Pengajuan_Kunjungan = formatTanggal(
        dataPengajuanKunjungan.Tanggal_Pengajuan_Kunjungan?.toDate
          ? dataPengajuanKunjungan.Tanggal_Pengajuan_Kunjungan.toDate()
          : new Date()
      );
      await kirimEmailKunjunganPengguna(
        dataUser.Email,
        dataUser.Nama_Lengkap,
        docRef.id,
        Tanggal_Pengajuan_Kunjungan,
        dataUser.Nama_Perusahaan,
        dataUser.Email_Perusahaan,
        dataUser.Alamat_Perusahaan,
        dataUser.Kabupaten_Kota_Perusahaan,
        dataUser.Provinsi_Perusahaan,
        dataUser.No_Hp,
        dataUser.No_Hp_Perusahaan,
        dataPengajuanKunjungan
      );
      await kirimEmailKunjunganAdmin(
        dataUser.Email,
        dataUser.Nama_Lengkap,
        docRef.id,
        Tanggal_Pengajuan_Kunjungan,
        dataUser.Nama_Perusahaan,
        dataUser.Email_Perusahaan,
        dataUser.Alamat_Perusahaan,
        dataUser.Kabupaten_Kota_Perusahaan,
        dataUser.Provinsi_Perusahaan,
        dataUser.No_Hp,
        dataUser.No_Hp_Perusahaan,
        dataPengajuanKunjungan
      );

      setTimeout(() => {
        window.location.reload();
      }, 3000);

      return true;
    } catch (error) {
      console.error("Error:", error);
      console.trace();
      toast.error("Terjadi kesalahan saat mengirim pengajuan.", {
        id: "kirimPengajuan",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}

export default usePengirimanPengajuanKunjungan;

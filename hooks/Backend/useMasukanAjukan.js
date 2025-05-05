import { useState } from "react";
import { firestore } from "@/lib/firebaseConfig";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteField,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { formatTanggal } from "@/utils/utilsTanggal";
import kirimEmailKonfirmasi from "@/components/EmailAjuan";

const generateRandomID = (length = 16) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

const getPenggunaData = async (penggunaSaatIni) => {
  const peroranganRef = doc(firestore, "perorangan", penggunaSaatIni);
  const perusahaanRef = doc(firestore, "perusahaan", penggunaSaatIni);

  const [peroranganSnap, perusahaanSnap] = await Promise.all([
    getDoc(peroranganRef),
    getDoc(perusahaanRef),
  ]);

  if (peroranganSnap.exists()) {
    return {
      tipe: "perorangan",
      ...peroranganSnap.data(),
    };
  } else if (perusahaanSnap.exists()) {
    return {
      tipe: "perusahaan",
      ...perusahaanSnap.data(),
    };
  } else {
    return null;
  }
};

const useAjukanFormSubmit = (keranjang) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (files, formName) => {
    const penggunaSaatIni = localStorage.getItem("ID");
    if (!penggunaSaatIni) {
      toast.error("Anda harus masuk untuk mengajukan.");
      return;
    }
    setLoading(true);

    try {
      const maxSizeInBytes = 2 * 1024 * 1024;
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
      const randomIDAjukan = generateRandomID();
      const storage = getStorage();
      const fileUrls = [];

      for (let file of files) {
        const fileExtension = file.name.split(".").pop().toLowerCase();
        const fileMimeType = file.type;

        if (!allowedExtensions.includes(fileExtension)) {
          setLoading(false);
          toast.error(`File harus berformat JPG, JPEG, PNG, atau PDF.`);
          return;
        }

        if (!allowedMimeTypes.includes(fileMimeType)) {
          setLoading(false);
          toast.error(`Tipe file tidak diizinkan.`);
          return;
        }

        if (file.size > maxSizeInBytes) {
          setLoading(false);
          toast.error(`File melebihi ukuran maksimum 2MB.`);
          return;
        }

        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const uniqueFileName = `${sanitizedFileName}_${Date.now()}_${randomIDAjukan}.${fileExtension}`;
        const storageRef = ref(
          storage,
          `File_Ajukan/${penggunaSaatIni}/${formName}/${uniqueFileName}`
        );

        await uploadBytes(storageRef, file);

        const fileUrl = await getDownloadURL(storageRef);
        fileUrls.push(fileUrl);
      }

      const keranjangRef = doc(firestore, "keranjang", penggunaSaatIni);
      const keranjangSnapshot = await getDoc(keranjangRef);

      if (
        !keranjangSnapshot.exists() ||
        (!keranjangSnapshot.data().Informasi?.length &&
          !keranjangSnapshot.data().Jasa?.length)
      ) {
        setLoading(false);
        toast.error("Keranjang kosong. Tambahkan item terlebih dahulu.");
        return;
      }

      const ajukanRef = doc(firestore, "ajukan", randomIDAjukan);
      const ajukanData = {
        Nama_Ajukan: formName,
        File_Ajukan: fileUrls,
        Status_Ajuan: "Sedang Ditinjau",
        Jenis_Ajukan:
          formName === "Kegiatan Tarif PNBP" ? "Berbayar" : "Gratis",
        Tanggal_Pembuatan_Ajukan: serverTimestamp(),
      };
      await setDoc(ajukanRef, ajukanData);

      const dataKeranjang = keranjangSnapshot.data();
      const dataPesanan = [
        ...dataKeranjang.Informasi.map(({ ID_Informasi, ...rest }) => ({
          ...rest,
          Jenis_Produk: "Informasi",
          ...(formName === "Kegiatan Tarif PNBP" && { Nomor_VA: "" }),
        })),
        ...(dataKeranjang.Jasa
          ? dataKeranjang.Jasa.map(({ ID_Jasa, ...rest }) => ({
              ...rest,
              Jenis_Produk: "Jasa",
              ...(formName === "Kegiatan Tarif PNBP" && { Nomor_VA: "" }),
            }))
          : []),
      ];

      const totalHargaPesanan = dataPesanan.reduce(
        (total, item) => total + (item.Harga || 0),
        0
      );

      const ID_Pemesanan = generateRandomID();
      const ID_Transaksi = generateRandomID();
      const pemesananRef = doc(firestore, "pemesanan", ID_Pemesanan);
      const pemesananData = {
        ID_Pengguna: penggunaSaatIni,
        ID_Ajukan: randomIDAjukan,
        Data_Keranjang: dataPesanan,
        Status_Pembayaran: "Menunggu Pembayaran",
        Total_Harga_Pesanan: totalHargaPesanan,
        Status_Pesanan: "Belum Selesai",
        Status_Pembuatan: "Menunggu Pembuatan",
        Tanggal_Pemesanan: serverTimestamp(),
        ...(formName === "Kegiatan Tarif PNBP" && {
          ID_Transaksi: ID_Transaksi,
        }),
      };
      await setDoc(pemesananRef, pemesananData);

      const penggunaData = await getPenggunaData(penggunaSaatIni);
      const Tanggal_Pemesanan = formatTanggal(
        pemesananData.Tanggal_Pemesanan?.toDate
          ? pemesananData.Tanggal_Pemesanan.toDate()
          : new Date()
      );
      const Tanggal_Pembuatan_Ajukan = formatTanggal(
        pemesananData.Tanggal_Pembuatan_Ajukan?.toDate
          ? pemesananData.Tanggal_Pembuatan_Ajukan.toDate()
          : new Date()
      );
      await kirimEmailKonfirmasi(
        penggunaData.Email,
        formName,
        penggunaData.Nama_Lengkap,
        randomIDAjukan,
        ID_Pemesanan,
        Tanggal_Pembuatan_Ajukan,
        Tanggal_Pemesanan,
        dataPesanan,
        totalHargaPesanan
      );

      router.push("/Transaksi");
      toast.success("Pengajuan berhasil dibuat dan ditambahkan ke pemesanan!");

      await updateDoc(keranjangRef, {
        Informasi: [],
        Jasa: [],
        ID_Ajukan: deleteField(),
      });
    } catch (error) {
      console.error("Gagal membuat pengajuan:", error);
      toast.error("Gagal membuat pengajuan.");
    } finally {
      setLoading(false);
    }
  };

  return { handleFormSubmit, loading };
};

export default useAjukanFormSubmit;

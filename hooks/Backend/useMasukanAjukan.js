import { useState } from "react";
import { firestore } from "@/lib/firebaseConfig";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteField,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const generateRandomIDAjukan = (length = 16) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const generateRandomIDPemesanan = (length = 16) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const generateRandomIDTransaksi = (length = 16) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const useAjukanFormSubmit = (keranjang) => {
  const pengarah = useRouter();
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
      const randomIDAjukan = generateRandomIDAjukan();
      const storage = getStorage();
      const fileUrls = [];

      for (let file of files) {
        const fileExtension = file.name.split(".").pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          setLoading(false);
          toast.error(`File harus berformat JPG, JPEG, PNG, atau PDF.`);
          return;
        }

        if (file.size > maxSizeInBytes) {
          setLoading(false);
          toast.error(`File melebihi ukuran maksimum 2MB.`);
          return;
        }

        const uniqueFileName = `${
          file.name.split(".")[0]
        }_${Date.now()}_${randomIDAjukan}.${fileExtension}`;
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
        Tanggal_Pembuatan_Ajukan: new Date(),
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

      const pemesananRef = doc(
        firestore,
        "pemesanan",
        generateRandomIDPemesanan()
      );

      const pemesananData = {
        ID_Pengguna: penggunaSaatIni,
        ID_Ajukan: randomIDAjukan,
        Data_Keranjang: dataPesanan,
        Status_Pembayaran: "Menunggu Pembayaran",
        Total_Harga_Pesanan: totalHargaPesanan,
        Status_Pesanan: "Belum Selesai",
        Status_Pembuatan: "Menunggu Pembuatan",
        Tanggal_Pemesanan: new Date(),
        ...(formName === "Kegiatan Tarif PNBP" &&
          ajukanData.Jenis_Ajukan === "Berbayar" && {
            ID_Transaksi: generateRandomIDTransaksi(),
          }),
      };

      await setDoc(pemesananRef, pemesananData);

      pengarah.push("/Transaksi");
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

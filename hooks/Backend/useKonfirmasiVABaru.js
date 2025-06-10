import { useCallback, useState } from "react";
import { doc, getDoc, collection, updateDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import kirimEmailPembuatanVA from "@/components/EmailPembuatanVABaru";

function useDialogKonfirmasiVABaru({ ID_Pemesanan, ID_Transaksi }) {
  const [loading, setLoading] = useState(false);
  const penggunaSaatIni = localStorage.getItem("ID");
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
  const onConfirm = useCallback(async () => {
    try {
      setLoading(true);
      const pemesananRef = doc(
        collection(firestore, "pemesanan"),
        ID_Pemesanan
      );
      const pemesananSnap = await getDoc(pemesananRef);

      if (!pemesananSnap.exists()) {
        throw new Error("Data pemesanan tidak ditemukan.");
      }

      await updateDoc(pemesananRef, {
        Status_Pembayaran: "Menunggu Admin",
      });

      const transaksiRef = doc(
        collection(firestore, "transaksi"),
        ID_Transaksi
      );
      const transaksiSnap = await getDoc(transaksiRef);

      if (!transaksiSnap.exists()) {
        throw new Error("Transaksi tidak ditemukan.");
      }

      const transaksiData = transaksiSnap.data();

      if (transaksiData && Object.keys(transaksiData).length > 0) {
        await setDoc(transaksiRef, {});
      }
      const penggunaData = await getPenggunaData(penggunaSaatIni);

      await kirimEmailPembuatanVA(
        penggunaData.Email,
        penggunaData.Nama_Lengkap,
        ID_Pemesanan
      );

      toast.success("Permintaan Virtual Account Baru berhasil dikirim.");
      window.location.reload();
    } catch (error) {
      console.error("Gagal konfirmasi VA baru:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [ID_Pemesanan, ID_Transaksi]);

  return {
    onConfirm,
    loading,
  };
}

export default useDialogKonfirmasiVABaru;

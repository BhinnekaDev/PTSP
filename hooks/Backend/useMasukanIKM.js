import { useCallback, useState } from "react";
import { Radio } from "@/app/MTailwind";
import { firestore } from "@/lib/firebaseConfig";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import useStepperFormIKM from "@/hooks/Frontend/useStepperFormIKM";
import kirimEmailIKM from "@/components/EmailIKM";
import { formatTanggal } from "@/utils/utilsTanggal";
const useMasukanIKM = () => {
  const { serviceItems } = useStepperFormIKM();
  const [selectedOptions, setSelectedOptions] = useState({
    meteorologi: [],
    klimatologi: [],
    geofisika: [],
    instrumentasi: [],
    humas: [],
  });

  const handleCheckboxChange = (section, label) => {
    setSelectedOptions((prevState) => {
      const currentSelection = prevState[section] || [];
      const updatedSelection = currentSelection.includes(label)
        ? currentSelection.filter((item) => item !== label)
        : [...currentSelection, label];
      return {
        ...prevState,
        [section]: updatedSelection,
      };
    });
  };

  const [responses, setResponses] = useState(
    serviceItems.map((item) => ({
      ...item,
      Nama_Pertanyaan: item.name,
      KualitasLayanan: "",
      HarapanKonsumen: "",
    }))
  );

  const handleSelectionChange = (type, id, value) => {
    setResponses((prevResponses) =>
      prevResponses.map((item) =>
        item.id === id ? { ...item, [type]: value } : item
      )
    );
  };

  const renderKualitasLayananGroup = useCallback(
    (id) => (
      <div className="flex space-x-4 text-sm">
        {["Sangat Setuju", "Setuju", "Kurang Setuju", "Tidak Setuju"].map(
          (label, idx) => (
            <Radio
              key={idx}
              id={`${id}-KualitasLayanan-${idx + 1}`}
              name={`${id}-KualitasLayanan`}
              label={label}
              onChange={() =>
                handleSelectionChange("KualitasLayanan", id, label)
              }
              checked={
                responses.find((item) => item.id === id)?.KualitasLayanan ===
                label
              }
            />
          )
        )}
      </div>
    ),
    [responses, handleSelectionChange]
  );

  const renderHarapanKonsumenGroup = useCallback(
    (id) => (
      <div className="flex space-x-4 mt-2 text-sm">
        {["Sangat Penting", "Penting", "Kurang Penting", "Tidak Penting"].map(
          (label, idx) => (
            <Radio
              key={idx}
              id={`${id}-HarapanKonsumen-${idx + 1}`}
              name={`${id}-HarapanKonsumen`}
              label={label}
              onChange={() =>
                handleSelectionChange("HarapanKonsumen", id, label)
              }
              checked={
                responses.find((item) => item.id === id)?.HarapanKonsumen ===
                label
              }
            />
          )
        )}
      </div>
    ),
    [responses, handleSelectionChange]
  );

  const handleIKMSubmit = async (pemesananId) => {
    const penggunaID = localStorage.getItem("ID");
    if (!penggunaID) {
      toast.error("Anda harus masuk untuk mengirimkan IKM.");
      return;
    }

    const getPenggunaData = async (id) => {
      const peroranganSnap = await getDoc(doc(firestore, "perorangan", id));
      const perusahaanSnap = await getDoc(doc(firestore, "perusahaan", id));

      if (peroranganSnap.exists())
        return { tipe: "perorangan", ...peroranganSnap.data() };
      if (perusahaanSnap.exists())
        return { tipe: "perusahaan", ...perusahaanSnap.data() };
      return null;
    };

    const penggunaData = await getPenggunaData(penggunaID);
    if (!penggunaData) {
      toast.error("Data pengguna tidak ditemukan.");
      return;
    }

    const ikmData = {
      Opsi_Yang_Dipilih: selectedOptions,
    };

    try {
      const ikmRef = doc(firestore, "ikm", pemesananId);
      const docSnapshot = await getDoc(ikmRef);

      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
        const mergedData = {
          ...existingData,
          ikmResponses: responses,
        };
        await updateDoc(ikmRef, mergedData);
        console.log("Merged IKM Data:", mergedData);
        window.location.reload();
      } else {
        await setDoc(ikmRef, ikmData, { merge: true });
        console.log("IKM Document Created with Selected Options.");
      }

      const pemesananRef = doc(firestore, "pemesanan", pemesananId);
      const pemesananSnapshot = await getDoc(pemesananRef);

      if (pemesananSnapshot.exists()) {
        const pemesananData = pemesananSnapshot.data();
        const ID_Ajukan = pemesananData.ID_Ajukan;
        const ID_Transaksi = pemesananData.ID_Transaksi;
        let Nama_Ajukan = "";
        let Tanggal_Transaksi = "";
        let Tanggal_Ajukan = "";
        if (ID_Ajukan) {
          const ajukanSnap = await getDoc(doc(firestore, "ajukan", ID_Ajukan));
          if (ajukanSnap.exists()) {
            const dataAjukan = ajukanSnap.data();
            Nama_Ajukan = dataAjukan.Nama_Ajukan;
            Tanggal_Ajukan = dataAjukan.Tanggal_Pembuatan_Ajukan;
            console.log("Data Ajukan:", ajukanSnap.data());
          } else {
            console.warn("Data ajukan tidak ditemukan untuk ID:", ID_Ajukan);
          }
        }

        if (ID_Transaksi) {
          const transaksiSnap = await getDoc(
            doc(firestore, "transaksi", ID_Transaksi)
          );
          if (transaksiSnap.exists()) {
            const dataTransaksi = transaksiSnap.data();
            Tanggal_Transaksi = dataTransaksi.Tanggal_Pengiriman_Bukti;
          } else {
            console.warn(
              "Data transaksi tidak ditemukan untuk ID:",
              ID_Transaksi
            );
          }
        }

        const Tanggal_Pengiriman_Bukti = Tanggal_Transaksi?.toDate
          ? formatTanggal(Tanggal_Transaksi.toDate())
          : "-";

        const Tanggal_Pembuatan_Ajukan = Tanggal_Ajukan?.toDate
          ? formatTanggal(Tanggal_Ajukan.toDate())
          : "-";

        const Tanggal_Pemesanan = pemesananData?.Tanggal_Pemesanan?.toDate
          ? formatTanggal(pemesananData.Tanggal_Pemesanan.toDate())
          : "-";

        await updateDoc(pemesananRef, {
          Status_Pengisian_IKM: "Telah Diisi",
          Status_Pesanan: "Selesai",
        });

        await kirimEmailIKM(
          penggunaData.Email,
          penggunaData.Nama_Lengkap,
          pemesananId,
          pemesananData.ID_Ajukan,
          Tanggal_Pemesanan,
          Nama_Ajukan,
          Tanggal_Pembuatan_Ajukan,
          pemesananData.Data_Keranjang,
          pemesananData.Total_Harga_Pesanan,
          Tanggal_Pengiriman_Bukti,
          pemesananData.ID_Transaksi
        );
      } else {
        console.warn("Pemesanan dengan ID", pemesananId, "tidak ditemukan.");
      }
      toast.success("IKM berhasil dikirim!");
    } catch (err) {
      console.error("Gagal mengirim IKM:", err);
      toast.error("Gagal mengirim IKM.");
    }
  };

  return {
    renderKualitasLayananGroup,
    renderHarapanKonsumenGroup,
    responses,
    selectedOptions,
    setSelectedOptions,
    handleIKMSubmit,
    handleCheckboxChange,
  };
};

export default useMasukanIKM;

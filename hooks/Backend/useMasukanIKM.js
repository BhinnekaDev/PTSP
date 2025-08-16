import { useCallback, useState, useEffect } from "react";
import { Radio } from "@/app/MTailwind";
import { firestore } from "@/lib/firebaseConfig";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import useStepperFormIKMKedua from "@/hooks/Frontend/useStepperFormIKMKedua";
import kirimEmailIKM from "@/components/EmailIKM";
import { formatTanggal } from "@/utils/utilsTanggal";
const useMasukanIKM = (resetStepper) => {
  const { serviceItems } = useStepperFormIKMKedua();
  const getLocalData = (key, defaultValue) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    }
    return defaultValue;
  };

  const [selectedOptions, setSelectedOptions] = useState(
    getLocalData("selectedOptions", {
      meteorologi: [],
      klimatologi: [],
      geofisika: [],
      instrumentasi: [],
      humas: [],
    })
  );

  const [responses, setResponses] = useState(
    getLocalData(
      "responses",
      serviceItems.map((item) => ({
        ...item,
        Nama_Pertanyaan: item.Name,
        KualitasLayanan: "",
        HarapanKonsumen: "",
      }))
    )
  );

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);

  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [responses]);

  const handleCheckboxChange = (section, label) => {
    const updatedSelection = selectedOptions[section].includes(label)
      ? selectedOptions[section].filter((item) => item !== label)
      : [...selectedOptions[section], label];

    const newOptions = { ...selectedOptions, [section]: updatedSelection };
    setSelectedOptions(newOptions);
    localStorage.setItem("selectedOptions", JSON.stringify(newOptions));
  };

  const handleSelectionChange = (type, ID, value) => {
    const updatedResponses = responses.map((item) =>
      item.ID === ID ? { ...item, [type]: value } : item
    );
    setResponses(updatedResponses);
    localStorage.setItem("responses", JSON.stringify(updatedResponses));
  };

  const renderKualitasLayananGroup = useCallback(
    (ID) => (
      <div className="flex space-x-4 text-sm">
        {["Sangat Setuju", "Setuju", "Kurang Setuju", "Tidak Setuju"].map(
          (label, idx) => (
            <Radio
              key={idx}
              id={`${ID}-KualitasLayanan-${idx + 1}`}
              name={`${ID}-KualitasLayanan`}
              label={label}
              onChange={() =>
                handleSelectionChange("KualitasLayanan", ID, label)
              }
              checked={
                responses.find((item) => item.ID === ID)?.KualitasLayanan ===
                label
              }
            />
          )
        )}
      </div>
    ),
    [responses]
  );

  const renderHarapanKonsumenGroup = useCallback(
    (ID) => (
      <div className="flex space-x-4 mt-2 text-sm">
        {["Sangat Penting", "Penting", "Kurang Penting", "Tidak Penting"].map(
          (label, idx) => (
            <Radio
              key={idx}
              id={`${ID}-HarapanKonsumen-${idx + 1}`}
              name={`${ID}-HarapanKonsumen`}
              label={label}
              onChange={() =>
                handleSelectionChange("HarapanKonsumen", ID, label)
              }
              checked={
                responses.find((item) => item.ID === ID)?.HarapanKonsumen ===
                label
              }
            />
          )
        )}
      </div>
    ),
    [responses]
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

    const ikmRef = doc(firestore, "ikm", pemesananId);
    const docSnapshot = await getDoc(ikmRef);

    try {
      if (docSnapshot.exists()) {
        const existingData = docSnapshot.data();
        const mergedData = {
          ...existingData,
          ikmResponses: responses,
        };
        await updateDoc(ikmRef, mergedData);
        console.log("Merged IKM Data:", mergedData);
      } else {
        await setDoc(
          ikmRef,
          { Opsi_Yang_Dipilih: selectedOptions },
          { merge: true }
        );
      }

      const updatedIKMSnapshot = await getDoc(ikmRef);
      const updatedIKMData = updatedIKMSnapshot.data();

      const isIKMComplete =
        updatedIKMData?.Opsi_Yang_Dipilih &&
        updatedIKMData?.ikmResponses?.length > 0;

      if (!isIKMComplete) {
        toast.success(
          "Lanjutkan ke pertanyaan berikutnya untuk melanjutkan proses."
        );
        return;
      }

      const pemesananRef = doc(firestore, "pemesanan", pemesananId);
      const pemesananSnapshot = await getDoc(pemesananRef);

      if (pemesananSnapshot.exists()) {
        const pemesananData = pemesananSnapshot.data();

        await updateDoc(pemesananRef, {
          Status_Pengisian_IKM: "Telah Diisi",
          Status_Pesanan: "Selesai",
        });

        let Nama_Ajukan = "";
        let Tanggal_Transaksi = "";
        let Tanggal_Ajukan = "";

        if (pemesananData.ID_Ajukan) {
          const ajukanSnap = await getDoc(
            doc(firestore, "ajukan", pemesananData.ID_Ajukan)
          );
          if (ajukanSnap.exists()) {
            const dataAjukan = ajukanSnap.data();
            Nama_Ajukan = dataAjukan.Nama_Ajukan;
            Tanggal_Ajukan = dataAjukan.Tanggal_Pembuatan_Ajukan;
          }
        }

        if (pemesananData.ID_Transaksi) {
          const transaksiSnap = await getDoc(
            doc(firestore, "transaksi", pemesananData.ID_Transaksi)
          );
          if (transaksiSnap.exists()) {
            const dataTransaksi = transaksiSnap.data();
            Tanggal_Transaksi = dataTransaksi.Tanggal_Pengiriman_Bukti;
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

        toast.success("IKM berhasil dikirim!");
        window.location.reload();
        localStorage.removeItem("selectedOptions");
        localStorage.removeItem("responses");
        if (resetStepper) resetStepper();
      } else {
        console.warn("Pemesanan dengan ID", pemesananId, "tidak ditemukan.");
      }
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

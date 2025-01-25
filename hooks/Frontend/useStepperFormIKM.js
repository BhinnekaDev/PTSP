import { useState } from "react";

const useStepperFormIKM = () => {
  const serviceItems = [
    {
      id: 1,
      name: "Persyaratan pelayanan jelas dan terbuka",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 2,
      name: "Persyaratan pelayanan mudah dan dipenuhi",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 3,
      name: "Dibutuhkan dalam kehidupan sehari-hari",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 4,
      name: "Mudah dipahami",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 5,
      name: "Mudah diakses",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 6,
      name: "Akurat",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 7,
      name: "Ketersediaan data dan informasi",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 8,
      name: "Alur pelayanan yang jelas dan sederhana",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 9,
      name: "Sistem dan prosedur pelayanan masih berpeluang menimbulkan KKN",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 10,
      name: "Informasi target waktu penyelesaian pelayanan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 11,
      name: "Penyelesaian pelayanan sesuai dengan target waktu",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 12,
      name: "Biaya pelayanan jelas dan terbuka",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 13,
      name: "Informasi daftar produk atau jasa layanan terbuka dan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 14,
      name: "Sarana Pengaduan atau keluhan pelayanan publik tersedia ",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 15,
      name: "Prosedur dan tindak lanjut penanganan pengaduan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 16,
      name: "Keberadaan petugas layanan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 17,
      name: "Petugas sigap, ahli dan cekatan",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 18,
      name: "Sikap dan perilaku petugas pelayanan baik dan bertanggung jawab",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 19,
      name: "Sarana dan prasarana pelayanan aman, nyaman dan mudah dijangkau",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      id: 20,
      name: "Pelayanan publik pada instansi ini sudah berjalan dengan baik",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
  ];

  const itemsPerPage = 5;
  const [currentStep, setCurrentStep] = useState(0);

  const startIndex = currentStep * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = serviceItems.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < serviceItems.length) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return {
    serviceItems,
    currentItems,
    currentStep,
    handleNext,
    handlePrevious,
    startIndex,
    endIndex,
    itemsPerPage,
  };
};

export default useStepperFormIKM;

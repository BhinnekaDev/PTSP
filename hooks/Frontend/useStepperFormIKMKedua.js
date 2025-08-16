import { useState } from "react";

const useStepperFormIKM = () => {
  const serviceItems = [
    {
      ID: 1,
      Name: "Persyaratan pelayanan jelas dan terbuka",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 2,
      Name: "Persyaratan pelayanan mudah dan dipenuhi",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 3,
      Name: "Dibutuhkan dalam kehidupan sehari-hari",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 4,
      Name: "Mudah dipahami",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 5,
      Name: "Mudah diakses",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 6,
      Name: "Akurat",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 7,
      Name: "Ketersediaan data dan informasi",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 8,
      Name: "Alur pelayanan yang jelas dan sederhana",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 9,
      Name: "Sistem dan prosedur pelayanan masih berpeluang menimbulkan KKN",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 10,
      Name: "Informasi target waktu penyelesaian pelayanan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 11,
      Name: "Penyelesaian pelayanan sesuai dengan target waktu",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 12,
      Name: "Biaya pelayanan jelas dan terbuka",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 13,
      Name: "Informasi daftar produk atau jasa layanan terbuka dan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 14,
      Name: "Sarana Pengaduan atau keluhan pelayanan publik tersedia ",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 15,
      Name: "Prosedur dan tindak lanjut penanganan pengaduan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 16,
      Name: "Keberadaan petugas layanan jelas",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 17,
      Name: "Petugas sigap, ahli dan cekatan",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 18,
      Name: "Sikap dan perilaku petugas pelayanan baik dan bertanggung jawab",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 19,
      Name: "Sarana dan prasarana pelayanan aman, nyaman dan mudah dijangkau",
      KualitasLayanan: "",
      HarapanKonsumen: "",
    },
    {
      ID: 20,
      Name: "Pelayanan publik pada instansi ini sudah berjalan dengan baik",
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

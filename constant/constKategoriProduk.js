import { FaMountain, FaCloudBolt, FaWind } from "react-icons/fa6";
import InformasiMeteorologi from "@/app/Produk/components/InformasiMeteorologi";
import InformasiKlimatologi from "@/app/Produk/components/InformasiKlimatologi";
import InformasiGeofisika from "@/app/Produk/components/InformasiGeofisika";
import JasaMeteorologi from "@/app/Produk/components/JasaMeteorologi";
import JasaKlimatologi from "@/app/Produk/components/JasaKlimatologi";
import JasaGeofisika from "@/app/Produk/components/JasaGeofisika";

export const KategoriProduk = [
  {
    name: "Stasiun Meteorologi",
    description:
      "Pemantauan dan pengamatan kondisi cuaca dan atmosfer, termasuk suhu, kelembapan, dan tekanan udara.",
    icon: <FaMountain size={70} className="text-primary mb-4" />,
    component: <InformasiMeteorologi />,
  },
  {
    name: "Stasiun Klimatologi",
    description:
      "Penelitian dan analisis perubahan iklim jangka panjang, pola cuaca, dan dampak lingkungan.",
    icon: <FaCloudBolt size={70} className="text-primary mb-4" />,
    component: <InformasiKlimatologi />,
  },
  {
    name: "Stasiun Geofisika",
    description:
      "Pemantauan aktivitas geofisika seperti gempa bumi, tsunami, dan fenomena terkait struktur bumi.",
    icon: <FaWind size={70} className="text-primary mb-4" />,
    component: <InformasiGeofisika />,
  },
];

export const KategoriJasa = [
  {
    name: "Stasiun Meteorologi",
    description:
      "Pemantauan dan pengamatan kondisi cuaca dan atmosfer, termasuk suhu, kelembapan, dan tekanan udara.",
    icon: <FaMountain size={70} className="text-primary mb-4" />,
    component: <JasaMeteorologi />,
  },
  {
    name: "Stasiun Klimatologi",
    description:
      "Penelitian dan analisis perubahan iklim jangka panjang, pola cuaca, dan dampak lingkungan.",
    icon: <FaCloudBolt size={70} className="text-primary mb-4" />,
    component: <JasaKlimatologi />,
  },
  {
    name: "Stasiun Geofisika",
    description:
      "Pemantauan aktivitas geofisika seperti gempa bumi, tsunami, dan fenomena terkait struktur bumi.",
    icon: <FaWind size={70} className="text-primary mb-4" />,
    component: <JasaGeofisika />,
  },
];

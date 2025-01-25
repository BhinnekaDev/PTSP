import { Card, Typography } from "@/app/MTailwind";

const TABLE_HEAD = ["JENIS PENERIMAAN NEGARA BUKAN PAJAK", "SATUAN", "TARIF"];

const TABLE_ROWS = [
  {
    jenis:
      "B. INFORMASI KHUSUS METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA SESUAI PERMINTAAN",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "1. INFORMASI METEOROLOGI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. INFORMASI CUACA KHUSUS UNTUK KEGIATAN OLAH RAGA",
    satuan: "PER LOKASI PER HARI",
    tarif: "Rp 100.000,00",
  },
  {
    jenis: "B. INFORMASI CUACA KHUSUS UNTUK KEGIATAN KOMERSIAL OUTDOOR/INDOOR",
    satuan: "PER LOKASI PER HARI",
    tarif: "Rp 100.000,00",
  },
  {
    jenis: "C. INFORMASI RADAR CUACA (PER 10 MENIT)",
    satuan: "PER DATA PER HARI",
    tarif: "Rp 70.000,00",
  },
  {
    jenis: "2. INFORMASI KLIMATOLOGI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. INFORMASI IKLIM MARITIM",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "1. PETA SPASIAL INFORMASI MARITIM",
    satuan: "PER PETA PER BULAN",
    tarif: "Rp 300.000,00",
  },
  {
    jenis: "2. INFORMASI TABULAR DAN GRAFIK MARITIM",
    satuan: "PER TABEL PER BULAN",
    tarif: "Rp 350.000,00",
  },
  {
    jenis: "B. ATLAS POTENSI RAWAN BANJIR",
    satuan: "PER ATLAS",
    tarif: "Rp 350.000,00",
  },
  {
    jenis: "3. INFORMASI PERUBAHAN IKLIM DAN KUALITAS UDARA",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. INFORMASI PERUBAHAN IKLIM",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "1. PUBLIKASI BERUPA INFORMASI PERUBAHAN IKLIM DAN KUALITAS UDARA",
    satuan: "PER BUKU",
    tarif: "Rp 100.000,00",
  },
  {
    jenis: "2. ATLAS",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. KERENTANAN PERUBAHAN IKLIM",
    satuan: "PER ATLAS",
    tarif: "Rp 450.000,00",
  },
  {
    jenis: "B. POTENSI ENERGI MATAHARI DI INDONESIA",
    satuan: "PER ATLAS",
    tarif: "Rp 300.000,00",
  },
  {
    jenis: "C. POTENSI ENERGI ANGIN DI INDONESIA",
    satuan: "PER ATLAS",
    tarif: "Rp 300.000,00",
  },
  {
    jenis: "B. PENGAMBILAN SAMPEL KUALITAS UDARA",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "1. SULFUR DIOKSIDA (SO₂)",
    satuan: "PER SAMPEL",
    tarif: "Rp 30.000,00",
  },
  {
    jenis: "2. NITROGEN OKSIDA (NO₂)",
    satuan: "PER SAMPEL",
    tarif: "Rp 30.000,00",
  },
  {
    jenis: "3. KARBON DIOKSIDA (CO₂)",
    satuan: "PER SAMPEL",
    tarif: "Rp 40.000,00",
  },
  {
    jenis: "4. OZON (O₃)",
    satuan: "PER SAMPEL",
    tarif: "Rp 30.000,00",
  },
  {
    jenis: "5. SUSPENDED PARTICULATE MATTER (SPM)",
    satuan: "PER SAMPEL",
    tarif: "Rp 60.000,00",
  },
  {
    jenis: "6. DEBU PARTICULATE MATTER (PM10)",
    satuan: "PER SAMPEL",
    tarif: "Rp 60.000,00",
  },
  {
    jenis: "7. DEBU PARTICULATE MATTER (PM2.5)",
    satuan: "PER SAMPEL",
    tarif: "Rp 90.000,00",
  },
  {
    jenis: "8. KIMIA AIR HUJAN",
    satuan: "PER SAMPEL",
    tarif: "Rp 230.000,00",
  },
  {
    jenis: "9. METHAN (CH₄)",
    satuan: "PER SAMPEL",
    tarif: "Rp 40.000,00",
  },
  {
    jenis: "C. PENGUJIAN SAMPEL KUALITAS UDARA",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "1. SULFUR DIOKSIDA (SO₂)",
    satuan: "PER SAMPEL",
    tarif: "Rp 20.000,00",
  },
  {
    jenis: "2. NITROGEN OKSIDA (NO₂)",
    satuan: "PER SAMPEL",
    tarif: "Rp 20.000,00",
  },
  {
    jenis: "3. KARBON DIOKSIDA (CO₂)",
    satuan: "PER SAMPEL",
    tarif: "Rp 30.000,00",
  },
  {
    jenis: "4. OZON (O₃)",
    satuan: "PER SAMPEL",
    tarif: "Rp 20.000,00",
  },
  {
    jenis: "5. SUSPENDED PARTICULATE MATTER (SPM)",
    satuan: "PER SAMPEL",
    tarif: "Rp 50.000,00",
  },
  {
    jenis: "6. DEBU PARTICULATE MATTER (PM10)",
    satuan: "PER SAMPEL",
    tarif: "Rp 50.000,00",
  },
  {
    jenis: "7. DEBU PARTICULATE MATTER (PM2.5)",
    satuan: "PER SAMPEL",
    tarif: "Rp 70.000,00",
  },
  {
    jenis: "8. KIMIA AIR HUJAN",
    satuan: "PER SAMPEL",
    tarif: "Rp 240.000,00",
  },
  {
    jenis: "9. METHAN (CH₄)",
    satuan: "PER SAMPEL",
    tarif: "Rp 30.000,00",
  },
  {
    jenis: "4. INFORMASI GEOFISIKA",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. BUKU DAN PETA VARIASI MAGNET BUMI (EPOCH)",
    satuan: "PER BUKU",
    tarif: "Rp 300.000,00",
  },
  {
    jenis: "B. PETA TINGKAT KERAWANAN PETIR",
    satuan: "PER LOKASI PER TAHUN",
    tarif: "Rp 200.000,00",
  },
  {
    jenis: "C. WAKTU TERBIT DAN TERBENAM MATAHARI ATAU BULAN",
    satuan: "PER LOKASI PER TAHUN",
    tarif: "Rp 50.000,00",
  },
  {
    jenis: "D. BUKU ALMANAK BADAN METEOROLOGI KLIMATOLOGI DAN GEOFISIKA",
    satuan: "PER BUKU PER TAHUN",
    tarif: "Rp 150.000,00",
  },
  {
    jenis: "E. BUKU PETA KETINGGIAN HILAL",
    satuan: "PER BUKU PER TAHUN",
    tarif: "Rp 150.000,00",
  },
  {
    jenis: "F. TITIK DASAR GAYA BERAT (GRAVITASI)",
    satuan: "PER TITIK DASAR GAYA BERAT",
    tarif: "Rp 150.000,00",
  },
  {
    jenis: "G. KEJADIAN PETIR",
    satuan: "PER LOKASI PER HARI",
    tarif: "Rp 75.000,00",
  },
];

function Tabel() {
  return (
    <Card className="h-full w-full">
      <div className="overflow-auto" style={{ maxHeight: "400px" }}>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ jenis, satuan, tarif, isHeading }, index) => (
              <tr
                key={`${jenis}-${index}`} // Using both the jenis and index to ensure uniqueness
                className={
                  isHeading
                    ? "font-semibold bg-blue-gray-100"
                    : "even:bg-blue-gray-50/50"
                }
              >
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {jenis}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {satuan}
                  </Typography>
                </td>
                <td className="p-4 text-right">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {tarif}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default Tabel;

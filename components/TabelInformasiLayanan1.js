import { Card, Typography } from "@/app/MTailwind";

const TABLE_HEAD = ["JENIS PENERIMAAN NEGARA BUKAN PAJAK", "SATUAN", "TARIF"];

const TABLE_ROWS = [
  {
    jenis: "A. INFORMASI UMUM METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "1. INFORMASI CUACA UNTUK PENERBANGAN",
    satuan: "PER ROUTE UNIT",
    tarif: "4% DARI BIAYA PELAYANAN JASA NAVIGASI PENERBANGAN",
  },
  {
    jenis: "2. INFORMASI CUACA UNTUK PELAYARAN",
    satuan: "PER ROUTE PER HARI",
    tarif: "Rp 250.000,00",
  },
  {
    jenis: "3. INFORMASI CUACA UNTUK PELABUHAN",
    satuan: "PER LOKASI PER HARI",
    tarif: "Rp 225.000,00",
  },
  {
    jenis: "4. INFORMASI CUACA UNTUK PENGEBORAN LEPAS PANTAI",
    satuan: "PER DOKUMEN PER LOKASI PER HARI",
    tarif: "Rp 330.000,00",
  },
  {
    jenis: "5. INFORMASI IKLIM UNTUK AGRO INDUSTRI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. ANALISIS DAN PRAKIRAAN HUJAN BULANAN",
    satuan: "PER BUKU",
    tarif: "Rp 65.000,00",
  },
  {
    jenis: "B. PRAKIRAAN MUSIM KEMARAU",
    satuan: "PER BUKU",
    tarif: "Rp 230.000,00",
  },
  {
    jenis: "C. PRAKIRAAN MUSIM HUJAN",
    satuan: "PER BUKU",
    tarif: "Rp 230.000,00",
  },
  {
    jenis: "D. ATLAS KESESUAIAN AGROKLIMAT",
    satuan: "PER BUKU",
    tarif: "Rp 230.000,00",
  },
  {
    jenis: "E. ATLAS NORMAL TEMPERATUR PERIODE 1981-2010",
    satuan: "PER BUKU",
    tarif: "Rp 1.500.000,00",
  },
  {
    jenis: "F. ATLAS WINDROSE WILAYAH INDONESIA PERIODE 1981-2010",
    satuan: "PER BUKU",
    tarif: "Rp 1.500.000,00",
  },
  {
    jenis: "G. ATLAS CURAH HUJAN DI INDONESIA RATA-RATA PERIODE 1981-2010",
    satuan: "PER BUKU",
    tarif: "Rp 1.500.000,00",
  },
  {
    jenis: "6. INFORMASI KUALITAS UDARA RATA-RATA MINGGUAN UNTUK INDUSTRI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. PARTICULATE MATTER (PM10)",
    satuan: "PER STASIUN PER TAHUN",
    tarif: "Rp 70.000,00",
  },
  {
    jenis: "B. PARTICULATE MATTER (PM2.5)",
    satuan: "PER STASIUN PER TAHUN",
    tarif: "Rp 70.000,00",
  },
  {
    jenis: "C. SULFUR DIOKSIDA (SO2)",
    satuan: "PER STASIUN PER TAHUN",
    tarif: "Rp 60.000,00",
  },
  {
    jenis: "D. NITROGEN OKSIDA (NOx)",
    satuan: "PER STASIUN PER TAHUN",
    tarif: "Rp 60.000,00",
  },
  {
    jenis: "E. OZON (O3)",
    satuan: "PER STASIUN PER TAHUN",
    tarif: "Rp 60.000,00",
  },
  {
    jenis: "F. KARBON MONOKSIDA (CO)",
    satuan: "PER STASIUN PER TAHUN",
    tarif: "Rp 60.000,00",
  },
  {
    jenis: "G. KARBON DIOKSIDA (CO2)",
    satuan: "PER SAMPEL",
    tarif: "Rp 80.000,00",
  },
  {
    jenis: "H. METHAN (CH4)",
    satuan: "PER SAMPEL",
    tarif: "Rp 80.000,00",
  },
  {
    jenis: "7. INFORMASI PETA KEGEMPAAN UNTUK PERENCANAAN KONTRUKSI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. PETA KEGEMPAAN",
    satuan: "PER PROVINSI PER TAHUN",
    tarif: "Rp 250.000,00",
  },
  {
    jenis:
      "8. INFORMASI METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA UNTUK KEPERLUAN KLAIM ASURANSI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "A. INFORMASI METEOROLOGI",
    satuan: "PER LOKASI PER HARI",
    tarif: "Rp 175.000,00",
  },
  {
    jenis: "B. INFORMASI GEOFISIKA",
    satuan: "PER LOKASI PER HARI",
    tarif: "Rp 185.000,00",
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
                key={jenis}
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
                <td className="p-4">
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

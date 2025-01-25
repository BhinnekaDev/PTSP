import { Card, Typography } from "@/app/MTailwind";

const TABLE_HEAD = ["JENIS PENERIMAAN NEGARA BUKAN PAJAK", "SATUAN", "TARIF"];

const TABLE_ROWS = [
  {
    jenis: "A. JASA KONSULTASI METEOROLOGI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis:
      "INFORMASI METEOROLOGI KHUSUS UNTUK PENDUKUNG KEGIATAN PROYEK, SURVEI, DAN PENELITIAN KOMERSIAL",
    satuan: "PER LOKASI",
    tarif: "Rp 3.750.000,00",
  },
  {
    jenis: "B. JASA KONSULTASI KLIMATOLOGI",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis: "ANALISIS IKLIM",
    satuan: "PER LOKASI",
    tarif: "Rp 9.500.000,00",
  },
  {
    jenis: "C. JASA KONSULTASI GEOFISIKA",
    satuan: "",
    tarif: "",
    isHeading: true,
  },
  {
    jenis:
      "INFORMASI PENDAHULUAN DI BIDANG GEOFISIKA SEBAGAI PENDUKUNG KEGIATAN PROYEK, SURVEI, DAN PENELITIAN KOMERSIAL",
    satuan: "PER LOKASI",
    tarif: "Rp 12.300.000,00",
  },
];

function Tabel() {
  return (
    <Card className="h-full w-full">
      <div className="overflow-auto" style={{ maxHeight: "200px" }}>
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

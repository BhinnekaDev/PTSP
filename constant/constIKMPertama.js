import React from "react";
import { Checkbox, Typography, Button } from "@/app/MTailwind";
import useMasukanIKM from "@/hooks/Backend/useMasukanIKM";

const FormIKMPertama = ({ handleSelanjutnya, pemesanan }) => {
  const { selectedOptions, handleCheckboxChange, handleIKMSubmit } =
    useMasukanIKM();
  const handleSubmitWithNextStep = async () => {
    if (!pemesanan?.id) {
      console.error("Pemesanan ID tidak valid");
      toast.error("Data pemesanan tidak ditemukan.");
      return;
    }
    await handleIKMSubmit(pemesanan.id);
    handleSelanjutnya();
  };
  return (
    <div className="grid grid-cols-2 gap-4 mb-2">
      {/* Meteorologi Section */}
      <div className="grid grid-cols-1">
        <Typography variant="h6" className="font-semibold">
          Meteorologi
        </Typography>
        <Checkbox
          color="blue"
          label="Informasi cuaca publik (rutin, peringatan, dini cuaca, pasang surut air laut)"
          checked={selectedOptions.meteorologi.includes(
            "Informasi cuaca publik (rutin, peringatan, dini cuaca, pasang surut air laut)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "meteorologi",
              "Informasi cuaca publik (rutin, peringatan, dini cuaca, pasang surut air laut)"
            )
          }
        />
        <Checkbox
          color="blue"
          label="Informasi cuaca khusus (maritim, penerbangan, klaim asuransi)"
          checked={selectedOptions.meteorologi.includes(
            "Informasi cuaca khusus (maritim, penerbangan, klaim asuransi)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "meteorologi",
              "Informasi cuaca khusus (maritim, penerbangan, klaim asuransi)"
            )
          }
        />
        <Checkbox
          color="blue"
          label="Analisis cuaca (kecelakaan pesawat, kecelakaan kapal laut)"
          checked={selectedOptions.meteorologi.includes(
            "Analisis cuaca (kecelakaan pesawat, kecelakaan kapal laut)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "meteorologi",
              "Analisis cuaca (kecelakaan pesawat, kecelakaan kapal laut)"
            )
          }
        />
        <Checkbox color="blue" label="Informasi titik panas (hotspot)" />
        <Checkbox
          color="blue"
          label="Informasi tentang tingkat kemudahan terjadinya kebakaran hutan dan lahan"
          checked={selectedOptions.meteorologi.includes(
            "Informasi tentang tingkat kemudahan terjadinya kebakaran hutan dan lahan"
          )}
          onChange={() =>
            handleCheckboxChange(
              "meteorologi",
              "Informasi tentang tingkat kemudahan terjadinya kebakaran hutan dan lahan"
            )
          }
        />
      </div>

      {/* Klimatologi Section */}
      <div className="grid grid-cols-1">
        <Typography variant="h6" className="font-semibold">
          Klimatologi
        </Typography>
        <Checkbox
          color="blue"
          label="Prakiraan musim"
          checked={selectedOptions.klimatologi.includes("Prakiraan musim")}
          onChange={() =>
            handleCheckboxChange("klimatologi", "Prakiraan musim")
          }
        />
        <Checkbox
          color="blue"
          label="Informasi iklim khusus"
          checked={selectedOptions.klimatologi.includes(
            "Informasi iklim khusus"
          )}
          onChange={() =>
            handleCheckboxChange("klimatologi", "Informasi iklim khusus")
          }
        />
        <Checkbox
          color="blue"
          label="Analisis dan prakiraan curah hujan bulanan/dasarian"
          checked={selectedOptions.klimatologi.includes(
            "Analisis dan prakiraan curah hujan bulanan/dasarian"
          )}
          onChange={() =>
            handleCheckboxChange(
              "klimatologi",
              "Analisis dan prakiraan curah hujan bulanan/dasarian"
            )
          }
        />
        <Checkbox
          color="blue"
          label="Tren curah hujan"
          checked={selectedOptions.klimatologi.includes("Tren curah hujan")}
          onChange={() =>
            handleCheckboxChange("klimatologi", "Tren curah hujan")
          }
        />
        <Checkbox
          color="blue"
          label="Informasi kulaitas udara"
          checked={selectedOptions.klimatologi.includes(
            "Informasi kulaitas udara"
          )}
          onChange={() =>
            handleCheckboxChange("klimatologi", "Informasi kulaitas udara")
          }
        />
        <Checkbox
          color="blue"
          label="Analisis iklim ekstrim"
          checked={selectedOptions.klimatologi.includes(
            "Analisis iklim ekstrim"
          )}
          onChange={() =>
            handleCheckboxChange("klimatologi", "Analisis iklim ekstrim")
          }
        />
        <Checkbox
          color="blue"
          label="Informasi iklim terapan (peta potensi energi baru terbarukan, informasi potensi DBD, dst.)"
          checked={selectedOptions.klimatologi.includes(
            "Informasi iklim terapan (peta potensi energi baru terbarukan, informasi potensi DBD, dst.)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "klimatologi",
              "Informasi iklim terapan (peta potensi energi baru terbarukan, informasi potensi DBD, dst.)"
            )
          }
        />
        <Checkbox
          color="blue"
          label="Informasi perubahan iklim (keterpaparan dan/atau proveksi)"
          checked={selectedOptions.klimatologi.includes(
            "Informasi perubahan iklim (keterpaparan dan/atau proveksi)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "klimatologi",
              "Informasi perubahan iklim (keterpaparan dan/atau proveksi)"
            )
          }
        />
        <Checkbox
          color="blue"
          label="Pengembalian dan pengujian sampel parameter iklim dan kualitas udara (laboratorium)"
          checked={selectedOptions.klimatologi.includes(
            "Pengembalian dan pengujian sampel parameter iklim dan kualitas udara (laboratorium)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "klimatologi",
              "Pengembalian dan pengujian sampel parameter iklim dan kualitas udara (laboratorium)"
            )
          }
        />
      </div>

      {/* Geofisika Section */}
      <div className="grid grid-cols-1">
        <Typography variant="h6" className="font-semibold">
          Geofisika
        </Typography>
        <Checkbox
          color="blue"
          label="Informasi gempabumi dan peringatan dini tsunami"
          checked={selectedOptions.geofisika.includes(
            "Informasi gempabumi dan peringatan dini tsunami"
          )}
          onChange={() =>
            handleCheckboxChange(
              "geofisika",
              "Informasi gempabumi dan peringatan dini tsunami"
            )
          }
        />
        <Checkbox color="blue" label="Peta seismisitas" />
        <Checkbox
          color="blue"
          label="Informasi tanda waktu (hilal dan gerhana)"
          checked={selectedOptions.geofisika.includes(
            "Informasi tanda waktu (hilal dan gerhana)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "geofisika",
              "Informasi tanda waktu (hilal dan gerhana)"
            )
          }
        />
        <Checkbox
          color="blue"
          label="Informasi geofisika potensial (gravitasi, magnet bumi, dan hari guruh/petir)"
          checked={selectedOptions.geofisika.includes(
            "Informasi geofisika potensial (gravitasi, magnet bumi, dan hari guruh/petir)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "geofisika",
              "Informasi geofisika potensial (gravitasi, magnet bumi, dan hari guruh/petir)"
            )
          }
        />
        <Checkbox color="blue" label="Peta rendaman tsunami" />
        <Checkbox
          color="blue"
          label="Informasi seismologi teknik (shake map)(peta mikrozonasi dan percepatan tanah)"
          checked={selectedOptions.geofisika.includes(
            "Informasi seismologi teknik (shake map)(peta mikrozonasi dan percepatan tanah)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "geofisika",
              "Informasi seismologi teknik (shake map)(peta mikrozonasi dan percepatan tanah)"
            )
          }
        />
      </div>

      {/* Instrumentasi Section */}
      <div className="grid grid-cols-1">
        <Typography variant="h6" className="font-semibold">
          Instrumentasi
        </Typography>
        <Checkbox
          color="blue"
          label="Data meteorologi, klimatologi, dan geofisika (suhu, curah hujan, angin dan grid)"
          checked={selectedOptions.instrumentasi.includes(
            "Data meteorologi, klimatologi, dan geofisika (suhu, curah hujan, angin dan grid)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "instrumentasi",
              "Data meteorologi, klimatologi, dan geofisika (suhu, curah hujan, angin dan grid)"
            )
          }
        />
        <Checkbox
          color="blue"
          label="Kalibrasi (peralatan MKG)"
          checked={selectedOptions.instrumentasi.includes(
            "Kalibrasi (peralatan MKG)"
          )}
          onChange={() =>
            handleCheckboxChange("instrumentasi", "Kalibrasi (peralatan MKG)")
          }
        />
        <Checkbox
          color="blue"
          label="Konsultasi (untuk penerapan informasi khusus MKG)"
          checked={selectedOptions.instrumentasi.includes(
            "Konsultasi (untuk penerapan informasi khusus MKG)"
          )}
          onChange={() =>
            handleCheckboxChange(
              "instrumentasi",
              "Konsultasi (untuk penerapan informasi khusus MKG)"
            )
          }
        />
        <Checkbox color="blue" label="Sewa peralatan MKG" />
      </div>

      {/* Humas Section */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Typography variant="h6" className="font-semibold">
            Humas
          </Typography>
          <Checkbox
            color="blue"
            label="Kunjungan"
            checked={selectedOptions.humas.includes("Kunjungan")}
            onChange={() => handleCheckboxChange("humas", "Kunjungan")}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-end col-span-2 p-5">
          <div className="flex justify-end">
            <Button
              onClick={handleSubmitWithNextStep}
              className="px-4 py-2 mt-6 bg-green-500 text-white rounded-lg button-effect"
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormIKMPertama;

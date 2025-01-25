import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
  Card,
} from "@/app/MTailwind";
import TabelInformasiUmum from "@/components/TabelInformasiLayanan1";
import TabelInformasiKhusus from "@/components/TabelInformasiLayanan2";
import TabelJasaKonsultasi from "@/components/TabelInformasiLayanan3";
import AlurLayanan from "@/assets/img/Regulasi/AlurLayanan.jpg";
import StandarLayanan1 from "@/assets/img/Regulasi/StandarLayanan1.jpg";
import StandarLayanan2 from "@/assets/img/Regulasi/StandarLayanan2.jpg";

export const useDialogRegulasi = () => {
  const [isDialogOpenAlurLayanan, setIsDialogOpenAlurLayanan] = useState(false);
  const handleDialogOpenAlurLayanan = () => setIsDialogOpenAlurLayanan(true);
  const handleDialogCloseAlurLayanan = () => setIsDialogOpenAlurLayanan(false);
  const DialogAlurLayanan = (
    <Dialog
      size="sm"
      open={isDialogOpenAlurLayanan}
      handler={setIsDialogOpenAlurLayanan}
    >
      <DialogHeader className="uppercase">Alur Pelayanan</DialogHeader>
      <DialogBody className="flex items-center justify-center w-full max-w-xs">
        <Image
          src={AlurLayanan}
          alt="Logo BMKG"
          className=""
          quality={100}
          priority
        />
      </DialogBody>
    </Dialog>
  );

  const images = [StandarLayanan1, StandarLayanan2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpenStandarLayanan, setIsDialogOpenStandarLayanan] =
    useState(false);
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleDialogOpenStandarLayanan = () =>
    setIsDialogOpenStandarLayanan(true);
  const handleDialogCloseStandarLayanan = () =>
    setIsDialogOpenStandarLayanan(false);
  const DialogStandarLayanan = (
    <div>
      <Dialog
        size="lg"
        open={isDialogOpenStandarLayanan}
        handler={setIsDialogOpenStandarLayanan}
      >
        <DialogHeader className="uppercase">Standar Pelayanan</DialogHeader>
        <DialogBody className="flex items-center justify-center w-full max-w-xs">
          <div className="flex flex-col items-center">
            <Image
              src={images[currentIndex]}
              alt={`Logo BMKG ${currentIndex + 1}`}
              className="mb-2"
              quality={100}
              priority
            />
            <div className="flex justify-end w-full mt-2">
              {currentIndex === 0 ? (
                <button
                  onClick={nextImage}
                  className="text-primary bg-white rounded-md border-2 p-1.5"
                >
                  Selanjutnya
                </button>
              ) : currentIndex === 1 ? (
                <button
                  onClick={prevImage}
                  className="text-primary bg-white rounded-md border-2 p-1.5"
                >
                  Sebelumnya
                </button>
              ) : (
                <>
                  <button
                    onClick={prevImage}
                    className="text-primary bg-white rounded-md border-2 p-1.5"
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={nextImage}
                    className="text-primary bg-white rounded-md border-2 p-1.5"
                  >
                    Selanjutnya
                  </button>
                </>
              )}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );

  const [isDialogOpenRegulasiPelayanan, setIsDialogOpenRegulasiPelayanan] =
    useState(false);
  const handleDialogOpenRegulasiPelayanan = () =>
    setIsDialogOpenRegulasiPelayanan(true);
  const handleDialogCloseRegulasiPelayanan = () =>
    setIsDialogOpenRegulasiPelayanan(false);
  const DialogRegulasiPelayanan = (
    <Dialog
      size="lg"
      open={isDialogOpenRegulasiPelayanan}
      handler={setIsDialogOpenRegulasiPelayanan}
    >
      <DialogHeader className="uppercase">Regulasi Pelayanan</DialogHeader>
      <DialogBody className="flex items-center justify-center w-full max-w-xs">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="text-center lg:text-left">
            <Typography className="text-base text-black">
              Syarat dan Tata Cara Pengenaan Tarif Rp.0,00 (Nol Rupiah) Atas
              Jenis Penerimaan Negara Bukan Pajak Terhadap Kegiatan Tertentu di
              Lingkungan BMKG.
            </Typography>
            <Typography className="text-base flex text-black">
              Sesuai dengan :
              <a
                className="ml-2 text-secondary"
                target="_blank"
                href="https://ptsp.bmkg.go.id/upload/file_menu/20220413101834.PDF"
              >
                Perka No. 12 Tahun 2019 Persyaratan dan Tata Cara Pengenaan
                Tarif Nol Rupiah Atas Jenis PNBP
              </a>
            </Typography>
          </div>
          <div className="text-center lg:text-left">
            <Typography className="text-base text-black">
              Produk dan Tarif sesuai PP No. 47 Tahun 2018 Tentang Jenis dan
              Tarif penerimaan Negara Bukan Pajak yang Berlaku di BMKG.
            </Typography>
            <Typography className="text-base flex text-black">
              Sesuai dengan :
              <a
                className="ml-2 text-secondary"
                target="_blank"
                href="https://ptsp.bmkg.go.id/upload/file_menu/20181102103810.pdf"
              >
                PP No. 47 Tahun 2018
              </a>
            </Typography>
          </div>
          <div className="text-center lg:text-left">
            <Typography className="text-base text-black">
              Peraturan PTSP sesuai Perka No. 01 Tahun 2019 Tentang Pelayanan
              Terpadu Satu Pintu di BMKG.
            </Typography>
            <Typography className="text-base flex text-black">
              Sesuai dengan :
              <a
                className="ml-2 text-secondary"
                target="_blank"
                href="https://ptsp.bmkg.go.id/upload/file_menu/20190731091546.pdf"
              >
                Perka No. 01 Tahun 2019
              </a>
            </Typography>
          </div>
          <div className="text-center lg:text-left">
            <Typography className="text-base text-black">
              Manual PTSP BMKG untuk Pelanggan Untuk Alur Layanan Informasi dan
              Jasa Konsultasi MKG, Jasa Sewa Alat MKG dan Jasa Kalibrasi Alat
              MKG.
            </Typography>
            <Typography className="text-base text-black">
              <a
                className=" text-secondary"
                target="_blank"
                href="https://ptsp.bmkg.go.id/upload/file_menu/20230113084609.pdf"
              >
                Manual Alur Layanan PTSP BMKG
              </a>
            </Typography>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );

  const [kontenAktif, setKontenAktif] = useState("content1");
  const showContent = (contentId) => {
    setKontenAktif(contentId);
  };
  const [isDialogOpenTarifLayanan, setIsDialogOpenTarifLayanan] =
    useState(false);
  const handleDialogOpenTarifLayanan = () => setIsDialogOpenTarifLayanan(true);
  const handleDialogCloseTarifLayanan = () =>
    setIsDialogOpenTarifLayanan(false);
  const DialogTarifLayanan = (
    <Dialog
      size="xl"
      open={isDialogOpenTarifLayanan}
      handler={setIsDialogOpenTarifLayanan}
    >
      <DialogHeader className="uppercase">Tarif Pelayanan</DialogHeader>
      <DialogBody
        className="flex items-center justify-center w-full"
        style={{ maxHeight: "120vh", overflowY: "auto", padding: "1rem" }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="container mx-auto px-4">
            <h5 className="text-xl font-bold mt-5">
              I. INFORMASI METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
            </h5>
            <div className="container1">
              <Card className="p-4 bg-blue-800 text-white rounded-lg">
                <div className="flex justify-between">
                  <Button
                    className={`flex-1 mx-1 ${
                      kontenAktif === "content1" ? "bg-secondary" : "bg-primary"
                    }`}
                    onClick={() => showContent("content1")}
                  >
                    INFORMASI UMUM METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
                  </Button>
                  <Button
                    className={`flex-1 mx-1 ${
                      kontenAktif === "content2" ? "bg-secondary" : "bg-primary"
                    }`}
                    onClick={() => showContent("content2")}
                  >
                    INFORMASI KHUSUS METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
                    SESUAI PERMINTAAN
                  </Button>
                </div>
                <div
                  className="content_one mt-4"
                  style={{
                    display: kontenAktif === "content1" ? "block" : "none",
                  }}
                >
                  <div>
                    <TabelInformasiUmum />
                  </div>
                </div>
                <div
                  className="content_one mt-4"
                  style={{
                    display: kontenAktif === "content2" ? "block" : "none",
                  }}
                >
                  <div>
                    <TabelInformasiKhusus />
                  </div>
                </div>
              </Card>
            </div>

            <h5 className="text-xl font-bold mt-5">
              II. JASA KONSULTASI METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
            </h5>
            <div className="container2">
              <Card className="p-4 bg-blue-800 text-white rounded-lg">
                <Button className="w-full bg-secondary">
                  JASA KONSULTASI METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA
                </Button>
                <div className="content_two mt-4">
                  <div>
                    <TabelJasaKonsultasi />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );

  return {
    DialogAlurLayanan,
    DialogStandarLayanan,
    DialogRegulasiPelayanan,
    DialogTarifLayanan,
    handleDialogOpenAlurLayanan,
    handleDialogCloseAlurLayanan,
    handleDialogOpenStandarLayanan,
    handleDialogCloseStandarLayanan,
    handleDialogOpenRegulasiPelayanan,
    handleDialogCloseRegulasiPelayanan,
    handleDialogOpenTarifLayanan,
    handleDialogCloseTarifLayanan,
  };
};

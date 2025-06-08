"use client";
import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@/app/MTailwind";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import DetailTransaksi from "@/components/DetailTransaksi";
import useAmbilPemesanan from "@/hooks/Backend/useAmbilPesanan";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "@/app/globals.css";

const ListPesanan = () => {
  const { pemesananData, userData, loading, error } = useAmbilPemesanan();
  const [selectedPesanan, setSelectedPesanan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const openDialogParam = params.get("openDialog");
    const idParam = params.get("id");
    console.log("openDialog param:", openDialogParam);
    console.log("id param:", idParam);
    console.log("pemesananData:", pemesananData);

    if (openDialogParam === "true" && pemesananData.length > 0) {
      const foundPesanan = pemesananData.find((p) => p.id === idParam);
      if (foundPesanan) {
        setSelectedPesanan({ pemesanan: foundPesanan });
        setOpenDialog(true);
      } else {
        console.warn("Pesanan dengan ID tersebut tidak ditemukan");
      }
    }
  }, [pemesananData]);

  if (loading) {
    return (
      <div>
        {[...Array(3)].map((_, index) => (
          <Card
            key={index}
            shadow={false}
            className="rounded-lg border-2 border-gray-300 p-4 my-5"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="border border-gray-200 p-2.5 rounded-lg">
                  <RiFileList3Fill className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton width={100} />
                </div>
              </div>
              <Skeleton width={80} />
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div className="border-b border-gray-200 pb-2 mb-2">
                <Skeleton count={3} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {pemesananData.map((pemesanan) => (
        <Card
          key={pemesanan.id}
          shadow={false}
          className="rounded-lg border-2 border-gray-300 p-4 my-5"
        >
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="border border-gray-200 p-2.5 rounded-lg">
                <RiFileList3Fill className="h-6 w-6 text-gray-900" />
              </div>
              <div>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-1 font-bold"
                >
                  Nomor Pesanan: {pemesanan.id}
                </Typography>
                <Typography className="!text-gray-600 text-xs font-normal">
                  Tanggal Pemesanan:{" "}
                  {new Date(
                    pemesanan.Tanggal_Pemesanan.seconds * 1000
                  ).toLocaleString()}
                </Typography>
                <Typography className="!text-gray-600 text-xs font-normal">
                  Tanggal Pengajuan:{" "}
                  {pemesanan.ajukanDetail?.Tanggal_Pembuatan_Ajukan?.seconds
                    ? new Date(
                        pemesanan.ajukanDetail.Tanggal_Pembuatan_Ajukan
                          .seconds * 1000
                      ).toLocaleString()
                    : "Belum Tersedia"}
                </Typography>
              </div>
            </div>
            <Button
              size="sm"
              variant="text"
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedPesanan({ pemesanan });
                setOpenDialog(true);
              }}
            >
              <FaInfoCircle className="h-4 w-4 text-gray-600" />
              <Typography className="!font-semibold text-xs text-gray-600 lg:block hidden">
                Lihat Detail
              </Typography>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="border-b border-gray-200 pb-2 mb-2 break-words">
              <Typography className="mb-1 text-xs !font-medium !text-gray-600 break-words">
                {userData.Nama_Lengkap && userData.Nama_Perusahaan ? (
                  <>
                    {userData.Nama_Lengkap} - {userData.Nama_Perusahaan}
                  </>
                ) : (
                  userData.Nama_Lengkap || userData.Nama_Perusahaan || "N/A"
                )}
              </Typography>
              <Typography className="mb-1 text-xs !font-medium !text-gray-600 break-words">
                {userData.Email && userData.Email_Perusahaan ? (
                  <>
                    {userData.Email} - {userData.Email_Perusahaan}
                  </>
                ) : (
                  userData.Email || userData.Email_Perusahaan || "N/A"
                )}
              </Typography>
              <Typography className="mb-1 text-xs !font-medium !text-gray-600 break-words">
                {userData.No_Hp && userData.No_Hp_Perusahaan ? (
                  <>
                    {userData.No_Hp} - {userData.No_Hp_Perusahaan}
                  </>
                ) : (
                  userData.No_Hp || userData.No_Hp_Perusahaan || "N/A"
                )}
              </Typography>
            </div>
          </div>
        </Card>
      ))}
      {openDialog && (
        <DetailTransaksi
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          pemesanan={selectedPesanan?.pemesanan}
          userData={userData}
          ajukanDetail={selectedPesanan?.pemesanan?.ajukanDetail}
        />
      )}
    </div>
  );
};

const TrackingPesanan = () => {
  const { handlenavbarAktif } = useNavbarAktif();

  return (
    <section className="p-2 lg:p-6 lg:px-5 w-full lg:w-1/2 lg:mx-auto bg-white rounded-xl shadow-2xl my-16 overflow-x-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between p-4">
        <h1 className="text-xl font-semibold">Tracking Pesanan</h1>
        <Button
          className="flex mt-4 lg:mt-2 w-full lg:w-1/4 justify-center items-center gap-2"
          color="blue"
          onClick={() => handlenavbarAktif("/Produk")}
        >
          <FaPlus />
          Tambah Pesanan
        </Button>
      </div>
      <div className="justify-center items-center w-full h-full">
        <ListPesanan />
      </div>
    </section>
  );
};

export default TrackingPesanan;

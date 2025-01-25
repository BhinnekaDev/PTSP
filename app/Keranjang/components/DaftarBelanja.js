"use client";
import "@/app/globals.css";
import { Typography, Button } from "@/app/MTailwind";
import { FaTrash } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";
import useNavbarAktif from "@/hooks/Frontend/useNavbarAktif";
import useAmbilKeranjang from "@/hooks/Backend/useAmbilKeranjang";

const PemesananProduk = () => {
  const { navbarAktif, handlenavbarAktif } = useNavbarAktif();
  const HeaderPesanan = [
    "Nama",
    "Kategori",
    "Harga",
    "Kuantitas",
    "Total",
    "Action",
  ];
  const handleLanjutkanPemesanan = (path) => {
    if (
      !keranjang ||
      (!keranjang.Informasi?.length && !keranjang.Jasa?.length)
    ) {
      toast.error("Keranjang Anda kosong. Tambahkan item terlebih dahulu.");
      return;
    }
    handlenavbarAktif(path);
  };
  const { keranjang, memuat, ambilKeranjang, hapusItemKeranjang } =
    useAmbilKeranjang();
  const cartContent = keranjang
    ? [...(keranjang.Informasi || []), ...(keranjang.Jasa || [])]
    : [];
  const totalHargaKeseluruhan = cartContent.reduce((acc, item) => {
    return acc + item.Total_Harga;
  }, 0);

  return (
    <div className="mt-10 py-20 lg:py-10 z-10 relative">
      <div className="text-base justify-center text-center font-bold"></div>
      <div className="grid grid-cols-1 justify-center items-center gap-10 lg:gap-2 space-y-10">
        <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed px-4 lg:px-80 overflow-auto">
          <table className="w-full min-w-max table-fixed mx-auto bg-white rounded-2xl">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center w-10">
                  <Typography
                    variant="h6"
                    className="text-black font-black leading-none opacity-70"
                  >
                    No
                  </Typography>
                </th>
                {HeaderPesanan.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center w-40"
                  >
                    <Typography
                      variant="h6"
                      className="text-black font-black leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {memuat ? (
                <tr>
                  <td
                    colSpan={HeaderPesanan.length + 1}
                    className="text-center p-4"
                  >
                    <Skeleton count={5} height={30} />
                  </td>
                </tr>
              ) : cartContent.length > 0 ? (
                cartContent.map(
                  ({ Nama, Harga, Kuantitas, Pemilik, Total_Harga }, index) => (
                    <tr key={index}>
                      <td className="p-4 text-center">{index + 1}</td>
                      <td className="p-4">{Nama}</td>
                      <td className="p-4">{Pemilik}</td>
                      <td className="p-4">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(Harga)}
                      </td>
                      <td className="p-4">{Kuantitas}</td>
                      <td className="p-4">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(Total_Harga)}
                      </td>
                      <td className="p-4">
                        <Button
                          className="p-2 border-0 shadow-none"
                          type="button"
                          onClick={() => hapusItemKeranjang(index)}
                        >
                          <FaTrash className="text-red-500 h-5 w-5" />
                        </Button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={HeaderPesanan.length + 1}
                    className="text-center p-4"
                  >
                    Keranjang kosong
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed overflow-auto">
          <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed px-96 overflow-auto">
            <table className="w-full min-w-max table-auto bg-secondary text-white rounded-2xl shadow-2xl">
              <thead className="text-center ">
                <tr>
                  <td className="p-4 border-b border-blue-gray-50 w-44 uppercase">
                    <Typography variant="h6" className="font-extrabold">
                      Total Harga
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 w-44">
                    <Typography variant="h6" className="font-normal">
                      {memuat ? (
                        <Skeleton width={50} />
                      ) : (
                        new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(totalHargaKeseluruhan)
                      )}
                    </Typography>
                  </td>
                </tr>
              </thead>
            </table>
            <div className="flex justify-start mt-10 mx-3">
              <Button
                className="button-effect"
                type="button"
                onClick={() => handleLanjutkanPemesanan("/Ajukan")}
              >
                <span>Lanjutkan Pemesanan</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PemesananProduk;

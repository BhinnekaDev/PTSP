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

  const {
    keranjang,
    memuat,
    ambilKeranjang,
    updateKuantitasItem,
    hapusItemKeranjang,
  } = useAmbilKeranjang();

  const cartContent = keranjang
    ? [...(keranjang.Informasi || []), ...(keranjang.Jasa || [])]
    : [];

  const totalHargaKeseluruhan = cartContent.reduce((acc, item) => {
    return acc + item.Total_Harga;
  }, 0);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);

  return (
    <div className="mt-10 py-20 lg:py-10 z-10 relative">
      <div className="text-base justify-center text-center font-bold"></div>
      <div className="grid grid-cols-1 justify-center items-center gap-10 lg:gap-2 space-y-10">
        <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed px-4 lg:px-80 overflow-x-auto">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px] lg:min-w-full">
              <table className="w-full table-fixed mx-auto bg-white rounded-2xl text-sm lg:text-base">
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
                      (
                        { Nama, Harga, Kuantitas, Pemilik, Total_Harga },
                        index
                      ) => (
                        <tr key={index}>
                          <td className="p-4 text-center">{index + 1}</td>
                          <td className="p-4">{Nama}</td>
                          <td className="p-4">{Pemilik}</td>
                          <td className="p-4">{formatRupiah(Harga)}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                type="button"
                                className="px-2 py-1 text-xs bg-red-500 text-white"
                                onClick={() => {
                                  const baru = Kuantitas - 1;
                                  if (baru >= 1)
                                    updateKuantitasItem(index, baru);
                                }}
                              >
                                −
                              </Button>
                              <span className="mx-2">{Kuantitas}</span>
                              <Button
                                type="button"
                                className="px-2 py-1 text-xs bg-green-500 text-white"
                                onClick={() =>
                                  updateKuantitasItem(index, Kuantitas + 1)
                                }
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="p-4">{formatRupiah(Total_Harga)}</td>
                          <td className="p-4">
                            <Button
                              className="p-2 border-0 shadow-none"
                              type="button"
                              onClick={() => hapusItemKeranjang(index)}
                              title="Hapus item"
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
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full h-full mx-auto text-center leading-relaxed px-4 lg:px-96 overflow-x-hidden lg:overflow-x-hidden">
          <div className="w-full">
            <div className="w-full max-w-full lg:min-w-full overflow-y-hidden overflow-x-hidden lg:overflow-x-hidden py-4 lg:py-0">
              <table className="w-full table-auto bg-secondary text-white rounded-2xl text-sm lg:text-base">
                <thead className="text-center">
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
                          formatRupiah(totalHargaKeseluruhan)
                        )}
                      </Typography>
                    </td>
                  </tr>
                </thead>
              </table>
              <div className="flex justify-center mt-10 mx-3">
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
    </div>
  );
};

export default PemesananProduk;

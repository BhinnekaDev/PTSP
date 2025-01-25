import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanTransaksi from "@/app/Transaksi/components/Transaksi";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

export default function Transaksi() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <TampilanTransaksi />
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanKeranjang from "@/app/Keranjang/components/DaftarBelanja";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";
import FloatingTools from "@/components/FloatingTools";

function Keranjang() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <TampilanKeranjang />
      <FloatingTools />
      <Footer />
    </div>
  );
}

export default Keranjang;

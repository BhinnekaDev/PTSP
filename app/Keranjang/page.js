import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanKeranjang from "@/app/Keranjang/components/DaftarBelanja";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";
import FloatingChat from "@/components/FloatingChat";

function Keranjang() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <TampilanKeranjang />
      <FloatingChat />
      <Footer />
    </div>
  );
}

export default Keranjang;

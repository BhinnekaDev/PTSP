import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanKeranjang from "@/app/Keranjang/components/DaftarBelanja";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

function Keranjang() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <TampilanKeranjang />
      <Footer />
    </div>
  );
}

export default Keranjang;

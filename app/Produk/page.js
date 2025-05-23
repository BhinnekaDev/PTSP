import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanProduk from "@/app/Produk/components/KategoriKatalog";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

function Produk() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <HeaderTemplate />
      <TampilanProduk />
      <Footer />
      <FloatingChat />
    </div>
  );
}

export default Produk;

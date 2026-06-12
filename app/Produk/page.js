import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanProduk from "@/app/Produk/components/KategoriKatalog";
import Footer from "@/components/Footer";
import FloatingTools from "@/components/FloatingTools";

function Produk() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <HeaderTemplate />
      <TampilanProduk />
      <Footer />
      <FloatingTools />
    </div>
  );
}

export default Produk;

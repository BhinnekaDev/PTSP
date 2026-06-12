import Navbar from "@/components/Navbar";
import Pengaduan from "@/app/Pengaduan/components/Pengaduan";
import Footer from "@/components/Footer";
import FloatingTools from "@/components/FloatingTools";
import toast, { Toaster } from "react-hot-toast";

function Beranda() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Pengaduan />
      <Footer />
      <FloatingTools />
    </div>
  );
}

export default Beranda;

import Navbar from "@/components/Navbar";
import Pengaduan from "@/app/Pengaduan/components/Pengaduan";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import toast, { Toaster } from "react-hot-toast";

function Beranda() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Pengaduan />
      <Footer />
      <FloatingChat />
    </div>
  );
}

export default Beranda;

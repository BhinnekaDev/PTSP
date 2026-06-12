import Navbar from "@/components/Navbar";
import Saran from "@/app/Saran/components/Saran";
import Footer from "@/components/Footer";
import FloatingTools from "@/components/FloatingTools";
import toast, { Toaster } from "react-hot-toast";

function Beranda() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Saran />
      <Footer />
      <FloatingTools />
    </div>
  );
}

export default Beranda;

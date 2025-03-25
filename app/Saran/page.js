import Navbar from "@/components/Navbar";
import Saran from "@/app/Saran/components/Saran";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import toast, { Toaster } from "react-hot-toast";

function Beranda() {
  return (
    <div className="position-relative top-0 overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Saran />
      <Footer />
      <FloatingChat />
    </div>
  );
}

export default Beranda;

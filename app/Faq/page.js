import Navbar from "@/components/Navbar";
import FAQ from "@/app/Faq/components/Faq";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";
import FloatingChat from "@/components/FloatingChat";

function Beranda() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <FAQ />
      <Footer />
      <FloatingChat />
    </div>
  );
}

export default Beranda;

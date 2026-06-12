import Navbar from "@/components/Navbar";
import FAQ from "@/app/Faq/components/Faq";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";
import FloatingTools from "@/components/FloatingTools";

function Beranda() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <FAQ />
      <Footer />
      <FloatingTools />
    </div>
  );
}

export default Beranda;

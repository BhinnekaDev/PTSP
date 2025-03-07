import Navbar from "@/components/Navbar";
import FAQ from "@/app/Faq/components/Faq";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

function Beranda() {
  return (
    <div className="position-relative top-0 overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <FAQ />
      <Footer />
    </div>
  );
}

export default Beranda;

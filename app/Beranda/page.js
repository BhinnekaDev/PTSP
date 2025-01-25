import Navbar from "@/components/Navbar";
import Carousel from "@/app/Beranda/components/Carousel";
import Profil from "@/app/Beranda/components/Profile";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

function Beranda() {
  return (
    <div className="position-relative top-0 overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Carousel />
      <Profil />
      <Footer />
    </div>
  );
}

export default Beranda;

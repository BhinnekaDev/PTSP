import Navbar from "@/components/Navbar";
import Carousel from "@/app/Beranda/components/Carousel";
import Profil from "@/app/Beranda/components/Profile";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { Toaster } from "react-hot-toast";

function Beranda() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Carousel />
      <Profil />
      <Footer />
      <FloatingChat />
    </div>
  );
}

export default Beranda;

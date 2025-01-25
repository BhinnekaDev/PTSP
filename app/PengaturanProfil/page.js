import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanProfile from "@/app/PengaturanProfil/components/TampilanProfile";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";
function PengaturanProfil() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <TampilanProfile />
      <Footer />
    </div>
  );
}

export default PengaturanProfil;

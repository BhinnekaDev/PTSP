import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import PengajuanKunjungan from "@/app/PengajuanKunjungan/components/Pengajuan";
import Footer from "@/components/Footer";
import FloatingTools from "@/components/FloatingTools";
import toast, { Toaster } from "react-hot-toast";

function PengajuanKunjunganPage() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <PengajuanKunjungan />
      <Footer />
      <FloatingTools />
    </div>
  );
}

export default PengajuanKunjunganPage;

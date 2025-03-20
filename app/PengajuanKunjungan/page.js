import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import PengajuanKunjungan from "@/app/PengajuanKunjungan/components/Konten";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

function PengajuanKunjunganPage() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />

      <PengajuanKunjungan />

      <Footer />
    </div>
  );
}

export default PengajuanKunjunganPage;

import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanPencarian from "@/app/Pencarian/components/Pencarian";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

function Pencarian() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <TampilanPencarian />
      <Footer />
    </div>
  );
}

export default Pencarian;

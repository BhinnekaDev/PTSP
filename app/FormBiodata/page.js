import KategoriForm from "@/app/FormBiodata/components/KategoriForm";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

function FormBiodata() {
  return (
    <div className="position-relative top-0 overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <KategoriForm />
      <Footer />
    </div>
  );
}

export default FormBiodata;

"use client";
import Navbar from "@/components/Navbar";
import HeaderTemplate from "@/components/HeaderTemplate";
import TampilanAjukan from "@/app/Ajukan/components/Ajukan";
import Footer from "@/components/Footer";
import toast, { Toaster } from "react-hot-toast";

function Ajukan() {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <HeaderTemplate />
      <TampilanAjukan />
      <Footer />
    </div>
  );
}

export default Ajukan;

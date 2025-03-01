"use client";
import Navbar from "@/components/Navbar";
import TampilanChat from "@/app/ChatAdmin/components/Chat";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

function Ajukan() {
  return (
    <div className="bg-white w-auto overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <div className="pt-40">
        <TampilanChat />
        <Footer />
      </div>
    </div>
  );
}

export default Ajukan;

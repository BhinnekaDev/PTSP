"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@material-tailwind/react";
import LogoPerorangan from "@/assets/img/Icon/Logo-Perorangan.png";
import StepFormPerorangan from "@/constant/constFormPerorangan";
import useStepperForm from "@/hooks/Frontend/useStepperForm";
import "@/app/globals.css";

function FormPerorangan() {
  const [checkboxAktif, setCheckboxAktif] = useState(false);
  const { stepAktif, handleSelanjutnya, handleSebelumnya } = useStepperForm();

  return (
    <div className="min-h-full grid grid-cols-1 lg:grid-cols-2 mx-auto bg-white shadow-2xl rounded-lg max-w-full">
      <div className="hidden lg:flex items-center justify-center bg-cover bg-center">
        <Image
          src={LogoPerorangan}
          width={200}
          height={200}
          alt="Perorangan"
          className="w-96 h-96 mb-4"
          priority
        />
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-screen-xl">
          <h2 className="text-black text-center text-2xl font-bold mb-6 uppercase">
            Daftar Perorangan
          </h2>
          <div className="mt-8">
            <StepFormPerorangan
              stepAktif={stepAktif}
              checkboxAktif={checkboxAktif}
              setCheckboxAktif={setCheckboxAktif}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPerorangan;

"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Toast, Toaster } from "react-hot-toast";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";
import TampilanProfile from "@/components/TampilanProfile";
import ConstEditProfilePerorangan from "@/constant/constEditProfilePerorangan";
import ConstEditProfilePerusahaan from "@/constant/constEditProfilePerusahaan";

const UserProfile = () => {
  const { detailPengguna } = useVerifikasiLogin();
  const [modeEdit, setUbahProfil] = useState(false);

  const tombolUbahProfil = () => {
    setUbahProfil(!modeEdit);
  };

  return (
    <div className="flex justify-center items-center min-h-full bg-gray py-24 ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-full flex">
        <div className="w-1/6 p-4">
          <Button
            className={`w-full mb-4 ${
              !modeEdit ? "bg-primary text-white" : "bg-secondary text-white"
            }`}
            onClick={() => setUbahProfil(false)}
          >
            Informasi Profil
          </Button>
          <Button
            className={`w-full ${
              modeEdit ? "bg-primary text-white" : "bg-secondary text-white"
            }`}
            onClick={tombolUbahProfil}
          >
            Pengaturan Profil
          </Button>
        </div>
        <div className="w-3/4">
          <Card className="border border-blue-gray-400 shadow-lg rounded-lg">
            <CardBody>
              {modeEdit ? (
                detailPengguna?.type === "perorangan" ? (
                  <ConstEditProfilePerorangan />
                ) : (
                  <ConstEditProfilePerusahaan />
                )
              ) : (
                <TampilanProfile />
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

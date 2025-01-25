import React, { useState } from "react";
import { Dialog, DialogHeader, DialogBody } from "@/app/MTailwind";
import useStep from "@/hooks/Frontend/useStepperForm";
import IKMPertama from "@/constant/constIKMPertama";
import IKMKedua from "@/constant/constIKMKedua";
import { toast, Toaster } from "react-hot-toast";

const DialogPerbaikanDokumen = ({ open, onClose, pemesanan }) => {
  const { stepAktif, handleSelanjutnya } = useStep();
  return (
    <Dialog
      open={open}
      handler={onClose}
      size="xl"
      className="fixed inset-0 items-center justify-center w-96 h-auto mx-auto overflow-auto"
    >
      <DialogHeader>Pengisian Indeks Kepuasan Masyarakat</DialogHeader>
      <DialogBody>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="w-full p-6 mb-3 bg-white rounded-lg shadow-md">
          <div className="stepPertama mb-2">
            {stepAktif === 0 && (
              <IKMPertama
                handleSelanjutnya={handleSelanjutnya}
                pemesanan={pemesanan}
              />
            )}

            {stepAktif === 1 && (
              <div className="stepKedua">
                <IKMKedua pemesanan={pemesanan} />
              </div>
            )}
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DialogPerbaikanDokumen;

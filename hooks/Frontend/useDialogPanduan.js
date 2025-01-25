import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
  Card,
} from "@/app/MTailwind";

const useDialogPanduan = () => {
  const [isDialogOpenPanduan, setIsDialogOpenPanduan] = useState(false);
  const handleDialogOpenPanduan = () => setIsDialogOpenPanduan(true);
  const handleDialogClosePanduan = () => setIsDialogOpenPanduan(false);
  const DialogPanduan = (
    <Dialog
      size="xl"
      open={isDialogOpenPanduan}
      handler={setIsDialogOpenPanduan}
    >
      <DialogHeader className="uppercase">
        Panduan Penggunaan PTSP BMKG Bengkulu
      </DialogHeader>
      <DialogBody className="flex items-center justify-center w-full max-w-xs">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
          <iframe
            src="https://scribehow.com/embed/Alur_Pengajuan_Berbayar_Atau_Pembelian_Berbayar__yY9KeUNwQJGNIi3WlLC4Wg"
            width="100%"
            height="640"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      </DialogBody>
    </Dialog>
  );

  return {
    DialogPanduan,
    handleDialogOpenPanduan,
    handleDialogClosePanduan,
  };
};

export default useDialogPanduan;

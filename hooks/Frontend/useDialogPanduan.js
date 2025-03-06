import { useState } from "react";
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
          <video className="h-full w-full rounded-lg" controls autoPlay>
            <source src="/assets/video/GuideLinePTSP.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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

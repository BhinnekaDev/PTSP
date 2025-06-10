import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@/app/MTailwind";
import { Toaster } from "react-hot-toast";
import useKonfirmasiVABaru from "@/hooks/Backend/useKonfirmasiVABaru";

function DialogKonfirmasiVABaru({ open, onClose, ID_Pemesanan, ID_Transaksi }) {
  const { onConfirm, loading } = useKonfirmasiVABaru({
    ID_Pemesanan,
    ID_Transaksi,
  });
  return (
    <Dialog open={open} handler={onClose}>
      <Toaster position="top-right" reverseOrder={false} />
      <DialogHeader>Konfirmasi Permintaan Virtual Account Baru</DialogHeader>
      <DialogBody>
        Apakah Anda yakin ingin mengirim permintaan Virtual Account Baru?
        Tindakan ini tidak dapat dibatalkan.
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="gray" className="mr-2" onClick={onClose}>
          Batal
        </Button>
        <Button
          variant="gradient"
          color="blue"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Ya, Kirim"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DialogKonfirmasiVABaru;

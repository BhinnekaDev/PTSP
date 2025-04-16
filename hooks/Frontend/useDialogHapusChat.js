import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import React from "react";

const useDialogHapusChat = ({ open, onClose, onDelete, namaAdmin }) => {
  return (
    <Dialog open={open} size="xs" handler={onClose}>
      <DialogHeader className="text-lg font-bold text-black">
        Hapus Obrolan dengan "{namaAdmin}"?
      </DialogHeader>
      <DialogBody className="text-black">
        Semua pesan di akun Anda akan dihapus secara permanen.
      </DialogBody>
      <DialogFooter>
        <div className="flex w-full gap-2">
          <Button className="bg-black w-full p-1" onClick={onClose}>
            Batal
          </Button>
          <Button className="w-full p-1 bg-red-500" onClick={onDelete}>
            Hapus
          </Button>
        </div>
      </DialogFooter>
    </Dialog>
  );
};

export default useDialogHapusChat;

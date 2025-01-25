import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Alert,
} from "@/app/MTailwind";
import { IoWarningOutline } from "react-icons/io5";
import { toast, Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import usePengirimanBuktiTransfer from "@/hooks/Backend/usePengirimanBuktiTransfer";

const DialogPengirimanBuktiTransfer = ({
  open,
  onClose,
  ID_Pemesanan,
  pemesanan,
  ID_Transaksi,
}) => {
  const [files, setFiles] = useState([]);
  const { handlePengirimanBuktiTransfer } = usePengirimanBuktiTransfer();
  const [loading, setLoading] = useState(false);
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const SUPPORTED_FORMATS = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "application/pdf",
  ];

  const kirimFileBuktiTransfer = (event) => {
    const newFiles = Array.from(event.target.files);
    const validFiles = [];

    newFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        console.log("File size exceeds limit.");
        toast.error(`File maksimal hanya berukuran 2MB.`, {
          position: "top-left",
        });
      } else if (!SUPPORTED_FORMATS.includes(file.type)) {
        console.log("Unsupported file format.");
        toast.error(
          `Format file tidak mendukung. Hanya .png, .jpg, dan .pdf yang diperbolehkan.`
        );
      } else {
        validFiles.push({
          name: file.name,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          rawFile: file,
        });
      }
    });

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const hapusFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const simpanBuktiTransfer = async () => {
    setLoading(true);

    if (!ID_Transaksi) {
      toast.error("ID Transaksi tidak ditemukan.");
      setLoading(false);
      return;
    }

    if (files.length === 0) {
      toast.error("Tidak ada file yang dipilih.");
      setLoading(false);
      return;
    }

    const rawFiles = files.map((file) => file.rawFile);

    try {
      await handlePengirimanBuktiTransfer(rawFiles, ID_Transaksi, ID_Pemesanan);
      onClose();
    } catch (error) {
      toast.error("Gagal mengirimkan dokumen.");
      console.error("Error uploading documents: ", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleClose}
      className="fixed inset-0 items-center justify-center w-96 h-auto mx-auto overflow-y-auto"
    >
      <DialogHeader>Pengiriman Dokumen Transaksi {ID_Pemesanan}</DialogHeader>
      <DialogBody>
        <div className="w-full p-6 bg-white rounded-lg shadow-md">
          {pemesanan.Status_Pembayaran === "Ditolak" && (
            <Alert className="bg-red-200 border-2 border-red-800 mb-4 p-4">
              <div className="flex items-center mb-2">
                <IoWarningOutline className="text-red-800 mr-2 w-5 h-5" />
                <Typography
                  variant="paragraph"
                  className="text-red-800 uppercase font-bold"
                >
                  Pengiriman Dokumen Transaksi
                </Typography>
              </div>
              <hr className="border-[1px] text-red-800 mb-2"></hr>
              <Typography
                variant="paragraph"
                color="black"
                className="font-semibold"
              >
                {pemesanan.Keterangan}
              </Typography>
            </Alert>
          )}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 flex flex-col items-center justify-center">
            <input
              type="file"
              multiple
              onChange={kirimFileBuktiTransfer}
              className="hidden"
              id="fileUpload"
            />
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-gray-500 mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7M16 3l-4 4m0 0l-4-4m4 4V15"
                />
              </svg>
              <span className="text-gray-500 text-center">
                Drag and Drop or{" "}
                <span className="text-blue-500 underline">
                  Choose a Local File
                </span>
              </span>
              <span className="text-gray-400 text-xs">
                Format yang didukung: .png, .jpg, .pdf
              </span>
            </label>
          </div>
          <div className="space-y-2 mb-4 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-100 p-2 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
                <IconButton color="red" onClick={() => hapusFile(index)}>
                  <FaTrash className="w-5 h-5" />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              size="sm"
              color="blue"
              className="w-[48%]"
              onClick={simpanBuktiTransfer}
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Simpan"}
            </Button>
            <Button
              size="sm"
              color="red"
              onClick={handleClose}
              className="w-[48%]"
            >
              Tutup
            </Button>
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DialogPengirimanBuktiTransfer;

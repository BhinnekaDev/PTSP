"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Tooltip } from "@material-tailwind/react";
import { firestore, storage } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

function FloatingTools() {
  const router = useRouter();
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);
  const [downloadLink, setDownloadLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  // Fungsi untuk mendapatkan link dari Storage
  const getStorageDownloadLink = async (storagePath) => {
    try {
      if (!storagePath) return null;

      console.log("🔄 Mencoba mengambil link dari Storage:", storagePath);
      const storageRef = ref(storage, storagePath);
      const downloadUrl = await getDownloadURL(storageRef);
      console.log("✅ Link dari Storage berhasil:", downloadUrl);
      return downloadUrl;
    } catch (error) {
      console.error("❌ Gagal mengambil link dari Storage:", error);
      return null;
    }
  };

  // Ambil data dari Firestore
  useEffect(() => {
    const fetchApkData = async () => {
      setIsChecking(true);

      try {
        if (!firestore) {
          console.error("Firestore not initialized");
          setErrorMessage("Fitur download sedang dalam perbaikan");
          setDownloadLink(null);
          return;
        }

        const docRef = doc(
          firestore,
          "ptsp_production",
          "fUcFABuv7Vm7xYTSh3oH",
        );
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.log("Dokumen APK tidak ditemukan");
          setDownloadLink(null);
          setErrorMessage("APK belum tersedia");
          return;
        }

        const data = docSnap.data();
        console.log("📁 Data dari Firestore:", {
          file_apk: data.file_apk,
          link_manual: data.link_manual,
        });

        // PRIORITAS: Coba ambil link dari Storage via file_apk
        let success = false;

        if (data.file_apk) {
          const storageLink = await getStorageDownloadLink(data.file_apk);
          if (storageLink) {
            setDownloadLink(storageLink);
            console.log("✅ Menggunakan link dari Storage");
            setErrorMessage(null);
            success = true;
          }
        }

        // CADANGAN: Gunakan link_manual jika Storage gagal
        if (!success && data.link_manual) {
          setDownloadLink(data.link_manual);
          console.log("🔄 Menggunakan link manual (cadangan)");
          setErrorMessage(null);
          success = true;
        }

        // Jika semua gagal
        if (!success) {
          setDownloadLink(null);
          setErrorMessage("APK belum tersedia");
          console.log("❌ Tidak ada link APK yang valid");
        }
      } catch (error) {
        console.error("Error fetching APK data:", error);
        setErrorMessage("Gagal mengambil data APK");
        setDownloadLink(null);
      } finally {
        setIsChecking(false);
      }
    };

    fetchApkData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Fungsi handle download
  const handleDownloadAPK = () => {
    if (!downloadLink) {
      alert(errorMessage || "⚠️ Link APK belum tersedia");
      return;
    }

    setIsLoading(true);
    console.log("📥 Mendownload dari link:", downloadLink);

    try {
      window.open(downloadLink, "_blank");
      setTimeout(() => setIsLoading(false), 1000);
    } catch (error) {
      console.error("Error saat membuka link:", error);
      alert("Gagal membuka link download");
      setIsLoading(false);
    }
  };

  // Tentukan pesan tooltip
  const getTooltipContent = () => {
    if (isChecking) return "Memeriksa ketersediaan APK...";
    if (downloadLink) return "📱 Unduh Aplikasi PTSP Mobile";
    return errorMessage || "APK belum tersedia";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-row gap-2 relative">
        {/* Tooltip Custom untuk Mobile App */}
        {isTooltipOpen && !isChecking && downloadLink && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 w-60 animate-in fade-in slide-in-from-right-2 duration-300">
            <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 p-3">
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-t border-r border-gray-200 rotate-45"></div>

              <button
                onClick={() => setIsTooltipOpen(false)}
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              >
                <IoClose size={12} className="text-white" />
              </button>

              <div className="flex flex-col items-center">
                <span className="font-bold text-sm text-center">
                  📱 Coba Aplikasi PTSP Mobile
                </span>
                <span className="text-xs text-gray-600 text-center">
                  Akses layanan lebih mudah!
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tombol Mobile App */}
        <Tooltip
          content={getTooltipContent()}
          placement="left"
          className="bg-white text-black font-bold"
        >
          <button
            onClick={handleDownloadAPK}
            disabled={isChecking || !downloadLink}
            className={`relative text-white p-4 rounded-full shadow-lg transition duration-300 ${
              downloadLink && !isChecking
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <MdOutlinePhoneIphone size={24} />
            )}
          </button>
        </Tooltip>

        {/* Tombol Chat Admin */}
        <Tooltip
          content="Kontak Admin"
          placement="top-end"
          className="bg-white text-black font-bold"
        >
          <button
            onClick={() => router.push("/ChatAdmin")}
            className="relative bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <BsChatDotsFill size={24} />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              3
            </span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default FloatingTools;

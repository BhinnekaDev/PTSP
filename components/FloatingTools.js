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
  const [isDownloadOptionsOpen, setIsDownloadOptionsOpen] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [manualLink, setManualLink] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadType, setDownloadType] = useState(null);

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
          setManualLink(null);
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
          setManualLink(null);
          setErrorMessage("APK belum tersedia");
          return;
        }

        const data = docSnap.data();
        console.log("📁 Data dari Firestore:", {
          file_apk: data.file_apk,
          link_manual: data.link_manual,
        });

        // Ambil link dari Storage
        let storageLink = null;
        if (data.file_apk) {
          storageLink = await getStorageDownloadLink(data.file_apk);
          if (storageLink) {
            setDownloadLink(storageLink);
            console.log("✅ Link Storage tersedia");
          }
        }

        // Ambil link manual
        if (data.link_manual) {
          setManualLink(data.link_manual);
          console.log("✅ Link Manual tersedia");
        }

        // Set error message jika kedua link tidak tersedia
        if (!storageLink && !data.link_manual) {
          setErrorMessage("APK belum tersedia");
        } else {
          setErrorMessage(null);
        }
      } catch (error) {
        console.error("Error fetching APK data:", error);
        setErrorMessage("Gagal mengambil data APK");
        setDownloadLink(null);
        setManualLink(null);
      } finally {
        setIsChecking(false);
      }
    };

    fetchApkData();
  }, []);

  // Auto close tooltip pertama setelah 8 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Fungsi handle download dengan tipe tertentu
  const handleDownload = async (type, link) => {
    if (!link) {
      alert(
        `⚠️ Link ${type === "storage" ? "Direct Link" : "Manual Link"} tidak tersedia`,
      );
      return;
    }

    setIsDownloading(true);
    setDownloadType(type);
    console.log(
      `📥 Mendownload dari ${type === "storage" ? "Storage" : "Manual Link"}:`,
      link,
    );

    try {
      // Untuk Storage Link, pastikan mendapatkan download URL terbaru
      let finalLink = link;
      if (type === "storage") {
        // Jika link adalah storage path, refresh URL-nya
        if (link.includes("firebasestorage.googleapis.com")) {
          finalLink = link;
        } else if (downloadLink) {
          finalLink = downloadLink;
        }
      }

      window.open(finalLink, "_blank");
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadType(null);
        // Tutup tooltip options setelah download
        setIsDownloadOptionsOpen(false);
      }, 1000);
    } catch (error) {
      console.error("Error saat membuka link:", error);
      alert(`Gagal membuka link download: ${error.message}`);
      setIsDownloading(false);
      setDownloadType(null);
    }
  };

  // Toggle tooltip download options
  const toggleDownloadOptions = () => {
    if (isChecking) {
      alert("Sedang memeriksa ketersediaan APK...");
      return;
    }

    if (!downloadLink && !manualLink) {
      alert(errorMessage || "⚠️ APK belum tersedia");
      return;
    }

    setIsDownloadOptionsOpen(!isDownloadOptionsOpen);
    // Tutup tooltip pertama jika terbuka
    if (isTooltipOpen) {
      setIsTooltipOpen(false);
    }
  };

  // Tentukan pesan tooltip untuk hover
  const getTooltipContent = () => {
    if (isChecking) return "Memeriksa ketersediaan APK...";
    if (downloadLink || manualLink) return "📱 Pilih metode download APK";
    return errorMessage || "APK belum tersedia";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-2 relative">
        {/* Tooltip Custom untuk Opsi Download - POSISI DI ATAS */}
        {isDownloadOptionsOpen && (downloadLink || manualLink) && (
          <div className="relative mb-2 w-72 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 p-3">
              {/* Panah mengarah ke bawah (ke tombol) */}
              <div className="absolute -bottom-2 right-20 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>

              <button
                onClick={() => setIsDownloadOptionsOpen(false)}
                className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors z-10"
              >
                <IoClose size={12} className="text-white" />
              </button>

              <div className="flex flex-col gap-2">
                <div className="text-center">
                  <span className="font-bold text-sm text-gray-800">
                    📱 Pilih Metode Download
                  </span>
                </div>

                {/* Button Direct Link (Storage) */}
                <button
                  onClick={() => handleDownload("storage", downloadLink)}
                  disabled={!downloadLink || isDownloading}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                    downloadLink && !isDownloading
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white`}
                >
                  <div className="flex items-center gap-3">
                    <MdOutlinePhoneIphone size={20} />
                    <div className="text-left">
                      <div className="font-semibold text-sm">Download APK</div>
                    </div>
                  </div>
                  {isDownloading && downloadType === "storage" && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {!isDownloading && downloadLink && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      Tersedia
                    </span>
                  )}
                </button>

                {/* Button Manual Link */}
                <button
                  onClick={() => handleDownload("manual", manualLink)}
                  disabled={!manualLink || isDownloading}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-all duration-300 ${
                    manualLink && !isDownloading
                      ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed"
                  } text-white`}
                >
                  <div className="flex items-center gap-3">
                    <MdOutlinePhoneIphone size={20} />
                    <div className="text-left">
                      <div className="font-semibold text-sm">
                        Download via Link
                      </div>
                    </div>
                  </div>
                  {isDownloading && downloadType === "manual" && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {!isDownloading && manualLink && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      Tersedia
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tooltip Custom pertama (promosi) - POSISI DI ATAS */}
        {isTooltipOpen &&
          !isChecking &&
          (downloadLink || manualLink) &&
          !isDownloadOptionsOpen && (
            <div className="relative mb-2 w-60 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 p-3">
                {/* Panah mengarah ke bawah (ke tombol) */}
                <div className="absolute -bottom-2 right-20 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45"></div>

                <button
                  onClick={() => setIsTooltipOpen(false)}
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                >
                  <IoClose size={12} className="text-white" />
                </button>

                <div className="flex flex-col items-center">
                  <span className="font-bold text-sm text-center">
                    Coba Aplikasi PTSP Mobile
                  </span>
                  <span className="text-xs text-gray-600 text-center mt-1">
                    Klik tombol di samping untuk download!
                  </span>
                </div>
              </div>
            </div>
          )}

        {/* Tombol-tombol utama */}
        <div className="flex flex-row gap-2">
          {/* Tombol Mobile App Utama */}
          <Tooltip
            content={getTooltipContent()}
            placement="left"
            className="bg-white text-black font-bold"
          >
            <button
              onClick={toggleDownloadOptions}
              disabled={isChecking}
              className={`relative text-white p-4 rounded-full shadow-lg transition duration-300 ${
                (downloadLink || manualLink) && !isChecking
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 animate-pulse hover:animate-none"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isDownloading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <MdOutlinePhoneIphone size={24} />
              )}

              {/* Badge indikator ada pilihan */}
              {(downloadLink || manualLink) &&
                !isChecking &&
                !isDownloadOptionsOpen && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                )}
              {(downloadLink || manualLink) &&
                !isChecking &&
                !isDownloadOptionsOpen && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
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
    </div>
  );
}

export default FloatingTools;

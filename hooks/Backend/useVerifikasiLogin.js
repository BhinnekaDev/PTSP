import { useState, useEffect } from "react";
import { firestore } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function useVerifikasiLogin() {
  const [apakahSudahLogin, setApakahSudahLogin] = useState(false);
  const [userID, setUserID] = useState(null);
  const [detailPengguna, setDetailPengguna] = useState({
    nomorIdentitas: "",
    namaLengkap: "",
    pekerjaan: "",
    pendidikanTerakhir: "",
    jenisKelamin: "",
    nomorHP: "",
    npwpPerusahaan: "",
    alamatPerusahaan: "",
    namaPerusahaan: "",
    provinsiPerusahaan: "",
    kabupatenKotaPerusahaan: "",
    nomorHpPerusahaan: "",
    emailPerusahaan: "",
  });

  useEffect(() => {
    const fetchID = async () => {
      const id = localStorage.getItem("ID");

      if (id) {
        setUserID(id);
        setApakahSudahLogin(true);

        const docRefPerorangan = doc(firestore, "perorangan", id);
        const docRefPerusahaan = doc(firestore, "perusahaan", id);

        try {
          const [docPerorangan, docPerusahaan] = await Promise.all([
            getDoc(docRefPerorangan),
            getDoc(docRefPerusahaan),
          ]);

          if (docPerorangan.exists()) {
            setDetailPengguna((prevState) => ({
              ...prevState,
              ...docPerorangan.data(),
              type: "perorangan",
            }));
            console.log(
              "Data pengguna perorangan ditemukan:",
              docPerorangan.data()
            );
          } else if (docPerusahaan.exists()) {
            setDetailPengguna((prevState) => ({
              ...prevState,
              ...docPerusahaan.data(),
              type: "perusahaan",
            }));
            console.log(
              "Data pengguna perusahaan ditemukan:",
              docPerusahaan.data()
            );
          } else {
            console.warn("Data pengguna tidak ditemukan di Firestore.");
            setApakahSudahLogin(false);
          }
        } catch (error) {
          console.error("Gagal mengambil data pengguna:", error);
          setApakahSudahLogin(false);
        }
      } else {
        console.log(
          "Tidak ada ID di localStorage, set apakahSudahLogin ke false."
        );
        setApakahSudahLogin(false);
      }
    };

    fetchID();

    window.addEventListener("storage", fetchID);

    return () => {
      window.removeEventListener("storage", fetchID);
    };
  }, []);

  return { apakahSudahLogin, userID, detailPengguna };
}

export default useVerifikasiLogin;

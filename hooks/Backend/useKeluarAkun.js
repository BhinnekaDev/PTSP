import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";

const useKeluar = () => {
  const pengarah = useRouter();

  const keluarAkun = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("ID");
      toast.success("Berhasil keluar!");

      pengarah.push("/Login");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return { keluarAkun };
};

export default useKeluar;

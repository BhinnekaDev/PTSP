import { firestore, auth } from "@/lib/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";

export const addToPerusahaanCollection = async (formDataPerusahaan) => {
  try {
    const idPerusahaan = auth.currentUser?.uid;
    const emailPengguna = auth.currentUser?.email;
    const fotoURL = auth.currentUser?.photoURL || "";

    if (!idPerusahaan) throw new Error("User Tidak Terautentikasi");

    const dataPerusahaan = {
      ...formDataPerusahaan,
      Email: emailPengguna,
      Foto_URL: fotoURL, // Tambahkan foto URL
    };

    const perusahaanRef = doc(
      collection(firestore, "perusahaan"),
      idPerusahaan,
    );

    await setDoc(perusahaanRef, dataPerusahaan);

    console.log("Document successfully written with ID: ", idPerusahaan);
    return perusahaanRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

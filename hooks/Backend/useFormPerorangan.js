import { firestore, auth } from "@/lib/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";

export const addToPeroranganCollection = async (formDataPerorangan) => {
  try {
    const idPerorangan = auth.currentUser?.uid;
    const emailPengguna = auth.currentUser?.email;
    const fotoURL = auth.currentUser?.photoURL || "";

    if (!idPerorangan) throw new Error("User tidak Terautentikasi");

    const dataPerorangan = {
      ...formDataPerorangan,
      Email: emailPengguna,
      Foto_URL: fotoURL, // Tambahkan foto URL
    };

    const peroranganRef = doc(
      collection(firestore, "perorangan"),
      idPerorangan,
    );

    await setDoc(peroranganRef, dataPerorangan);

    console.log("Document successfully written with ID: ", idPerorangan);
    return peroranganRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

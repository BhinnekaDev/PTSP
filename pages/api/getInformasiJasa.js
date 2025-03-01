import { firestore } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const informasiSnapshot = await getDocs(collection(firestore, "informasi"));
    const jasaSnapshot = await getDocs(collection(firestore, "jasa"));

    const informasi = informasiSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const jasa = jasaSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ informasi, jasa });
  } catch (error) {
    console.error("Error fetching data: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

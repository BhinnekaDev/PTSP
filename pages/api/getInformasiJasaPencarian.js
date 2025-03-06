import { firestore } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { search } = req.query;

  try {
    const informasiSnapshot = await getDocs(collection(firestore, "informasi"));
    const jasaSnapshot = await getDocs(collection(firestore, "jasa"));

    let informasi = informasiSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    let jasa = jasaSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!search) {
      return res.status(400).json({ message: "Query pencarian diperlukan" });
    }

    const upperCaseSearch = search.toUpperCase();

    informasi = informasi.filter((item) =>
      item.Nama?.toUpperCase().includes(upperCaseSearch)
    );
    jasa = jasa.filter((item) =>
      item.Nama?.toUpperCase().includes(upperCaseSearch)
    );
    return res.status(200).json({ informasi, jasa });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

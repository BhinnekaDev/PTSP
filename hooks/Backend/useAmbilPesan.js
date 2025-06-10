import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";

const usePesanChatRoom = (chatRoomId) => {
  const [pesanList, setPesanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chatRoomId) {
      setPesanList([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const pesanRef = collection(firestore, "chatRooms", chatRoomId, "pesan");
    const pesanQuery = query(pesanRef, orderBy("waktu", "asc"));

    const unsubscribe = onSnapshot(
      pesanQuery,
      (snapshot) => {
        const pesanBaru = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            teks: data.isi || "",
            tipePengirim: data.tipePengirim || "",
            namaFile: data.namaFile || "",
            urlFile: data.urlFile || "",
            waktu: data.waktu ? data.waktu.toDate() : "",
          };
        });
        setPesanList(pesanBaru);
        setLoading(false);
      },
      (err) => {
        console.error("Gagal mengambil pesan:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chatRoomId]);

  return { pesanList, loading, error };
};

export default usePesanChatRoom;

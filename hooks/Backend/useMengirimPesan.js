"use client";
import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/lib/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function useMengirimChat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const penggunaSaatIni = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ID") || null;
    }
    return null;
  };

  const cekTipeUser = async (userId) => {
    const peroranganRef = doc(firestore, "perorangan", userId);
    const peroranganSnap = await getDoc(peroranganRef);
    if (peroranganSnap.exists()) {
      return "perorangan";
    }
    const perusahaanRef = doc(firestore, "perusahaan", userId);
    const perusahaanSnap = await getDoc(perusahaanRef);
    if (perusahaanSnap.exists()) {
      return "perusahaan";
    }
    return null;
  };

  // Fungsi pembanding array peserta tanpa sensitif urutan
  const samaPeserta = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((id) => b.includes(id))
    );
  };

  const kirimChat = async (pesan, stasiunTerpilihNama, selectedFile) => {
    setLoading(true);
    setError(null);

    try {
      const UserID = penggunaSaatIni();
      if (!UserID) throw new Error("User ID tidak ditemukan di localStorage");
      if (!stasiunTerpilihNama) throw new Error("Stasiun belum dipilih");

      const tipeUser = await cekTipeUser(UserID);
      if (!tipeUser) throw new Error("User tidak ditemukan di koleksi manapun");

      const peserta = [UserID];
      const tipePeserta = [tipeUser];

      let urlFile = null;
      let namaFile = null;
      if (selectedFile) {
        namaFile = selectedFile.name;
        const storageRef = ref(
          storage,
          `Chat_Files/${UserID}/${Date.now()}_${namaFile}`
        );
        await uploadBytes(storageRef, selectedFile);
        urlFile = await getDownloadURL(storageRef);
      }

      const stasiunAdmin = stasiunTerpilihNama.replace(/^Stasiun\s*/i, "");

      const chatsRoomsRef = collection(firestore, "chatRooms");
      const q = query(
        chatsRoomsRef,
        where("peserta", "array-contains", UserID),
        where("Instansi", "==", stasiunAdmin)
      );
      const querySnapshot = await getDocs(q);

      console.log("QuerySnapshot size:", querySnapshot.size);

      let chatRoomDocId = null;

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (
          data.peserta.includes(UserID) &&
          data.roomChat === stasiunTerpilihNama
        ) {
          chatRoomDocId = docSnap.id;
        }
      });

      console.log("chatRoomDocId ditemukan:", chatRoomDocId);

      if (!chatRoomDocId) {
        console.log("Membuat chatRoom baru karena tidak ada yang cocok");
        const docRef = await addDoc(chatsRoomsRef, {
          pesanTerakhir: pesan,
          peserta,
          Instansi: stasiunAdmin,
          roomChat: stasiunTerpilihNama,
          tipePeserta,
          terakhirDiperbarui: serverTimestamp(),
        });
        chatRoomDocId = docRef.id;
      } else {
        console.log("Mengupdate chatRoom yang sudah ada:", chatRoomDocId);
        const chatRoomDocRef = doc(firestore, "chatRooms", chatRoomDocId);
        await updateDoc(chatRoomDocRef, {
          pesanTerakhir: pesan,
          terakhirDiperbarui: serverTimestamp(),
        });
      }

      const pesanCollectionRef = collection(
        firestore,
        "chatRooms",
        chatRoomDocId,
        "pesan"
      );

      await addDoc(pesanCollectionRef, {
        id: chatRoomDocId,
        idPengirim: UserID,
        isi: pesan,
        namaFile: namaFile,
        sudahDibaca: false,
        tipePengirim: tipeUser,
        urlFile: urlFile,
        waktu: serverTimestamp(),
      });

      setLoading(false);
      return {
        chatRoomId: chatRoomDocId,
        tipeUser,
        roomChat: stasiunTerpilihNama,
      };
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { kirimChat, loading, error };
}

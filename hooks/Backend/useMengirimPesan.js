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

  const kirimChat = async (pesan, stasiunTerpilihNama, selectedFile) => {
    setLoading(true);
    setError(null);

    try {
      const UserID = penggunaSaatIni();
      if (!UserID) throw new Error("User ID tidak ditemukan di localStorage");
      if (!stasiunTerpilihNama) throw new Error("Stasiun belum dipilih");

      const tipeUser = await cekTipeUser(UserID);
      if (!tipeUser) throw new Error("User tidak ditemukan di koleksi manapun");

      const stasiunAdmin = stasiunTerpilihNama.replace(/^Stasiun\s*/i, "");
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

      const chatsRoomsRef = collection(firestore, "chatRooms");
      const q = query(
        chatsRoomsRef,
        where("peserta", "array-contains", UserID),
        where("Instansi", "==", stasiunAdmin)
      );
      const querySnapshot = await getDocs(q);

      let chatRoomDocId = null;

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (
          Array.isArray(data.peserta) &&
          data.peserta.length === peserta.length &&
          data.peserta.every((val, idx) => val === peserta[idx]) &&
          data.roomChat === stasiunTerpilihNama // Pastikan roomChat sesuai
        ) {
          chatRoomDocId = docSnap.id;
        }
      });

      if (!chatRoomDocId) {
        // Buat chat room baru
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

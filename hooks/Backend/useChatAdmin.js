"use client";

import { firestore, storage } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useEffect, useState } from "react";

import { toast } from "react-hot-toast";

const getFileNamaDariURL = (url) => {
  if (!url) return "";
  const parts = url.split("/");
  return parts[parts.length - 1];
};

function useChatAdmin() {
  const [pesan, setPesan] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [penggunaSaatIni, setPenggunaSaatIni] = useState(null);
  const [daftarAdmin, setDaftarAdmin] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [pesanList, setPesanList] = useState([]);
  const [jumlahBelumDibacaPerAdmin, setJumlahBelumDibacaPerAdmin] = useState(
    {}
  );

  const [chatTerakhir, setChatTerakhir] = useState({});
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const id = localStorage.getItem("ID");

    if (!id) {
      toast.error("Silakan login untuk mengakses pesan!", {
        position: "top-right",
        duration: 4000,
      });
      return;
    }

    setPenggunaSaatIni(id);
    console.log("ID pengguna saat ini berhasil diatur:", id);
  }, []);

  const hitungJumlahPesan = (adminId) => {
    if (!adminId || !penggunaSaatIni || !pesanList.length) return 0;

    return pesanList.filter(
      (pesan) =>
        pesan.ID_Admin === adminId &&
        pesan.ID === penggunaSaatIni &&
        pesan.Dikirim_Oleh === adminId &&
        pesan.Belum_Dibaca === true
    ).length;
  };

  useEffect(() => {
    if (!penggunaSaatIni || !pesanList.length) return;

    const counts = {};

    pesanList.forEach((msg) => {
      if (
        msg.Belum_Dibaca === true &&
        msg.ID === penggunaSaatIni &&
        msg.Dikirim_Oleh !== penggunaSaatIni
      ) {
        counts[msg.Dikirim_Oleh] = (counts[msg.Dikirim_Oleh] || 0) + 1;
      }
    });

    setJumlahBelumDibacaPerAdmin(counts);
  }, [pesanList, penggunaSaatIni]);

  const updateStatusDibaca = async (adminId, penggunaSaatIni) => {
    if (!adminId || !penggunaSaatIni) {
      console.warn(
        "Tidak dapat memperbarui status: adminId atau penggunaSaatIni tidak valid"
      );
      return;
    }

    try {
      const q = query(
        collection(firestore, "chat_admin"),
        where("ID_Admin", "==", adminId),
        where("ID", "==", penggunaSaatIni),
        where("Dikirim_Oleh", "==", adminId),
        where("Belum_Dibaca", "==", true)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) return;

      const batch = writeBatch(firestore);

      snapshot.docs.forEach((docSnap) => {
        const docRef = doc(firestore, "chat_admin", docSnap.id);
        batch.update(docRef, { Belum_Dibaca: false });
      });

      await batch.commit();

      console.log(
        `Semua pesan dari admin ${adminId} ke pengguna ${penggunaSaatIni} berhasil ditandai sebagai sudah dibaca`
      );
    } catch (error) {
      console.error("Gagal memperbarui status baca:", error);
    }
  };

  useEffect(() => {
    const fetchAdminList = async () => {
      try {
        const adminSnapshot = await getDocs(collection(firestore, "admin"));
        const adminData = [];

        adminSnapshot.forEach((doc) => {
          const data = doc.data();
          let ID_Admin = data.ID_Admin ?? doc.id;

          ID_Admin = ID_Admin?.toString().trim();

          if (!ID_Admin) {
            console.warn(`ID_Admin kosong di doc ID: ${doc.id}`);
            toast.error(
              `ID_Admin tidak ditemukan untuk ${
                data.Nama_Pengguna || "admin tanpa nama"
              }`,
              { position: "top-right", duration: 5000 }
            );
            return;
          }

          adminData.push({
            id: doc.id,
            ID_Admin,
            Nama_Pengguna: data.Nama_Pengguna,
            Instansi: data.Instansi,
            ...data,
          });
        });

        setDaftarAdmin(adminData);
      } catch (error) {
        console.error("Gagal mengambil daftar admin:", error);
        toast.error("Gagal mengambil daftar admin", {
          position: "top-right",
          duration: 5000,
        });
      }
    };

    fetchAdminList();
  }, []);

  const fetchChatTerakhir = async () => {
    try {
      if (!penggunaSaatIni) {
        console.warn(
          "fetchChatTerakhir: penggunaSaatIni masih null, menunggu update..."
        );
        return;
      }

      const chatTerakhirObj = {};
      for (const admin of daftarAdmin) {
        if (!admin.ID_Admin) continue;

        const q = query(
          collection(firestore, "chat_admin"),
          where("ID_Admin", "==", admin.ID_Admin),
          where("ID", "==", penggunaSaatIni)
        );

        console.log(
          `Fetching chat terakhir untuk ID_Admin: ${admin.ID_Admin}, penggunaSaatIni: ${penggunaSaatIni}`
        );

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const messages = snapshot.docs.map((doc) => ({
            ...doc.data(),
            Timestamp: doc.data().Timestamp?.toDate().getTime() || null,
          }));

          messages.sort((a, b) => b.Timestamp - a.Timestamp);
          chatTerakhirObj[admin.ID_Admin] = messages[0];
        } else {
          chatTerakhirObj[admin.ID_Admin] = null;
          console.warn(
            `Tidak ada pesan ditemukan untuk ID_Admin: ${admin.ID_Admin}, penggunaSaatIni: ${penggunaSaatIni}`
          );
        }
      }

      setChatTerakhir(chatTerakhirObj);
    } catch (error) {
      console.error("Gagal mengambil chat terakhir:", error);
      toast.error("Gagal mengambil chat terakhir.", {
        position: "top-right",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (penggunaSaatIni) {
      fetchChatTerakhir();
    }
  }, [daftarAdmin, penggunaSaatIni]);

  useEffect(() => {
    const penggunaSaatIni = localStorage.getItem("ID");
    if (!penggunaSaatIni) return;

    const q = query(
      collection(firestore, "chat_admin"),
      where("ID", "==", penggunaSaatIni)
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const allMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Timestamp: doc.data().Timestamp?.toDate().getTime() || null,
      }));

      setPesanList(allMessages);

      if (selectedAdminId) {
        const filtered = allMessages
          .filter(
            (msg) =>
              msg.ID_Admin === selectedAdminId && msg.ID === penggunaSaatIni
          )
          .sort((a, b) => a.Timestamp - b.Timestamp);

        setPesanList(filtered);

        const belumDibaca = filtered.filter(
          (msg) =>
            msg.Belum_Dibaca === true &&
            msg.Dikirim_Oleh === selectedAdminId &&
            msg.ID === penggunaSaatIni
        );

        for (const msg of belumDibaca) {
          const msgRef = doc(firestore, "chat_admin", msg.id);
          await updateDoc(msgRef, { Belum_Dibaca: false });
        }
      }
    });

    return () => unsubscribe();
  }, [selectedAdminId]);

  const handleAdminSelect = async (adminId, penggunaSaatIni) => {
    setSelectedAdminId(adminId);

    const belumDibaca = pesanList.filter(
      (msg) =>
        msg.Belum_Dibaca === true &&
        msg.Dikirim_Oleh === adminId &&
        msg.ID === penggunaSaatIni &&
        msg.ID_Admin === adminId
    );

    for (const msg of belumDibaca) {
      const msgRef = doc(firestore, "chat_admin", msg.id);
      await updateDoc(msgRef, { Belum_Dibaca: false });
    }

    fetchChatTerakhir();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSendMessage = async (pesanText, adminId, file) => {
    if (!penggunaSaatIni || penggunaSaatIni.trim() === "") {
      toast.error("ID pengguna tidak ditemukan. Coba login ulang!", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    if (!pesanText?.trim() && !file) {
      toast.error("Pesan atau file harus diisi!", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    if (!adminId) {
      toast.error("Pilih admin tujuan terlebih dahulu!", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    try {
      let fileUrl = null;
      if (file) {
        fileUrl = await saveFileToStorage(file);
      }

      // Data yang dikirim ke Firebase
      const chatData = {
        ID: penggunaSaatIni,
        ID_Admin: adminId,
        Pesan: pesanText,
        File: fileUrl,
        Dikirim_Oleh: penggunaSaatIni,
        Timestamp: new Date(),
        Belum_Dibaca: true,
      };

      await addDoc(collection(firestore, "chat_admin"), chatData);

      toast.success("Pesan berhasil dikirim!", {
        position: "top-right",
        duration: 3000,
      });

      setPesan("");
      setSelectedFile(null);

      if (typeof fetchChatTerakhir === "function") {
        fetchChatTerakhir();
      }
    } catch (error) {
      console.error("Gagal mengirim pesan:", error);
      toast.error("Gagal mengirim pesan.", {
        position: "top-right",
      });
    }
  };

  const saveFileToStorage = async (file) => {
    try {
      const storageRef = ref(storage, `chat_admin/${file.name}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Gagal menyimpan file:", error);
      throw error;
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    try {
      return new Date(timestamp).toLocaleString("id-ID");
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "";
    }
  };

  const hapusPesan = async (adminId, penggunaSaatIni) => {
    if (!penggunaSaatIni || !adminId) {
      console.error(
        "Gagal menghapus pesan: penggunaSaatIni atau adminId tidak valid"
      );
      return false;
    }

    try {
      const q = query(
        collection(firestore, "chat_admin"),
        where("ID_Admin", "==", adminId),
        where("ID", "==", penggunaSaatIni)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.warn("Tidak ada pesan yang ditemukan untuk dihapus.");
        return false;
      }

      const batchPromises = snapshot.docs.map(async (docSnap) => {
        const data = docSnap.data();

        if (data.File) {
          const fileRef = ref(storage, data.File);
          try {
            await deleteObject(fileRef);
            console.log(`File ${data.File} berhasil dihapus dari Storage.`);
          } catch (error) {
            console.error(`Gagal menghapus file ${data.File}:`, error);
          }
        }

        await deleteDoc(doc(firestore, "chat_admin", docSnap.id));
      });

      await Promise.all(batchPromises);

      console.log(
        `Berhasil menghapus semua pesan dan file antara pengguna ${penggunaSaatIni} dan admin ${adminId}`
      );
      return true;
    } catch (error) {
      console.error("Gagal menghapus pesan:", error);
      return false;
    }
  };

  return {
    pesan,
    setPesan,
    selectedFile,
    handleFileChange: (e) => setSelectedFile(e.target.files[0]),
    handleRemoveFile: () => setSelectedFile(null),
    handleSendMessage,
    daftarAdmin,
    handleAdminSelect: setSelectedAdminId,
    selectedAdminId,
    penggunaSaatIni,
    chatMessages,
    formatTimestamp,
    chatTerakhir,
    pesanList,
    getFileNamaDariURL,
    hapusPesan,
    hitungJumlahPesan,
    updateStatusDibaca,
    jumlahBelumDibacaPerAdmin,
  };
}

export default useChatAdmin;

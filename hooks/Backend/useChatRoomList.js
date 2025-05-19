import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "@/lib/firebaseConfig";
import { FaCloudBolt, FaMountain } from "react-icons/fa6";
import { BiWind } from "react-icons/bi";

function getUserID() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("ID") || null;
  }
  return null;
}

const stations = [
  {
    nama: "Stasiun Meteorologi",
    icon: <FaMountain className="icon-station" />,
  },
  {
    nama: "Stasiun Klimatologi",
    icon: <FaCloudBolt className="icon-station" />,
  },
  { nama: "Stasiun Geofisika", icon: <BiWind className="icon-station" /> },
];

export function useStationsWithChatRooms() {
  const [stationsWithRoom, setStationsWithRoom] = useState([]);

  useEffect(() => {
    const UserID = getUserID();
    if (!UserID) return;

    const roomsRef = collection(firestore, "chatRooms");
    const q = query(roomsRef, where("peserta", "array-contains", UserID));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chatRooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const mapped = stations.map((station) => {
        const matchedRoom = chatRooms.find(
          (room) => room.roomChat === station.nama
        );
        return {
          ...station,
          chatRoomId: matchedRoom ? matchedRoom.id : null,
          peserta: matchedRoom ? matchedRoom.peserta : [],
          chatRoomData: matchedRoom || null,
        };
      });

      setStationsWithRoom(mapped);
    });

    return () => unsubscribe();
  }, []);

  return stationsWithRoom;
}

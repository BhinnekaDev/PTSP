"use client";
import { useRouter } from "next/navigation";
import { BsChatDotsFill } from "react-icons/bs";
import { Tooltip } from "@material-tailwind/react";

function FloatingChat() {
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Tooltip
        content="Kontak Admin"
        placement="top-end"
        className="bg-white text-black font-bold"
      >
        <button
          onClick={() => router.push("/ChatAdmin")}
          className="relative bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 z-50"
        >
          <BsChatDotsFill size={24} />
          <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-50">
            3
          </span>
        </button>
      </Tooltip>
    </div>
  );
}

export default FloatingChat;

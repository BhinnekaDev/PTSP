"use client";
import React from "react";
import Image from "next/image";
import Pamflet1 from "@/assets/img/Pamflet/1.png";
import Pamflet2 from "@/assets/img/Pamflet/2.png";

function EventsSection() {
  return (
    <div className="mt-10 py-10 lg:py-32 z-10 relative ">
      <div className="flex flex-col items-center gap-10">
        <Image src={Pamflet1} alt="Ndaru Farm Logo" />
        <Image src={Pamflet2} alt="Ndaru Farm Logo" />
      </div>
    </div>
  );
}

export default EventsSection;

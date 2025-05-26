"use client";
import React from "react";
import Image from "next/image";
import Pamflet1 from "@/assets/img/Pamflet/1.png";
import Pamflet2 from "@/assets/img/Pamflet/2.png";

function EventsSection() {
  return (
    <div className="lg:mt-10 lg:py-12 py-3 z-10 relative ">
      <div className="flex flex-col items-center lg:gap-10 gap-5">
        <Image src={Pamflet1} alt="" />
        <Image src={Pamflet2} alt="" />
      </div>
    </div>
  );
}

export default EventsSection;

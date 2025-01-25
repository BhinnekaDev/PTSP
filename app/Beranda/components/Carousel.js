"use client";
import Image from "next/image";
import { Carousel, IconButton } from "@/app/MTailwind";
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";
import Slider1 from "@/assets/img/Slider/1.png";
import Slider2 from "@/assets/img/Slider/2.png";
import Slider3 from "@/assets/img/Slider/3.png";

function CarouselSection() {
  return (
    <Carousel
      transition={{ duration: 2 }}
      className="rounded-none z-10 relative top-0"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <TbArrowBigLeftLines className="text-5xl lg:text-6xl text-primary hover:bg-transparent hover:text-white" />
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <TbArrowBigRightLines className="text-5xl lg:text-6xl text-primary hover:bg-transparent hover:text-white" />
        </IconButton>
      )}
    >
      <div className="relative">
        <Image
          src={Slider1}
          alt="Seasonal sale banner offering big discounts in December"
          className="h-[90vh] w-full object-fill brightness-50"
        />
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 me-2 lg:me-36 p-4 text-white text-xl font-bold animate-slide-fade-in">
          <div className="uppercase text-center lg:text-end tracking-widest px-10 lg:px-0">
            <h3 className="text-base lg:text-xl text-primary uppercase">
              Kami membuka
            </h3>
            <h1 className="text-3xl lg:text-7xl text-white uppercase">
              Pelayanan Terpadu<p>Satu Pintu</p>
            </h1>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src={Slider2}
          alt="New innovations and updates from E-Mart Ndaru Farm"
          className="h-[90vh] w-full object-fill brightness-50"
        />
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 me-2 lg:me-36 p-4 text-white text-xl font-bold animate-slide-fade-in">
          <div className="uppercase text-center lg:text-end tracking-widest px-10 lg:px-0">
            <h3 className="text-base lg:text-xl text-primary uppercase">
              Selamat Datang di
            </h3>
            <h1 className="text-3xl lg:text-7xl text-white uppercase">
              PTSP BMKG<p>Provinsi Bengkulu</p>
            </h1>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src={Slider3}
          alt="Welcome back banner from Ndaru Farm"
          className="h-[90vh] w-full object-fill brightness-50"
        />
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 me-2 lg:me-36 p-4 text-white text-xl font-bold">
          <div className="uppercase text-center lg:text-end tracking-widest px-10 lg:px-0">
            <h3 className="text-base lg:text-xl text-primary uppercase">
              Kami hadir kembali untuk memenuhi kebutuhan kalian semua
            </h3>
            <h1 className="text-3xl lg:text-7xl text-white uppercase">
              PTSP BMKG<p>Provinsi Bengkulu</p>
            </h1>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default CarouselSection;

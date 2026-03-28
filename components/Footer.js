"use client";

import Image from "next/image";
import { Typography } from "@/app/MTailwind";
import UnduhAPK from "@/assets/img/Icon/Unduh-APK.png";
import { FaInstagram, FaTelegramPlane, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-darkgray text-white lg:py-20 py-10 z-10 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="text-center lg:text-left">
          <Typography className="font-semibold mb-3 lg:text-lg text-base">
            PTSP BMKG BENGKULU
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="lg:text-base text-sm">
            PTSP BMKG Provinsi Bengkulu adalah layanan informasi dan jasa di
            bidang klimatologi, meteorologi, dan geofisika untuk wilayah
            Bengkulu dan sekitarnya.
          </Typography>
        </div>
        <div className="text-center lg:text-center">
          <Typography className="font-semibold mb-3 lg:text-lg text-base">
            STASIUN METEOROLOGI
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="lg:text-base text-sm">
            Jl. Depati Payung Negara, Komplek Bandar Udara Fatmawati Soekarno
            Bengkulu.Kel. Pekan Sabtu, Kec. Selebar, Kota Bengkulu, Bengkulu –
            38213
          </Typography>
          <Typography className="text-base mt-2">08117328773</Typography>
          <Typography className="lg:text-base text-sm mt-2">
            stamet.fatmawati@bmkg.go.id
          </Typography>
        </div>
        <div className="text-center lg:text-center">
          <Typography className="font-semibold mb-3 lg:text-lg text-base">
            STASIUN KLIMATOLOGI
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="lg:text-base text-sm">
            Jl. R.E. Martadinata, Kelurahan Kandang, Kecamatan Kampung Melayu,
            Kota Bengkulu, Bengkulu - 38216
          </Typography>
          <Typography className="lg:text-base text-sm mt-2">
            08117321291
          </Typography>
          <Typography className="lg:text-base text-sm mt-2">
            staklim.bengkulu@bmkg.go.id
          </Typography>
        </div>
        <div className="text-center lg:text-center">
          <Typography className="font-semibold mb-3 lg:text-lg text-base">
            STASIUN GEOFISIKA
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="lg:text-base text-sm">
            Kantor Bengkulu : Jl. Jati No. 37, Sawah Lebar Kec. Ratu Samban,
            Kota Bengkulu, Bengkulu 38221 (depan McD)
          </Typography>
          <Typography className="lg:text-base text-sm">
            Kantor Kepahiang: Jl. Pembangunan No. 156, Pasar Ujung, Kepahiang,
            Kec. Kepahiang, Bengkulu
          </Typography>
          <Typography className="lg:text-base text-sm mt-2">
            08111360636
          </Typography>
          <Typography className="lg:text-base text-sm mt-2">
            stageof.kepahiang@bmkg.go.id
          </Typography>
        </div>
        <div className="text-center lg:text-right">
          <Typography className="font-semibold mb-3 lg:text-lg text-base uppercase">
            Unduh PTSP Mobile
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <a
            href="https://drive.google.com/uc?export=download&id=1FlfK9y0QPd6nk9gs8umlSQyn9RsRyhLu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={UnduhAPK}
              alt="unduh apk"
              className="lg:w-full lg:h-1/5 rounded-xl"
              width={130}
              height={150}
              quality={100}
              priority
            />
          </a>
        </div>
      </div>
      <div className="border-t border-primary mt-10 pt-4">
        <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between justify-center text-center items-center">
          <Typography className="lg:text-base text-sm">
            Copyrights © 2024 -{" "}
            <span className="font-semibold text-secondary">
              PTSP BMKG Provinsi Bengkulu
            </span>
            . All Rights Reserved.
          </Typography>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <FaInstagram
              size={20}
              className="cursor-pointer transform transition-transform duration-200 hover:scale-110"
              onClick={() =>
                window.open("https://www.instagram.com/info_bmkg_bengkulu/")
              }
            />
            <FaTelegramPlane
              size={20}
              className="cursor-pointer transform transition-transform duration-200 hover:scale-110"
              onClick={() =>
                window.open(
                  "https://l.instagram.com/?u=https%3A%2F%2Ft.me%2Fjoinchat%2FWKhKhIs5nORrQyOo&e=AT2_gidXz6KROzub3JWaazmiFwm01gfzeWlYi_zTkrKNkSNB5zIOUkpMh38ZbNK9NNBaGMlxvtSIrQxhtEXiNlwc6Ulz-QmS",
                )
              }
            />
            <FaGlobe
              size={20}
              className="cursor-pointer transform transition-transform duration-200 hover:scale-110"
              onClick={() => window.open("https://bengkulu.bmkg.go.id/")}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

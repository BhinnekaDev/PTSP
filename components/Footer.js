"use client";

import { Typography } from "@/app/MTailwind";
import { FaInstagram, FaTelegramPlane, FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-darkgray text-white py-20 z-10 relative">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center lg:text-left">
          <Typography variant="h5" className="font-semibold mb-3">
            ©2024 PTSP BMKG BENGKULU
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="text-base">
            PTSP BMKG Provinsi Bengkulu merupakan lembaga penyedia jasa atau
            informasi yang berada di wilayah Bengkulu dan sekitarnya yang
            berhubungan dengan klimatologi, meteorologi dan geofisika
          </Typography>
        </div>
        <div className="text-center lg:text-center">
          <Typography variant="h5" className="font-semibold mb-3">
            STASIUN METEOROLOGI
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="text-base">
            Jl. Depati Payung Negara, Pekan Sabtu, Kec. Selebar, Kota Bengkulu,
            Bengkulu 38213
          </Typography>
          <Typography className="text-base mt-2">0736-51064</Typography>
        </div>
        <div className="text-center lg:text-center">
          <Typography variant="h5" className="font-semibold mb-3">
            STASIUN KLIMATOLOGI
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="text-base">
            Jl. Ir. Rustandi Sugianto P. Baai Bengkulu 39172
          </Typography>
          <Typography className="text-base mt-2">
            0736-51251 / 0736-51426 / 0736-53030
          </Typography>
          <Typography className="text-base mt-2">
            staklim.pulaubaai@bmkg.go.id
          </Typography>
        </div>
        <div className="text-center lg:text-center">
          <Typography variant="h5" className="font-semibold mb-3">
            STASIUN GEOFISIKA
          </Typography>
          <hr className="border-t-2 border-primary w-full mx-auto md:mx-0 mb-4" />
          <Typography className="text-base">
            Jl. Pembangunan No. 156 Pasar Ujung, Kepahyang, Bengkulu
          </Typography>
          <Typography className="text-base mt-2">0732-391600</Typography>
          <Typography className="text-base mt-2">
            stageof.kepahiang@bmkg.go.id
          </Typography>
        </div>
      </div>
      <div className="border-t border-primary mt-10 pt-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <Typography variant="h6" className="">
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
                  "https://l.instagram.com/?u=https%3A%2F%2Ft.me%2Fjoinchat%2FWKhKhIs5nORrQyOo&e=AT2_gidXz6KROzub3JWaazmiFwm01gfzeWlYi_zTkrKNkSNB5zIOUkpMh38ZbNK9NNBaGMlxvtSIrQxhtEXiNlwc6Ulz-QmS"
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

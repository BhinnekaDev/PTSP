"use client";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { KategoriProduk, KategoriJasa } from "@/constant/constKategoriProduk";
import { IoArrowUndo } from "react-icons/io5";
import { Typography } from "@material-tailwind/react";

function Katalog() {
  const [pilihStasiun, setPilihComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderSkeleton = () => (
    <div className="flex flex-col items-center border-2 border-secondary p-6 rounded-lg shadow-lg">
      <Skeleton circle height={50} width={50} className="mb-4" />
      <Skeleton height={25} width={150} className="mb-2" />
      <Skeleton count={2} height={15} width="100%" className="mb-4" />
      <Skeleton height={40} width={120} />
    </div>
  );

  const marqueeAnimation = `
    @keyframes marquee {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
    .animate-marquee {
      animation: marquee 25s linear infinite;
    }
  `;

  return (
    <div>
      <div className="overflow-hidden w-full bg-gray-100 py-2">
        <div className="inline-block whitespace-nowrap text-primary py-2 text-lg font-bold animate-marquee w-full shadow-sm text-center">
          Produk yang Anda pesan akan menjadi Rp 0 jika mengambil jenis ajukan
          gratis.
        </div>
      </div>
      {!pilihStasiun && (
        <section className="katalog-section">
          <div className="max-w-screen-xl mx-auto my-16 px-8 py-20 shadow-2xl rounded-lg border-2 border-gray">
            <div className="header-informasi">
              {loading ? (
                <>
                  <Skeleton height={40} width={300} className="mb-6" />
                  <Skeleton height={25} width={200} className="mb-4" />
                </>
              ) : (
                <>
                  <h1 className="text-4xl text-center mb-6 underline underline-offset-8 font-extrabold tracking-widest text-primary">
                    Katalog Produk Informasi
                  </h1>
                  <p className="text-xl text-center mb-8">
                    Produk Informasi Setiap Instansi
                  </p>
                </>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>{renderSkeleton()}</div>
                    ))
                : KategoriProduk.map((informasi) => (
                    <div
                      key={informasi.name}
                      className="flex flex-col items-center border-2 border-secondary p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                    >
                      {informasi.icon}
                      <h2 className="text-xl font-semibold mb-2 text-center">
                        {informasi.name}
                      </h2>
                      <p className="text-gray-500 text-center mb-4">
                        {informasi.description}
                      </p>
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() => setPilihComponent(informasi.component)}
                      >
                        Lihat Produk
                      </button>
                    </div>
                  ))}
            </div>
          </div>
          <div className="max-w-screen-xl mx-auto my-16 px-8 py-20 shadow-2xl rounded-lg border-2 border-gray">
            <div className="header-jasa">
              {loading ? (
                <>
                  <Skeleton height={40} width={300} className="mb-6" />
                  <Skeleton height={25} width={200} className="mb-4" />
                </>
              ) : (
                <>
                  <h1 className="text-4xl text-center mb-6 underline underline-offset-8 font-extrabold tracking-widest text-primary">
                    Katalog Produk Jasa
                  </h1>
                  <p className="text-xl text-center mb-8">
                    Produk Jasa Setiap Instansi
                  </p>
                </>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading
                ? Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index}>{renderSkeleton()}</div>
                    ))
                : KategoriJasa.map((jasa) => (
                    <div
                      key={jasa.name}
                      className="flex flex-col items-center border-2 border-secondary p-6 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                    >
                      {jasa.icon}
                      <h2 className="text-xl font-semibold mb-2">
                        {jasa.name}
                      </h2>
                      <p className="text-gray-500 text-center mb-4">
                        {jasa.description}
                      </p>
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() => setPilihComponent(jasa.component)}
                      >
                        Lihat Produk
                      </button>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      )}
      <div className="max-w-screen-xl mx-auto px-8 py-20 ">
        {pilihStasiun && (
          <div className="border p-6 rounded-lg shadow-lg ">
            <button
              className="flex items-center mb-4 text-primary"
              onClick={() => setPilihComponent(null)}
            >
              <IoArrowUndo className="mr-2" /> Kembali ke Katalog
            </button>
            {pilihStasiun}
          </div>
        )}
      </div>

      <style jsx>{marqueeAnimation}</style>
    </div>
  );
}

export default Katalog;

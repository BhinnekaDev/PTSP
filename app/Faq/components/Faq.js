"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const faqs = [
  {
    question:
      "Mengapa beberapa stasiun tidak muncul pada peta tren, meskipun lot time seri tersedia?",
    answerType: "text",
    answer:
      "Anda dapat menghubungi PTSP BMKG Bengkulu melalui email, telepon, atau datang langsung ke kantor kami.",
  },
  {
    question:
      "Bagaimana cara mengajukan permohonan layanan informasi di kantor PTSP BMKG?",
    answerType: "list",
    answer: [
      "Datang langsung ke Pelayanan Terpadu Satu Pintu (PTSP) BMKG di Jalan Angkasa I no. 2 Kemayoran Jakarta Pusat. Gedung E, Kirim email ke : ptsp[at]bmkg.go.id , atau kirim fax ke 021-65867063 dengan membawa :Surat Permohonan yang ditanda tangani (jika dari perusahaan, dibubuhkan stempel perusahaan)Surat tugas (jika dari perusahaan menugaskan org lain untuk mengurus permohonan ke BMKG)Fotokopi KTP pemohon.",
      "Petugas PTSP membuatkan formulir permohonan yang akan ditandatangani oleh pemohon.",
      "Melakukan pembayaran (khusus untuk permohonan analisa cuaca, pembayaran dilakukan di awal masuk berkas permohonan), dengan cara:Pembayaran tunai ke bendahara penerima yang bertugas di PTSP.Transfer ke rek. Bendahara Penerima BMKG (jika sudah melakukan transfer harus mengirimkan bukti transfernya ke PTSP)",
      "Jika berkas permohonan sudah lengkap, permohonan akan diproses dalam waktu kurang lebih 14 hari kerja, khusus analisa cuaca, pengerjaannya kurang lebih 14 hari kerja per lokasi per harinya.",
      "Jika hasil sudah ada, petugas PTSP akan segera menghubungi pemohon melalui telepon atau email, untuk mengambil hasil di kantor Pelayanan Terpadu Satu Pintu (PTSP).",
      "Pembayaran khusus untuk kalibrasi alat Meteorologi, Klimatologi, dan Geofisika : Membayar sesuai total tagihan kalibrasi alat yang akan diambil pemohon berdasarkan nomor order alat yang diperoleh dari lab.kalibrasi.BMKG Bayar langsung/tunai di PTSPBerkas lengkap sebagai dasar untuk pengambilan alat dan sertifikat di lab. kalibrasi.",
    ],
  },
  {
    question: "Bagaimana cara mengajukan permohonan layanan bagi mahasiwa?",
    answerType: "list",
    answer: [
      "Surat pengantar (sesuai contoh A) lampiran link di bawah, ",
      "Surat pernyataan (sesuai contoh B) lampiran link di bawah, ",
      "Surat permohonan (sesuai contoh C) lampiran link di bawah, ",
      "Proposal penelitian yang sudah dijilid rapi disertai dengan lembar pengesahan dari dosen, dan ",
      "Fotokopi KTM dan KTP. Untuk keterangan lebih lanjut dapat melihat pada PERKA Kepala BMKG pada link berikut http://ptsp.bmkg.go.id/upload/file_menu/20190827095620.PDF",
    ],
  },
  {
    question: "Bagaimanakah jam pelayanan PTSP BMKG ?",
    answerType: "text",
    answer:
      "Hari : Senin s/d Jumat, waktu : 09.00 s/d 15.00 WIB, dan istirahat : 12.00 s/d 13.00 WIB.",
  },
  {
    question: "Melalui apa saja Pelanggan dapat mengontak PTSP BMKG ?",
    answerType: "text",
    answer:
      "Pelanggan dapat mengontak PTSP BMKG melalui Online Chat di website resmi : http://ptsp.bmkg.go.id, WA : 081382321504,  telepon : (021) 65867063, fax : (021) 4246703, atau email : ptsp.bmkg[at]bmkg.go.id.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  const handleOpen = (index) => {
    setOpen(open === index ? -1 : index);
  };

  return (
    <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
      <Typography variant="h2" className="text-2xl font-bold mb-4">
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} open={open === index}>
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className="w-full flex justify-between items-center bg-blue-500 text-white p-3 rounded-lg mb-2 cursor-pointer hover:text-secondary hover:bg-white hover:shadow-md hover:shadow-blue-gray-500"
          >
            <Typography variant="h6" className="flex-1">
              {faq.question}
            </Typography>
            <IoIosArrowDropdownCircle
              className={`ml-2 transform transition-transform ${
                open === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </AccordionHeader>
          <AccordionBody className="p-3 bg-gray-100 rounded-lg">
            {faq.answerType === "text" && (
              <Typography variant="paragraph" className="text-gray-700">
                {faq.answer}
              </Typography>
            )}
            {faq.answerType === "list" && (
              <ol className="list-decimal list-inside space-y-2">
                {faq.answer.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 text-base text-justify"
                  >
                    {item.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < item.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </li>
                ))}
              </ol>
            )}
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}

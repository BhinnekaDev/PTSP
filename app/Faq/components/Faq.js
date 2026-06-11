"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { firestore } from "@/lib/firebaseConfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = (index) => {
    setOpen(open === index ? -1 : index);
  };

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const faqRef = collection(firestore, "faq");
        const q = query(faqRef, orderBy("created_at", "desc"));
        const querySnapshot = await getDocs(q);

        const faqList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            question: data.question || "",
            answer: data.answer || "",
            category: data.category || "Umum",
            answerType: Array.isArray(data.answer) ? "list" : "text",
          };
        });

        setFaqs(faqList);
        setError(null);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setError(err.message || "Gagal memuat data FAQ");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const renderAnswer = (faq) => {
    if (!faq.answer) {
      return (
        <Typography className="text-gray-500">Tidak ada jawaban</Typography>
      );
    }

    // Tipe POINT (array) - selalu tampilkan sebagai numbered list
    if (faq.answerType === "list" && Array.isArray(faq.answer)) {
      return (
        <ol className="list-decimal list-inside space-y-2">
          {faq.answer.map((item, idx) => (
            <li key={idx} className="text-gray-700 text-base text-justify">
              {item}
            </li>
          ))}
        </ol>
      );
    }

    // Tipe BIASA (string)
    const answerText = String(faq.answer);

    // Jika ada newline, tampilkan sebagai paragraf terpisah
    const hasNewLine = answerText.includes("\n");
    if (hasNewLine) {
      return (
        <div className="space-y-1">
          {answerText.split("\n").map((line, idx) => (
            <p key={idx} className="text-gray-700 text-base text-justify">
              {line}
            </p>
          ))}
        </div>
      );
    }

    // Default: tampilkan sebagai paragraf biasa
    return (
      <Typography variant="paragraph" className="text-gray-700 text-justify">
        {answerText}
      </Typography>
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
        <Typography
          variant="h2"
          className="text-2xl font-semibold text-primary mb-2"
        >
          Frequently Asked Questions
        </Typography>
        <div className="w-32 h-1 bg-secondary mb-6 rounded-md"></div>
        <div className="text-center py-10">
          <Typography>Memuat data FAQ...</Typography>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
        <Typography
          variant="h2"
          className="text-2xl font-semibold text-primary mb-2"
        >
          Frequently Asked Questions
        </Typography>
        <div className="w-32 h-1 bg-secondary mb-6 rounded-md"></div>
        <div className="text-center py-10 text-red-500">
          <Typography>Error: {error}</Typography>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-36 mb-20 mx-auto p-12 bg-white ring-2 ring-gray rounded-lg shadow-lg shadow-blue-gray-800">
      <Typography
        variant="h2"
        className="text-2xl font-semibold text-primary mb-2"
      >
        Frequently Asked Questions
      </Typography>
      <div className="w-32 h-1 bg-secondary mb-6 rounded-md"></div>

      {faqs.length === 0 ? (
        <div className="text-center py-10">
          <Typography>Belum ada FAQ tersedia.</Typography>
        </div>
      ) : (
        faqs.map((faq, index) => (
          <Accordion key={faq.id || index} open={open === index}>
            <AccordionHeader
              onClick={() => handleOpen(index)}
              className="w-full flex justify-between items-center bg-blue-500 text-white p-3 rounded-lg mb-2 cursor-pointer hover:text-secondary hover:bg-white hover:shadow-md hover:shadow-blue-gray-500"
            >
              <Typography variant="h6" className="flex-1 text-left">
                {faq.question}
              </Typography>
              <IoIosArrowDropdownCircle
                className={`ml-2 transform transition-transform ${
                  open === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </AccordionHeader>
            <AccordionBody className="p-3 bg-gray-100 rounded-lg">
              {renderAnswer(faq)}
            </AccordionBody>
          </Accordion>
        ))
      )}
    </div>
  );
}

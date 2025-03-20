import nodemailer from "nodemailer";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";

const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const {
    userId,
    Stasiun,
    Keterangan,
    TanggalKunjungan,
    JamKunjungan,
    NoSurat,
    TujuanBerkunjung,
    JumlahPengunjung,
    dataUser,
    fileURL,
  } = req.body;

  if (
    !userId ||
    !Stasiun ||
    !TanggalKunjungan ||
    !JamKunjungan ||
    !NoSurat ||
    !TujuanBerkunjung ||
    !JumlahPengunjung ||
    !dataUser ||
    !fileURL
  ) {
    return res
      .status(400)
      .json({ message: "Data yang dikirim tidak lengkap." });
  }

  // Mapping email
  const emailTujuan = {
    Meteorologi: "bhinnekaDev24@gmail.com",
    Klimatologi: "bhinnekaDev24@gmail.com",
    Geofisika: "bhinnekaDev24@gmail.com",
  };

  const tujuanEmail = emailTujuan[Stasiun];

  if (!tujuanEmail) {
    return res.status(400).json({ message: "Email tujuan tidak ditemukan." });
  }

  const isPerusahaan =
    dataUser.Nama_Perusahaan &&
    dataUser.Email_Perusahaan &&
    dataUser.No_Hp_Perusahaan &&
    dataUser.Alamat_Perusahaan;

  const emailContent = `
    <h2>Pengajuan Kunjungan Baru</h2>
    <p><strong>User ID:</strong> ${userId}</p>
    <p><strong>Stasiun:</strong> ${Stasiun}</p>
    <p><strong>Tanggal Kunjungan:</strong> ${TanggalKunjungan}</p>
    <p><strong>Jam Kunjungan:</strong> ${JamKunjungan}</p>
    <p><strong>No Surat:</strong> ${NoSurat}</p>
    <p><strong>Tujuan Berkunjung:</strong> ${TujuanBerkunjung}</p>
    <p><strong>Jumlah Pengunjung:</strong> ${JumlahPengunjung}</p>
    <p><strong>Keterangan:</strong> ${Keterangan}</p>

    <h3>Data Pengguna</h3>
    ${
      isPerusahaan
        ? `
      <p><strong>Nama Perusahaan:</strong> ${dataUser.Nama_Perusahaan}</p>
      <p><strong>Email Perusahaan:</strong> ${dataUser.Email_Perusahaan}</p>
      <p><strong>No HP Perusahaan:</strong> ${dataUser.No_Hp_Perusahaan}</p>
      <p><strong>Alamat Perusahaan:</strong> ${dataUser.Alamat_Perusahaan}</p>
      <p><strong>Kabupaten/Kota:</strong> ${dataUser.Kabupaten_Kota_Perusahaan}</p>
      <p><strong>Provinsi:</strong> ${dataUser.Provinsi_Perusahaan}</p>
      <p><strong>Nama Kontak Person:</strong> ${dataUser.Nama_Lengkap}</p>
      <p><strong>Email Kontak Person:</strong> ${dataUser.Email}</p>
      <p><strong>No HP Kontak Person:</strong> ${dataUser.No_Hp}</p>
    `
        : `
      <p><strong>Nama Lengkap:</strong> ${dataUser.Nama_Lengkap}</p>
      <p><strong>Email:</strong> ${dataUser.Email}</p>
      <p><strong>No HP:</strong> ${dataUser.No_Hp}</p>
    `
    }

    <h3>File Dokumen</h3>
    <p><a href="${fileURL}" target="_blank">Lihat Dokumen</a></p>

    <hr />
    <small>Waktu Pengajuan: ${new Date().toLocaleString()}</small>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Pengajuan Kunjungan" <${process.env.EMAIL_USER}>`,
      to: tujuanEmail,
      cc: "admin@gmail.com", // opsional
      subject: `Pengajuan Kunjungan: ${
        isPerusahaan ? dataUser.Nama_Perusahaan : dataUser.Nama_Lengkap
      }`,
      html: emailContent,
    });

    return res.status(200).json({ message: "Email berhasil dikirim!" });
  } catch (error) {
    console.error("Error saat kirim email:", error);

    return res
      .status(500)
      .json({ message: "Gagal mengirim email, coba lagi nanti!" });
  }
}

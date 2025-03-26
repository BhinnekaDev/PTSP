import nodemailer from "nodemailer";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { app } from "@/lib/firebaseConfig";

const database = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log("Data yang diterima di API:", req.body);

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
    FileURL,
    Instansi,
    NamaInstansi,
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
    !FileURL
  ) {
    return res
      .status(400)
      .json({ message: "Data yang dikirim tidak lengkap." });
  }

  // Validasi email tujuan
  const emailTujuan = {
    Meteorologi: "bhinnekaDev24@gmail.com",
    Klimatologi: "bhinnekaDev24@gmail.com",
    Geofisika: "bhinnekaDev24@gmail.com",
  };

  const tujuanEmail = emailTujuan[Stasiun];

  if (!tujuanEmail) {
    return res.status(400).json({ message: "Email tujuan tidak ditemukan." });
  }

  const jenisUser = dataUser.JenisUser;

  const isPerusahaan = jenisUser === "Perusahaan";
  const isUmum = Instansi === "Umum";

  // TEMPLATE EMAIL
  const emailContent = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <table width="100%" style="border-bottom: 3px solid #000; margin-bottom: 20px;">
        <tr>
          <td><img src="https://github.com/BhinnekaDev/PTSP/blob/master/assets/img/Logo/logo.png" alt="Logo BMKG" width="100"></td>
          <td style="text-align: center;">
            <h2 style="margin: 0;">BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA</h2>
            <p style="margin: 0;">alamat lorem ipsum </p>
          </td>
        </tr>
      </table>

      <p>Kepada Yth.</p>
      <p>Kepala Stasiun ${Stasiun}</p>

      <p>Dengan hormat,</p>

      <p>Bersama ini kami sampaikan pengajuan permohonan kunjungan dengan rincian sebagai berikut:</p>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">User ID</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${userId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Tanggal Kunjungan</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${TanggalKunjungan}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Jam Kunjungan</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${JamKunjungan}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">No Surat</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${NoSurat}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Tujuan Berkunjung</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${TujuanBerkunjung}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Jumlah Pengunjung</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${JumlahPengunjung}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">Keterangan</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${Keterangan}</td>
        </tr>
      </table>

      <h3>Data Pengguna</h3>
      ${
        isPerusahaan
          ? `
          <ul>
            <li><strong>Nama Perusahaan:</strong> ${dataUser.Nama_Perusahaan}</li>
            <li><strong>Email Perusahaan:</strong> ${dataUser.Email_Perusahaan}</li>
            <li><strong>No HP Perusahaan:</strong> ${dataUser.No_Hp_Perusahaan}</li>
            <li><strong>Alamat Perusahaan:</strong> ${dataUser.Alamat_Perusahaan}</li>
            <li><strong>Kabupaten/Kota:</strong> ${dataUser.Kabupaten_Kota_Perusahaan}</li>
            <li><strong>Provinsi:</strong> ${dataUser.Provinsi_Perusahaan}</li>
            <li><strong>Nama Kontak Person:</strong> ${dataUser.Nama_Lengkap}</li>
            <li><strong>Email Kontak Person:</strong> ${dataUser.Email}</li>
            <li><strong>No HP Kontak Person:</strong> ${dataUser.No_Hp}</li>
          </ul>`
          : `
          <ul>
            <li><strong>Nama Lengkap:</strong> ${dataUser.Nama_Lengkap}</li>
            <li><strong>Email:</strong> ${dataUser.Email}</li>
            <li><strong>No HP:</strong> ${dataUser.No_Hp}</li>
            <li><strong>Instansi:</strong> ${Instansi || "-"}</li>
            <li><strong>Nama Instansi:</strong> ${
              isUmum ? "" : NamaInstansi || "-"
            }</li>
          </ul>`
      }

      <h3>File Dokumen Pendukung</h3>
      <p>Silakan unduh dokumen melalui tautan berikut:</p>
      <p><a href="${FileURL}" style="color: #007bff;">Lihat Dokumen</a></p>

      <br/>

      <p>Demikian permohonan ini kami sampaikan, atas perhatian dan kerjasamanya kami ucapkan terima kasih.</p>

      <br/>

      <p>Hormat kami,</p>
      <p><strong>${
        isPerusahaan ? dataUser.Nama_Perusahaan : dataUser.Nama_Lengkap
      }</strong></p>

      <hr/>
      <small style="color: #777;">Tanggal Pengajuan: ${new Date().toLocaleString()}</small>
    </div>
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
      from: `"Pengajuan Kunjungan BMKG" <${process.env.EMAIL_USER}>`,
      to: tujuanEmail,
      cc: "bhinnekaDev24@gmail.com", // opsional
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

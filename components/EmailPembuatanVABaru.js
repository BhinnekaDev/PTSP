const kirimEmailPerbaikan = async (toEmail, Nama_Lengkap, ID_Pemesanan) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 750px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
    <div style="text-align: left;">
      <img src="https://ci3.googleusercontent.com/meips/ADKq_NYK_W0aeiSryJG4Ri-SwRSz0GlvFVJrC2NrNI8HG2Qku2tHtY4TfAzVCy5JAxySiGkj4XyYGhFEdL6j-XSyRIl00tLcjU4IBKh6Hxqw9D6EEHwYDLN9p-oK4Kzeq7goSvKI=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1ZDTGxMXQOw_VcW9dJwYLQh05j4MsYDqY" alt="BMKG Logo" width="200" height="100" style="margin-bottom: 20px;" />
    </div>

    <p>Yth. <strong>${Nama_Lengkap}</strong></p>
   <p style="font-size: 15px; color: #333;">
    Kami telah menerima permintaan penerbitan Virtual Account Baru untuk permohonan Anda dengan nomor pesanan <strong>${ID_Pemesanan}</strong>. Permintaan Anda akan segera kami proses.<br /><br />
    Informasi detail mengenai Virtual Account akan dikirimkan setelah proses selesai.<br />
    Terima kasih atas perhatian dan kerja samanya.<br />
    </p>

    <p style="margin-top: 30px;">Hormat kami,<br /><strong>BMKG PTSP Bengkulu</strong></p>
    <p style="margin-top: 10px;">Butuh bantuan? Hubungi kami melalui email, telepon, atau datang langsung ke kantor kami. Atau bisa melalu fitur live chat yang terdapat pada website.</p>

    <hr style="margin: 30px 0;" />

    <div style="font-size: 13px; color: #555;">
      <p><strong>Stasiun Meteorologi</strong> - Jl. Depati Payung Negara, Pekan Sabtu, Kec. Selebar, Kota Bengkulu, Bengkulu 38213<br />
      0736-51064</p>

      <p><strong>Stasiun Klimatologi</strong> - Jl. R. Suprapto, Selebar, Bengkulu 38172<br />
      0736-51157 / 0736-346196 / 0736-33002<br />
      <a href="mailto:staklim.pusatkajiklim@bmkg.go.id">staklim.pusatkajiklim@bmkg.go.id</a></p>

      <p><strong>Stasiun Geofisika</strong> - Jl. Pembangunan No. 156 Pasar Ujung, Kepahiang, Bengkulu<br />
      0732-211000<br />
      <a href="mailto:stageof.kepahiang@bmkg.go.id">stageof.kepahiang@bmkg.go.id</a></p>
    </div>

    <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 30px;">
      &copy; 2025 - PTSP BMKG Provinsi Bengkulu. All Rights Reserved.
    </p>
  </div>
`;

  try {
    await fetch("/api/postEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: toEmail,
        subject: "Permintaan Virtual Account Baru Berhasil Diajukan Kembali",
        html: htmlContent,
      }),
    });
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};

export default kirimEmailPerbaikan;

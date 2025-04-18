const kirimEmailKonfirmasi = async (
  toEmail,
  formName,
  Nama_Lengkap,
  ID_Ajukan,
  ID_Pemesanan,
  base64PDF
) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
    <div style="text-align: center;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Logo_BMKG_%282010%29.png" alt="BMKG Logo" width="100" style="margin-bottom: 20px;" />
    </div>

    <p>Yth. <strong>${Nama_Lengkap}</strong></p>

    <p style="font-size: 15px; color: #333;">
      Permohonan Anda telah kami terima dengan nomor Ajuan <strong>${ID_Ajukan}</strong> dan akan segera kami proses. Jika ada informasi tambahan yang diperlukan, kami akan menghubungi Anda kembali. Terima kasih.<br />
      Silakan menghubungi kami jika ada pertanyaan lebih lanjut.
    </p>

    <p style="margin-top: 20px;">Hormat kami,<br /><strong>BMKG PTSP Bengkulu</strong></p>

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
    await fetch("/api/postEmailAjukan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: toEmail,
        subject: "Pengajuan Anda Berhasil Diajukan",
        text: `Pengajuan dengan nama "${formName}" telah berhasil dikirim. Tim kami akan segera meninjau.`,
        html: htmlContent,
        attachments: base64PDF
          ? [
              {
                filename: `Invoice_Pesanan_${ID_Pemesanan}.pdf`,
                content: base64PDF,
                encoding: "base64",
              },
            ]
          : [],
      }),
    });
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};

export default kirimEmailKonfirmasi;

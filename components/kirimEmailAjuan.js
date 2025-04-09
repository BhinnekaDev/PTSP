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
        <h2 style="text-align: center; color: #333;">Halo, Pengguna PTSP BMKG Bengkulu</h2>
        <p style="text-align: center; font-size: 16px; color: #555;">
        Pengajuan atas nama <strong>"${Nama_Lengkap}"</strong> dengan email <strong>"${toEmail}"</strong> telah berhasil dikirim.  
        Nomor Ajuan: <strong>"${ID_Ajukan}"</strong>, Nomor Pemesanan: <strong>"${ID_Pemesanan}"</strong>,  
        Jenis Pengajuan: <strong>"${formName}"</strong>.
        </p>
        <p style="text-align: center; font-size: 15px; color: #777;">
          Tim kami akan segera meninjau pengajuan Anda.
        </p>
        <p style="margin-top: 40px; text-align: center; font-size: 12px; color: #aaa;">
          Jika Anda tidak merasa mengirimkan pengajuan ini, abaikan saja email ini. Akun Anda tetap aman.
        </p>
      </div>
    `;

  try {
    await fetch("/api/kirim-email", {
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

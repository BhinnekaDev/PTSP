const kirimEmailKonfirmasiPembayaran = async (
  toEmail,
  Nama_Lengkap,
  ID_Pemesanan,
  ID_Ajukan,
  Tanggal_Pemesanan,
  formName,
  dataPesanan,
  Total_Harga,
  Tanggal_Pengiriman_Bukti,
  ID_Transaksi
) => {
  const daftarProdukHTML = `
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: Arial, sans-serif;">
      <thead>
        <tr style="background-color: #00796B; color: white;">
          <th style="border: 1px solid #ddd; padding: 10px;">No.</th>
          <th style="border: 1px solid #ddd; padding: 10px;">Nama Produk</th>
          <th style="border: 1px solid #ddd; padding: 10px;">Stasiun</th>
          <th style="border: 1px solid #ddd; padding: 10px;">Jenis Produk</th>
          <th style="border: 1px solid #ddd; padding: 10px;">Harga</th>
          <th style="border: 1px solid #ddd; padding: 10px;">Qty</th>
          <th style="border: 1px solid #ddd; padding: 10px;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${dataPesanan
          .map((item, index) => {
            const NamaProduk = item.Nama;
            const Stasiun = item.Pemilik;
            const JenisProduk = item.Jenis_Produk;
            const Harga = item.Harga || 0;
            const Kuantitas = item.Kuantitas || 1;
            const Total_Harga_Produk = item.Total_Harga || 0;
            return `
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${String(
                  index + 1
                ).padStart(2, "0")}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${NamaProduk}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${Stasiun}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${JenisProduk}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">Rp ${Harga.toLocaleString()}</td>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${Kuantitas}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">Rp ${Total_Harga_Produk.toLocaleString()}</td>
              </tr>
            `;
          })
          .join("")}
        <tr>
          <td colspan="6" style="text-align: right; padding: 10px; font-weight: bold; border: 1px solid #ddd;">Total Pembayaran:</td>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #ddd;">
            Rp ${Total_Harga.toLocaleString()}
          </td>
        </tr>
      </tbody>
    </table>
  `;

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 780px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
    <div style="text-align: left;">
      <img src="https://ci3.googleusercontent.com/meips/ADKq_NYK_W0aeiSryJG4Ri-SwRSz0GlvFVJrC2NrNI8HG2Qku2tHtY4TfAzVCy5JAxySiGkj4XyYGhFEdL6j-XSyRIl00tLcjU4IBKh6Hxqw9D6EEHwYDLN9p-oK4Kzeq7goSvKI=s0-d-e1-ft#https://drive.google.com/uc?export=view&id=1ZDTGxMXQOw_VcW9dJwYLQh05j4MsYDqY" alt="BMKG Logo" width="210" height="100" style="margin-bottom: 20px;" />
    </div>
    <div>
      <p>Yth. <strong>${Nama_Lengkap}</strong></p>
      <p style="font-size: 15px; color: #333; text-align: justify;">
       Pengiriman bukti pembayaran Anda telah kami terima dengan nomor Ajuan <strong>${ID_Ajukan}</strong> dengan jenis ajuan <strong>${formName}</strong> pada tanggal <strong>${Tanggal_Pengiriman_Bukti}</strong>. Permohonan Anda dan akan segera kami proses. Jika ada informasi tambahan yang diperlukan, kami akan menghubungi Anda kembali. Terima kasih.<br />
      </p>
      <h3 style="margin-top: 35px;">RINCIAN PESANAN</h3>
      <p><strong>No. Pesanan:</strong> <span style="color: #555;">#${ID_Pemesanan}</span></p>
      <p><strong>Tanggal Pemesanan:</strong> <span style="color: #555;">${Tanggal_Pemesanan}</span> </p>
      <p><strong>No. Transaksi:</strong> <span style="color: #555;">#${ID_Transaksi}</span></p>
      <p><strong>Tanggal Pemesanan:</strong> <span style="color: #555;">${Tanggal_Pengiriman_Bukti}</span> </p>

      ${daftarProdukHTML}

      <p style="margin-top: 30px;">Hormat kami,<br /><strong>BMKG PTSP Bengkulu</strong></p>
      <p style="margin-top: 10px;">Butuh bantuan? Hubungi kami melalui email, telepon, atau datang langsung ke kantor kami. Atau bisa melalu fitur live chat yang terdapat pada website.</p>
     </div>
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
        subject: "Pengiriman Bukti Pembayaran Anda Berhasil Dikirim",
        html: htmlContent,
      }),
    });
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};

export default kirimEmailKonfirmasiPembayaran;

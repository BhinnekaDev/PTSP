const kirimEmailKunjunganPengguna = async (
  toEmail,
  Nama_Lengkap,
  ID_PengajuanKunjungan,
  Tanggal_Pengajuan_Kunjungan,
  Nama_Perusahaan,
  Email_Perusahaan,
  Alamat_Perusahaan,
  Kabupaten_Kota_Perusahaan,
  Provinsi_Perusahaan,
  No_Hp,
  No_Hp_Perusahaan,
  dataPengajuan
) => {
  const dataPengajuanKunjungan = `
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-family: Arial, sans-serif;">
    <thead>
      <tr style="background-color: #00796B; color: white;">
        <th style="border: 1px solid #ddd; padding: 10px;">Detail Pengajuan</th>
        <th style="border: 1px solid #ddd; padding: 10px;">Keterangan</th>
      </tr>
    </thead>
    <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Instansi</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.Instansi || "-"
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Nama Instansi</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.Nama_Instansi || "-"
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Stasiun</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.Stasiun
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Tanggal Kunjungan</td>
              <td style="border: 1px solid #ddd; padding: 10px;">
                ${(() => {
                  const date = dataPengajuan.Tanggal_Kunjungan?.toDate?.();
                  if (!date) return "-";

                  const tgl = String(date.getDate()).padStart(2, "0");
                  const bln = String(date.getMonth() + 1).padStart(2, "0");
                  const thn = date.getFullYear();
                  return `${tgl}.${bln}.${thn}`;
                })()}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Jam Kunjungan</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.Jam_Kunjungan
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Jumlah Pengunjung</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.Jumlah_Pengunjung
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Tujuan Kunjungan</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.Tujuan_Berkunjung
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">No Surat</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.No_Surat
              }</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Lampiran Dokumen</td>
             <td style="border: 1px solid #ddd; padding: 10px;">
              <a href="${
                dataPengajuan.Lampiran_Kunjungan
              }" target="_blank" style="color: #007bff; text-decoration: underline;">
                Preview
              </a>
            </td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Keterangan Tambahan</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${
                dataPengajuan.Keterangan || "-"
              }</td>
            </tr>
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
       Permohonan Kunjungan Anda telah kami terima dengan nomor Kunjungan <strong>${ID_PengajuanKunjungan}</strong> pada tanggal <strong>${Tanggal_Pengajuan_Kunjungan}</strong>. Permohonan Anda dan akan segera kami proses. Jika ada informasi tambahan yang diperlukan, kami akan menghubungi Anda kembali. Terima kasih.<br />
      </p>
      <h3 style="margin-top: 35px;">RINCIAN DATA PENGGUNA</h3>
      <p><strong>Nama Pengaju:</strong> <span style="color: #333;">
        ${Nama_Lengkap}${Nama_Perusahaan ? " - " + Nama_Perusahaan : ""}
      </span></p>
      <p><strong>Email Pengaju:</strong> <span style="color: #333;">
        ${toEmail}${Email_Perusahaan ? " - " + Email_Perusahaan : ""}
      </span></p>
      <p><strong>Alamat Pengaju:</strong> <span style="color: #333;">
        ${
          Alamat_Perusahaan && Kabupaten_Kota_Perusahaan && Provinsi_Perusahaan
            ? `${Alamat_Perusahaan}, ${Kabupaten_Kota_Perusahaan}, ${Provinsi_Perusahaan}`
            : "-"
        }
      </span></p>
      <p><strong>Nomor Telepon Pengaju:</strong> <span style="color: #333;">
        ${No_Hp}${No_Hp_Perusahaan ? " - " + No_Hp_Perusahaan : ""}
      </span></p>

        ${dataPengajuanKunjungan}

      <p style="margin-top: 30px;">Hormat kami,<br /><strong>BMKG PTSP Bengkulu</strong></p>
      <p style="margin-top: 10px;">Butuh bantuan? Hubungi kami melalui email, telepon, atau datang langsung ke kantor kami. Atau bisa melalu fitur live chat yang terdapat pada website.</p>
     </div>
    <hr style="margin: 30px 0;" />
     <div style="font-size: 13px; color: #555;">
      <p><strong>Stasiun Meteorologi</strong> - Jl. Depati Payung Negara, Komplek Bandar Udara Fatmawati Soekarno Bengkulu.Kel. Pekan Sabtu, Kec. Selebar, Kota Bengkulu, Bengkulu – 38213<br />
      08117328773</p>
      <a href="mailto:stamet.fatmawati@bmkg.go.id">stamet.fatmawati@bmkg.go.id</a></p>
      <p><strong>Stasiun Klimatologi</strong> - Jl. R.E. Martadinata, Kelurahan Kandang, Kecamatan Kampung Melayu, Kota Bengkulu, Bengkulu - 38216<br />
      08117321291<br />
      <a href="mailto:staklim.bengkulu@bmkg.go.id">staklim.bengkulu@bmkg.go.id</a></p>
      <p><strong>Stasiun Geofisika (Kantor Bengkulu)</strong> - Jl. Jati No. 37, Sawah Lebar Kec. Ratu Samban, Kota Bengkulu, Bengkulu 38221 (depan McD)<br />
       08111360636<br />
      <p><strong>Stasiun Geofisika (Kantor Kepahiang)</strong> - Jl. Pembangunan No. 156, Pasar Ujung, Kepahiang, Kec. Kepahiang, Bengkulu<br />
       08111360636<br />
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
        subject: "Pengajuan Kunjungan Anda Berhasil Diajukan",
        html: htmlContent,
      }),
    });
  } catch (error) {
    console.error("Gagal mengirim email:", error);
  }
};

export default kirimEmailKunjunganPengguna;

const pad = (n) => n.toString().padStart(2, "0");
export const formatTanggal = (tanggal) => {
  const tgl = pad(tanggal.getDate());
  const bln = pad(tanggal.getMonth() + 1);
  const thn = tanggal.getFullYear();

  const jam = pad(tanggal.getHours());
  const menit = pad(tanggal.getMinutes());
  const detik = pad(tanggal.getSeconds());

  return `${tgl}/${bln}/${thn} ${jam}.${menit}.${detik}`;
};

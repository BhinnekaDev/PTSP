import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const useInvoicePDF = () => {
  const generateInvoicePDF = (pemesanan, userData, ajukanDetail) => {
    const doc = new jsPDF();

    const imageUrl = "/assets/img/Faktur-Header.png";
    const imgWidth = 210;
    const imgHeight = 40;
    const imgX = 0;
    const imgY = 0;

    doc.addImage(imageUrl, "JPEG", imgX, imgY, imgWidth, imgHeight);

    const text = "Dokumen Pesanan Anda";
    const textWidth = doc.getTextWidth(text);
    const pageWidth = doc.internal.pageSize.width;
    const titleX = (pageWidth - textWidth) / 2;
    const titleY = imgY + imgHeight + 15;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(text, titleX, titleY);

    let statusLabel = "";
    let statusColor = "";

    switch (pemesanan.Status_Pembayaran) {
      case "Menunggu Pembayaran":
        statusLabel = "Belum Bayar";
        statusColor = "red";
        break;
      case "Ditolak":
        statusLabel = "Ditolak";
        statusColor = "red";
        break;
      case "Sedang Ditinjau":
        statusLabel = "Sedang Ditinjau";
        statusColor = "yellow";
        break;
      case "Lunas":
        statusLabel = "Lunas";
        statusColor = "green";
        break;
      case "Menunggu Admin":
        statusLabel = "Kadaluwarsa";
        statusColor = "gray";
        break;
      default:
        statusLabel = "Status Tidak Diketahui";
        statusColor = "gray";
    }

    const statusX = pageWidth - doc.getTextWidth(statusLabel) - 14;
    const statusY = titleY + 10;
    switch (statusColor) {
      case "red":
        doc.setTextColor(255, 0, 0);
        break;
      case "yellow":
        doc.setTextColor(255, 255, 0);
        break;
      case "green":
        doc.setTextColor(0, 128, 0);
        break;
      case "gray":
        doc.setTextColor(128, 128, 128);
        break;
      default:
        doc.setTextColor(0, 0, 0);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(statusLabel, statusX, statusY);

    doc.setTextColor(0, 0, 0);

    const billingDetails = [
      { label: "Nomor Pesanan", value: `#${pemesanan.id}` },
      {
        label: "Tanggal Pemesanan",
        value: new Date(
          pemesanan.Tanggal_Pemesanan.seconds * 1000
        ).toLocaleString(),
      },
      { label: "Nomor Ajukan", value: pemesanan.ID_Ajukan },
      {
        label: "Tanggal Pengajuan",
        value: new Date(
          ajukanDetail.Tanggal_Pembuatan_Ajukan.seconds * 1000
        ).toLocaleString(),
      },
      { label: "Nomor Transaksi", value: pemesanan.ID_Transaksi || "-" },
      {
        label: "Detail Penerima",
        value: userData.Nama_Perusahaan
          ? `${userData.Nama_Lengkap} / ${userData.Nama_Perusahaan}`
          : userData.Nama_Lengkap,
      },
      {
        label: "Email",
        value: userData.Email_Perusahaan
          ? `${userData.Email} / ${userData.Email_Perusahaan}`
          : userData.Email,
      },
      {
        label: "Jenis Pengajuan",
        value:
          pemesanan.ajukanDetail.Jenis_Ajukan === "Gratis"
            ? "Gratis"
            : "Berbayar",
      },
    ];

    let billingY = statusY + 15;
    billingDetails.forEach((item) => {
      const labelX = 14;
      const valueX = 60;
      doc.setFont("helvetica", "normal");
      doc.text(`${item.label}`, labelX, billingY);
      doc.text(`: ${item.value}`, valueX, billingY);
      billingY += 8;
    });

    autoTable(doc, {
      head: [
        ["Nama Produk", "Instansi", "Jumlah", "Harga Produk", "Total Harga"],
      ],
      body: pemesanan.Data_Keranjang.map((produk) => {
        const isGratis = pemesanan.ajukanDetail.Jenis_Ajukan === "Gratis";
        const harga = isGratis ? 0 : produk.Harga;
        const total = isGratis ? 0 : produk.Harga * produk.Kuantitas;

        return [
          produk.Nama,
          produk.Pemilik,
          produk.Kuantitas,
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(harga),
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(total),
        ];
      }),
      startY: billingY + 4,
      margin: { left: 14, right: 14 },
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 6,
        valign: "middle",
        halign: "center",
      },
      headStyles: {
        fillColor: [0, 112, 255],
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [245, 248, 255],
        textColor: 0,
      },
      didDrawPage: function (data) {
        const totalY = data.cursor.y + 10;

        doc.setFont("helvetica", "bold");
        doc.text("Total Pesanan", 120, totalY);

        doc.setFont("helvetica", "normal");
        doc.setFillColor(245, 248, 255);
        doc.rect(150, totalY - 6, 45, 8, "F");

        const totalPesanan =
          pemesanan.ajukanDetail.Jenis_Ajukan === "Gratis"
            ? 0
            : pemesanan.Total_Harga_Pesanan;

        doc.text(
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(totalPesanan),
          160,
          totalY
        );
      },
    });

    const noteText =
      "Catatan: Jika ada permasalahan atau kesalahan dalam dokumen ini, silakan hubungi stasiun sesuai pesanan anda.";
    const marginLeft = 14;

    const availableWidth = pageWidth - marginLeft * 2;
    const splitNote = doc.splitTextToSize(noteText, availableWidth);

    const noteYPosition = doc.lastAutoTable.finalY + 20;
    doc.text(splitNote, marginLeft, noteYPosition);

    doc.save(`Invoice_Pesanan_${pemesanan.id}.pdf`);
  };

  const handleDownload = (pemesanan, userData, ajukanDetail) => {
    if (!pemesanan || !userData || !ajukanDetail) {
      toast.error("Data pesanan tidak lengkap.");
      return;
    }
    generateInvoicePDF(pemesanan, userData, ajukanDetail);
  };

  return { handleDownload };
};

export default useInvoicePDF;

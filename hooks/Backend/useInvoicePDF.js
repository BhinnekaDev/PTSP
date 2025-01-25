import { toast } from "react-hot-toast";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
      { label: "Nomor Ajukan", value: pemesanan.ID_Ajukan },
      {
        label: "Tanggal Pemesanan",
        value: new Date(
          pemesanan.Tanggal_Pemesanan.seconds * 1000
        ).toLocaleString(),
      },
      {
        label: "Tanggal Pengajuan",
        value: new Date(
          ajukanDetail.Tanggal_Pembuatan_Ajukan.seconds * 1000
        ).toLocaleString(),
      },
      {
        label: "Detail Penerima",
        value: userData.Nama_Perusahaan
          ? `${userData.Nama_Lengkap} || ${userData.Nama_Perusahaan}`
          : userData.Nama_Lengkap,
      },
      {
        label: "Email",
        value: userData.Email_Perusahaan
          ? `${userData.Email} || ${userData.Email_Perusahaan}`
          : userData.Email,
      },
      {
        label: "Tanggal Pembayaran",
        value:
          pemesanan.ajukanDetail.Jenis_Ajukan === "Gratis"
            ? "GRATIS"
            : pemesanan.Status_Pembayaran === "Sedang Ditinjau"
            ? "Pembayaran sedang ditinjau"
            : pemesanan.Status_Pembayaran === "Ditolak"
            ? "Pembayaran Anda Ditolak"
            : new Date(
                pemesanan.transaksiDetail?.Tanggal_Pengiriman_Bukti?.seconds *
                  1000
              ).toLocaleString() || "-",
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

    doc.autoTable({
      head: [
        [
          "Nama Produk",
          "Nama Instansi",
          "Kuantitas",
          "Harga Produk",
          "Total Harga per Produk",
        ],
      ],
      body: pemesanan.Data_Keranjang.map((produk) => [
        produk.Nama,
        produk.Pemilik,
        produk.Kuantitas,
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(produk.Harga),
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(produk.Harga * produk.Kuantitas),
      ]),
      startY: billingY + 10,
      margin: { top: 20 },
    });

    const totalPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(pemesanan.Total_Harga_Pesanan);
    const totalYPosition = doc.lastAutoTable.finalY + 10;
    doc.setFont("helvetica", "bold");
    doc.text("Total Pesanan", 14, totalYPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${totalPrice}`, 60, totalYPosition);

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

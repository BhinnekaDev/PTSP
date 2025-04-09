import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const useInvoicePDF = () => {
  const getImageBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL);
      };

      img.onerror = (err) => {
        reject(err);
      };
    });
  };

  const generateInvoiceBase64 = async ({
    Nama_Lengkap,
    Nama_Lengkap_Perusahaan,
    Email,
    Email_Perusahaan,
    ID_Ajukan,
    Jenis_Ajukan,
    ID_Pemesanan,
    Status_Pembayaran,
    dataPesanan,
    Total_Harga_Pesanan,
    Tanggal_Pemesanan,
    Tanggal_Pembuatan_Ajukan,
  }) => {
    const doc = new jsPDF();
    const imageUrl = "/assets/img/Faktur-Header.png";
    const imageBase64 = await getImageBase64(imageUrl);

    const imgWidth = 210;
    const imgHeight = 40;
    const imgX = 0;
    const imgY = 0;

    doc.addImage(imageBase64, "JPEG", imgX, imgY, imgWidth, imgHeight);

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

    switch (Status_Pembayaran) {
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
      { label: "Nomor Pesanan", value: `#${ID_Pemesanan}` },
      {
        label: "Tanggal Pemesanan",
        value: new Date(Tanggal_Pemesanan).toLocaleString(),
      },
      { label: "Nomor Ajukan", value: ID_Ajukan },
      {
        label: "Tanggal Pengajuan",
        value: new Date(Tanggal_Pembuatan_Ajukan).toLocaleString(),
      },
      {
        label: "Detail Penerima",
        value: Nama_Lengkap_Perusahaan
          ? `${Nama_Lengkap} / ${Nama_Lengkap_Perusahaan}`
          : Nama_Lengkap,
      },
      {
        label: "Email",
        value: Email_Perusahaan ? `${Email} / ${Email_Perusahaan}` : Email,
      },
      {
        label: "Jenis Pengajuan",
        value:
          Jenis_Ajukan === "Gratis"
            ? "Gratis"
            : Status_Pembayaran === "Sedang Ditinjau"
            ? "Pembayaran sedang ditinjau"
            : Status_Pembayaran === "Ditolak"
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
    autoTable(doc, {
      head: [
        ["Nama Produk", "Instansi", "Jumlah", "Harga Produk", "Total Harga"],
      ],
      body: dataPesanan.map((item) => [
        item.Nama,
        item.Pemilik,
        item.Kuantitas,
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.Harga),
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.Harga * item.Kuantitas),
      ]),
      startY: billingY + 4,
      margin: { left: 14, right: 14 },
      styles: {
        font: "helvetica",
        fontSize: 10,
        cellPadding: 6,
        valign: "middle",
        halign: "center", // Rata tengah semua kolom
      },
      headStyles: {
        fillColor: [0, 112, 255], // Biru terang
        textColor: 255,
        fontStyle: "bold",
      },
      bodyStyles: {
        fillColor: [245, 248, 255], // Abu muda
        textColor: 0,
      },
      didDrawPage: function (data) {
        const totalY = data.cursor.y + 10;

        doc.setFont("helvetica", "bold");
        doc.text("Total Pesanan", 120, totalY);

        doc.setFont("helvetica", "normal");
        doc.setFillColor(245, 248, 255);
        doc.rect(150, totalY - 6, 45, 8, "F");

        doc.text(
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(Total_Harga_Pesanan),
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

    return new Promise((resolve) => {
      const base64 = doc.output("datauristring").split(",")[1];
      resolve(base64);
    });
  };

  return { generateInvoiceBase64 };
};

export default useInvoicePDF;

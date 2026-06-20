# 🏢 PTSP BMKG BENGKULU

_Website resmi PTSP (Pelayanan Terpadu Satu Pintu) BMKG Provinsi Bengkulu_

> Dikembangkan untuk mendukung layanan informasi pendidikan oleh **BMKG Provinsi Bengkulu** sejak 2024.

![Platform](https://img.shields.io/badge/platform-Web-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/built%20with-Next.js-000000?logo=nextdotjs&style=flat-square)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2021-F7DF1E?logo=javascript&logoColor=black&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)
![Material Tailwind](https://img.shields.io/badge/Material_Tailwind-2.0.0-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel&logoColor=white&style=flat-square)

---

## 🌐 Demo

Coba langsung: **[https://ptsp-six.vercel.app/Beranda](https://ptsp-six.vercel.app/Beranda)** _(hosted on Vercel)_

---

## 🚀 Fitur

Berikut versi lengkap tabel **Fitur / Modul** untuk README proyek **PTSP BMKG Bengkulu**, sesuai format seperti contoh sebelumnya:

---

## 🚀 Fitur

| Modul                  | Deskripsi                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------ |
| **Beranda**            | Halaman utama berisi informasi singkat, banner, dan tautan cepat ke menu lain.       |
| **Layanan**            | Menampilkan isi submenu dari konten layanan PTSP BMKG Bengkulu.                      |
| **Alur Layanan**       | Menampilkan gambaran alur dari permintaan layanan PTSP BMKG Bengkulu.                |
| **Standar Pelayanan**  | Menampilkan pedoman dasar pelayanan di setiap stasiun yang ada di BMKG Bengkulu.     |
| **Regulasi Pelayanan** | Menampilkan aturan dasar pelayanan di BMKG Bengkulu.                                 |
| **Tarif Pelayanan**    | Menampilkan harga layanan yang ada di BMKG Bengkulu.                                 |
| **Panduan Pelayanan**  | Menampilkan informasi cara menggunakan layanan permintaan data di BMKG Bengkulu.     |
| **Produk**             | Menampilkan produk dan kategori layanan yang ada di BMKG Bengkulu.                   |
| **Saran & Pengaduan**  | Menampilkan isi submenu dari konten saran pengaduan PTSP BMKG Bengkulu.              |
| **Kunjungan**          | Menampilkan isi form untuk melakukan kunjungan ke stasiun yang ada di BMKG Bengkulu. |
| **FAQ**                | Menampilkan pertanyaan umum seputar layanan di BMKG BEngkulu.                        |
| **Live Chat**          | Membantu dalam pelayanan untuk dapat bertanya dengan admin stasiun yang terkait.     |
| **Unduh APK**          | Membantu untuk mengunduh layanan PTSP via mobile khusus berupa apk.                  |

---

## ⚙️ Teknologi

| Layer           | Stack                                                     |
| --------------- | --------------------------------------------------------- |
| **Frontend**    | Next.js 16.2.9, React 18.3.1, Tailwind CSS 3.4.1          |
| **Styling**     | Tailwind CLI, PostCSS                                     |
| **Komponen UI** | @material-tailwind/react 2.1.10, React Icons 5.3.0        |
| **Utility**     | ESLint 9, Lodash.debounce, Dompurify, Emoji-picker, jsPDF |
| **CI & Deploy** | GitHub Actions, Vercel Edge                               |

---

## 🛠️ Instalasi

```bash
# Klon repository
$ git clone https://github.com/BhinnekaDev/PTSP
$ cd PTSP

# Instal dependensi
$ npm install
```

Jalankan dalam mode pengembangan:

```bash
$ npm run dev
```

Akses melalui [http://localhost:3000](http://localhost:3000).

---

## 📁 Struktur Dasar

```
PTSP/
├── app/
│   ├── Ajukan/
│   │   └── components
│   │   │    └── Ajukan.js
│   │   └── page.js
│   ├── Beranda/
│   │   └── components
│   │   │    ├── Carousel.js
│   │   │    ├── Features.js
│   │   │    └── Profile.js
│   │   └── page.js
│   ├── ChatAdmin/
│   │   └── components
│   │   │    └── Chat.js
│   │   └── page.js
│   ├── Faq/
│   │   └── components
│   │   │    └── Faq.js
│   │   └── page.js
│   ├── FormBiodata/
│   │   └── components
│   │   │    ├── FormPerorangan.js
│   │   │    ├── FormPerusahaan.js
│   │   │    └── KategoriForm.js
│   │   └── page.js
│   ├── Keranjang/
│   │   └── components
│   │   │    └── DaftarBelanja.js
│   │   └── page.js
│   ├── Login/
│   │   └── components
│   │   │    └── Login.js
│   │   └── page.js
│   ├── Pencarian/
│   │   └── components
│   │   │    └── Pencarian.js
│   │   └── page.js
│   ├── Pengaduan/
│   │   └── components
│   │   │    └── Pengaduan.js
│   │   └── page.js
│   ├── PengajuanKunjungan/
│   │   └── components
│   │   │    └── Pengajuan.js
│   │   └── page.js
│   ├── PengaturanProfil/
│   │   └── components
│   │   │    └── TampilanProfile.js
│   │   └── page.js
│   ├── Produk/
│   │   └── components
│   │   │    ├── InformasiGeofisika.js
│   │   │    ├── InformasiKlimatologi.js
│   │   │    ├── InformasiMeteorologi.js
│   │   │    ├── JasaGeofisika.js
│   │   │    ├── JasaKlimatologi.js
│   │   │    └── JasaMeteorologi.js
│   │   └── page.js
│   ├── Saran/
│   │   └── components
│   │   │    └── Saran.js
│   ├── Transaksi/
│   │   └── components
│   │   │    └── Transaksi.js
│   │   └── page.js
│   ├── favicon.ico
│   ├── global.css
│   ├── layout.js
│   └── MTailwind.js
│   
│   
│   
├── assets/
│   ├── fonts/
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   └── img/
│       ├── Icon
│       │    ├── 1.png
│       │    ├── 2.png
│       │    ├── Informasi-Geofisika.png
│       │    ├── Informasi-Klimatologi.png
│       │    ├── Informasi-Meteorologi.png
│       │    ├── Login.png
│       │    ├── Logo-Perorangan.png
│       │    ├── Logo-Perusahaan.png
│       │    └── Unduh-APK.png
│       ├── Logo
│       │    └── logo.png
│       ├── Pamflet
│       │    ├── 1.png
│       │    └── 2.png
│       ├── Regulasi
│       │    ├── AlurLayanan.png
│       │    ├── StandarLayanan1.png
│       │    └── StandarLayanan2.png
│       └── Slider
│            ├── 1.png
│            ├── 2.png
│            └── 3.png
│   
│   
│   
├── components/
│   ├── DetailTransaksi.js
│   ├── EmailAjuan.js
│   ├── EmailBuktiPembayaran.js
│   ├── EmailIKM.js
│   ├── EmailKadaluwarsa.js
│   ├── EmailKunjunganPengguna.js
│   ├── EmailPembuatanVABaru.js
│   ├── EmailPerbaikanAjuan.js
│   ├── FloatingChat.js
│   ├── FloatingTools.js
│   ├── Footer.js
│   ├── HeaderTemplate.js
│   ├── InvoicePemesanan.js
│   ├── KonfirmasiVABaru.js
│   ├── Memuat.js
│   ├── Navbar.js
│   ├── PengirimanBuktiTransfer.js
│   ├── PengisianIKM.js
│   ├── PerbaikanDokumen.js
│   ├── TabelInformasiLayanan1.js
│   ├── TabelInformasiLayanan2.js
│   ├── TabelInformasiLayanan3.js
│   ├── TampilanProfile.js
│   └── UnduhDokumen.js
│   
│   
│   
├── constant/
│   ├── constDetailTransaksi.ts
│   ├── constEditProfilePerorangan.ts
│   ├── constEditProfilePerusahaan.ts
│   ├── constFormKeagamaan.ts
│   ├── constFormPemerintahan.ts
│   ├── constFormPenanggulanganBencana.ts
│   ├── constFormPendidikan.ts
│   ├── constFormPerorangan.ts
│   ├── constFormPertahanan.ts
│   ├── constFormPerusahaan.ts
│   ├── constFormPNBP.ts
│   ├── constFormSosial.ts
│   ├── constFormIKMKedua.ts
│   ├── constFormIKMPertama.ts
│   ├── constFormKategoriProduk.ts
│   ├── constPerbaikanFormKeagamaan.ts
│   ├── constPerbaikanFormKeagamaan.ts
│   ├── constPerbaikanFormPemerintahan.ts
│   ├── constPerbaikanFormPenanggulanganBencana.ts
│   ├── constPerbaikanFormPendidikan.ts
│   ├── constPerbaikanFormPertahanan.ts
│   ├── constPerbaikanFormPNBP.ts
│   └── constPerbaikanFormSosial.ts
│   
│   
│  
├── hooks/
│   ├── Backend/
│   │   ├── useAmbilKeranjang.js
│   │   ├── useAmbilPesan.js
│   │   ├── useAmbilPesanan.js
│   │   ├── useChatRoomList.js
│   │   ├── useEditProfile.js
│   │   ├── useFormPerorangan.js
│   │   ├── useFormPerusahaan.js
│   │   ├── useHitungKeranjangSesuaiID.js
│   │   ├── useInvoicePDF.js
│   │   ├── useKeluarAkun.js
│   │   ├── useKonfirmasiVABaru.js
│   │   ├── useMasukanAjukan.js
│   │   ├── useMasukanIKM.js
│   │   ├── useMasukanKekeranjangInformasi.js
│   │   ├── useMasukanKekeranjangJasa.js
│   │   ├── useMasukDenganGoogle.js
│   │   ├── useMasukkanPencarian.js
│   │   ├── useMengirimPesan.js
│   │   ├── usePengaduan.js
│   │   ├── usePengirimanBuktiTransfer.js
│   │   ├── usePengirimanPengajuanKunjungan.js
│   │   ├── usePerbaikanDokumen.js
│   │   ├── useSaran.js
│   │   ├── useTampilanInformasiGeofisika.js
│   │   ├── useTampilanInformasiKlimatologi.js
│   │   ├── useTampilanInformasiMeteorologi.js
│   │   ├── useTampilanJasaGeofisika.js
│   │   ├── useTampilanJasaKlimatologi.js
│   │   ├── useTampilanJasaMeteorologi.js
│   │   ├── useTampilanPencarian.js
│   │   ├── useVerifikasiLogin.js
│   │   └── GeistVF.js
│   └── Frontend/
│       ├── useDialogPanduan.js
│       ├── useDialogRegulasi.js
│       ├── useNavbarAktif.js
│       ├── useNavbarEfek.js
│       ├── usePagination.js
│       ├── useStepperForm.js
│       ├── useStepperFormIKM.js
│       └── useStepperFormIKMKedua.js
│   
│   
├── lib/
│   └── firebaseConfig.js
│   
│
├── node_modules/
│
│
├── pages/
│   └── api/
│       ├── getInformasiJasa.js
│       ├── getInformasiJasaPencarian.js
│       └── postEmail.js
│   
│
│
├── public/
│   └── assets/
│       ├── img
│       │    ├── bgChat.js
│       │    ├── Faktur-Header.js
│       │    └── LogoPTSP.js
│       │
│       └── video 
│            └── GuideLinePTSP.js  
│   
│
│
├── utils/
│   ├── utilsAlamat.js
│   ├── utilsEmail.js
│   ├── utilsHuruf.js
│   ├── utilsNoTelepon.js
│   ├── utilsNoTeleponPerusahaan.js
│   ├── utilsNPWP.js
│   └── utilsTanggal.js
│
│
├── dockerignore
├── .env
├── .eslintrc.json
├── .gitignore
├── Dockerfile
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tailwind.config.js
```

---

## 🧰 Script npm

| Perintah            | Fungsi                                 |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Menjalankan mode pengembangan          |
| `npm run build`     | Build produksi dengan Turbopack        |
| `npm run start`     | Menjalankan hasil build                |
| `npm run lint`      | Menjalankan pemeriksaan ESLint         |
| `npm run build:css` | Membangun CSS menggunakan Tailwind CLI |

---

## 🤝 Kontribusi

1. Fork ➜ branch ➜ ubah kode.
2. Gunakan **commit message yang deskriptif**.
3. Jalankan `npm run lint` sebelum membuat PR.
4. Ajukan _Pull Request_.

---

## 📜 Lisensi

MIT © 2024 [Bhinneka Dev](https://github.com/BhinnekaDev)

---

<p align="center">
  <img alt="Cuplikan Website" src="https://github.com/BhinnekaDev/PTSP/blob/master/public/assets/img/Documentation.png" width="80%" />
</p>

<p align="center"><sub>PTSP (Pelayanan Terpadu Satu Pintu) – BMKG Provinsi Bengkulu</sub></p>

---

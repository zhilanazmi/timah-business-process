# Embed Diagram Perencanaan Produksi

Dokumen ini menjelaskan cara menggunakan fitur embed untuk menampilkan diagram alir Perencanaan Produksi PT. Timah Industri di website atau aplikasi Anda.

## 🚀 Cara Cepat

### 1. Menggunakan Generator Embed
Kunjungi [Generator Embed](http://localhost:5173/embed-generator) untuk membuat kode embed dengan mudah:
- Konfigurasikan ukuran dan fitur yang diinginkan
- Salin kode yang dihasilkan
- Tempelkan di website Anda

### 2. Embed Langsung dengan iframe
```html
<iframe 
  src="http://localhost:5173/embed/perencanaan-produksi"
  width="100%"
  height="600px"
  frameborder="0"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="Diagram Perencanaan Produksi - PT. Timah Industri">
</iframe>
```

## ⚙️ Konfigurasi Parameter

| Parameter | Default | Deskripsi |
|-----------|---------|-----------|
| `height` | `100vh` | Tinggi diagram (px, %, vh) |
| `width` | `100%` | Lebar diagram (px, %, vw) |
| `controls` | `true` | Tampilkan kontrol zoom/pan |
| `minimap` | `false` | Tampilkan mini map |
| `background` | `true` | Tampilkan grid background |
| `interactive` | `false` | Mode interaktif (drag & connect) |
| `title` | `true` | Tampilkan judul diagram |
| `headers` | `true` | Tampilkan header kolom (QPP Manager, PP Supervisor, dll) |
| `handlesToggle` | `true` | Tampilkan tombol toggle titik penghubung (hanya di mode interaktif) |

### Contoh Penggunaan Parameter

```html
<!-- Diagram read-only tanpa kontrol -->
<iframe src="http://localhost:5173/embed/perencanaan-produksi?controls=false&title=false"></iframe>

<!-- Diagram interaktif dengan mini map -->
<iframe src="http://localhost:5173/embed/perencanaan-produksi?interactive=true&minimap=true"></iframe>

<!-- Diagram tanpa header kolom -->
<iframe src="http://localhost:5173/embed/perencanaan-produksi?headers=false"></iframe>

<!-- Diagram interaktif tanpa toggle handles -->
<iframe src="http://localhost:5173/embed/perencanaan-produksi?interactive=true&handlesToggle=false"></iframe>
```

## 🎨 Tampilan Bersih

### Titik-titik Penghubung (Handles)
- **Mode Read-Only**: Titik-titik penghubung disembunyikan untuk tampilan yang bersih dan profesional
- **Mode Interaktif**: 
  - Titik-titik penghubung disembunyikan secara default untuk tampilan yang bersih
  - Tersedia tombol toggle di kanan atas untuk menampilkan/menyembunyikan handles
  - Tombol toggle dapat dinonaktifkan dengan parameter `handlesToggle=false`
- Memberikan kontrol penuh kepada pengguna untuk mengatur tampilan sesuai kebutuhan

## 📞 Support

Untuk pertanyaan mengenai embed feature, hubungi: tech-support@timahindustri.com

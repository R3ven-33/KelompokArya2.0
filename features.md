# Fitur-Fitur Sports Field Rental

## Deskripsi Umum
Sports Field Rental adalah platform web yang menyediakan layanan pemesanan lapangan olahraga secara online. Sistem ini memungkinkan pengguna untuk mencari, memesan, dan membayar lapangan olahraga dengan mudah dan efisien.

## Fitur Utama

### 1. Sistem Akun Pengguna
- **Registrasi Pengguna**: Mendaftar akun baru dengan informasi pribadi
- **Login Pengguna**: Masuk ke akun yang telah terdaftar
- **Manajemen Profil**: Melihat dan mengedit informasi profil pengguna
- **Logout**: Keluar dari sistem secara aman

### 2. Pencarian dan Detail Lapangan
- **Daftar Lapangan**: Tampilan semua lapangan yang tersedia
- **Detail Lapangan**: Informasi lengkap tentang lapangan termasuk:
  - Deskripsi lapangan
  - Fasilitas yang tersedia
  - Harga per jam
  - Galeri foto
  - Rating dan ulasan
  - Lokasi

### 3. Sistem Pemesanan (Booking)
- **Pemilihan Tanggal**: Memilih tanggal ketersediaan lapangan
- **Pemilihan Waktu**: Memilih jam mulai dan durasi pemakaian
- **Tampilan Jadwal Tersedia**: Waktu yang dapat dipilih berdasarkan ketersediaan
- **Proses Booking Bertahap**: 
  - Tahap 1: Pilih lapangan dan jadwal
  - Tahap 2: Isi detail booking (nama, kontak, dll.)
  - Tahap 3: Pembayaran

### 4. Sistem Pembayaran
- **Banyak Metode Pembayaran**:
  - Transfer Bank
  - E-Wallet (OVO, DANA, LinkAja, GoPay)
  - QRIS
- **Upload Bukti Pembayaran**: Mengunggah bukti transfer untuk konfirmasi
- **Informasi Pembayaran**: Tampilan rincian pembayaran yang jelas

### 5. Manajemen Booking
- **Riwayat Booking**: Tampilan semua booking yang dibuat oleh pengguna
- **Filter Riwayat**: Memfilter berdasarkan status atau tanggal
- **Detail Booking**: Melihat informasi lengkap setiap booking
- **Pembatalan Booking**: Fungsi untuk membatalkan booking yang belum dikonfirmasi

### 6. Dashboard Pengguna
- **Dashboard User**: Tampilan informasi pribadi dan aktivitas booking
- **Dashboard Admin**: Tampilan manajemen sistem (kelola booking, lapangan, pengguna)
- **Dashboard Owner**: Tampilan manajemen operasional (booking, pembayaran, laporan)

### 7. Sistem Keamanan dan Otentikasi
- **Validasi Data**: Pemeriksaan data sebelum proses booking dan pembayaran
- **Sesi Login**: Pemisahan data berdasarkan pengguna yang login
- **Otentikasi**: Proses login otentikasi untuk akses fitur

### 8. Sistem Penjadwalan & Ketersediaan
- **Manajemen Waktu**: Sistem penjadwalan lapangan berdasarkan waktu
- **Cek Ketersediaan**: Tampilan real-time ketersediaan lapangan
- **Mencegah Duplikasi**: Sistem mencegah booking pada waktu yang sama

### 9. Manajemen Pembayaran
- **Status Pembayaran**: Monitor status pembayaran (pending, confirmed, cancelled)
- **Pengelompokan Pembayaran**: Pembayaran dikelompokkan berdasarkan pengguna
- **Konfirmasi Pembayaran**: Proses konfirmasi oleh admin untuk bukti pembayaran

### 10. Pengalaman Pengguna
- **Antarmuka Responsif**: Tampilan yang rapi dan responsif di berbagai perangkat
- **Navigasi Mudah**: Sistem navigasi yang intuitif dan mudah digunakan
- **Notifikasi Proses**: Informasi status dan proses booking
- **Tampilan Visual**: Galeri foto lapangan dan informasi visual lainnya

## Manfaat Sistem

### Bagi Pengguna:
- **Kemudahan Akses**: Dapat memesan lapangan kapan saja dari mana saja
- **Transparansi Harga**: Harga dan ketersediaan lapangan jelas
- **Efisiensi Waktu**: Tidak perlu datang langsung untuk memesan
- **Riwayat Booking**: Dapat melihat riwayat booking dan statusnya

### Bagi Pemilik Lapangan:
- **Manajemen Efektif**: Pengelolaan lapangan lebih terorganisir
- **Peningkatan Pelayanan**: Menyediakan layanan yang lebih baik untuk pengguna
- **Pemantauan Real-time**: Dapat memantau booking dan pembayaran secara langsung
- **Penjadwalan Otomatis**: Sistem penjadwalan otomatis mencegah konflik waktu

## Teknologi yang Digunakan
- HTML5, CSS3, JavaScript
- Bootstrap 5 (UI Framework)
- localStorage (Penyimpanan data sementara)
- Font Awesome (Ikon)
- Sistem berbasis Client-side (tidak memerlukan server backend untuk fungsi dasar)
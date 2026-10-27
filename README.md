# 🛍️ ShopCart - Platform E-Commerce & Shopping Cart Lengkap

Aplikasi web e-commerce modern dengan fitur lengkap untuk **Pelanggan (Customer)**, pengelolaan **Dompet Digital (Dana / Wallet)**, dan **Dashboard Admin** terpisah.

---

## ✨ Fitur Utama

### 🛍️ Sisi Pelanggan (Customer Storefront)
- **Katalog & Filter Produk**: Pencarian produk secara real-time dan penyaringan berbasis kategori (*Audio, Wearables, Computing, Accessories, Mobile*).
- **Halaman Detail Produk (`/product/:id`)**: Informasi komprehensif produk, stok real-time, rating ulasan, dan rekomendasi produk terkait.
- **Dompet Digital / Dana (`/wallet`)**:
  - Saldo aktif tersinkronisasi (*persistent* di localStorage).
  - Pilihan cepat isi saldo (preset Rp 20.000 s/d Rp 500.000) dan nominal kustom.
  - Riwayat transaksi debit/kredit saldo secara mendalam.
- **Keranjang Belanja Interaktif**:
  - Sidebar keranjang belanja yang halus dengan indikator status saldo dompet.
  - Tambah, kurangi kuantitas, atau hapus produk disertai dialog konfirmasi modal.
- **Checkout Pesanan (`/checkout`)**:
  - Formulir pengiriman penerima & alamat.
  - Pembayaran instan menggunakan saldo dompet ShopCart Pay.
- **Riwayat Pesanan (`/orders`)**:
  - Status pemesanan (*Pending, Processing, Shipped, Delivered, Cancelled*).
  - Rincian item yang dibeli dan total pembayaran.
- **Wishlist Produk (`/wishlist`)**:
  - Simpan item favorit dan tambahkan ke keranjang secara instan.
- **Profil Pengguna (`/profile`)**:
  - Pengelolaan data pelanggan dan alamat pengiriman default.

---

### ⚙️ Dashboard Admin (`/admin`)
- **Overview & Statistik (`/admin`)**:
  - Metrik total pendapatan (revenue), total pesanan, jumlah produk aktif, dan pesanan pending.
  - Tabel pesanan terbaru dan grafik distribusi status pesanan.
- **Manajemen Produk (`/admin/products`)**:
  - Tambah produk baru (*Add Product* modal).
  - Edit informasi produk, harga, kategori, dan stok.
  - Hapus produk dari katalog.
- **Manajemen Pesanan (`/admin/orders`)**:
  - Filter pesanan berdasarkan status.
  - Ubah dan perbarui status pesanan secara dinamis (*Pending -> Processing -> Shipped -> Delivered*).
  - Modal inspeksi detail pesanan pelanggan.
- **Data Pelanggan (`/admin/customers`)**:
  - Monitoring daftar akun pelanggan, saldo dompet, dan keaktifan pesanan.

---

## 🚀 Menjalankan Aplikasi

```bash
# Instalasi dependensi
npm install

# Jalankan server pengembangan lokal
npm run dev

# Membangun bundle produksi
npm run build
```

---

## 🏛️ Arsitektur Teknologi
- **Framework**: React 19 + Vite
- **Routing**: React Router v7 (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `NavLink`)
- **State Management**: React Context (`CartContext`, `AuthContext`, `WalletContext`, `OrderContext`)
- **Persistensi Data**: Browser LocalStorage
- **Styling**: Vanilla CSS modern dengan tema responsif & glassmorphism

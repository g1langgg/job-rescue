# Setup Instructions - JobRescue

## Masalah: Tombol Login Tidak Berfungsi

Tombol login tidak berfungsi karena database belum disetup. Ikuti langkah-langkah berikut untuk memperbaikinya.

## Cara Setup Database

### Metode 1: Setup Otomatis (Recommended) ✅

1. **Pastikan XAMPP MySQL sudah berjalan**
   - Buka XAMPP Control Panel
   - Klik tombol "Start" pada MySQL
   - Pastikan status MySQL menjadi hijau/running

2. **Akses halaman setup melalui browser**
   ```
   http://localhost/info-loker/setup.php
   ```

3. **Setup akan berjalan otomatis**
   - Database `job-rescue` akan dibuat
   - Tabel `users` akan dibuat
   - User admin dan demo akan ditambahkan

4. **Selesai! Anda bisa login dengan kredensial berikut:**

### Metode 2: Setup Manual via phpMyAdmin

1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Klik tab "SQL"
3. Copy-paste isi file `database.sql`
4. Klik "Go" untuk menjalankan

## Kredensial Login

### Admin
- **Email:** `admin@jobrescue.local`
- **Password:** `admin123`
- **Login URL:** http://localhost/info-loker/admin-login.html

### Demo User (dari screenshot)
- **Email:** `elang@gmail.com`
- **Password:** `11111111`
- **Login URL:** http://localhost/info-loker/login.html

## Troubleshooting

### Error: "Failed to connect to MySQL"
- Pastikan MySQL di XAMPP sudah running
- Periksa kredensial di `api/db.php`

### Error: "Access denied for user"
- Default user MySQL di XAMPP adalah `root` tanpa password
- Jika Anda mengubah password MySQL, update di `api/db.php`

### Error: "Database does not exist"
- Jalankan `setup.php` untuk membuat database otomatis
- Atau buat database manual via phpMyAdmin

## Struktur Database

```sql
Database: job-rescue
Table: users
Columns:
  - id (INT, AUTO_INCREMENT, PRIMARY KEY)
  - name (VARCHAR 255)
  - email (VARCHAR 255, UNIQUE)
  - password_hash (VARCHAR 255)
  - role (ENUM: 'user', 'admin')
  - created_at (TIMESTAMP)
  - updated_at (TIMESTAMP)
```

## Setelah Setup

1. Akses halaman login: http://localhost/info-loker/login.html
2. Gunakan kredensial di atas untuk login
3. Tombol "MASUK" sekarang akan berfungsi dengan baik

## Catatan Keamanan

⚠️ **PENTING untuk Production:**
- Ganti password default admin
- Hapus atau proteksi file `setup.php` setelah setup
- Gunakan environment variables untuk kredensial database
- Aktifkan HTTPS

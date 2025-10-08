# PRO Badge Feature - JobRescue

## Fitur Tanda PRO untuk Akun Premium

Sistem ini menampilkan badge/tanda PRO pada akun yang sudah berlangganan paket premium.

## Lokasi Badge PRO

### 1. **Halaman Profil** (`profil.html`)
- ✅ **Badge PRO di samping nama** - Badge emas dengan icon crown dan text "PRO"
- ✅ **Avatar dengan warna emas** - Background gradient emas untuk user PRO
- ✅ **Crown badge pada avatar** - Icon crown kecil di pojok kanan bawah avatar dengan animasi bounce

### 2. **Header Navigation** (semua halaman)
- ✅ **Badge PRO di menu user** - Badge kecil di samping nama user di dropdown menu

## Visual Design

### Badge PRO (di samping nama)
- **Warna:** Gradient emas (#fbbf24 → #f59e0b)
- **Icon:** Crown (👑)
- **Animasi:** Glow effect yang berkedip halus
- **Ukuran:** 12px font, padding 6px 12px
- **Border radius:** 20px (pill shape)

### Avatar PRO
- **Background:** Gradient emas (#fbbf24 → #f59e0b)
- **Shadow:** Emas dengan ring effect
- **Hover:** Shadow lebih besar dan terang

### Crown Badge (pada avatar)
- **Posisi:** Bottom-right corner
- **Ukuran:** 36x36px
- **Animasi:** Bounce effect (naik-turun)
- **Border:** 3px solid white

## Cara Kerja

1. **Cek Subscription:**
   ```javascript
   const subscription = JSON.parse(localStorage.getItem('jr_user_subscription') || 'null');
   const isPro = subscription && subscription.status === 'active';
   ```

2. **Tampilkan Badge:**
   - Jika `isPro === true`, tampilkan semua badge PRO
   - Badge otomatis muncul setelah user upgrade ke paket PRO

3. **Update Otomatis:**
   - Setelah pembayaran berhasil, subscription disimpan di localStorage
   - Page reload akan mendeteksi status PRO dan menampilkan badge

## File yang Dimodifikasi

### HTML/CSS
- `profil.html` - Tambah badge PRO, styling avatar PRO, crown badge

### JavaScript
- `profil.html` (inline script) - Logika deteksi PRO dan tampilkan badge
- `js/simple-auth.js` - Badge PRO di header navigation

## Testing

### Cara Test Badge PRO:

1. **Login ke aplikasi**
2. **Upgrade ke PRO:**
   - Buka halaman profil
   - Klik "Upgrade ke Pro"
   - Pilih metode pembayaran
   - Klik "Bayar Sekarang"
   - Tunggu modal sukses muncul

3. **Lihat Badge PRO:**
   - ✅ Badge "PRO" muncul di samping nama
   - ✅ Avatar berubah warna jadi emas
   - ✅ Crown badge muncul di avatar dengan animasi bounce
   - ✅ Badge PRO muncul di header navigation

### Manual Activation (untuk testing):

Jalankan di browser console:
```javascript
localStorage.setItem('jr_user_subscription', JSON.stringify({
    plan: 'pro',
    startDate: new Date().toISOString(),
    status: 'active'
}));
location.reload();
```

## Animasi

1. **Glow Animation** (badge PRO)
   - Duration: 2s
   - Effect: Shadow berkedip halus

2. **Bounce Animation** (crown badge)
   - Duration: 2s
   - Effect: Naik-turun 5px

## Responsif

- Badge tetap terlihat di mobile
- Ukuran menyesuaikan dengan viewport
- Animasi tetap smooth di semua device

## Future Enhancement

- [ ] Badge berbeda untuk tier Enterprise
- [ ] Tooltip info saat hover badge
- [ ] Particle effect saat upgrade berhasil
- [ ] Badge di search results (user PRO lebih prioritas)

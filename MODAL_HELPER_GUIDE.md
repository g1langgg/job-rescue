# Modal Helper Guide - JobRescue

## Overview
File `js/modal-helper.js` menyediakan fungsi modal profesional untuk menggantikan `alert()`, `confirm()`, dan `prompt()` bawaan browser.

## Installation

### 1. Tambahkan Script ke HTML
Tambahkan sebelum closing `</body>` tag:

```html
<script src="js/modal-helper.js"></script>
```

## Usage

### 1. Alert Modal

**Mengganti:**
```javascript
alert('Pesan berhasil disimpan!');
```

**Dengan:**
```javascript
showAlert('Pesan berhasil disimpan!', 'Sukses', 'success');
```

**Syntax:**
```javascript
showAlert(message, title, type)
```

**Parameters:**
- `message` (string) - Pesan yang ditampilkan
- `title` (string, optional) - Judul modal (default: 'Pemberitahuan')
- `type` (string, optional) - Tipe modal: 'info', 'success', 'warning', 'error' (default: 'info')

**Examples:**
```javascript
// Info (default)
showAlert('Data telah diperbarui');

// Success
showAlert('Pendaftaran berhasil!', 'Sukses', 'success');

// Warning
showAlert('Harap isi semua field', 'Peringatan', 'warning');

// Error
showAlert('Terjadi kesalahan', 'Error', 'error');

// With async/await
await showAlert('Silakan tunggu...', 'Loading', 'info');
console.log('User clicked OK');
```

### 2. Confirm Modal

**Mengganti:**
```javascript
if (confirm('Hapus data ini?')) {
    // User clicked OK
}
```

**Dengan:**
```javascript
const result = await showConfirm('Hapus data ini?', 'Konfirmasi');
if (result) {
    // User clicked OK
}
```

**Syntax:**
```javascript
showConfirm(message, title)
```

**Parameters:**
- `message` (string) - Pesan konfirmasi
- `title` (string, optional) - Judul modal (default: 'Konfirmasi')

**Returns:** `Promise<boolean>` - `true` jika OK, `false` jika Batal

**Examples:**
```javascript
// Simple confirm
const confirmed = await showConfirm('Lanjutkan proses ini?');
if (confirmed) {
    console.log('User confirmed');
}

// With custom title
const result = await showConfirm(
    'Data akan dihapus permanen. Lanjutkan?',
    'Hapus Data'
);

// In event handler
button.addEventListener('click', async () => {
    if (await showConfirm('Yakin ingin keluar?', 'Konfirmasi Logout')) {
        logout();
    }
});
```

### 3. Prompt Modal

**Mengganti:**
```javascript
const name = prompt('Masukkan nama:', 'Default');
if (name) {
    console.log(name);
}
```

**Dengan:**
```javascript
const name = await showPrompt('Masukkan nama:', 'Default', 'Input Nama');
if (name) {
    console.log(name);
}
```

**Syntax:**
```javascript
showPrompt(message, defaultValue, title)
```

**Parameters:**
- `message` (string) - Label/pertanyaan
- `defaultValue` (string, optional) - Nilai default input (default: '')
- `title` (string, optional) - Judul modal (default: 'Input')

**Returns:** `Promise<string|null>` - Input value atau `null` jika dibatalkan

**Examples:**
```javascript
// Simple prompt
const email = await showPrompt('Email Anda:');
if (email) {
    console.log('Email:', email);
}

// With default value
const position = await showPrompt(
    'Posisi yang dilamar:',
    'Frontend Developer',
    'Tambah Lamaran'
);

// Multiple prompts
const name = await showPrompt('Nama lengkap:');
if (!name) return;

const company = await showPrompt('Nama perusahaan:');
if (!company) return;

console.log(name, company);
```

## Migration Examples

### Before (Old Way)
```javascript
// Alert
alert('Data berhasil disimpan!');

// Confirm
if (confirm('Hapus data ini?')) {
    deleteData();
}

// Prompt
const name = prompt('Masukkan nama:');
if (name) {
    saveName(name);
}
```

### After (New Way)
```javascript
// Alert
await showAlert('Data berhasil disimpan!', 'Sukses', 'success');

// Confirm
if (await showConfirm('Hapus data ini?', 'Konfirmasi')) {
    deleteData();
}

// Prompt
const name = await showPrompt('Masukkan nama:', '', 'Input Nama');
if (name) {
    saveName(name);
}
```

## Real-World Examples

### Example 1: Form Validation
```javascript
async function validateForm() {
    if (!email.value) {
        await showAlert('Email harus diisi', 'Validasi', 'warning');
        email.focus();
        return false;
    }
    
    if (password.value.length < 6) {
        await showAlert('Password minimal 6 karakter', 'Validasi', 'warning');
        password.focus();
        return false;
    }
    
    return true;
}
```

### Example 2: Delete Confirmation
```javascript
async function deleteItem(id) {
    const confirmed = await showConfirm(
        'Data akan dihapus permanen dan tidak dapat dikembalikan.',
        'Hapus Data'
    );
    
    if (confirmed) {
        // Delete logic here
        await showAlert('Data berhasil dihapus', 'Sukses', 'success');
    }
}
```

### Example 3: Edit Data
```javascript
async function editProfile() {
    const currentName = document.getElementById('userName').textContent;
    
    const newName = await showPrompt(
        'Masukkan nama baru:',
        currentName,
        'Edit Profil'
    );
    
    if (newName && newName !== currentName) {
        document.getElementById('userName').textContent = newName;
        await showAlert('Profil berhasil diperbarui', 'Sukses', 'success');
    }
}
```

### Example 4: Login Error
```javascript
async function login(email, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!data.ok) {
            await showAlert('Email atau password salah', 'Login Gagal', 'error');
            return;
        }
        
        await showAlert('Login berhasil!', 'Selamat Datang', 'success');
        window.location.href = '/dashboard';
        
    } catch (error) {
        await showAlert('Terjadi kesalahan koneksi', 'Error', 'error');
    }
}
```

## Features

### Design
- ✅ Modern & professional UI
- ✅ Gradient backgrounds
- ✅ Icon untuk setiap tipe
- ✅ Responsive design
- ✅ Backdrop blur effect

### Interactions
- ✅ Smooth animations (fadeIn, slideUp, shake)
- ✅ Click backdrop to close
- ✅ Auto-focus pada input (prompt)
- ✅ Keyboard accessible
- ✅ Promise-based (async/await support)

### Types & Colors

**Info** (Blue/Purple)
- Icon: info-circle
- Use: Informasi umum

**Success** (Green)
- Icon: check-circle
- Use: Operasi berhasil

**Warning** (Orange)
- Icon: exclamation-triangle
- Use: Peringatan

**Error** (Red)
- Icon: times-circle
- Use: Error/gagal

## Best Practices

### 1. Use Async/Await
```javascript
// Good
async function handleSubmit() {
    if (await showConfirm('Submit data?')) {
        await submitData();
        await showAlert('Data submitted!', 'Success', 'success');
    }
}

// Avoid (callback hell)
showConfirm('Submit data?').then(result => {
    if (result) {
        submitData().then(() => {
            showAlert('Data submitted!', 'Success', 'success');
        });
    }
});
```

### 2. Check Return Values
```javascript
// Good
const name = await showPrompt('Your name:');
if (name) {  // Check if not null/empty
    console.log(name);
}

// Bad
const name = await showPrompt('Your name:');
console.log(name);  // Might be null
```

### 3. Use Appropriate Types
```javascript
// Good
await showAlert('Saved!', 'Success', 'success');
await showAlert('Error occurred', 'Error', 'error');

// Bad
await showAlert('Saved!');  // Uses default 'info' type
```

### 4. Provide Context
```javascript
// Good
await showAlert(
    'Password minimal 6 karakter',
    'Validasi Form',
    'warning'
);

// Bad
await showAlert('Error');  // Not descriptive
```

## Files to Update

Tambahkan `<script src="js/modal-helper.js"></script>` ke:

- ✅ profil.html
- ✅ pricing.html
- ✅ login.html
- ✅ daftar.html
- ✅ admin.html
- ✅ cari-kerja.html
- ✅ cari-talent.html
- ✅ index.html
- ✅ tentang.html

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Dependencies

- Font Awesome (for icons)
- Modern browser with Promise support

## Notes

- Semua fungsi mengembalikan Promise
- Modal otomatis close saat backdrop diklik
- Input pada prompt auto-focus dan auto-select
- Z-index: 10000 (pastikan tidak ada elemen dengan z-index lebih tinggi)

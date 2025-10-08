# Implementation Examples - Modal Helper

## Cara Implementasi di Setiap File

### 1. Tambahkan Script Modal Helper

Di setiap file HTML, tambahkan sebelum closing `</body>`:

```html
<script src="js/modal-helper.js"></script>
```

### 2. Contoh Penggantian di `js/simple-auth.js`

**BEFORE:**
```javascript
if (!payload.name || !payload.email || !payload.password) return alert('Lengkapi data.');
if (payload.password.length < 6) return alert('Password minimal 6 karakter.');
if (payload.password !== confirm) return alert('Konfirmasi password tidak cocok.');
```

**AFTER:**
```javascript
if (!payload.name || !payload.email || !payload.password) {
    await showAlert('Lengkapi data.', 'Validasi', 'warning');
    return;
}
if (payload.password.length < 6) {
    await showAlert('Password minimal 6 karakter.', 'Validasi', 'warning');
    return;
}
if (payload.password !== confirm) {
    await showAlert('Konfirmasi password tidak cocok.', 'Validasi', 'warning');
    return;
}
```

### 3. Contoh Penggantian di `profil.html`

**BEFORE:**
```javascript
document.querySelector('.profile-edit-btn').addEventListener('click', function() {
    const newName = prompt('Masukkan nama baru:', document.getElementById('userName').textContent);
    if (newName && newName.trim()) {
        document.getElementById('userName').textContent = newName.trim();
    }
});
```

**AFTER:**
```javascript
document.querySelector('.profile-edit-btn').addEventListener('click', async function() {
    const currentName = document.getElementById('userName').textContent;
    const newName = await showPrompt('Masukkan nama baru:', currentName, 'Edit Profil');
    
    if (newName && newName.trim()) {
        document.getElementById('userName').textContent = newName.trim();
        const initials = newName.trim().split(' ').map(n => n[0]).join('').toUpperCase();
        document.getElementById('userAvatar').textContent = initials;
        await showAlert('Profil berhasil diperbarui', 'Sukses', 'success');
    }
});
```

### 4. Contoh Penggantian di `pricing.html`

**BEFORE:**
```javascript
if (!res.user) {
    alert('Silakan login terlebih dahulu untuk berlangganan.');
    window.location.href = 'login.html';
    return;
}
```

**AFTER:**
```javascript
if (!res.user) {
    await showAlert(
        'Silakan login terlebih dahulu untuk berlangganan.',
        'Login Diperlukan',
        'warning'
    );
    window.location.href = 'login.html';
    return;
}
```

### 5. Contoh Delete Confirmation

**BEFORE:**
```javascript
function deleteInterview(index) {
    if (!confirm('Hapus jadwal interview ini?')) return;
    
    const interviews = getInterviews();
    interviews.splice(index, 1);
    saveInterviews(interviews);
    loadInterviews();
}
```

**AFTER:**
```javascript
async function deleteInterview(index) {
    const confirmed = await showConfirm(
        'Jadwal interview akan dihapus permanen.',
        'Hapus Interview'
    );
    
    if (!confirmed) return;
    
    const interviews = getInterviews();
    interviews.splice(index, 1);
    saveInterviews(interviews);
    loadInterviews();
    
    await showAlert('Interview berhasil dihapus', 'Sukses', 'success');
}
```

## Quick Reference

### Alert Types
```javascript
// Info (default)
await showAlert('Informasi');

// Success
await showAlert('Berhasil!', 'Sukses', 'success');

// Warning
await showAlert('Peringatan!', 'Perhatian', 'warning');

// Error
await showAlert('Gagal!', 'Error', 'error');
```

### Confirm
```javascript
const result = await showConfirm('Lanjutkan?', 'Konfirmasi');
if (result) {
    // User clicked OK
} else {
    // User clicked Cancel
}
```

### Prompt
```javascript
const value = await showPrompt('Input:', 'default', 'Title');
if (value) {
    // User entered value
} else {
    // User cancelled (value is null)
}
```

## Files That Need Update

### High Priority (Banyak alert/confirm/prompt)
1. ✅ `profil.html` - DONE (custom modals sudah dibuat)
2. ⚠️ `js/simple-auth.js` - Perlu update
3. ⚠️ `js/register.js` - Perlu update
4. ⚠️ `pricing.html` - Perlu update

### Medium Priority
5. ⚠️ `js/auth.js`
6. ⚠️ `admin.html`

### Low Priority (Sedikit usage)
7. `login.html`
8. `daftar.html`
9. `cari-kerja.html`

## Step-by-Step Implementation

### Step 1: Add Script to HTML
```html
<!-- Before closing </body> -->
<script src="js/modal-helper.js"></script>
<script src="js/your-script.js"></script>
</body>
```

### Step 2: Convert Functions to Async
```javascript
// Before
function handleSubmit() {
    if (!validate()) {
        alert('Invalid');
        return;
    }
    submit();
}

// After
async function handleSubmit() {
    if (!validate()) {
        await showAlert('Invalid', 'Validation', 'warning');
        return;
    }
    submit();
}
```

### Step 3: Update Event Listeners
```javascript
// Before
button.addEventListener('click', function() {
    if (confirm('Sure?')) {
        doSomething();
    }
});

// After
button.addEventListener('click', async function() {
    if (await showConfirm('Sure?', 'Confirm')) {
        doSomething();
    }
});
```

## Testing Checklist

- [ ] Modal muncul dengan benar
- [ ] Backdrop blur berfungsi
- [ ] Click backdrop untuk close
- [ ] Button OK/Cancel berfungsi
- [ ] Input focus pada prompt
- [ ] Animasi smooth
- [ ] Return value benar (Promise)
- [ ] Multiple modals tidak overlap

## Common Issues

### Issue 1: Function Not Async
```javascript
// Error: await is only valid in async function
button.addEventListener('click', function() {
    await showAlert('Test');  // ❌ Error
});

// Fix: Make function async
button.addEventListener('click', async function() {
    await showAlert('Test');  // ✅ OK
});
```

### Issue 2: Not Waiting for Result
```javascript
// Wrong: Not waiting
const result = showConfirm('Delete?');
if (result) { ... }  // ❌ result is Promise, not boolean

// Correct: Wait for result
const result = await showConfirm('Delete?');
if (result) { ... }  // ✅ result is boolean
```

### Issue 3: Modal Helper Not Loaded
```javascript
// Error: showAlert is not defined

// Fix: Make sure modal-helper.js is loaded
<script src="js/modal-helper.js"></script>
```

## Benefits

✅ **Professional UI** - Modern design yang konsisten
✅ **Better UX** - Animasi smooth, backdrop blur
✅ **Customizable** - Bisa disesuaikan dengan brand
✅ **Accessible** - Keyboard navigation, focus management
✅ **Promise-based** - Clean async/await syntax
✅ **No dependencies** - Pure JavaScript (hanya butuh Font Awesome untuk icon)

// Pure client-side auth using localStorage (no PHP backend required)
// Version 2.0 - No API calls
document.addEventListener('DOMContentLoaded', function() {
    console.log('Using pure client-side authentication v2.0 - No API calls');
    
    // Simple client-side API simulation
    const API = {
        me: () => {
            const user = JSON.parse(localStorage.getItem('jr_user') || 'null');
            return Promise.resolve({ ok: true, user });
        },
        login: (payload) => {
            console.log('Client-side login attempt:', payload.email);
            // Demo credentials: any email with password "123456" works
            if (payload.password === '123456' && payload.email) {
                const user = { 
                    id: 1, 
                    name: payload.email.split('@')[0], 
                    email: payload.email, 
                    role: 'user' 
                };
                localStorage.setItem('jr_user', JSON.stringify(user));
                console.log('Login successful:', user);
                return Promise.resolve({ ok: true, user });
            }
            console.log('Login failed: invalid credentials');
            return Promise.resolve({ ok: false, error: 'INVALID_CREDENTIALS' });
        },
        register: (payload) => {
            const user = { 
                id: Date.now(), 
                name: payload.name, 
                email: payload.email, 
                role: 'user' 
            };
            localStorage.setItem('jr_user', JSON.stringify(user));
            console.log('Registration successful:', user);
            return Promise.resolve({ ok: true, user });
        },
        logout: () => {
            localStorage.removeItem('jr_user');
            console.log('Logout successful');
            return Promise.resolve({ ok: true });
        }
    };

    // Lightweight toast notification
    function showToast(message) {
        let box = document.getElementById('jr_toast_box');
        if (!box) {
            box = document.createElement('div');
            box.id = 'jr_toast_box';
            box.style.position = 'fixed';
            box.style.top = '16px';
            box.style.right = '16px';
            box.style.zIndex = '9999';
            box.style.display = 'flex';
            box.style.flexDirection = 'column';
            box.style.gap = '10px';
            document.body.appendChild(box);
        }
        const t = document.createElement('div');
        t.className = 'jr_toast';
        t.textContent = message;
        t.style.cssText = 'background: rgba(17,24,39,0.95); color:#fff; padding:10px 14px; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,.25); font-weight:600; font-size:13px; transform: translateY(0); opacity:1; transition: opacity .3s, transform .3s;';
        box.appendChild(t);
        setTimeout(()=>{ t.style.opacity = '0'; t.style.transform = 'translateY(-6px)'; setTimeout(()=> t.remove(), 300); }, 2000);
    }

    // Demo notifications (3 items)
    function getDemoNotifications() {
        const stored = JSON.parse(localStorage.getItem('jr_notifications') || 'null');
        if (Array.isArray(stored)) return stored;
        const demo = [
            { id: 1, icon: 'fa-briefcase', text: 'Lowongan baru: Kasir Toko Kelontong' },
            { id: 2, icon: 'fa-user', text: 'Profil kamu dilihat 5x hari ini' },
            { id: 3, icon: 'fa-bell', text: 'Tips: Lengkapi profil untuk peluang lebih' }
        ];
        localStorage.setItem('jr_notifications', JSON.stringify(demo));
        return demo;
    }

    function syncHeader() {
        API.me().then(res => {
            const user = res.user || null;
            const loginLink = document.getElementById('navLoginLink');
            const registerBtn = document.getElementById('navRegisterBtn');
            const nav = document.querySelector('.nav');

            // If there is no nav on this page (e.g., login page layout), skip header account injection safely
            if (!nav) {
                return;
            }

            let account = document.getElementById('navAccount');
            if (!account) {
                account = document.createElement('div');
                account.id = 'navAccount';
                account.style.display = 'none';
                account.style.position = 'relative';
                account.innerHTML = `
                    <div style="display:flex; align-items:center; gap:12px;">
                        <button id="btnNotif" title="Notifikasi" style="position:relative; width:40px; height:40px; border-radius:12px; border:1px solid #e2e8f0; background:#fff; display:inline-grid; place-items:center; cursor:pointer;">
                            <i class="fas fa-bell" style="color:#334155;"></i>
                            <span id="notifBadge" style="position:absolute; top:-6px; right:-6px; background:#ef4444; color:#fff; font-size:10px; font-weight:800; border-radius:999px; padding:2px 6px;">3</span>
                        </button>
                        <div id="notifPanel" style="position:absolute; right:0; top:110%; display:none; background:#fff; border:1px solid rgba(0,0,0,0.08); border-radius:12px; box-shadow:0 12px 28px rgba(0,0,0,.12); min-width:260px; overflow:hidden;">
                            <div id="notifItems"></div>
                        </div>
                        <button id="btnAccount" class="account-btn" style="display:inline-flex; align-items:center; gap:10px; padding:10px 14px; border:none; background:#fff; border-radius:999px; box-shadow:0 8px 20px rgba(0,0,0,0.08); cursor:pointer; font-weight:600; color:#1f2937;">
                            <span id="accountAvatar" style="width:28px; height:28px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; font-size:13px; font-weight:700; box-shadow:0 4px 12px rgba(102,126,234,.35);"></span>
                            <span id="accountName">Akun</span>
                            <i class="fas fa-chevron-down" style="font-size:12px; color:#64748b;"></i>
                        </button>
                        <div id="accountMenu" style="position:absolute; right:0; top:110%; display:none; background: rgba(255,255,255,0.98); border-radius:12px; border:1px solid rgba(0,0,0,0.08); box-shadow:0 10px 25px rgba(0,0,0,0.15); min-width: 220px; overflow:hidden;">
                            <a href="profil-pro.html" style="display:flex; align-items:center; gap:8px; padding:0.9rem 1rem; color:#1f2937; text-decoration:none; border-bottom:1px solid rgba(0,0,0,0.05);"><i class="fas fa-user"></i>Profil Saya</a>
                            <a href="saved.html" style="display:flex; align-items:center; gap:8px; padding:0.9rem 1rem; color:#1f2937; text-decoration:none; border-bottom:1px solid rgba(0,0,0,0.05);"><i class="fas fa-bookmark"></i>Lowongan Tersimpan</a>
                            <a href="#" id="btnLogout" style="display:flex; align-items:center; gap:8px; padding:0.9rem 1rem; color:#ef4444; text-decoration:none;"><i class="fas fa-sign-out-alt"></i>Keluar</a>
                        </div>
                    </div>`;
                nav.appendChild(account);
                account.querySelector('#btnAccount').addEventListener('click', function() {
                    const m = account.querySelector('#accountMenu');
                    m.style.display = m.style.display === 'block' ? 'none' : 'block';
                });
                const btnNotif = account.querySelector('#btnNotif');
                const notifPanel = account.querySelector('#notifPanel');
                const notifItems = account.querySelector('#notifItems');
                if (btnNotif && notifPanel && notifItems) {
                    // Render items
                    const items = getDemoNotifications();
                    const badge = account.querySelector('#notifBadge');
                    if (badge) badge.textContent = String(items.length);
                    notifItems.innerHTML = items.map(n => `
                        <div style="display:flex; align-items:center; gap:10px; padding:10px 12px; border-bottom:1px solid rgba(0,0,0,0.06); font-size:13px; color:#0f172a;">
                            <i class="fas ${n.icon}" style="color:#667eea;"></i>
                            <span>${n.text}</span>
                        </div>
                    `).join('') + `<div style="padding:8px 12px; text-align:center;"><button id="notifClear" style="background:#f1f5f9; border:1px solid #e2e8f0; border-radius:8px; padding:6px 10px; font-weight:700; cursor:pointer;">Tandai sudah dibaca</button></div>`;
                    btnNotif.addEventListener('click', function(e){
                        e.stopPropagation();
                        notifPanel.style.display = notifPanel.style.display === 'block' ? 'none' : 'block';
                    });
                    account.addEventListener('click', function(e){
                        if (e.target && e.target.id === 'notifClear') {
                            localStorage.setItem('jr_notifications', '[]');
                            notifItems.innerHTML = '<div style="padding:12px; font-size:13px; color:#64748b;">Tidak ada notifikasi.</div>';
                            if (badge) badge.style.display = 'none';
                        }
                    });
                    document.addEventListener('click', function(ev){
                        if (!account.contains(ev.target)) notifPanel.style.display = 'none';
                    });
                }
                account.querySelector('#btnLogout').addEventListener('click', async function(e){
                    e.preventDefault();
                    await API.logout();
                    syncHeader();
                });
            }

            if (user) {
                if (loginLink) loginLink.style.display = 'none';
                if (registerBtn) registerBtn.style.display = 'none';
                account.style.display = 'block';
                const nameEl = account.querySelector('#accountName');
                const avatarEl = account.querySelector('#accountAvatar');
                const displayName = (user.name || user.email || 'Akun').split(' ')[0];
                nameEl.textContent = displayName;
                const initial = (displayName[0] || 'U').toUpperCase();
                if (avatarEl) avatarEl.textContent = initial;
            } else {
                if (loginLink) loginLink.style.display = '';
                if (registerBtn) registerBtn.style.display = '';
                const accountEl = document.getElementById('navAccount');
                if (accountEl) accountEl.style.display = 'none';
            }
        });
    }
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const fd = new FormData(registerForm);
            const payload = { name: (fd.get('name')||'').toString().trim(), email: (fd.get('email')||'').toString().trim().toLowerCase(), password: (fd.get('password')||'').toString() };
            const confirm = (fd.get('confirm')||'').toString();
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
            const res = await API.register(payload);
            if (!res.ok) {
                await showAlert('Registrasi gagal: ' + (res.error||''), 'Error', 'error');
                return;
            }
            const loginRes = await API.login({ email: payload.email, password: payload.password });
            if (!loginRes.ok) {
                await showAlert('Login setelah daftar gagal.', 'Error', 'error');
                return;
            }
            window.location.href = 'index.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e){
            e.preventDefault();
            const fd = new FormData(loginForm);
            const email = (fd.get('email')||'').toString().trim().toLowerCase();
            const password = (fd.get('password')||'').toString();
            const requireAdmin = loginForm.getAttribute('data-admin-login') === 'true';
            const res = await API.login({ email, password });
            console.log('Login response:', res);
            if (!res.ok) {
                const errorMsg = res.error === 'INVALID_CREDENTIALS' ? 'Email atau password salah.' : 'Login gagal: ' + (res.error || 'Unknown error');
                await showAlert(errorMsg, 'Login Gagal', 'error');
                return;
            }
            if (requireAdmin && res.user?.role !== 'admin') {
                await API.logout();
                await showAlert('Akses admin diperlukan.', 'Akses Ditolak', 'warning');
                return;
            }
            window.location.href = requireAdmin ? 'admin.html' : 'index.html';
        });
    }

    syncHeader();
});



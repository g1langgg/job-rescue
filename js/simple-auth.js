// Simple client-side auth using localStorage
document.addEventListener('DOMContentLoaded', function() {
    const API = {
        me: () => fetch('api/auth.php?action=me', { credentials: 'include' }).then(r=>r.json()),
        login: (payload) => fetch('api/auth.php?action=login', { method:'POST', credentials: 'include', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }).then(r=>r.json()),
        register: (payload) => fetch('api/auth.php?action=register', { method:'POST', credentials: 'include', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) }).then(r=>r.json()),
        logout: () => fetch('api/auth.php?action=logout', { method:'POST', credentials: 'include' }).then(r=>r.json())
    };

    function syncHeader() {
        API.me().then(res => {
            const user = res.user || null;
            const loginLink = document.getElementById('navLoginLink');
            const registerBtn = document.getElementById('navRegisterBtn');
            const navMenu = document.getElementById('navMenu') || document.querySelector('.nav .nav-menu');

            let account = document.getElementById('navAccount');
            if (!account) {
                account = document.createElement('div');
                account.id = 'navAccount';
                account.style.display = 'none';
                account.style.position = 'relative';
                account.innerHTML = `
                    <button class=\"btn-register\" id=\"btnAccount\" style=\"padding: 0.8rem 1.5rem;\">
                        <i class=\"fas fa-user-circle\"></i>
                        <span id=\"accountName\">Akun</span>
                    </button>
                    <div id=\"accountMenu\" style=\"position:absolute; right:0; top:110%; display:none; background: rgba(255,255,255,0.98); border-radius:12px; border:1px solid rgba(0,0,0,0.08); box-shadow:0 10px 25px rgba(0,0,0,0.15); min-width: 180px; overflow:hidden;\">
                        <a href=\"profile.html\" style=\"display:block; padding:0.8rem 1rem; color:#1f2937; text-decoration:none; border-bottom:1px solid rgba(0,0,0,0.05);\"><i class=\"fas fa-user\" style=\"margin-right:8px;\"></i>Profil Saya</a>
                        <a href=\"#\" id=\"btnLogout\" style=\"display:block; padding:0.8rem 1rem; color:#1f2937; text-decoration:none;\"><i class=\"fas fa-sign-out-alt\" style=\"margin-right:8px;\"></i>Keluar</a>
                    </div>`;
                const nav = document.querySelector('.nav');
                nav.appendChild(account);
                account.querySelector('#btnAccount').addEventListener('click', function() {
                    const m = account.querySelector('#accountMenu');
                    m.style.display = m.style.display === 'block' ? 'none' : 'block';
                });
                account.querySelector('#btnLogout').addEventListener('click', async function(e){
                    e.preventDefault();
                    await API.logout();
                    syncHeader();
                });
                document.addEventListener('click', function(e){
                    const m = account.querySelector('#accountMenu');
                    if (!account.contains(e.target)) m.style.display = 'none';
                });
            }

            if (user) {
                if (loginLink) loginLink.style.display = 'none';
                if (registerBtn) registerBtn.style.display = 'none';
                account.style.display = 'block';
                const nameEl = account.querySelector('#accountName');
                nameEl.textContent = (user.name || 'Akun').split(' ')[0];
            } else {
                if (loginLink) loginLink.style.display = '';
                if (registerBtn) registerBtn.style.display = '';
                account.style.display = 'none';
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
            if (!payload.name || !payload.email || !payload.password) return alert('Lengkapi data.');
            if (payload.password.length < 6) return alert('Password minimal 6 karakter.');
            if (payload.password !== confirm) return alert('Konfirmasi password tidak cocok.');
            const res = await API.register(payload);
            if (!res.ok) return alert('Registrasi gagal: ' + (res.error||''));
            const loginRes = await API.login({ email: payload.email, password: payload.password });
            if (!loginRes.ok) return alert('Login setelah daftar gagal.');
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
            if (!res.ok) return alert('Email atau password salah.');
            if (requireAdmin && res.user?.role !== 'admin') { await API.logout(); alert('Akses admin diperlukan.'); return; }
            window.location.href = requireAdmin ? 'admin.html' : 'index.html';
        });
    }

    syncHeader();
});



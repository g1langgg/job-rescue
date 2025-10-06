// Simple client-side auth using localStorage
document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'jr_user';

    function getUser() {
        const raw = localStorage.getItem(STORAGE_KEY);
        try { return raw ? JSON.parse(raw) : null; } catch { return null; }
    }

    function setUser(user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        syncHeader();
    }

    function clearUser() {
        localStorage.removeItem(STORAGE_KEY);
        syncHeader();
    }

    function syncHeader() {
        const user = getUser();
        const loginLink = document.getElementById('navLoginLink');
        const registerBtn = document.getElementById('navRegisterBtn');

        // create or select account dropdown
        let account = document.getElementById('navAccount');
        if (!account) {
            account = document.createElement('div');
            account.id = 'navAccount';
            account.style.display = 'none';
            account.style.position = 'relative';
            account.innerHTML = `
                <button class="btn-register" id="btnAccount" style="padding: 0.8rem 1.5rem;">
                    <i class="fas fa-user-circle"></i>
                    <span id="accountName">Akun</span>
                </button>
                <div id="accountMenu" style="position:absolute; right:0; top:110%; display:none; background: rgba(255,255,255,0.98); border-radius:12px; border:1px solid rgba(0,0,0,0.08); box-shadow:0 10px 25px rgba(0,0,0,0.15); min-width: 180px; overflow:hidden;">
                    <a href="#" id="btnLogout" style="display:block; padding:0.8rem 1rem; color:#1f2937; text-decoration:none;">Keluar</a>
                </div>`;
            const nav = document.querySelector('.nav');
            nav.appendChild(account);
            account.querySelector('#btnAccount').addEventListener('click', function() {
                const m = account.querySelector('#accountMenu');
                m.style.display = m.style.display === 'block' ? 'none' : 'block';
            });
            account.querySelector('#btnLogout').addEventListener('click', function(e){
                e.preventDefault();
                clearUser();
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
            nameEl.textContent = user.name?.split(' ')[0] || 'Akun';
        } else {
            if (loginLink) loginLink.style.display = '';
            if (registerBtn) registerBtn.style.display = '';
            account.style.display = 'none';
        }
    }

    // Handle register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e){
            e.preventDefault();
            const fd = new FormData(registerForm);
            const name = (fd.get('name') || '').toString().trim();
            const email = (fd.get('email') || '').toString().trim().toLowerCase();
            const password = (fd.get('password') || '').toString();
            const confirm = (fd.get('confirm') || '').toString();
            if (!name || !email || !password) return alert('Lengkapi data.');
            if (password.length < 6) return alert('Password minimal 6 karakter.');
            if (password !== confirm) return alert('Konfirmasi password tidak cocok.');
            const user = { name, email, passwordHash: btoa(password) };
            setUser(user);
            window.location.href = 'index.html';
        });
    }

    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e){
            e.preventDefault();
            const fd = new FormData(loginForm);
            const email = (fd.get('email') || '').toString().trim().toLowerCase();
            const password = (fd.get('password') || '').toString();
            const saved = getUser();
            if (!saved || saved.email !== email || saved.passwordHash !== btoa(password)) {
                alert('Email atau password salah.');
                return;
            }
            // refresh session
            setUser(saved);
            window.location.href = 'index.html';
        });
    }

    syncHeader();
});



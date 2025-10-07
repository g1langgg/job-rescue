// Standalone Admin Authentication - Completely separate from user system
document.addEventListener('DOMContentLoaded', function() {
    const ADMIN_STORAGE_KEY = 'jr_admin_session';
    
    // Admin credentials (hardcoded for security)
    const ADMIN_CREDENTIALS = {
        email: 'admin@jobrescue.local',
        password: 'admin123',
        name: 'Administrator',
        role: 'admin'
    };
    
    function getAdminSession() {
        try {
            return JSON.parse(localStorage.getItem(ADMIN_STORAGE_KEY) || 'null');
        } catch {
            return null;
        }
    }
    
    function setAdminSession(adminData) {
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminData));
    }
    
    function clearAdminSession() {
        localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
    
    function isAdminLoggedIn() {
        const session = getAdminSession();
        return session && session.email === ADMIN_CREDENTIALS.email;
    }
    
    // Admin login form handler
    const adminLoginForm = document.getElementById('loginForm');
    if (adminLoginForm && adminLoginForm.getAttribute('data-admin-login') === 'true') {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(adminLoginForm);
            const email = formData.get('email').trim().toLowerCase();
            const password = formData.get('password');
            
            // Check admin credentials
            if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                // Set admin session
                setAdminSession({
                    email: ADMIN_CREDENTIALS.email,
                    name: ADMIN_CREDENTIALS.name,
                    role: ADMIN_CREDENTIALS.role,
                    loginTime: Date.now()
                });
                
                // Redirect to admin panel
                window.location.href = 'admin.html';
            } else {
                alert('Email atau password admin salah!');
            }
        });
    }
    
    // Admin panel guard
    function adminGuard() {
        if (!isAdminLoggedIn()) {
            alert('Silakan login sebagai admin.');
            window.location.href = 'admin-login.html';
            return false;
        }
        return true;
    }
    
    // Admin logout handler
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearAdminSession();
            window.location.href = 'admin-login.html';
        });
    }
    
    // Initialize admin panel if on admin page
    if (window.location.pathname.includes('admin.html')) {
        if (adminGuard()) {
            // Fill admin info in sidebar
            const session = getAdminSession();
            const adminNameEl = document.getElementById('adminName');
            const adminEmailEl = document.getElementById('adminEmail');
            
            if (adminNameEl) adminNameEl.textContent = session.name;
            if (adminEmailEl) adminEmailEl.textContent = session.email;
        }
    }
});

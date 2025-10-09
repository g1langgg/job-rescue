// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm');
            const cityInput = document.getElementById('city');
            const submitButton = registerForm.querySelector('button[type="submit"]');
            
            // Get form values
            const name = nameInput.value.trim();
            const email = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            const city = cityInput ? cityInput.value.trim() : '';
            
            // Validate form
            if (!name) {
                await showAlert('Nama lengkap harus diisi', 'Validasi', 'warning');
                nameInput.focus();
                return;
            }
            
            if (!email) {
                await showAlert('Email harus diisi', 'Validasi', 'warning');
                emailInput.focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                await showAlert('Format email tidak valid', 'Validasi', 'warning');
                emailInput.focus();
                return;
            }
            
            if (!password) {
                await showAlert('Kata sandi harus diisi', 'Validasi', 'warning');
                passwordInput.focus();
                return;
            }
            
            if (password.length < 6) {
                await showAlert('Kata sandi minimal 6 karakter', 'Validasi', 'warning');
                passwordInput.focus();
                return;
            }
            
            if (password !== confirmPassword) {
                await showAlert('Konfirmasi kata sandi tidak cocok', 'Validasi', 'warning');
                confirmPasswordInput.focus();
                return;
            }
            
            // Disable submit button and show loading state
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mendaftarkan...';
            
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Get existing users or initialize empty array
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                
                // Check if email already exists
                if (users.some(user => user.email === email)) {
                    throw new Error('Email sudah terdaftar');
                }
                
                // Create new user object
                const newUser = {
                    id: 'user_' + Date.now(),
                    name: name,
                    email: email,
                    password: btoa(password), // Simple encoding, in production use proper hashing
                    city: city,
                    role: 'user',
                    createdAt: new Date().toISOString(),
                    lastLogin: new Date().toISOString()
                };
                
                // Add new user to the array
                users.push(newUser);
                
                // Save to localStorage
                localStorage.setItem('users', JSON.stringify(users));
                
                // Auto-login the user
                const userData = {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    city: newUser.city,
                    role: newUser.role
                };
                
                localStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.setItem('isLoggedIn', 'true');
                
                // Show success message
                await showAlert('Pendaftaran berhasil! Anda akan diarahkan ke beranda.', 'Sukses', 'success');
                
                // Redirect to home page after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
                
            } catch (error) {
                console.error('Registration error:', error);
                await showAlert(error.message || 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.', 'Error', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            }
        });
    }
});

// Update header after registration
function updateHeaderAfterRegistration() {
    const userMenu = document.getElementById('userMenu');
    const loginBtn = document.getElementById('navLoginLink');
    const registerBtn = document.getElementById('navRegisterBtn');
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        if (userMenu) {
            userMenu.style.display = 'flex';
            userMenu.innerHTML = `
                <div class="user-avatar">
                    <span>${user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                </div>
                <div class="user-dropdown">
                    <div class="user-info">
                        <div class="user-name">${user.name || 'User'}</div>
                        <div class="user-email">${user.email || ''}</div>
                    </div>
                    <a href="profil.html" class="dropdown-item"><i class="fas fa-user"></i> Profil Saya</a>
                    <a href="#" class="dropdown-item" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Keluar</a>
                </div>`;
            
            // Add logout functionality
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html';
                });
            }
        }
        
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
    } else {
        if (userMenu) userMenu.style.display = 'none';
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
    }
}

// Initialize header after page load
document.addEventListener('DOMContentLoaded', updateHeaderAfterRegistration);

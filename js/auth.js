// Check if user is logged in
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Get current user data
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Update header based on auth status
function updateHeader() {
    const isLoggedIn = checkAuth();
    const user = getCurrentUser();
    
    // Update login/register buttons
    const loginBtn = document.getElementById('navLoginLink');
    const registerBtn = document.getElementById('navRegisterBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (isLoggedIn && user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            const userName = user.name || 'User';
            userMenu.innerHTML = `
                <div class="user-avatar">
                    <span>${userName.charAt(0).toUpperCase()}</span>
                </div>
                <div class="user-dropdown">
                    <div class="user-info">
                        <div class="user-name">${userName}</div>
                        <div class="user-email">${user.email || ''}</div>
                    </div>
                    <a href="profil.html" class="dropdown-item"><i class="fas fa-user"></i> Profil Saya</a>
                    <a href="#" class="dropdown-item" id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Keluar</a>
                </div>
            `;
            
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
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Initialize auth when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateHeader();
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const name = email.split('@')[0];
            
            // Simulate successful login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                name: name,
                email: email
            }));
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
    
    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Simulate successful registration and login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                name: name,
                email: email
            }));
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
});

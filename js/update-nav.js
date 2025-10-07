// Function to update navigation with user menu
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Find navigation elements
    const loginLink = document.getElementById('navLoginLink');
    const registerBtn = document.getElementById('navRegisterBtn');
    const userMenu = document.getElementById('userMenu');
    
    if (isLoggedIn && user && user.name) {
        // Hide login/register buttons
        if (loginLink) loginLink.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        
        // Show and populate user menu
        if (userMenu) {
            userMenu.style.display = 'flex';
            userMenu.innerHTML = `
                <div class="user-avatar">
                    <span>${user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div class="user-dropdown">
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
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
        // Show login/register buttons if not logged in
        if (loginLink) loginLink.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateNavigation);

document.addEventListener('DOMContentLoaded', function() {
    // Track which password fields have been initialized
    const initializedToggles = new Set();

    // Function to toggle password visibility
    function setupPasswordToggle(passwordInputId, toggleButtonId) {
        const passwordInput = document.getElementById(passwordInputId);
        const toggleButton = document.getElementById(toggleButtonId);
        
        // Skip if elements don't exist or already initialized
        if (!passwordInput || !toggleButton || initializedToggles.has(toggleButtonId)) {
            return;
        }
        
        // Mark this toggle as initialized
        initializedToggles.add(toggleButtonId);
        
        // Ensure the icon starts with the correct class
        const icon = toggleButton.querySelector('i');
        if (icon && !icon.classList.contains('fa-eye')) {
            icon.className = 'fas fa-eye';
        }
        
        // Remove any existing event listeners to prevent duplicates
        const newToggleButton = toggleButton.cloneNode(true);
        toggleButton.parentNode.replaceChild(newToggleButton, toggleButton);
        
        // Add click event to the new button
        newToggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle the eye / eye slash icon
            const currentIcon = newToggleButton.querySelector('i');
            if (currentIcon) {
                currentIcon.classList.toggle('fa-eye');
                currentIcon.classList.toggle('fa-eye-slash');
            }
        });
    }
    
    // Initialize password toggles
    function initPasswordToggles() {
        setupPasswordToggle('password', 'togglePassword');
        setupPasswordToggle('confirm', 'toggleConfirmPassword');
    }
    
    // Run initial setup
    initPasswordToggles();
    
    // Also handle any dynamically added password fields
    const observer = new MutationObserver(function(mutations) {
        let shouldReinitialize = false;
        
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                shouldReinitialize = true;
            }
        });
        
        if (shouldReinitialize) {
            initPasswordToggles();
        }
    });
    
    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
});

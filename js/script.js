// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Form Validation
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Add validation to login form
    if (loginForm) {
        setupFormValidation(loginForm);
    }
    
    // Add validation to register form
    if (registerForm) {
        setupFormValidation(registerForm);
    }
    
    function setupFormValidation(form) {
        const inputs = form.querySelectorAll('.form-input');
        
        // Add validation to each input
        inputs.forEach(input => {
            // Create error message element
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i><span></span>`;
            input.parentNode.appendChild(errorMessage);
            
            // Add event listeners
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', validateInput);
        });
        
        // Form submit validation
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput({target: input})) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    function validateInput(e) {
        const input = e.target;
        const errorMessage = input.parentNode.querySelector('.error-message');
        const errorText = errorMessage.querySelector('span');
        let isValid = true;
        
        // Reset classes
        input.classList.remove('error', 'valid');
        errorMessage.classList.remove('visible');
        
        // Check if empty
        if (input.required && input.value.trim() === '') {
            isValid = false;
            errorText.textContent = 'Field ini wajib diisi';
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorText.textContent = 'Format email tidak valid';
            }
        }
        
        // Password validation
        if (input.name === 'password' && input.value.trim() !== '') {
            if (input.value.length < 6) {
                isValid = false;
                errorText.textContent = 'Password minimal 6 karakter';
            }
        }
        
        // Confirm password validation
        if (input.name === 'confirm' && input.value.trim() !== '') {
            const passwordInput = document.querySelector('input[name="password"]');
            if (input.value !== passwordInput.value) {
                isValid = false;
                errorText.textContent = 'Password tidak cocok';
            }
        }
        
        // Show error or success
        if (!isValid) {
            input.classList.add('error');
            errorMessage.classList.add('visible');
        } else if (input.value.trim() !== '') {
            input.classList.add('valid');
        }
        
        return isValid;
    }
    
    // Loading Screen Animation
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
    
    // Create Particle System
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2-6px
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation delay
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent navigation for placeholder links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Enhanced header scroll effect with smooth transitions
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect for particles
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.3;
            particle.style.transform = `translateY(${scrollTop * speed}px)`;
        });
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Enhanced Search functionality
    const searchInput = document.querySelector('.search-input');
    const locationSelect = document.querySelector('.location-select');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            searchContainer.style.transform = 'scale(1.05)';
            searchContainer.style.boxShadow = '0 25px 50px rgba(249, 115, 22, 0.3)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchContainer.style.transform = 'scale(1)';
            searchContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        // Add search suggestions with enhanced animations
        searchInput.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            if (value.length > 2) {
                showSearchSuggestions(value);
            } else {
                hideSearchSuggestions();
            }
        });
    }
    
    // Enhanced search suggestions
    function showSearchSuggestions(query) {
        const suggestions = [
            'Kasir', 'Sales', 'Chef', 'Waitress', 'Driver', 'Kurir',
            'Guru Les', 'Tutor', 'Agent Properti', 'Marketing', 'Admin',
            'Web Developer', 'Graphic Designer', 'Content Writer', 'Social Media Manager',
            'Delivery', 'Inventory', 'Customer Service', 'Freelancer'
        ];
        
        const filteredSuggestions = suggestions.filter(suggestion => 
            suggestion.toLowerCase().includes(query)
        );
        
        if (filteredSuggestions.length > 0) {
            createSuggestionsDropdown(filteredSuggestions);
        }
    }
    
    function createSuggestionsDropdown(suggestions) {
        hideSearchSuggestions();
        
        const dropdown = document.createElement('div');
        dropdown.className = 'search-suggestions';
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            margin-top: 10px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
        `;
        
        suggestions.slice(0, 6).forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.textContent = suggestion;
            item.style.cssText = `
                padding: 15px 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                color: white;
                opacity: 0;
                transform: translateX(-20px);
                animation: slideInRight 0.3s ease forwards;
                animation-delay: ${index * 0.1}s;
            `;
            
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                this.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.transform = 'translateX(0)';
            });
            
            item.addEventListener('click', function() {
                searchInput.value = suggestion;
                hideSearchSuggestions();
                // Add selection animation
                this.style.backgroundColor = 'rgba(249, 115, 22, 0.3)';
                setTimeout(() => {
                    this.style.backgroundColor = 'transparent';
                }, 300);
            });
            
            dropdown.appendChild(item);
        });
        
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(dropdown);
        
        // Animate dropdown appearance
        setTimeout(() => {
            dropdown.style.opacity = '1';
            dropdown.style.transform = 'translateY(0)';
        }, 10);
    }
    
    function hideSearchSuggestions() {
        const existingDropdown = document.querySelector('.search-suggestions');
        if (existingDropdown) {
            existingDropdown.style.opacity = '0';
            existingDropdown.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                existingDropdown.remove();
            }, 300);
        }
    }
    
    // Enhanced button animations with ripple effect
    const buttons = document.querySelectorAll('.btn-primary, .btn-register');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('click', function(e) {
            // Enhanced ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleExpand 0.8s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
    
    // Enhanced feature cards hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect to icon
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.boxShadow = '0 25px 50px rgba(249, 115, 22, 0.6)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Remove glow effect
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.boxShadow = '0 15px 35px rgba(249, 115, 22, 0.4)';
            }
        });
    });
    
    // Statistics Counter Animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter animation when stats section is visible
                if (entry.target.classList.contains('stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .hero-text, .hero-illustration, .stats, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Enhanced parallax effect for illustration
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const illustration = document.querySelector('.illustration-container');
        
        if (illustration) {
            const rate = scrolled * -0.3;
            illustration.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.01}deg)`;
        }
    });
    
    // Form validation and submission with enhanced feedback
    const searchForm = document.querySelector('.search-container');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            const location = locationSelect.value;
            
            if (searchTerm) {
                showSearchResults(searchTerm, location);
            } else {
                // Add shake animation for empty search
                searchContainer.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    searchContainer.style.animation = '';
                }, 500);
            }
        });
    }
    
    function showSearchResults(searchTerm, location) {
        // Enhanced modal with better animations
        const modal = document.createElement('div');
        modal.className = 'search-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 3rem;
            border-radius: 25px;
            max-width: 600px;
            width: 90%;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="margin-bottom: 2rem;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; color: white;">
                    <i class="fas fa-search"></i>
                </div>
                <h3 style="color: white; margin-bottom: 1rem; font-size: 1.8rem;">Hasil Pencarian</h3>
                <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 1.5rem; font-size: 1.1rem;">
                    Mencari pekerjaan <strong>"${searchTerm}"</strong> ${location ? `di <strong>${location}</strong>` : ''}
                </p>
                <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem;">
                    <p style="color: rgba(255, 255, 255, 0.9); font-size: 1rem;">
                        🚀 Fitur pencarian akan segera tersedia!<br>
                        <small style="opacity: 0.7;">Kami sedang mengembangkan sistem pencarian yang lebih canggih</small>
                    </p>
                </div>
                <button onclick="this.closest('.search-modal').remove()" 
                        style="background: linear-gradient(135deg, #f97316, #ea580c); 
                               color: white; border: none; padding: 1rem 2.5rem; 
                               border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 1.1rem;
                               transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(249, 115, 22, 0.4);">
                    Tutup
                </button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Animate modal
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close modal on background click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }
    
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterButton = document.querySelector('.newsletter-button');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                showNewsletterSuccess(email);
                newsletterInput.value = '';
            } else {
                showNewsletterError();
            }
        });
        
        newsletterButton.addEventListener('click', function() {
            newsletterForm.dispatchEvent(new Event('submit'));
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNewsletterSuccess(email) {
        const successModal = document.createElement('div');
        successModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 2rem;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 2000;
            text-align: center;
            color: white;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        successModal.innerHTML = `
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">
                <i class="fas fa-check"></i>
            </div>
            <h3 style="margin-bottom: 1rem; font-size: 1.3rem;">Berlangganan Berhasil!</h3>
                <p style="margin-bottom: 1.5rem; opacity: 0.8;">Terima kasih telah berlangganan newsletter JobRescue Bogor. Kami akan mengirimkan update pekerjaan terbaru di Bogor ke <strong>${email}</strong></p>
            <button onclick="this.closest('div').remove()" style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                Tutup
            </button>
        `;
        
        document.body.appendChild(successModal);
        setTimeout(() => {
            successModal.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            successModal.remove();
        }, 5000);
    }
    
    function showNewsletterError() {
        newsletterInput.style.borderColor = 'rgba(239, 68, 68, 0.5)';
        newsletterInput.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            newsletterInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            newsletterInput.style.animation = '';
        }, 500);
    }
    
    // Contact Form Validation and Submission
    const contactForm = document.querySelector('.contact-form .form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            if (name && email && subject && message && isValidEmail(email)) {
                showContactSuccess();
                this.reset();
            } else {
                showContactError();
            }
        });
    }
    
    function showContactSuccess() {
        const successModal = document.createElement('div');
        successModal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 2.5rem;
            border-radius: 25px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 2000;
            text-align: center;
            color: white;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 500px;
            width: 90%;
        `;
        
        successModal.innerHTML = `
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">
                <i class="fas fa-paper-plane"></i>
            </div>
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Pesan Terkirim!</h3>
            <p style="margin-bottom: 2rem; opacity: 0.8; line-height: 1.6;">Terima kasih telah menghubungi JobRescue Bogor. Tim support kami akan merespons dalam 24 jam ke depan.</p>
            <button onclick="this.closest('div').remove()" style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 1rem 2.5rem; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 1.1rem;">
                Tutup
            </button>
        `;
        
        document.body.appendChild(successModal);
        setTimeout(() => {
            successModal.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            successModal.remove();
        }, 8000);
    }
    
    function showContactError() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                input.style.animation = 'shake 0.5s ease-in-out';
                
                setTimeout(() => {
                    input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    input.style.animation = '';
                }, 500);
            }
        });
    }
    
    // Pricing Plan Selection
    const planButtons = document.querySelectorAll('.plan-button');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.pricing-card').querySelector('.plan-name').textContent;
            showPricingModal(planName);
        });
    });
    
    function showPricingModal(planName) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 3rem;
            border-radius: 25px;
            max-width: 600px;
            width: 90%;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            transition: transform 0.3s ease;
            color: white;
        `;
        
        modalContent.innerHTML = `
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">
                <i class="fas fa-crown"></i>
            </div>
            <h3 style="margin-bottom: 1rem; font-size: 1.8rem;">Pilih Paket ${planName}</h3>
            <p style="margin-bottom: 2rem; opacity: 0.8; line-height: 1.6;">
                ${planName === 'Free' ? 'Mulai gratis dan nikmati fitur dasar JobRescue' : 
                  planName === 'Pro' ? 'Upgrade ke Pro untuk fitur unlimited dan prioritas' : 
                  'Hubungi tim sales untuk paket Enterprise yang disesuaikan'}
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.closest('.pricing-modal').remove()" 
                        style="background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                    Nanti
                </button>
                <button onclick="this.closest('.pricing-modal').remove()" 
                        style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                    ${planName === 'Free' ? 'Mulai Sekarang' : planName === 'Pro' ? 'Upgrade Sekarang' : 'Hubungi Sales'}
                </button>
            </div>
        `;
        
        modal.className = 'pricing-modal';
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Category Card Interactions
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-title').textContent;
            showCategoryModal(categoryName);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    function showCategoryModal(categoryName) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            padding: 2.5rem;
            border-radius: 25px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            transition: transform 0.3s ease;
            color: white;
        `;
        
        modalContent.innerHTML = `
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Kategori: ${categoryName}</h3>
            <p style="margin-bottom: 2rem; opacity: 0.8; line-height: 1.6;">
                Jelajahi ribuan pekerjaan dalam kategori ${categoryName}. Temukan peluang yang sesuai dengan keahlian Anda.
            </p>
            <button onclick="this.closest('div').remove()" 
                    style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 1rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                Jelajahi Pekerjaan
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Social Media Share Functionality
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            let shareUrl = '';
            
            if (platform.includes('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            } else if (platform.includes('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Temukan pekerjaan mikro dan UMKM di JobRescue!')}`;
            } else if (platform.includes('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // Add enhanced CSS animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        @keyframes rippleExpand {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        @keyframes slideInRight {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .search-suggestions {
            animation: fadeInUp 0.3s ease;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Enhanced hover effects */
        .feature-card:hover .feature-icon {
            animation: iconPulse 0.6s ease;
        }
        
        @keyframes iconPulse {
            0%, 100% { transform: scale(1.15) rotate(10deg); }
            50% { transform: scale(1.25) rotate(15deg); }
        }
        
        /* Glowing text effect */
        .hero-title .highlight {
            animation: textGlow 3s ease-in-out infinite alternate;
        }
        
        @keyframes textGlow {
            from {
                filter: drop-shadow(0 0 5px rgba(249, 115, 22, 0.5));
            }
            to {
                filter: drop-shadow(0 0 20px rgba(249, 115, 22, 0.8));
            }
        }
        
        /* Category card hover animation */
        .category-card {
            cursor: pointer;
        }
        
        /* Step item animation */
        .step-item {
            cursor: pointer;
        }
        
        /* Pricing card hover effect */
        .pricing-card {
            cursor: pointer;
        }
        
        /* FAQ item animation */
        .faq-item {
            cursor: pointer;
        }
        
        /* Social link hover animation */
        .social-link {
            cursor: pointer;
        }
    `;
    document.head.appendChild(enhancedStyles);
    
    // Keyboard navigation enhancements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideSearchSuggestions();
            // Close any open modals
            const modals = document.querySelectorAll('.search-modal');
            modals.forEach(modal => modal.remove());
        }
        
        // Enter key for search
        if (e.key === 'Enter' && document.activeElement === searchInput) {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                showSearchResults(searchTerm, locationSelect.value);
            }
        }
    });
    
    // Add smooth reveal animation for elements
    function revealElements() {
        const reveals = document.querySelectorAll('.hero-text, .hero-illustration, .feature-card, .testimonial-card');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);
    revealElements(); // Initial check
    
    // Hero canvas subtle gradient particles
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        const ctx = heroCanvas.getContext('2d');
        let width = 0, height = 0, dpr = Math.max(1, window.devicePixelRatio || 1);

        function resizeCanvas() {
            const rect = heroCanvas.getBoundingClientRect();
            width = Math.floor(rect.width);
            height = Math.floor(rect.height);
            heroCanvas.width = Math.floor(width * dpr);
            heroCanvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        window.addEventListener('resize', resizeCanvas, { passive: true });
        resizeCanvas();

        const particles = Array.from({ length: 40 }).map(() => spawn());

        function spawn() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                r: 1 + Math.random() * 2.5,
                a: 0.06 + Math.random() * 0.12,
                vx: -0.25 + Math.random() * 0.5,
                vy: -0.25 + Math.random() * 0.5,
                hue: 210 + Math.random() * 40
            };
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -10 || p.x > width + 10 || p.y < -10 || p.y > height + 10) {
                    particles[i] = spawn();
                    continue;
                }
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
                grad.addColorStop(0, `hsla(${p.hue}, 85%, 70%, ${p.a})`);
                grad.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }
    
    // Add mouse cursor effects
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'custom-cursor';
            newCursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(249, 115, 22, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(newCursor);
        }
        
        const customCursor = document.querySelector('.custom-cursor');
        customCursor.style.left = e.clientX - 10 + 'px';
        customCursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhanced loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 200);
    });
});

// Add CSS for revealed elements
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .hero-text, .hero-illustration, .feature-card, .testimonial-card {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .hero-text.revealed, .hero-illustration.revealed, .feature-card.revealed, .testimonial-card.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card:nth-child(1).revealed {
        transition-delay: 0.1s;
    }
    
    .feature-card:nth-child(2).revealed {
        transition-delay: 0.2s;
    }
    
    .feature-card:nth-child(3).revealed {
        transition-delay: 0.3s;
    }
    
    .testimonial-card:nth-child(1).revealed {
        transition-delay: 0.1s;
    }
    
    .testimonial-card:nth-child(2).revealed {
        transition-delay: 0.2s;
    }
`;
document.head.appendChild(revealStyle);
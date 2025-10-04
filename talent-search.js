// Talent Search JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen Animation
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    
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
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Sample Talent Data
    const talentData = [
        {
            id: 1,
            name: "Sarah Putri",
            title: "Sales & Marketing Specialist",
            rating: 4.9,
            experience: "2 tahun",
            location: "Bogor Tengah",
            skills: ["Sales", "Marketing", "Customer Service", "Social Media"],
            workType: "Full Time",
            salary: "3-5 juta",
            category: "retail",
            avatar: "👩‍💼",
            description: "Berpengalaman dalam sales dan marketing dengan track record yang baik di industri retail."
        },
        {
            id: 2,
            name: "Ahmad Wijaya",
            title: "Chef & Kitchen Manager",
            rating: 4.8,
            experience: "5 tahun",
            location: "Bogor Utara",
            skills: ["Cooking", "Kitchen Management", "Menu Planning", "Food Safety"],
            workType: "Full Time",
            salary: "4-6 juta",
            category: "kuliner",
            avatar: "👨‍🍳",
            description: "Chef berpengalaman dengan keahlian dalam masakan Indonesia dan internasional."
        },
        {
            id: 3,
            name: "Maya Sari",
            title: "Guru Les & Tutor",
            rating: 4.9,
            experience: "3 tahun",
            location: "Bogor Selatan",
            skills: ["Matematika", "Bahasa Inggris", "Fisika", "Kimia"],
            workType: "Part Time",
            salary: "2-3 juta",
            category: "pendidikan",
            avatar: "👩‍🏫",
            description: "Guru les berpengalaman dengan metode mengajar yang efektif dan sabar."
        },
        {
            id: 4,
            name: "Budi Santoso",
            title: "Driver & Delivery",
            rating: 4.7,
            experience: "4 tahun",
            location: "Bogor Timur",
            skills: ["Driving", "Delivery", "Customer Service", "Route Planning"],
            workType: "Full Time",
            salary: "2-4 juta",
            category: "transportasi",
            avatar: "👨‍💼",
            description: "Driver berpengalaman dengan SIM A dan C, familiar dengan rute Bogor dan sekitarnya."
        },
        {
            id: 5,
            name: "Rina Dewi",
            title: "Agent Properti",
            rating: 4.8,
            experience: "3 tahun",
            location: "Bogor Barat",
            skills: ["Sales Properti", "Negotiation", "Market Analysis", "Customer Service"],
            workType: "Full Time",
            salary: "3-5 juta",
            category: "properti",
            avatar: "👩‍💼",
            description: "Agent properti berpengalaman dengan pengetahuan luas tentang pasar properti Bogor."
        },
        {
            id: 6,
            name: "Dedi Kurniawan",
            title: "Web Developer",
            rating: 4.9,
            experience: "4 tahun",
            location: "Tanah Sareal",
            skills: ["HTML/CSS", "JavaScript", "React", "Node.js"],
            workType: "Freelance",
            salary: "5+ juta",
            category: "it",
            avatar: "👨‍💻",
            description: "Web developer berpengalaman dengan portfolio yang impressive dan komunikasi yang baik."
        },
        {
            id: 7,
            name: "Lisa Anggraeni",
            title: "Kasir & Admin Toko",
            rating: 4.6,
            experience: "2 tahun",
            location: "Bogor Tengah",
            skills: ["Cashier", "Inventory", "Customer Service", "Data Entry"],
            workType: "Full Time",
            salary: "2-3 juta",
            category: "retail",
            avatar: "👩‍💼",
            description: "Kasir berpengalaman dengan kemampuan multitasking dan pelayanan pelanggan yang baik."
        },
        {
            id: 8,
            name: "Fajar Pratama",
            title: "Waitress & Service",
            rating: 4.7,
            experience: "1 tahun",
            location: "Bogor Utara",
            skills: ["Food Service", "Customer Service", "Menu Knowledge", "Teamwork"],
            workType: "Part Time",
            salary: "1-2 juta",
            category: "kuliner",
            avatar: "👨‍💼",
            description: "Waitress muda dengan semangat tinggi dan kemampuan komunikasi yang baik."
        }
    ];
    
    // Filter Elements
    const searchInput = document.getElementById('talentSearch');
    const locationSelect = document.getElementById('talentLocation');
    const categoryFilter = document.getElementById('categoryFilter');
    const experienceFilter = document.getElementById('experienceFilter');
    const workTypeFilter = document.getElementById('workTypeFilter');
    const salaryFilter = document.getElementById('salaryFilter');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const talentGrid = document.getElementById('talentGrid');
    const talentCount = document.getElementById('talentCount');
    const loadMoreBtn = document.getElementById('loadMore');
    
    let currentTalentData = [...talentData];
    let displayedCount = 6;
    
    // Initialize
    displayTalents(currentTalentData.slice(0, displayedCount));
    updateTalentCount(currentTalentData.length);
    
    // Search Functionality
    searchInput.addEventListener('input', function() {
        filterTalents();
    });
    
    locationSelect.addEventListener('change', function() {
        filterTalents();
    });
    
    // Apply Filters
    applyFiltersBtn.addEventListener('click', function() {
        filterTalents();
    });
    
    // Reset Filters
    resetFiltersBtn.addEventListener('click', function() {
        resetFilters();
    });
    
    // Load More
    loadMoreBtn.addEventListener('click', function() {
        displayedCount += 6;
        const filteredData = getFilteredTalents();
        displayTalents(filteredData.slice(0, displayedCount));
        
        if (displayedCount >= filteredData.length) {
            loadMoreBtn.style.display = 'none';
        }
    });
    
    function filterTalents() {
        const filteredData = getFilteredTalents();
        displayedCount = 6;
        displayTalents(filteredData.slice(0, displayedCount));
        updateTalentCount(filteredData.length);
        
        if (filteredData.length <= 6) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    function getFilteredTalents() {
        let filtered = [...talentData];
        
        // Search filter
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(talent => 
                talent.name.toLowerCase().includes(searchTerm) ||
                talent.title.toLowerCase().includes(searchTerm) ||
                talent.skills.some(skill => skill.toLowerCase().includes(searchTerm))
            );
        }
        
        // Location filter
        const location = locationSelect.value;
        if (location) {
            filtered = filtered.filter(talent => 
                talent.location.toLowerCase().includes(location.replace('-', ' '))
            );
        }
        
        // Category filter
        const category = categoryFilter.value;
        if (category) {
            filtered = filtered.filter(talent => talent.category === category);
        }
        
        // Experience filter
        const experience = experienceFilter.value;
        if (experience) {
            filtered = filtered.filter(talent => {
                const expYears = parseInt(talent.experience);
                if (experience === 'fresh') return expYears <= 1;
                if (experience === 'junior') return expYears >= 1 && expYears <= 2;
                if (experience === 'senior') return expYears >= 3;
                return true;
            });
        }
        
        // Work type filter
        const workType = workTypeFilter.value;
        if (workType) {
            filtered = filtered.filter(talent => 
                talent.workType.toLowerCase().includes(workType.toLowerCase())
            );
        }
        
        // Salary filter
        const salary = salaryFilter.value;
        if (salary) {
            filtered = filtered.filter(talent => 
                talent.salary.includes(salary.split('-')[0])
            );
        }
        
        return filtered;
    }
    
    function resetFilters() {
        searchInput.value = '';
        locationSelect.value = '';
        categoryFilter.value = '';
        experienceFilter.value = '';
        workTypeFilter.value = '';
        salaryFilter.value = '';
        
        currentTalentData = [...talentData];
        displayedCount = 6;
        displayTalents(currentTalentData.slice(0, displayedCount));
        updateTalentCount(currentTalentData.length);
        loadMoreBtn.style.display = 'block';
    }
    
    function displayTalents(talents) {
        talentGrid.innerHTML = '';
        
        talents.forEach(talent => {
            const talentCard = createTalentCard(talent);
            talentGrid.appendChild(talentCard);
        });
    }
    
    function createTalentCard(talent) {
        const card = document.createElement('div');
        card.className = 'talent-card';
        card.innerHTML = `
            <div class="talent-header">
                <div class="talent-avatar">${talent.avatar}</div>
                <div class="talent-info">
                    <h3>${talent.name}</h3>
                    <div class="talent-title">${talent.title}</div>
                    <div class="talent-rating">
                        <div class="stars">
                            ${'★'.repeat(Math.floor(talent.rating))}${'☆'.repeat(5 - Math.floor(talent.rating))}
                        </div>
                        <span class="rating-text">${talent.rating}/5</span>
                    </div>
                </div>
            </div>
            
            <div class="talent-skills">
                <h4>Keahlian:</h4>
                <div class="skills-list">
                    ${talent.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
            
            <div class="talent-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${talent.location}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${talent.experience} pengalaman</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${talent.workType}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-dollar-sign"></i>
                    <span>Rp ${talent.salary}</span>
                </div>
            </div>
            
            <div class="talent-actions">
                <button class="btn-contact" onclick="contactTalent(${talent.id})">
                    <i class="fas fa-phone"></i>
                    Hubungi
                </button>
                <button class="btn-view-profile" onclick="viewProfile(${talent.id})">
                    <i class="fas fa-eye"></i>
                    Lihat Profil
                </button>
            </div>
        `;
        
        return card;
    }
    
    function updateTalentCount(count) {
        talentCount.textContent = count;
    }
    
    // Contact Talent Function
    window.contactTalent = function(talentId) {
        const talent = talentData.find(t => t.id === talentId);
        if (talent) {
            showContactModal(talent);
        }
    };
    
    // View Profile Function
    window.viewProfile = function(talentId) {
        const talent = talentData.find(t => t.id === talentId);
        if (talent) {
            showProfileModal(talent);
        }
    };
    
    function showContactModal(talent) {
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
            max-width: 500px;
            width: 90%;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            transition: transform 0.3s ease;
            color: white;
        `;
        
        modalContent.innerHTML = `
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">
                ${talent.avatar}
            </div>
            <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">Hubungi ${talent.name}</h3>
            <p style="margin-bottom: 2rem; opacity: 0.8; line-height: 1.6;">${talent.description}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.closest('div').remove()" 
                        style="background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                    Nanti
                </button>
                <button onclick="this.closest('div').remove()" 
                        style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                    Hubungi Sekarang
                </button>
            </div>
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
    
    function showProfileModal(talent) {
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
            <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 3rem;">
                ${talent.avatar}
            </div>
            <h3 style="margin-bottom: 0.5rem; font-size: 1.8rem;">${talent.name}</h3>
            <p style="margin-bottom: 1rem; opacity: 0.8; font-size: 1.1rem;">${talent.title}</p>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem; text-align: left;">
                <h4 style="margin-bottom: 1rem;">Informasi Detail:</h4>
                <p><strong>Lokasi:</strong> ${talent.location}</p>
                <p><strong>Pengalaman:</strong> ${talent.experience}</p>
                <p><strong>Tipe Kerja:</strong> ${talent.workType}</p>
                <p><strong>Gaji:</strong> Rp ${talent.salary}</p>
                <p><strong>Rating:</strong> ${talent.rating}/5 ⭐</p>
            </div>
            <div style="margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem;">Keahlian:</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
                    ${talent.skills.map(skill => `<span style="background: rgba(249, 115, 22, 0.2); color: #f97316; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem;">${skill}</span>`).join('')}
                </div>
            </div>
            <p style="margin-bottom: 2rem; opacity: 0.8; line-height: 1.6;">${talent.description}</p>
            <button onclick="this.closest('div').remove()" 
                    style="background: linear-gradient(135deg, #f97316, #ea580c); color: white; border: none; padding: 1rem 2.5rem; border-radius: 50px; cursor: pointer; font-weight: 600; font-size: 1.1rem;">
                Tutup
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
    
    // Post Job Button
    const postJobBtn = document.querySelector('.btn-post-job');
    if (postJobBtn) {
        postJobBtn.addEventListener('click', function() {
            showPostJobModal();
        });
    }
    
    function showPostJobModal() {
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
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem;">
                <i class="fas fa-plus-circle"></i>
            </div>
            <h3 style="margin-bottom: 1rem; font-size: 1.8rem;">Posting Lowongan Kerja</h3>
            <p style="margin-bottom: 2rem; opacity: 0.8; line-height: 1.6;">Buat lowongan kerja untuk menarik talent terbaik di Bogor. Tim kami akan membantu mempromosikan lowongan Anda.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.closest('div').remove()" 
                        style="background: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                    Nanti
                </button>
                <button onclick="this.closest('div').remove()" 
                        style="background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border: none; padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; font-weight: 600;">
                    Buat Lowongan
                </button>
            </div>
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
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.15)';
            header.style.backdropFilter = 'blur(25px)';
            header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.boxShadow = 'none';
        }
    });
});

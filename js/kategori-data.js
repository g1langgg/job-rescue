// Data pekerjaan untuk semua kategori
const categoryData = {
    'kuliner': {
        name: 'Kuliner Bogor',
        icon: '🍜',
        description: 'Jelajahi ribuan pekerjaan dalam kategori Kuliner Bogor. Temukan peluang yang sesuai dengan keahlian Anda.',
        jobs: [
            {
                id: 1,
                title: 'Chef de Partie',
                company: 'The Peak Restaurant Bogor',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 6.000.000 - 8.000.000',
                tags: ['Masakan Indonesia', 'Western Food', 'Kitchen Management'],
                icon: '👨‍🍳',
                posted: '2 hari yang lalu'
            },
            {
                id: 2,
                title: 'Barista',
                company: 'Kopi Kenangan Bogor',
                location: 'Bogor Utara',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 4.500.000 - 5.500.000',
                tags: ['Coffee Making', 'Customer Service', 'Latte Art'],
                icon: '☕',
                posted: '1 hari yang lalu'
            },
            {
                id: 3,
                title: 'Pastry Chef',
                company: 'Bogor Bakery House',
                location: 'Bogor Selatan',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 7.000.000 - 9.000.000',
                tags: ['Baking', 'Cake Decoration', 'Recipe Development'],
                icon: '🍰',
                posted: '3 hari yang lalu'
            },
            {
                id: 4,
                title: 'Waiter/Waitress',
                company: 'Restoran Sunda Bogor',
                location: 'Bogor Barat',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 3.500.000 - 4.500.000',
                tags: ['Customer Service', 'Food Service', 'Communication'],
                icon: '🍽️',
                posted: '1 hari yang lalu'
            },
            {
                id: 5,
                title: 'Kitchen Supervisor',
                company: 'Hotel Salak The Heritage',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Senior Level',
                salary: 'Rp 8.000.000 - 12.000.000',
                tags: ['Leadership', 'Kitchen Operations', 'Quality Control'],
                icon: '👨‍🍳',
                posted: '5 hari yang lalu'
            },
            {
                id: 6,
                title: 'Commis Chef',
                company: 'Grand Garden Cafe',
                location: 'Bogor Timur',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 4.000.000 - 5.000.000',
                tags: ['Food Preparation', 'Cooking', 'Hygiene'],
                icon: '🔪',
                posted: '2 hari yang lalu'
            },
            {
                id: 7,
                title: 'Restaurant Manager',
                company: 'Bogor Food Court',
                location: 'Bogor Utara',
                type: 'Full Time',
                experience: 'Senior Level',
                salary: 'Rp 10.000.000 - 15.000.000',
                tags: ['Management', 'Operations', 'Staff Training'],
                icon: '📊',
                posted: '4 hari yang lalu'
            },
            {
                id: 8,
                title: 'Sushi Chef',
                company: 'Sushi Tei Bogor',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 7.500.000 - 10.000.000',
                tags: ['Japanese Cuisine', 'Sushi Making', 'Knife Skills'],
                icon: '🍣',
                posted: '3 hari yang lalu'
            }
        ]
    },
    'retail': {
        name: 'Retail & Toko',
        icon: '🏪',
        description: 'Temukan peluang karir di bidang retail dan toko. Berbagai posisi dari kasir hingga supervisor tersedia.',
        jobs: [
            {
                id: 1,
                title: 'Kasir',
                company: 'Indomaret Bogor',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 3.500.000 - 4.500.000',
                tags: ['Cashier', 'Customer Service', 'POS System'],
                icon: '💰',
                posted: '1 hari yang lalu'
            },
            {
                id: 2,
                title: 'Sales Associate',
                company: 'Matahari Department Store',
                location: 'Bogor Utara',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 4.000.000 - 5.000.000',
                tags: ['Sales', 'Product Knowledge', 'Communication'],
                icon: '👔',
                posted: '2 hari yang lalu'
            },
            {
                id: 3,
                title: 'Store Supervisor',
                company: 'Alfamart Bogor',
                location: 'Bogor Selatan',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 5.500.000 - 7.000.000',
                tags: ['Leadership', 'Inventory', 'Team Management'],
                icon: '📋',
                posted: '3 hari yang lalu'
            },
            {
                id: 4,
                title: 'Visual Merchandiser',
                company: 'Ramayana Bogor',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 5.000.000 - 6.500.000',
                tags: ['Display', 'Creativity', 'Retail Marketing'],
                icon: '🎨',
                posted: '2 hari yang lalu'
            },
            {
                id: 5,
                title: 'Stock Controller',
                company: 'Hypermart Bogor',
                location: 'Bogor Barat',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 4.500.000 - 6.000.000',
                tags: ['Inventory Management', 'Data Entry', 'Organization'],
                icon: '📦',
                posted: '4 hari yang lalu'
            },
            {
                id: 6,
                title: 'Customer Service',
                company: 'Electronic City Bogor',
                location: 'Bogor Timur',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 4.000.000 - 5.000.000',
                tags: ['Communication', 'Problem Solving', 'Product Knowledge'],
                icon: '🎧',
                posted: '1 hari yang lalu'
            }
        ]
    },
    'pendidikan': {
        name: 'Pendidikan',
        icon: '🎓',
        description: 'Bergabunglah dengan dunia pendidikan. Berbagai posisi guru, tutor, dan admin sekolah menanti Anda.',
        jobs: [
            {
                id: 1,
                title: 'Guru Les Matematika',
                company: 'Bimbel Ganesha Operation',
                location: 'Bogor Tengah',
                type: 'Part Time',
                experience: 'Entry Level',
                salary: 'Rp 50.000 - 100.000/jam',
                tags: ['Matematika', 'Teaching', 'Patience'],
                icon: '🧮',
                posted: '1 hari yang lalu'
            },
            {
                id: 2,
                title: 'Tutor Bahasa Inggris',
                company: 'English First Bogor',
                location: 'Bogor Utara',
                type: 'Part Time',
                experience: 'Entry Level',
                salary: 'Rp 75.000 - 150.000/jam',
                tags: ['English', 'Communication', 'TOEFL'],
                icon: '📚',
                posted: '2 hari yang lalu'
            },
            {
                id: 3,
                title: 'Guru TK',
                company: 'TK Tunas Harapan',
                location: 'Bogor Selatan',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 4.000.000 - 5.500.000',
                tags: ['Early Childhood', 'Creative', 'Patient'],
                icon: '👶',
                posted: '3 hari yang lalu'
            },
            {
                id: 4,
                title: 'Admin Sekolah',
                company: 'SMA Negeri 1 Bogor',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 3.500.000 - 4.500.000',
                tags: ['Administration', 'Microsoft Office', 'Organization'],
                icon: '📝',
                posted: '2 hari yang lalu'
            },
            {
                id: 5,
                title: 'Guru Musik',
                company: 'Sekolah Musik Yamaha',
                location: 'Bogor Barat',
                type: 'Part Time',
                experience: 'Mid Level',
                salary: 'Rp 100.000 - 200.000/jam',
                tags: ['Music', 'Piano', 'Teaching'],
                icon: '🎹',
                posted: '4 hari yang lalu'
            }
        ]
    },
    'transportasi': {
        name: 'Transportasi',
        icon: '🚗',
        description: 'Peluang karir di bidang transportasi. Dari driver hingga kurir, temukan pekerjaan yang sesuai.',
        jobs: [
            {
                id: 1,
                title: 'Driver Ojek Online',
                company: 'Gojek',
                location: 'Bogor',
                type: 'Freelance',
                experience: 'Entry Level',
                salary: 'Rp 4.000.000 - 8.000.000',
                tags: ['Driving', 'Navigation', 'Customer Service'],
                icon: '🏍️',
                posted: '1 hari yang lalu'
            },
            {
                id: 2,
                title: 'Driver Mobil Pribadi',
                company: 'Keluarga Bogor',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 4.500.000 - 6.000.000',
                tags: ['Driving', 'Punctual', 'Responsible'],
                icon: '🚙',
                posted: '2 hari yang lalu'
            },
            {
                id: 3,
                title: 'Kurir',
                company: 'JNE Bogor',
                location: 'Bogor Utara',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 3.500.000 - 5.000.000',
                tags: ['Delivery', 'Time Management', 'Physical Fitness'],
                icon: '📦',
                posted: '1 hari yang lalu'
            },
            {
                id: 4,
                title: 'Driver Angkot',
                company: 'Koperasi Angkot Bogor',
                location: 'Bogor',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 3.000.000 - 5.000.000',
                tags: ['Public Transport', 'Route Knowledge', 'Friendly'],
                icon: '🚐',
                posted: '3 hari yang lalu'
            },
            {
                id: 5,
                title: 'Dispatcher',
                company: 'Blue Bird Taxi',
                location: 'Bogor Selatan',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 4.000.000 - 5.500.000',
                tags: ['Communication', 'Coordination', 'Problem Solving'],
                icon: '📞',
                posted: '4 hari yang lalu'
            }
        ]
    },
    'properti': {
        name: 'Properti',
        icon: '🏠',
        description: 'Karir di industri properti menanti. Posisi agent, marketing, hingga property manager tersedia.',
        jobs: [
            {
                id: 1,
                title: 'Property Agent',
                company: 'Ray White Bogor',
                location: 'Bogor Tengah',
                type: 'Freelance',
                experience: 'Entry Level',
                salary: 'Komisi 2-5%',
                tags: ['Sales', 'Negotiation', 'Property Knowledge'],
                icon: '🏘️',
                posted: '1 hari yang lalu'
            },
            {
                id: 2,
                title: 'Marketing Properti',
                company: 'Summarecon Bogor',
                location: 'Bogor Utara',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 6.000.000 - 10.000.000',
                tags: ['Marketing', 'Sales', 'Presentation'],
                icon: '📊',
                posted: '2 hari yang lalu'
            },
            {
                id: 3,
                title: 'Property Manager',
                company: 'Apartemen Bogor Icon',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Senior Level',
                salary: 'Rp 8.000.000 - 12.000.000',
                tags: ['Management', 'Maintenance', 'Tenant Relations'],
                icon: '🏢',
                posted: '3 hari yang lalu'
            },
            {
                id: 4,
                title: 'Admin Properti',
                company: 'Century 21 Bogor',
                location: 'Bogor Selatan',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 4.000.000 - 5.500.000',
                tags: ['Administration', 'Documentation', 'Customer Service'],
                icon: '📋',
                posted: '2 hari yang lalu'
            }
        ]
    },
    'it': {
        name: 'IT & Digital',
        icon: '💻',
        description: 'Peluang karir di bidang teknologi dan digital. Berbagai posisi developer, designer, dan IT support.',
        jobs: [
            {
                id: 1,
                title: 'Web Developer',
                company: 'Digital Agency Bogor',
                location: 'Bogor Tengah',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 7.000.000 - 12.000.000',
                tags: ['HTML', 'CSS', 'JavaScript', 'PHP'],
                icon: '👨‍💻',
                posted: '1 hari yang lalu'
            },
            {
                id: 2,
                title: 'UI/UX Designer',
                company: 'Startup Bogor',
                location: 'Bogor Utara',
                type: 'Full Time',
                experience: 'Mid Level',
                salary: 'Rp 6.000.000 - 10.000.000',
                tags: ['Figma', 'Adobe XD', 'User Research'],
                icon: '🎨',
                posted: '2 hari yang lalu'
            },
            {
                id: 3,
                title: 'IT Support',
                company: 'PT Tech Solution Bogor',
                location: 'Bogor Selatan',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 4.500.000 - 6.000.000',
                tags: ['Troubleshooting', 'Hardware', 'Software'],
                icon: '🔧',
                posted: '3 hari yang lalu'
            },
            {
                id: 4,
                title: 'Social Media Specialist',
                company: 'Marketing Agency Bogor',
                location: 'Bogor Barat',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 4.000.000 - 6.000.000',
                tags: ['Instagram', 'Content Creation', 'Analytics'],
                icon: '📱',
                posted: '1 hari yang lalu'
            },
            {
                id: 5,
                title: 'Data Entry',
                company: 'BPO Bogor',
                location: 'Bogor Timur',
                type: 'Full Time',
                experience: 'Entry Level',
                salary: 'Rp 3.500.000 - 4.500.000',
                tags: ['Typing', 'Microsoft Excel', 'Accuracy'],
                icon: '⌨️',
                posted: '2 hari yang lalu'
            }
        ]
    }
};

// Get category from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const categoryKey = urlParams.get('cat') || 'kuliner';

// Load category data
const category = categoryData[categoryKey] || categoryData['kuliner'];

// Update page title and meta
document.getElementById('pageTitle').textContent = `${category.name} - JobRescue`;
document.getElementById('categoryIcon').textContent = category.icon;
document.getElementById('categoryTitle').textContent = category.name;
document.getElementById('categoryDescription').textContent = category.description;

// Render jobs
function renderJobs(jobsToRender = category.jobs) {
    const container = document.getElementById('jobListings');
    
    if (jobsToRender.length === 0) {
        container.innerHTML = `
            <div class="no-jobs">
                <i class="fas fa-search"></i>
                <h3>Tidak Ada Pekerjaan Ditemukan</h3>
                <p>Coba ubah filter pencarian Anda</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = jobsToRender.map(job => `
        <div class="job-card">
            <div class="job-logo">${job.icon}</div>
            <div class="job-content">
                <h3 class="job-title">${job.title}</h3>
                <div class="job-company">
                    <i class="fas fa-building"></i>
                    ${job.company}
                </div>
                <div class="job-meta">
                    <div class="job-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        ${job.location}
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-briefcase"></i>
                        ${job.type}
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-layer-group"></i>
                        ${job.experience}
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-clock"></i>
                        ${job.posted}
                    </div>
                </div>
                <div class="job-tags">
                    ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                </div>
                <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
                    <div class="salary-badge">
                        <i class="fas fa-money-bill-wave"></i>
                        ${job.salary}
                    </div>
                    <div class="job-actions">
                        <button class="btn-save" onclick="saveJob(${job.id})">
                            <i class="far fa-bookmark"></i>
                        </button>
                        <a href="#" class="btn-apply" onclick="applyJob(${job.id}); return false;">
                            <i class="fas fa-paper-plane"></i>
                            Lamar Sekarang
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterJobs() {
    const jobType = document.getElementById('jobTypeFilter').value;
    const experience = document.getElementById('experienceFilter').value;
    
    let filtered = category.jobs;
    
    if (jobType) {
        filtered = filtered.filter(job => 
            job.type.toLowerCase().replace(' ', '') === jobType
        );
    }
    
    if (experience) {
        filtered = filtered.filter(job => 
            job.experience.toLowerCase().includes(experience)
        );
    }
    
    renderJobs(filtered);
}

function saveJob(jobId) {
    alert('Pekerjaan berhasil disimpan! Anda dapat melihatnya di halaman profil.');
}

function applyJob(jobId) {
    const job = category.jobs.find(j => j.id === jobId);
    if (confirm(`Lamar pekerjaan ${job.title} di ${job.company}?`)) {
        alert('Lamaran berhasil dikirim! Tim HRD akan menghubungi Anda segera.');
    }
}

// Event listeners for filters
document.getElementById('jobTypeFilter').addEventListener('change', filterJobs);
document.getElementById('experienceFilter').addEventListener('change', filterJobs);
document.getElementById('salaryFilter').addEventListener('change', filterJobs);

// Initial render
renderJobs();

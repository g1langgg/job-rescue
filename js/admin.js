// Alert functions
async function showAlert(message, title = 'Pemberitahuan', type = 'info') {
    return new Promise(resolve => {
        alert(`${title}: ${message}`);
        resolve(true);
    });
}

async function showConfirm(message, title = 'Konfirmasi') {
    return new Promise(resolve => {
        const result = confirm(`${title}: ${message}`);
        resolve(result);
    });
}

async function showPrompt(message, defaultValue = '', title = 'Input') {
    return new Promise(resolve => {
        const result = prompt(`${title}: ${message}`, defaultValue);
        resolve(result);
    });
}

(function(){
    const STORAGE_KEY = 'jr_jobs';
    const TALENT_KEY = 'jr_talents';
    const USER_KEY = 'jr_admin';
    const USERS_KEY = 'jr_users';

    function getUser(){ 
        // Use standalone admin authentication
        try{ 
            const adminSession = JSON.parse(localStorage.getItem('jr_admin_session') || 'null');
            return adminSession && adminSession.email === 'admin@jobrescue.local' ? adminSession : null;
        } catch {
            return null;
        }

    async function addTalent(){
        const name = await showPrompt('Nama Talent', '', 'Tambah Talent'); if(!name) return;
        const title = await showPrompt('Judul/Posisi (mis. Barista, Driver)', '', 'Tambah Talent'); if(!title) return;
        const location = await showPrompt('Lokasi', 'Bogor', 'Tambah Talent')||'Bogor';
        const experience = await showPrompt('Pengalaman (mis. 2 tahun)', '1 tahun', 'Tambah Talent')||'1 tahun';
        const workType = await showPrompt('Tipe Kerja (Full Time/Part Time/Freelance)', 'Full Time', 'Tambah Talent')||'Full Time';
        const salary = await showPrompt('Gaji (mis. 3-5 juta)', '', 'Tambah Talent')||'';
        const category = await showPrompt('Kategori (kuliner/retail/pendidikan/transportasi/properti/it)', 'kuliner', 'Tambah Talent')||'kuliner';
        const skills = await showPrompt('Keahlian (pisahkan dengan koma)', '', 'Tambah Talent')||'';
        const avatar = '👤';
        const rating = 4.8;
        const list = getTalents();
        list.unshift({ id: Date.now(), name, title, location, experience, workType, salary, category, skills: skills.split(',').map(s=>s.trim()).filter(Boolean), avatar, rating });
        setTalents(list);
        await showAlert('Talent berhasil ditambahkan', 'Sukses', 'success');
    }
    }

    async function guard(){
        const u = getUser();
        if (!u) {
            await showAlert('Silakan login sebagai admin.', 'Akses Ditolak', 'warning');
            window.location.href = 'admin-login.html';
            return false;
        }
        if (u.role !== 'admin') {
            await showAlert('Akses ditolak. Hanya admin yang diperbolehkan.', 'Akses Ditolak', 'warning');
            window.location.href = 'admin-login.html';
            return false;
        }
        // fill sidebar identity
        const n = document.getElementById('adminName');
        const m = document.getElementById('adminEmail');
        if(n) n.textContent = u.name || 'Administrator';
        if(m) m.textContent = u.email || '';
        return true;
    }

    function getJobs(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); }catch{return [];} }
    function setJobs(list){ localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

    function getTalents(){ try{ return JSON.parse(localStorage.getItem(TALENT_KEY)||'[]'); }catch{return [];} }
    function setTalents(list){ localStorage.setItem(TALENT_KEY, JSON.stringify(list)); }

    function render(){
        const table = document.getElementById('adminJobsTable');
        const countEl = document.getElementById('adminJobCount');
        const jobs = getJobs();
        countEl.textContent = jobs.length;
        if(!table) return;
        const tbody = table.querySelector('tbody') || table;
        tbody.innerHTML = '';
        if(jobs.length === 0){
            const tr = document.createElement('tr');
            const td = document.createElement('td'); td.colSpan = 5; td.textContent = 'Belum ada lowongan.'; td.style.padding='12px';
            tr.appendChild(td); tbody.appendChild(tr); return;
        }
        jobs.forEach((j, idx)=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${escapeHtml(j.title||'')}</td>
                <td>${escapeHtml(j.company||'')}</td>
                <td>${escapeHtml(j.location||'')}</td>
                <td>${escapeHtml(j.type||'')}</td>
                <td><div class="row-actions">
                    <button data-idx="${idx}" class="btn-ghost btnEdit">Edit</button>
                    <button data-idx="${idx}" class="btn-ghost btnDelete">Hapus</button>
                </div></td>`;
            tbody.appendChild(tr);
        });
        tbody.querySelectorAll('.btnDelete').forEach(btn=>btn.addEventListener('click', onDelete));
        tbody.querySelectorAll('.btnEdit').forEach(btn=>btn.addEventListener('click', onEdit));
    }

    async function onDelete(e){
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        const jobs = getJobs();
        if(!Number.isInteger(idx) || idx<0 || idx>=jobs.length) return;
        if(!await showConfirm('Hapus lowongan ini?', 'Konfirmasi Hapus')) return;
        jobs.splice(idx,1);
        setJobs(jobs);
        render();
        await showAlert('Lowongan berhasil dihapus', 'Sukses', 'success');
    }

    async function onEdit(e){
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        const jobs = getJobs();
        const j = jobs[idx]; if(!j) return;
        const title = await showPrompt('Judul', j.title||'', 'Edit Lowongan'); if(title===null) return;
        const company = await showPrompt('Perusahaan', j.company||'', 'Edit Lowongan'); if(company===null) return;
        const location = await showPrompt('Lokasi', j.location||'', 'Edit Lowongan'); if(location===null) return;
        const type = await showPrompt('Tipe', j.type||'', 'Edit Lowongan'); if(type===null) return;
        const salary = await showPrompt('Gaji', j.salary||'', 'Edit Lowongan'); if(salary===null) return;
        const description = await showPrompt('Deskripsi', j.description||'', 'Edit Lowongan'); if(description===null) return;
        jobs[idx] = { ...j, title, company, location, type, salary, description };
        setJobs(jobs);
        render();
        await showAlert('Lowongan berhasil diupdate', 'Sukses', 'success');
    }

    async function addJob(){
        const title = await showPrompt('Judul', '', 'Tambah Lowongan'); if(!title) return;
        const company = await showPrompt('Perusahaan', '', 'Tambah Lowongan'); if(!company) return;
        const location = await showPrompt('Lokasi', '', 'Tambah Lowongan'); if(!location) return;
        const type = await showPrompt('Tipe (Full-time/Part-time)', '', 'Tambah Lowongan'); if(!type) return;
        const salary = await showPrompt('Gaji (opsional)', '', 'Tambah Lowongan')||'';
        const description = await showPrompt('Deskripsi', '', 'Tambah Lowongan'); if(!description) return;
        const jobs = getJobs();
        jobs.unshift({ id: Date.now(), title, company, location, type, salary, description });
        setJobs(jobs);
        render();
        await showAlert('Lowongan berhasil ditambahkan', 'Sukses', 'success');
    }

    function escapeHtml(s){ return (s||'').toString().replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])); }

    function renderUsers(){
        const wrap = document.getElementById('adminUsersTable');
        if(!wrap) return;
        const tbody = wrap.querySelector('tbody') || wrap;
        tbody.innerHTML = '';
        const users = getAllUsers();
        if(users.length===0){ const tr=document.createElement('tr'); const td=document.createElement('td'); td.colSpan=4; td.textContent='Belum ada user.'; td.style.padding='12px'; tr.appendChild(td); tbody.appendChild(tr); return; }
        users.forEach((u, idx)=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${escapeHtml(u.name||'')}</td>
                <td>${escapeHtml(u.email||'')}</td>
                <td>${u.isAdmin?'Admin':'User'}</td>
                <td><button data-idx="${idx}" class="btn-ghost btnUserDelete">Hapus</button></td>`;
            tbody.appendChild(tr);
        });
        tbody.querySelectorAll('.btnUserDelete').forEach(b=>b.addEventListener('click', onUserDelete));
    }

    function getAllUsers(){ try{ return JSON.parse(localStorage.getItem(USERS_KEY)||'[]'); }catch{return [];} }
    function setAllUsers(list){ localStorage.setItem(USERS_KEY, JSON.stringify(list)); }
    async function onUserDelete(e){
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        const list = getAllUsers();
        const user = list[idx]; if(!user) return;
        if(user.email==='admin@jobrescue.local') {
            await showAlert('Tidak bisa menghapus admin default.', 'Akses Ditolak', 'warning');
            return;
        }
        if(!await showConfirm('Hapus user ini?', 'Konfirmasi Hapus')) return;
        list.splice(idx,1); setAllUsers(list); renderUsers(); updateOverview();
        await showAlert('User berhasil dihapus', 'Sukses', 'success');
    }

    async function addUser(){
        const name = await showPrompt('Nama', '', 'Tambah User'); if(!name) return;
        const email = await showPrompt('Email', '', 'Tambah User'); if(!email) return;
        const pass = await showPrompt('Password (min 6)', '', 'Tambah User');
        if(!pass || pass.length<6) {
            await showAlert('Password minimal 6 karakter', 'Validasi', 'warning');
            return;
        }
        const isAdmin = await showConfirm('Jadikan admin?', 'Role User');
        const list = getAllUsers();
        if(list.find(u=>u.email===email)) {
            await showAlert('Email sudah ada.', 'Error', 'error');
            return;
        }
        list.push({ name, email, passwordHash: btoa(pass), isAdmin }); setAllUsers(list); renderUsers(); updateOverview();
        await showAlert('User berhasil ditambahkan', 'Sukses', 'success');
    }

    function switchTab(target){
        ['Overview','Jobs','Users'].forEach(n=>{
            const v = document.getElementById('view'+n);
            const t = document.getElementById('tab'+n);
            if(!v||!t) return;
            const active = n.toLowerCase() === target;
            v.style.display = active ? 'block' : 'none';
            t.classList.toggle('active', active);
        });
    }

    function updateOverview(){
        const jobs = getJobs();
        const users = getAllUsers();
        const now = new Date();
        const fmt = now.toLocaleString('id-ID');
        const oj = document.getElementById('ovJobs'); if(oj) oj.textContent = jobs.length;
        const ou = document.getElementById('ovUsers'); if(ou) ou.textContent = users.length;
        const oup = document.getElementById('ovUpdated'); if(oup) oup.textContent = fmt;
    }

    function init(){
        if(!guard()) return;
        document.getElementById('btnAddJob')?.addEventListener('click', addJob);
        // Quick actions on dashboard
        document.getElementById('btnAddJobQuick')?.addEventListener('click', addJob);
        document.getElementById('btnAddTalentQuick')?.addEventListener('click', addTalent);
        document.getElementById('btnClearAll').addEventListener('click', async function(){
            if(await showConfirm('Hapus semua lowongan?', 'Konfirmasi')){
                localStorage.setItem(STORAGE_KEY, '[]');
                render();
                await showAlert('Semua lowongan berhasil dihapus', 'Sukses', 'success');
            }
        });
        document.getElementById('adminLogoutBtn').addEventListener('click', function(e){
            e.preventDefault(); 
            localStorage.removeItem('jr_admin_session'); 
            window.location.href='admin-login.html';
        });
        const tabBtns = ['overview','jobs','users'];
        tabBtns.forEach(n=>{
            const el = document.getElementById('tab'+n.charAt(0).toUpperCase()+n.slice(1));
            if(el) el.addEventListener('click', ()=> switchTab(n));
            const sd = document.getElementById('sdb'+n.charAt(0).toUpperCase()+n.slice(1));
            if(sd) sd.addEventListener('click', ()=> switchTab(n));
        });
        document.getElementById('btnAddUser')?.addEventListener('click', addUser);
        render(); renderUsers(); updateOverview();
    }

    document.addEventListener('DOMContentLoaded', init);
})();



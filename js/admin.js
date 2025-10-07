(function(){
    const STORAGE_KEY = 'jr_jobs';
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
    }

    function guard(){
        const u = getUser();
        if (!u) {
            alert('Silakan login sebagai admin.');
            window.location.href = 'admin-login.html';
            return false;
        }
        if (u.role !== 'admin') {
            alert('Akses ditolak. Hanya admin yang diperbolehkan.');
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

    function onDelete(e){
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        const jobs = getJobs();
        if(!Number.isInteger(idx) || idx<0 || idx>=jobs.length) return;
        if(!confirm('Hapus lowongan ini?')) return;
        jobs.splice(idx,1);
        setJobs(jobs);
        render();
    }

    function onEdit(e){
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        const jobs = getJobs();
        const j = jobs[idx]; if(!j) return;
        const title = prompt('Judul', j.title||''); if(title===null) return;
        const company = prompt('Perusahaan', j.company||''); if(company===null) return;
        const location = prompt('Lokasi', j.location||''); if(location===null) return;
        const type = prompt('Tipe', j.type||''); if(type===null) return;
        const salary = prompt('Gaji', j.salary||''); if(salary===null) return;
        const description = prompt('Deskripsi', j.description||''); if(description===null) return;
        jobs[idx] = { ...j, title, company, location, type, salary, description };
        setJobs(jobs);
        render();
    }

    function addJob(){
        const title = prompt('Judul'); if(!title) return;
        const company = prompt('Perusahaan'); if(!company) return;
        const location = prompt('Lokasi'); if(!location) return;
        const type = prompt('Tipe'); if(!type) return;
        const salary = prompt('Gaji (opsional)')||'';
        const description = prompt('Deskripsi'); if(!description) return;
        const jobs = getJobs();
        jobs.unshift({ id: Date.now(), title, company, location, type, salary, description });
        setJobs(jobs);
        render();
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
    function onUserDelete(e){
        const idx = Number(e.currentTarget.getAttribute('data-idx'));
        const list = getAllUsers();
        const user = list[idx]; if(!user) return;
        if(user.email==='admin@jobrescue.local') return alert('Tidak bisa menghapus admin default.');
        if(!confirm('Hapus user ini?')) return;
        list.splice(idx,1); setAllUsers(list); renderUsers(); updateOverview();
    }

    function addUser(){
        const name = prompt('Nama'); if(!name) return;
        const email = prompt('Email'); if(!email) return;
        const pass = prompt('Password (min 6)'); if(!pass || pass.length<6) return alert('Password minimal 6 karakter');
        const isAdmin = confirm('Jadikan admin? OK=Ya');
        const list = getAllUsers();
        if(list.find(u=>u.email===email)) return alert('Email sudah ada.');
        list.push({ name, email, passwordHash: btoa(pass), isAdmin }); setAllUsers(list); renderUsers(); updateOverview();
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
        document.getElementById('btnAddJob').addEventListener('click', addJob);
        document.getElementById('btnClearAll').addEventListener('click', function(){
            if(confirm('Hapus semua lowongan?')){ localStorage.setItem(STORAGE_KEY, '[]'); render(); }
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



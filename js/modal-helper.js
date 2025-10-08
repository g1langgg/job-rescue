/**
 * Modal Helper - Professional Modal Dialogs
 * Replaces browser's alert(), confirm(), and prompt() with beautiful custom modals
 */

// Add required styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes slideUp {
        from { transform: translateY(30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(modalStyles);

/**
 * Show Alert Modal
 * @param {string} message - Message to display
 * @param {string} title - Modal title (optional)
 * @param {string} type - 'info', 'success', 'warning', 'error' (default: 'info')
 */
window.showAlert = function(message, title = 'Pemberitahuan', type = 'info') {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const colors = {
            info: { bg: '#667eea', light: '#764ba2', icon: 'info-circle' },
            success: { bg: '#10b981', light: '#059669', icon: 'check-circle' },
            warning: { bg: '#f59e0b', light: '#d97706', icon: 'exclamation-triangle' },
            error: { bg: '#ef4444', light: '#dc2626', icon: 'times-circle' }
        };
        
        const color = colors[type] || colors.info;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 32px;
            max-width: 450px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="width: 70px; height: 70px; background: linear-gradient(135deg, ${color.bg}, ${color.light}); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
                <i class="fas fa-${color.icon}" style="color: white; font-size: 32px;"></i>
            </div>
            
            <h2 style="margin: 0 0 12px; color: #1e293b; font-size: 22px; font-weight: 700;">${title}</h2>
            
            <p style="margin: 0 0 24px; color: #64748b; font-size: 15px; line-height: 1.6;">${message}</p>
            
            <button id="alertOkBtn" style="width: 100%; padding: 14px; background: linear-gradient(135deg, ${color.bg}, ${color.light}); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                OK
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                resolve();
            }, 300);
        };
        
        document.getElementById('alertOkBtn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
};

/**
 * Show Confirm Modal
 * @param {string} message - Message to display
 * @param {string} title - Modal title (optional)
 * @returns {Promise<boolean>} - true if confirmed, false if cancelled
 */
window.showConfirm = function(message, title = 'Konfirmasi') {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 32px;
            max-width: 450px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);">
                <i class="fas fa-question" style="color: white; font-size: 32px;"></i>
            </div>
            
            <h2 style="margin: 0 0 12px; color: #1e293b; font-size: 22px; font-weight: 700;">${title}</h2>
            
            <p style="margin: 0 0 24px; color: #64748b; font-size: 15px; line-height: 1.6;">${message}</p>
            
            <div style="display: flex; gap: 12px;">
                <button id="confirmCancelBtn" style="flex: 1; padding: 14px; background: #f1f5f9; color: #64748b; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    Batal
                </button>
                <button id="confirmOkBtn" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                    OK
                </button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const closeModal = (result) => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                resolve(result);
            }, 300);
        };
        
        document.getElementById('confirmOkBtn').addEventListener('click', () => closeModal(true));
        document.getElementById('confirmCancelBtn').addEventListener('click', () => closeModal(false));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(false);
        });
    });
};

/**
 * Show Prompt Modal
 * @param {string} message - Message to display
 * @param {string} defaultValue - Default input value (optional)
 * @param {string} title - Modal title (optional)
 * @returns {Promise<string|null>} - Input value or null if cancelled
 */
window.showPrompt = function(message, defaultValue = '', title = 'Input') {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 32px;
            max-width: 450px;
            width: 90%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="text-align: center; margin-bottom: 24px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                    <i class="fas fa-edit" style="color: white; font-size: 24px;"></i>
                </div>
                <h2 style="margin: 0 0 8px; color: #1e293b; font-size: 22px; font-weight: 700;">${title}</h2>
                <p style="margin: 0; color: #64748b; font-size: 14px;">${message}</p>
            </div>
            
            <form id="promptForm">
                <input type="text" id="promptInput" value="${defaultValue}" style="width: 100%; padding: 12px 16px; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 14px; margin-bottom: 16px; transition: all 0.3s ease;">
                
                <div style="display: flex; gap: 12px;">
                    <button type="button" id="promptCancelBtn" style="flex: 1; padding: 14px; background: #f1f5f9; color: #64748b; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        Batal
                    </button>
                    <button type="submit" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                        OK
                    </button>
                </div>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        const input = document.getElementById('promptInput');
        
        // Input focus effect
        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = '#e2e8f0';
            this.style.boxShadow = 'none';
        });
        
        // Focus input
        setTimeout(() => {
            input.focus();
            input.select();
        }, 100);
        
        const closeModal = (result) => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
                resolve(result);
            }, 300);
        };
        
        document.getElementById('promptForm').addEventListener('submit', (e) => {
            e.preventDefault();
            closeModal(input.value.trim() || null);
        });
        
        document.getElementById('promptCancelBtn').addEventListener('click', () => closeModal(null));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(null);
        });
    });
};

// Override native functions (optional - comment out if you want to use showAlert/showConfirm/showPrompt explicitly)
// window.alert = showAlert;
// window.confirm = showConfirm;
// window.prompt = showPrompt;

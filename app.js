document.addEventListener('alpine:init', () => {
    Alpine.data('plantOS', () => ({
        // Masukkan URL Web App Google Apps Script anda di sini:
        scriptUrl: 'https://script.google.com/macros/s/AKfycbyL2CbfyErJtXQZFy0cgjZbJO7g3GsxAsrFFtA7pJP2CAmt_Fuxt8b4aLozxpZ5BF8/exec',
        
        isLoggedIn: false,
        activeTab: 'dashboard',
        noteTimer: 0,
        timerInterval: null,
        
        user: { 
            name: '', ic_no: '', ndp: '', course: '', xp: 0, streak: 0 
        },
        
        init() {
            let saved = localStorage.getItem('mathtech_user');
            if(saved) {
                this.user = JSON.parse(saved);
                this.isLoggedIn = true;
            }
        },

        login() {
            if(this.user.ic_no && this.user.ndp) {
                this.isLoggedIn = true;
                this.user.xp = parseInt(localStorage.getItem('mathtech_xp') || 0);
                this.user.streak = parseInt(localStorage.getItem('mathtech_streak') || 0);
                this.saveLocal();
                this.awardXp(10, 'DAILY_CLOCK_IN'); // +10 XP log masuk
            }
        },

        logout() {
            localStorage.removeItem('mathtech_user');
            this.isLoggedIn = false;
        },

        saveLocal() {
            localStorage.setItem('mathtech_user', JSON.stringify(this.user));
            localStorage.setItem('mathtech_xp', this.user.xp);
        },

        awardXp(amount, actionCode) {
            // Formula Gamifikasi Streak
            let multiplier = 1.0;
            if (this.user.streak >= 30) multiplier = 2.0;
            else if (this.user.streak >= 14) multiplier = 1.5;
            else if (this.user.streak >= 7) multiplier = 1.2;

            let finalXp = Math.round(amount * multiplier);
            this.user.xp += finalXp;
            this.saveLocal();
            this.syncToSheet(actionCode, finalXp);
            
            alert(`⚡ Sektor Disegerakkan: +${finalXp} XP Diterima! [Kod: ${actionCode}]`);
        },

        async syncToSheet(action, xpEarned) {
            if(!this.scriptUrl || this.scriptUrl === 'PASTE_URL_APPS_SCRIPT_DI_SINI') return;
            
            const payload = {
                name: this.user.name,
                ic_no: this.user.ic_no,
                ndp: this.user.ndp,
                course: this.user.course,
                action: action,
                xp_earned: xpEarned,
                total_xp: this.user.xp
            };
            
            // Mode "no-cors" membolehkan penghantaran senyap tanpa ralat polisi pelayar
            fetch(this.scriptUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            }).catch(err => console.warn('Sync ralat:', err));
        },
        
        getRankTitle() {
            if(this.user.xp >= 3000) return 'Plant Chief Engineer';
            if(this.user.xp >= 1500) return 'Systems Specialist';
            if(this.user.xp >= 500) return 'Field Operator';
            return 'Apprentice Technician';
        },
        
        startReadingNote() {
            this.noteTimer = 0;
            clearInterval(this.timerInterval);
            this.timerInterval = setInterval(() => { this.noteTimer++; }, 1000);
        },

        claimNoteXP() {
            if (this.noteTimer >= 90) {
                this.awardXp(15, 'READ_NOTE_COMPLETE');
                clearInterval(this.timerInterval);
            } else {
                alert(`⚠️ Sistem: Masa penelaahan belum mencukupi. Sila baca nota sepenuhnya. (${this.noteTimer}/90 saat)`);
            }
        }
    }));
});
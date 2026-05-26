// ====== GESTION DE L'AFFICHAGE DES JOURS ======
function toggleDay(header) {
    const card = header.parentElement;
    
    // Ferme les autres jours pour un effet accordéon propre
    document.querySelectorAll('.day-card').forEach(c => {
        if (c !== card) c.classList.remove('active');
    });

    // Alterne l'état du jour cliqué
    card.classList.toggle('active');
}

// ====== LOGIQUE DU CHRONOMÈTRE (PLAY, PAUSE, RESET) ======
let timerDuration = 60; // 60 secondes par défaut
let timeLeft = timerDuration;
let timerId = null;
let isPaused = true;

const timeDisplay = document.getElementById('time');
const timerBtn = document.getElementById('startBtn');

// Met à jour le texte du chrono (ex: 01:00)
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Gestion du bouton Unique : Simple clic = Play / Pause
function toggleTimer() {
    if (timerId === null) {
        // Démarrer le chrono
        isPaused = false;
        timerBtn.style.background = '#e11d48'; // Devient rouge en cours de lecture
        timerBtn.innerHTML = '<i data-lucide="pause"></i>';
        lucide.createIcons();

        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                // Fin du chrono : Alerte sonore (vibration) et Reset
                clearInterval(timerId);
                timerId = null;
                timeLeft = timerDuration;
                updateDisplay();
                timerBtn.style.background = '#2563eb';
                timerBtn.innerHTML = '<i data-lucide="play"></i>';
                lucide.createIcons();
                
                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200]); // Fait vibrer le téléphone
                }
            }
        }, 1000);
    } else {
        // Mettre en pause
        clearInterval(timerId);
        timerId = null;
        isPaused = true;
        timerBtn.style.background = '#2563eb'; // Repasse au bleu
        timerBtn.innerHTML = '<i data-lucide="play"></i>';
        lucide.createIcons();
    }
}

// Fonction Reset : Déclenchée par un double-clic
function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = timerDuration;
    updateDisplay();
    timerBtn.style.background = '#2563eb';
    timerBtn.innerHTML = '<i data-lucide="play"></i>';
    lucide.createIcons();
}

// Écouteur pour le double-clic (PC) ou double-tap (Téléphone) pour RESET
timerBtn.addEventListener('dblclick', (e) => {
    e.preventDefault();
    resetTimer();
});

// ====== COMPORTEMENT DES RONDS DE SÉRIES (S1, S2...) ======
document.querySelectorAll('.series-tracker').forEach(tracker => {
    const totalSets = parseInt(tracker.getAttribute('data-sets')) || 0;
    
    // Génère dynamiquement les bulles S1, S2...
    for (let i = 1; i <= totalSets; i++) {
        const dot = document.createElement('div');
        dot.className = 'serie-dot';
        dot.textContent = `S${i}`;
        
        // Clic sur une bulle de série
        dot.addEventListener('click', (e) => {
            e.stopPropagation(); // Évite d'ouvrir/fermer la carte du jour
            
            if (!dot.classList.contains('done')) {
                dot.classList.add('done'); // Coche la série
                resetTimer();             // Remet le chrono à 01:00
                toggleTimer();            // Lance automatiquement les 60s de repos !
            } else {
                dot.classList.remove('done'); // Décoche si erreur
            }
        });
        
        tracker.appendChild(dot);
    }
});

// Initialisation des icônes Lucide au chargement
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
});
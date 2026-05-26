// Initialisation des icônes au démarrage
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Gestion de l'affichage des accordéons de jours
function toggleDay(element) {
    const content = element.nextElementSibling;
    const isExpanded = content.classList.contains('active');
    
    document.querySelectorAll('.day-content').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.day-header i').forEach(icon => {
        icon.setAttribute('data-lucide', 'chevron-down');
    });

    if (!isExpanded) {
        content.classList.add('active');
        const chevron = element.querySelector('i');
        if(chevron) chevron.setAttribute('data-lucide', 'chevron-up');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Génération dynamique des cercles de validation de séries
document.querySelectorAll('.series-tracker').forEach(tracker => {
    const totalSets = parseInt(tracker.getAttribute('data-sets'), 10);
    const exerciseId = tracker.closest('.exercise-item').getAttribute('data-id');

    for (let i = 1; i <= totalSets; i++) {
        const setBtn = document.createElement('div');
        setBtn.classList.add('set-checkbox');
        setBtn.innerText = `S${i}`;
        
        if (localStorage.getItem(`${exerciseId}-set-${i}`) === 'checked') {
            setBtn.classList.add('checked');
        }

        setBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Évite la fermeture involontaire de l'accordéon
            setBtn.classList.toggle('checked');
            
            if (setBtn.classList.contains('checked')) {
                localStorage.setItem(`${exerciseId}-set-${i}`, 'checked');
                resetAndStartTimer();
            } else {
                localStorage.removeItem(`${exerciseId}-set-${i}`);
            }
        });

        tracker.appendChild(setBtn);
    }
});

// Système de Compte à Rebours (60 secondes)
let timeLeft = 60;
let timerId = null;
const display = document.getElementById('time');
const icon = document.getElementById('timerIcon');

function updateDisplay() {
    let minutes = parseInt(timeLeft / 60, 10);
    let seconds = parseInt(timeLeft % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if(display) display.textContent = minutes + ":" + seconds;
}

function toggleTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        if(icon) icon.setAttribute('data-lucide', 'play');
    } else {
        if (timeLeft === 0) timeLeft = 60;
        if(icon) icon.setAttribute('data-lucide', 'pause');
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
                timeLeft = 60;
                if(icon) icon.setAttribute('data-lucide', 'play');
                if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 1000);
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function resetAndStartTimer() {
    clearInterval(timerId);
    timeLeft = 60;
    updateDisplay();
    timerId = null;
    toggleTimer();
}
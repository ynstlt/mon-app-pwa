// Initialise les icônes Lucide au démarrage
lucide.createIcons();

// Génération dynamique des ronds de séries (S1, S2, S3...)
document.querySelectorAll('.series-tracker').forEach(tracker => {
    const totalSets = parseInt(tracker.getAttribute('data-sets'), 10);
    const exerciseId = tracker.closest('.exercise-item').getAttribute('data-id');

    for (let i = 1; i <= totalSets; i++) {
        const setBtn = document.createElement('div');
        setBtn.classList.add('set-checkbox');
        setBtn.innerText = `S${i}`;
        
        // Vérification de l'état sauvegardé dans le téléphone
        if (localStorage.getItem(`${exerciseId}-set-${i}`) === 'checked') {
            setBtn.classList.add('checked');
        }

        // Clic pour cocher/décocher la série en direct
        setBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Évite de fermer l'accordéon par erreur
            setBtn.classList.toggle('checked');
            
            if (setBtn.classList.contains('checked')) {
                localStorage.setItem(`${exerciseId}-set-${i}`, 'checked');
                // Optionnel : Lance automatiquement le chrono de 60s quand on coche une série !
                resetAndStartTimer();
            } else {
                localStorage.removeItem(`${exerciseId}-set-${i}`);
            }
        });

        tracker.appendChild(setBtn);
    }
});

// Gestion de l'affichage des fiches séances (accordéons)
function toggleDay(element) {
    const content = element.nextElementSibling;
    const isExpanded = content.classList.contains('active');
    
    document.querySelectorAll('.day-content').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.day-header i').forEach(icon => icon.setAttribute('data-lucide', 'chevron-down'));

    if (!isExpanded) {
        content.classList.add('active');
        element.querySelector('i').setAttribute('data-lucide', 'chevron-up');
    }
    lucide.createIcons();
}

// Script du Compteur de Temps de Repos Intégré (60 secondes)
let timeLeft = 60;
let timerId = null;
const display = document.getElementById('time');
const icon = document.getElementById('timerIcon');

function updateDisplay() {
    let minutes = parseInt(timeLeft / 60, 10);
    let seconds = parseInt(timeLeft % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
}

function toggleTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        icon.setAttribute('data-lucide', 'play');
    } else {
        if (timeLeft === 0) timeLeft = 60;
        icon.setAttribute('data-lucide', 'pause');
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerId = null;
                timeLeft = 60;
                icon.setAttribute('data-lucide', 'play');
                if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            }
            lucide.createIcons();
        }, 1000);
    }
    lucide.createIcons();
}

// Relance le chrono automatiquement à 60s dès qu'une série est validée
function resetAndStartTimer() {
    clearInterval(timerId);
    timeLeft = 60;
    updateDisplay();
    timerId = null;
    toggleTimer();
}
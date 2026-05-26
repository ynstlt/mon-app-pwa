// Initialise les icônes Lucide au démarrage
lucide.createIcons();

// Gestion de l'affichage des fiches séances (accordéons)
function toggleDay(element) {
    const content = element.nextElementSibling;
    const isExpanded = content.classList.contains('active');
    
    // Ferme tous les autres onglets ouverts pour faire propre
    document.querySelectorAll('.day-content').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.day-header i').forEach(icon => icon.setAttribute('data-lucide', 'chevron-down'));

    if (!isExpanded) {
        content.classList.add('active');
        element.querySelector('i').setAttribute('data-lucide', 'chevron-up');
    }
    
    // Met à jour les icônes après le changement
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
        // Mode Pause
        clearInterval(timerId);
        timerId = null;
        icon.setAttribute('data-lucide', 'play');
    } else {
        // Mode Lancement
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
                
                // Vibration sur smartphone si supportée
                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200]);
                }
            }
            lucide.createIcons();
        }, 1000);
    }
    lucide.createIcons();
}

// Permet d'ouvrir et fermer les jours d'entraînement
function toggleDay(element) {
    const content = element.nextElementSibling;
    content.classList.toggle('active');
}

// Vérifie si le Service Worker est supporté pour la PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker non enregistré:', err);
        });
    });
}
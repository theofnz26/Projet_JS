// Structure du projet validée : index.html, main.js, style.css

function createAndStyleElement(tag, className, content = '') {
    const element = document.createElement(tag); // Crée l'élément HTML
    if (className) element.className = className; // Ajoute la classe CSS si elle existe
    if (content) element.innerHTML = content; // Ajoute le texte ou HTML interne
    return element; // Renvoie l'élément prêt à l'emploi
}

function setupCounter(element) {
    let counter = 0; // Initialise le score à zéro
    const setCounter = (count) => { // Fonction qui met à jour l'affichage
      counter = count; // Stocke la nouvelle valeur
      element.innerHTML = `<button>${counter}</button>`; // Injecte le bouton avec le chiffre
    };
    element.addEventListener('click', () => setCounter(counter + 1)); // Écoute le clic pour incrémenter
    setCounter(0); // Affiche 0 au démarrage
}

function createPage() {
    const app = document.getElementById('app'); // Cible la div racine de l'app

    const nav = createAndStyleElement('nav'); // Crée la barre de navigation
    const homeButton = createAndStyleElement('a', '', 'Accueil'); // Bouton accueil
    const aboutButton = createAndStyleElement('a', '', 'A propos'); // Bouton à propos
    const fetchDataButton = createAndStyleElement('a', '', 'Fetch'); // Bouton pour l'API
    
    // MODIFICATION ICI : On prépare le bouton du menu déroulant
    const dropdownBtn = createAndStyleElement('a', 'drop-trigger', 'Réseaux ▼'); // Bouton avec une flèche
    
    nav.appendChild(homeButton); // Ajoute accueil à la nav
    nav.appendChild(aboutButton); // Ajoute à propos à la nav
    nav.appendChild(fetchDataButton); // Ajoute fetch à la nav
    nav.appendChild(dropdownBtn); // Ajoute le déclencheur du menu à la nav

    // MODIFICATION ICI : Le menu déroulant (caché par défaut en CSS)
    const subMenu = createAndStyleElement('div', 'sub-menu', `
      <a href="https://twitter.com" target="_blank">Twitter</a>
      <a href="https://facebook.com" target="_blank">Facebook</a>
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>
    `); // Crée la boîte contenant les liens sociaux
    nav.appendChild(subMenu); // Attache le menu à la navigation

    const mainContent = createAndStyleElement('div', 'main-content'); // Zone de contenu principal
    const homeSection = createAndStyleElement('div', 'section active', `
      <h2>Bienvenue sur JavaScript DOM !</h2>
      <p>Cliquez sur le bouton pour augmenter le compteur :</p>
      <div id="counter" class="counter"></div>
    `); // Section de bienvenue
    const aboutSection = createAndStyleElement('div', 'section', 'Cette page a entièrement été créée avec JavaScript'); // Section texte
    const dataSection = createAndStyleElement('div', 'section data-container', ''); // Section pour les données API

    mainContent.appendChild(homeSection); // Ajoute bienvenue au contenu
    mainContent.appendChild(aboutSection); // Ajoute à propos au contenu
    mainContent.appendChild(dataSection); // Ajoute zone data au contenu

    const footer = createAndStyleElement('footer', '', `
      <p>&copy; 2024 JavaScript DOM. Tous droits réservés.</p>
    `); // Bas de page simple

    app.appendChild(nav); // Affiche la nav dans l'app
    app.appendChild(mainContent); // Affiche le contenu dans l'app
    app.appendChild(footer); // Affiche le footer dans l'app

    // GESTION DES CLICS
    homeButton.addEventListener('click', () => {
        showSection(homeSection); // Affiche accueil
        closeSubMenu(); // Ferme le menu si ouvert
    });
    aboutButton.addEventListener('click', () => {
        showSection(aboutSection); // Affiche à propos
        closeSubMenu(); // Ferme le menu si ouvert
    });
    fetchDataButton.addEventListener('click', () => {
        showSection(dataSection); // Affiche section data
        fetchData(); // Lance l'appel API
        closeSubMenu(); // Ferme le menu si ouvert
    });

    // MODIFICATION ICI : Logique d'ouverture du menu
    dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêche le clic de se propager au document
        subMenu.classList.toggle('active'); // Ajoute ou retire la classe "active" (affiche/cache)
    });

    // Fermeture si on clique n'importe où ailleurs sur la page
    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target)) { // Si le clic est hors de la navigation
            subMenu.classList.remove('active'); // On retire la classe active
        }
    });

    const counterElement = document.getElementById('counter'); // Cible la div du compteur
    setupCounter(counterElement); // Initialise la logique du compteur
}

function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active')); // Cache toutes les sections
    section.classList.add('active'); // Affiche uniquement la section choisie
}

function closeSubMenu() {
    const subMenu = document.querySelector('.sub-menu'); // Cible le menu
    if (subMenu) subMenu.classList.remove('active'); // Retire la classe active s'il existe
}

async function fetchData() {
    const dataContainer = document.querySelector('.data-container'); // Zone d'affichage
    dataContainer.innerHTML = ''; // Vide le contenu précédent

    const loadingElement = createAndStyleElement('div', 'loading', 'Loading...'); // Message de chargement
    dataContainer.appendChild(loadingElement); // Affiche le chargement

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Appelle l'API
        const data = await response.json(); // Convertit la réponse en JSON

        setTimeout(() => { // Simule un délai pour le plaisir visuel
            if(dataContainer.contains(loadingElement)) dataContainer.removeChild(loadingElement); // Enlève le chargement

            data.slice(0, 5).forEach(item => { // Prend les 5 premiers éléments
                const dataTitle = createAndStyleElement('h2', '', item.title); // Titre de l'article
                const dataBody = createAndStyleElement('p', '', item.body); // Corps de l'article
                dataContainer.appendChild(dataTitle); // Ajoute le titre
                dataContainer.appendChild(dataBody); // Ajoute le corps
            });
        }, 1000); // Délai de 1 seconde
    } catch (error) {
        dataContainer.innerHTML = 'Failed to fetch data'; // Affiche une erreur si ça rate
    }
}

createPage(); // Lance la création de la page au chargement du script
// Structure du projet validée : index.html, main.js, style.css                          // Commentaire de base

function createAndStyleElement(tag, className, content = '') {                          // Fonction utilitaire pour créer une balise HTML
    const element = document.createElement(tag);                                        // Création en mémoire de la balise
    if (className) element.className = className;                                       // Application de la classe CSS
    if (content) element.innerHTML = content;                                           // Injection du contenu
    return element;                                                                     // Renvoi de l'élément prêt
}

function setupCounter(element) {                                                        // Logique du compteur de clics
    let counter = 0;                                                                    // Initialisation à zéro
    const setCounter = (count) => {                                                     // Fonction de mise à jour
      counter = count;                                                                  // Stockage
      element.innerHTML = `<button>${counter}</button>`;                                // Affichage du bouton
    };                                                                                  // Fin de fonction
    element.addEventListener('click', () => setCounter(counter + 1));                   // Action au clic
    setCounter(0);                                                                      // Premier affichage
}

function createPostElement(title, body) {                                               // Fonction de création d'un article
    const article = createAndStyleElement('article', 'post-item');                      // Création de la boîte
    article.innerHTML = `<h4>${title}</h4><p>${body}</p>`;                              // Remplissage
    return article;                                                                     // Renvoi de l'article
}

function createPage() {                                                                 // Fonction principale de génération du site
    const app = document.getElementById('app');                                         // Ciblage de la zone racine

    const nav = createAndStyleElement('nav');                                           // Création de la barre de navigation
    const homeButton = createAndStyleElement('a', '', 'Accueil');                       // Bouton Accueil
    const aboutButton = createAndStyleElement('a', '', 'A propos');                     // Bouton À propos
    const fetchDataButton = createAndStyleElement('a', '', 'Feed');                     // Bouton Feed
    const galleryButton = createAndStyleElement('a', '', 'Galerie');                    // Bouton pour la galerie d'images
    const networksButton = createAndStyleElement('a', 'drop-trigger', 'Réseaux ▼');     // Bouton menu déroulant
    
    nav.appendChild(homeButton);                                                        // Ajout à la barre
    nav.appendChild(aboutButton);                                                       // Ajout à la barre
    nav.appendChild(fetchDataButton);                                                   // Ajout à la barre
    nav.appendChild(galleryButton);                                                     // Ajout de la galerie à la barre
    nav.appendChild(networksButton);                                                    // Ajout à la barre

    const subMenu = createAndStyleElement('div', 'sub-menu', `                          
      <a href="https://twitter.com" target="_blank">Twitter</a>                        
      <a href="https://facebook.com" target="_blank">Facebook</a>                       
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>                      
    `);                                                                                 // Menu caché
    nav.appendChild(subMenu);                                                           // Attachement du menu

    const mainContent = createAndStyleElement('div', 'main-content');                   // Création de la zone de contenu
    const homeSection = createAndStyleElement('div', 'section active', `                
      <h2>Bienvenue sur JavaScript DOM !</h2>                                           
      <div id="counter" class="counter"></div>                                          
    `);                                                                                 // Section Accueil
    const aboutSection = createAndStyleElement('div', 'section', 'Créé avec JS');       // Section À propos
    const feedSection = createAndStyleElement('div', 'section feed-container', '');     // Section Feed
    
    // --- SECTION : LA GALERIE ---
    const gallerySection = createAndStyleElement('div', 'section gallery-section', `    
      <h2>Galerie d'images</h2>                                                         
    `);                                                                                 // Création de la page Galerie

    // NOUVEAU : Le formulaire d'ajout d'image locale
    const addImageForm = createAndStyleElement('form', 'add-image-form', `              
      <h3>Ajouter une nouvelle image</h3>                                               
      <input type="file" id="image-upload" accept="image/png, image/jpeg, image/webp" required> 
      <button type="submit">Ajouter à la galerie</button>                               
    `);                                                                                 // Formulaire avec champ fichier restreint aux formats d'images
    
    const galleryControls = createAndStyleElement('div', 'gallery-controls', `          
      <button id="btn-mosaic" class="active">Mosaïque</button>                          
      <button id="btn-column">Colonne</button>                                          
    `);                                                                                 // Création des deux boutons d'affichage
    
    const galleryContainer = createAndStyleElement('div', 'gallery-container view-mosaic', ''); // Conteneur des images
    
    const mesImages = ['img/BLMM.webp', 'img/DOOD.webp', 'img/BPRO-Display-01-US.webp', 'img/DUAD-Display.webp', 'img/JUSH-Display.webp', 'img/display1.webp'];  // Tes images locales
    
    mesImages.forEach(src => {                                                          // Boucle sur chaque lien
        const img = createAndStyleElement('img', 'gallery-item');                       // Crée la balise img
        img.src = src;                                                                  // Assigne la source
        img.alt = "Image de la galerie";                                                // Accessibilité
        galleryContainer.appendChild(img);                                              // Place dans le conteneur
    });                                                                                 // Fin boucle

    gallerySection.appendChild(addImageForm);                                           // NOUVEAU : Ajout du formulaire en haut de la galerie
    gallerySection.appendChild(galleryControls);                                        // Ajout boutons
    gallerySection.appendChild(galleryContainer);                                       // Ajout conteneur images
    // --------------------------------------

    const postForm = createAndStyleElement('form', 'post-form', `                       
        <h3>Ajouter un post</h3>                                                        
        <input type="text" id="post-title" placeholder="Titre" required>                
        <textarea id="post-body" placeholder="Votre message..." required></textarea>    
        <button type="submit">Publier</button>                                          
    `);                                                                                 // Formulaire du feed
    const postsList = createAndStyleElement('div', 'posts-list', '');                   // Liste du feed

    feedSection.appendChild(postForm);                                                  // Assemblage feed
    feedSection.appendChild(postsList);                                                 // Assemblage feed

    mainContent.appendChild(homeSection);                                               // Injection Accueil
    mainContent.appendChild(aboutSection);                                              // Injection À propos
    mainContent.appendChild(feedSection);                                               // Injection Feed
    mainContent.appendChild(gallerySection);                                            // Injection Galerie

    const footer = createAndStyleElement('footer', '', `<p>&copy; 2026 JavaScript DOM !</p>`);       // Footer

    app.appendChild(nav);                                                               // Affichage Nav
    app.appendChild(mainContent);                                                       // Affichage Contenu
    app.appendChild(footer);                                                            // Affichage Footer

    // --- ÉVÉNEMENTS DE NAVIGATION ---
    homeButton.addEventListener('click', () => { showSection(homeSection); closeSubMenu(); });    // Clic Accueil
    aboutButton.addEventListener('click', () => { showSection(aboutSection); closeSubMenu(); });  // Clic À propos
    fetchDataButton.addEventListener('click', () => {                                             // Clic Feed
        showSection(feedSection);                                                                 // Affiche Feed
        if (postsList.innerHTML === '') fetchData(postsList);                                     // Charge API
        closeSubMenu();                                                                           // Ferme menu
    });
    
    galleryButton.addEventListener('click', () => {                                               // Clic Galerie
        showSection(gallerySection);                                                              // Affiche section galerie
        closeSubMenu();                                                                           // Ferme menu
    });                                                                                           // Fin clic galerie

    // --- LOGIQUE DES BOUTONS DE LA GALERIE ---
    const btnMosaic = document.getElementById('btn-mosaic');                                      // Récupère bouton Mosaïque
    const btnColumn = document.getElementById('btn-column');                                      // Récupère bouton Colonne

    btnMosaic.addEventListener('click', () => {                                                   // Clic Mosaïque
        galleryContainer.className = 'gallery-container view-mosaic';                             // Force classe mosaïque
        btnMosaic.classList.add('active');                                                        // Allume bouton
        btnColumn.classList.remove('active');                                                     // Éteint autre bouton
    });                                                                                           // Fin clic

    btnColumn.addEventListener('click', () => {                                                   // Clic Colonne
        galleryContainer.className = 'gallery-container view-column';                             // Force classe colonne
        btnColumn.classList.add('active');                                                        // Allume bouton
        btnMosaic.classList.remove('active');                                                     // Éteint autre bouton
    });                                                                                           // Fin clic

    // --- NOUVEAU : LOGIQUE D'AJOUT D'IMAGE ---
    addImageForm.addEventListener('submit', (e) => {                                              // Écoute validation du formulaire
        e.preventDefault();                                                                       // Bloque rechargement page
        const fileInput = document.getElementById('image-upload');                                // Cible le champ fichier
        const file = fileInput.files[0];                                                          // Récupère le premier fichier choisi
        
        if (file) {                                                                               // Si fichier présent
            const imgUrl = URL.createObjectURL(file);                                             // Magie : crée l'URL locale temporaire
            const newImg = createAndStyleElement('img', 'gallery-item');                          // Crée balise img
            newImg.src = imgUrl;                                                                  // Assigne l'URL
            newImg.alt = "Nouvelle image utilisateur";                                            // Texte alternatif
            galleryContainer.appendChild(newImg);                                                 // Ajoute l'image dans la galerie
            addImageForm.reset();                                                                 // Vide le formulaire
        }                                                                                         // Fin condition
    });                                                                                           // Fin ajout image

    // --- LOGIQUE DU FEED ---
    postForm.addEventListener('submit', (e) => {                                        // Envoi formulaire feed
        e.preventDefault();                                                             // Bloque rechargement
        const title = document.getElementById('post-title').value;                      // Lit titre
        const body = document.getElementById('post-body').value;                        // Lit message
        postsList.prepend(createPostElement(title, body));                              // Ajoute en haut
        postForm.reset();                                                               // Vide champs
    });                                                                                 // Fin formulaire

    networksButton.addEventListener('click', (event) => {                               // Clic Réseaux
        event.stopPropagation();                                                        // Bloque clic global
        subMenu.classList.toggle('active');                                             // Ouvre/ferme menu
    });                                                                                 // Fin Réseaux

    document.addEventListener('click', (event) => {                                     // Clic global
        if (!nav.contains(event.target)) closeSubMenu();                                // Ferme menu
    });                                                                                 // Fin clic global

    setupCounter(document.getElementById('counter'));                                   // Init compteur
}

function showSection(section) {                                                         // Fonction changement de page
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active')); // Cache tout
    section.classList.add('active');                                                    // Affiche la bonne
}

function closeSubMenu() {                                                               // Utilitaire fermeture menu
    const subMenu = document.querySelector('.sub-menu');                                // Trouve menu
    if (subMenu) subMenu.classList.remove('active');                                    // Cache menu
}

async function fetchData(container) {                                                   // Appel API
    const loading = createAndStyleElement('div', 'loading', 'Chargement...');           // Texte attente
    container.appendChild(loading);                                                     // Affiche attente
    try {                                                                               // Essai réseau
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');          // Requête
        const data = await res.json();                                                  // Formatage
        container.removeChild(loading);                                                 // Fin attente
        data.slice(0, 5).forEach(item => {                                              // Boucle 5 items
            container.appendChild(createPostElement(item.title, item.body));            // Création graphique
        });                                                                             // Fin boucle
    } catch (err) { container.innerHTML = 'Erreur API'; }                               // Gestion erreur
}

createPage();                                                                           // Démarrage du script
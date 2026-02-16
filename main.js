// Structure du projet validée : index.html, main.js, style.css                          // Commentaire de base

function createAndStyleElement(tag, className, content = '') {                          // Déclare une fonction utilitaire pour générer de l'HTML
    const element = document.createElement(tag);                                        // Demande au navigateur de créer la balise spécifiée (div, a, form...)
    if (className) element.className = className;                                       // Si une classe CSS est fournie en argument, on l'applique
    if (content) element.innerHTML = content;                                           // Si du texte/HTML est fourni, on l'injecte dans la balise
    return element;                                                                     // Renvoie l'élément fini pour l'utiliser ailleurs
}

function setupCounter(element) {                                                        // Déclare la logique d'un compteur interactif
    let counter = 0;                                                                    // Initialise la valeur du compteur à zéro en mémoire
    const setCounter = (count) => {                                                     // Crée une petite fonction interne pour modifier l'affichage
      counter = count;                                                                  // Sauvegarde la nouvelle valeur dans la mémoire
      element.innerHTML = `<button>${counter}</button>`;                                // Injecte un bouton cliquable avec le nombre actuel dedans
    };                                                                                  // Fin de la fonction d'affichage
    element.addEventListener('click', () => setCounter(counter + 1));                   // Écoute les clics : à chaque clic, relance l'affichage avec +1
    setCounter(0);                                                                      // Appelle la fonction immédiatement pour afficher "0" au départ
}

function createPostElement(title, body) {                                               // Nouvelle fonction dédiée à la création graphique d'un article
    const article = createAndStyleElement('article', 'post-item');                      // Crée la boîte globale de l'article avec la balise <article>
    article.innerHTML = `<h4>${title}</h4><p>${body}</p>`;                              // Rempli la boîte avec un titre de niveau 4 et un paragraphe
    return article;                                                                     // Renvoie l'article prêt à être affiché
}

function createPage() {                                                                 // Fonction maîtresse qui construit toute l'application DOM
    const app = document.getElementById('app');                                         // Récupère la balise <div id="app"> vide de ton fichier HTML

    const nav = createAndStyleElement('nav');                                           // Fabrique la barre de navigation globale
    const homeButton = createAndStyleElement('a', '', 'Accueil');                       // Fabrique l'onglet "Accueil"
    const aboutButton = createAndStyleElement('a', '', 'A propos');                     // Fabrique l'onglet "À propos"
    const fetchDataButton = createAndStyleElement('a', '', 'Feed');                     // Fabrique l'onglet "Feed" (pour voir le fil d'actualité)
    const networksButton = createAndStyleElement('a', 'drop-trigger', 'Réseaux ▼');     // Fabrique le bouton "Réseaux" qui ouvrira le menu déroulant
    
    nav.appendChild(homeButton);                                                        // Place l'onglet Accueil dans la barre
    nav.appendChild(aboutButton);                                                       // Place l'onglet À propos dans la barre
    nav.appendChild(fetchDataButton);                                                   // Place l'onglet Feed dans la barre
    nav.appendChild(networksButton);                                                    // Place le bouton Réseaux dans la barre

    const subMenu = createAndStyleElement('div', 'sub-menu', `                          
      <a href="https://twitter.com" target="_blank">Twitter</a>                        
      <a href="https://facebook.com" target="_blank">Facebook</a>                       
      <a href="https://linkedin.com" target="_blank">LinkedIn</a>                      
    `);                                                                                 // Fabrique la boîte du menu déroulant et ses trois liens
    nav.appendChild(subMenu);                                                           // Attache le menu caché à la barre de navigation

    const mainContent = createAndStyleElement('div', 'main-content');                   // Fabrique le grand conteneur central (sous la nav)
    const homeSection = createAndStyleElement('div', 'section active', `                
      <h2>Bienvenue sur JavaScript DOM !</h2>                                           
      <p>Cliquez sur le bouton pour augmenter le compteur :</p>                         
      <div id="counter" class="counter"></div>                                          
    `);                                                                                 // Fabrique la page Accueil. "active" signifie qu'elle est visible tout de suite
    const aboutSection = createAndStyleElement('div', 'section', 'Créé avec JS');       // Fabrique la page À propos (cachée par défaut)
    
    const feedSection = createAndStyleElement('div', 'section feed-container', '');     // Fabrique la page Feed vide pour l'instant (cachée par défaut)
    
    const postForm = createAndStyleElement('form', 'post-form', `                       
        <h3>Ajouter un post</h3>                                                        
        <input type="text" id="post-title" placeholder="Titre" required>                
        <textarea id="post-body" placeholder="Votre message..." required></textarea>    
        <button type="submit">Publier</button>                                          
    `);                                                                                 // Fabrique le formulaire de création avec ses champs obligatoires (required)
    
    const postsList = createAndStyleElement('div', 'posts-list', '');                   // Fabrique une boîte vide qui servira à lister tous les articles

    feedSection.appendChild(postForm);                                                  // Place le formulaire en haut de la page Feed
    feedSection.appendChild(postsList);                                                 // Place la liste des articles juste sous le formulaire

    mainContent.appendChild(homeSection);                                               // Insère la page Accueil dans le centre de l'écran
    mainContent.appendChild(aboutSection);                                              // Insère la page À propos dans le centre de l'écran
    mainContent.appendChild(feedSection);                                               // Insère la page Feed dans le centre de l'écran

    const footer = createAndStyleElement('footer', '', `                                
      <p>&copy; 2024 JavaScript DOM. Tous droits réservés.</p>                          
    `);                                                                                 // Fabrique le pied de page (footer)

    app.appendChild(nav);                                                               // Injection finale : affiche la navigation en haut
    app.appendChild(mainContent);                                                       // Injection finale : affiche le contenu au milieu
    app.appendChild(footer);                                                            // Injection finale : affiche le footer en bas

    // --- LOGIQUE DES BOUTONS DE NAVIGATION ---
    homeButton.addEventListener('click', () => {                                        // Si l'utilisateur clique sur Accueil
        showSection(homeSection);                                                       // On lance la fonction pour afficher la bonne page
        closeSubMenu();                                                                 // On force la fermeture du menu Réseaux s'il était ouvert
    });                                                                                 // Fin logique Accueil
    
    aboutButton.addEventListener('click', () => {                                       // Si l'utilisateur clique sur À propos
        showSection(aboutSection);                                                      // On affiche la bonne page
        closeSubMenu();                                                                 // On force la fermeture du menu
    });                                                                                 // Fin logique À propos
    
    fetchDataButton.addEventListener('click', () => {                                   // Si l'utilisateur clique sur Feed
        showSection(feedSection);                                                       // On affiche la page du Feed
        if (postsList.innerHTML === '') fetchData(postsList);                           // Si la liste est vide, on va télécharger les données depuis Internet
        closeSubMenu();                                                                 // On force la fermeture du menu
    });                                                                                 // Fin logique Feed

    // --- LOGIQUE DU NOUVEAU FORMULAIRE ---
    postForm.addEventListener('submit', (e) => {                                        // Si l'utilisateur clique sur le bouton "Publier" du formulaire
        e.preventDefault();                                                             // Coupe le comportement naturel (qui rechargerait toute la page web bêtement)
        const title = document.getElementById('post-title').value;                      // Va lire ce que l'utilisateur a tapé dans la case "Titre"
        const body = document.getElementById('post-body').value;                        // Va lire ce que l'utilisateur a tapé dans la grande zone de texte
        
        const newPost = createPostElement(title, body);                                 // Fabrique graphiquement l'article avec nos variables
        postsList.prepend(newPost);                                                     // "Prepend" permet d'insérer l'article TOUT EN HAUT de la liste (contraire d'append)
        
        postForm.reset();                                                               // Nettoie le formulaire (vide les cases) pour écrire un autre post
    });                                                                                 // Fin logique Formulaire

    // --- LOGIQUE DU MENU DÉROULANT ---
    networksButton.addEventListener('click', (event) => {                               // Si l'utilisateur clique sur le bouton Réseaux
        event.stopPropagation();                                                        // Empêche ce clic d'activer d'autres éléments derrière lui
        subMenu.classList.toggle('active');                                             // Bascule : ajoute la classe active si elle n'y est pas, l'enlève si elle y est
    });                                                                                 // Fin logique bouton Réseaux

    document.addEventListener('click', (event) => {                                     // Écoute TOUS les clics partout sur la page
        if (!nav.contains(event.target)) {                                              // Si on a cliqué sur quelque chose qui n'est PAS dans la barre de navigation
            closeSubMenu();                                                             // Alors on cache le menu
        }                                                                               // Fin de la condition
    });                                                                                 // Fin de l'écouteur global

    const counterElement = document.getElementById('counter');                          // Trouve la boîte du compteur générée plus haut
    setupCounter(counterElement);                                                       // Active la fonctionnalité sur cette boîte
}

function showSection(section) {                                                         // Fonction utilitaire pour naviguer
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active')); // Parcours toutes les pages et leur enlève le droit d'être visibles
    section.classList.add('active');                                                    // Donne le droit d'être visible uniquement à la page demandée
}

function closeSubMenu() {                                                               // Fonction utilitaire pour cacher le menu
    const subMenu = document.querySelector('.sub-menu');                                // Cherche le menu dans la page
    if (subMenu) subMenu.classList.remove('active');                                    // S'il existe, on le cache en retirant "active"
}

async function fetchData(container) {                                                   // Fonction pour dialoguer avec un serveur distant
    const loading = createAndStyleElement('div', 'loading', 'Chargement...');           // Crée un texte pour rassurer l'utilisateur
    container.appendChild(loading);                                                     // Affiche le texte de chargement

    try {                                                                               // "try" permet d'essayer du code qui peut échouer (ex: coupure internet)
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');          // Envoie la requête et "await" bloque le script jusqu'à recevoir une réponse
        const data = await res.json();                                                  // "await" bloque encore pour transformer le texte brut en données lisibles
        
        container.removeChild(loading);                                                 // Internet a répondu, on enlève le texte "Chargement..."
        
        data.slice(0, 5).forEach(item => {                                              // On coupe la liste pour ne garder que les 5 premiers résultats
            const newPost = createPostElement(item.title, item.body);                   // On crée un article visuel avec les données reçues
            container.appendChild(newPost);                                             // On l'ajoute à la fin de la liste existante
        });                                                                             // Fin de la boucle
    } catch (err) {                                                                     // Si une erreur réseau se produit
        container.innerHTML = 'Erreur lors de la récupération des données.';            // On remplace la liste par un message d'erreur clair
    }                                                                                   // Fin du bloc d'essai
}

createPage();                                                                           // Point d'entrée : lance toute la machine au démarrage du script
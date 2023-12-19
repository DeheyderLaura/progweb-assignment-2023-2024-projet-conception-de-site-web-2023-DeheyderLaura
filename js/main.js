/**
 * Represents le nom du joueur
 * @type {string}
 * Represents le prenom du joueur
 * @type {string}
 * Represents le niveau actuel du joueur
 * @type {number}
 * Represents le score actuel du joueur
 * @type {number}
 */
let playerName, playerSurname, currentLevel, currentPoints;
/**
 * Represents les cartes du jeu
 * @type {object[]}
 */
let cards = [];
/**
 * Represents les cartes retournées
 * @type {number[]}
 */
let flippedCards = [];
/**
 * Represents les cartes matchées.
 * @type {number[]}
 */
let matchedCards = [];
/**
 * Represents le jeu
 * @type {boolean}
 */
let isFlipping = false;
/**
 * Initialise le jeu et affiche le formulaire.
 */
function startGame() 
{ 
    /**
     * Initialise le nom du joueur
     * @type {string}
     * Initialise le prenom du joueur
     * @type {string}
     * Initialise le niveau actuel du joueur
     * @type {number}
     * Initialise le score actuel du joueur
     * @type {number}
     */
    playerName = document.getElementById('name').value;
    playerSurname = document.getElementById('surname').value;
    currentLevel = parseInt(document.getElementById('level').value);
    currentPoints = 0;
    
    /**
     * Masque l’élément de formulaire de début.
     */
    document.getElementById('start-form').style.display = 'none';
 
    /**
     * Genère les cartes pour le jeu.
     * Affiche les informations du niveau actuel.
     * initialise le plateau de jeu.
     */
    generateCards();
    displayLevel();
    renderGameBoard();
}
/**
 * Génère les cartes pour le jeu en fonction du niveau actuel.
 */
function generateCards() 
{
    /**
     * Renitialise les cartes.
     * Ajuste le niveau actuel s'il est 1 ou 0 et le double.
     */
    
    cards = [];
    currentLevel = currentLevel === 1 || currentLevel === 0  ? currentLevel * 2 : currentLevel;
    /**
     * Crée des paires de cartes pour le jeu.
     */
    for (let i = 1; i <= currentLevel; i++) {
        cards.push({ value: i, isFlipped: false });
        cards.push({ value: i, isFlipped: false });
    }
    /**
     * Mélange le tableau de cartes.
     */
    shuffle(cards);
}
/**
 * Mélange les éléments d'un tableau.
 * @param {array} array Le tableau à mélanger.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
/**
 * Rend le plateau de jeu en fonction de l'état actuel des cartes.
 */
function renderGameBoard() {
    /**
     * Obtient l'élément du plateau de jeu.
     */
    const gameBoard = document.getElementById('game-board');
    /**
     * Efface le contenu du plateau de jeu.
     */
    gameBoard.innerHTML = '';
    /**
     * Parcourt chaque carte et crée un élément HTML correspondant.
     */
    cards.forEach((card, index) => {
        /**
         * Crée un élément div pour la carte.
         * @type{HTMLDivElement}
         * Ajoute des classes à l'élément de carte en fonction de son état.
         */
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', card.isFlipped ? 'hidden' : 'visible');
        cardElement.classList.add('background');
        /**
         *  Définit le contenu textuel de l'élément de carte en fonction de son état.
         * Ajoute un gestionnaire d'événement pour cliquer sur la carte.
         * Ajoute l'élément de carte au plateau de jeu.
         */
        cardElement.textContent = card.isFlipped ? card.value : '';
        cardElement.addEventListener('click', () => flipCard(index));
        gameBoard.appendChild(cardElement);
    });
}
/**
 * Gère la logique lorsqu'une carte est retournée.
 * @param {number} index L'index de la carte retournée dans le tableau des cartes.
 * @returns 
 */
function flipCard(index){
    /**
     * Vérifie si une carte est en train de se retourner ou si le nombre maximum de cartes retournées est atteint.
     */
    if (isFlipping || flippedCards.length >= 2 || cards[index].isFlipped) {
        return;
    }
/**
 * Définit la propriété isFlipped de la carte sur true.
 * Ajoute l'index de la carte retournée au tableau flippedCards
 * Affiche le plateau de jeu mis à jour.
 */
    cards[index].isFlipped = true;
    flippedCards.push(index);
    renderGameBoard();

 /**
 * Si le tableau flippedCards contient 2 cartes, appelle la fonction checkMatch.
 */
    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkMatch, 1000);
    }
}
/**
 * Gère la logique lorsqu'une carte est retournee.
 */
function checkMatch() {
    /**
     * Vérifie si une  carte est en train de se retourner ou si le nombre maximum de cartes retournées est atteint.
     * @type{number}
     */
    const [index1, index2] = flippedCards;
    /**
     * Si les deux cartes sont identiques, met la propriété isFlipped sur false pour les deux cartes
     */
    if (cards[index1].value === cards[index2].value) {
        /**
         * Ajoute l'index de la carte retournée au tableau matchedCards
         * Augmente le score du joueur
         * Affiche le plateau de jeu mis à jour
         */
        matchedCards.push(index1, index2);
        currentPoints += 10;
        if(matchedCards.length === cards.length){
            if (currentLevel >=  10) {
                showCongratulations();
            } else{
                nextLevel();
            }
        }
    } else {
        /**
         * Si les deux cartes ne sont pas identiques, met la propriété isFlipped sur false pour les deux cartes
         */
        cards[index1].isFlipped = false;
        cards[index2].isFlipped = false;
    }
    /**
     * Réinitialise le tableau flippedCards et l’indicateur isFlipping.
     */
    flippedCards = [];
    isFlipping = false;
    /**
     * Affiche le plateau de jeu mis à jour
     */
    renderGameBoard();
}
/**
 * Fait passer le jeu au niveau suivant.
 */
function nextLevel() {
    /**
     * Augmente le niveau
     * Génère les cartes
     * Affiche les informations du niveau mises à jour
     * Affiche le plateau de jeu
     * Reinitialise le tableau matchedCards
     */
    currentLevel++;
    generateCards();
    displayLevel();
    renderGameBoard();
    matchedCards = [];
}
/**
 *  Affiche le nom, le prénom, le niveau actuel et les points du joueur.
 */
function displayLevel() {
    /**
     * Obtient l'élément d'affichage de niveau.
     * Définit le contenu textuel de l'élément d'affichage de niveau.
     */
    document.getElementById('level-display').textContent = `Joueur: ${playerName} ${playerSurname} - Niveau ${currentLevel} - Points: ${currentPoints}`;
}
/**
 * Affiche un message de félicitations stylisé et recharge la page.
 */
function showCongratulations() {
    /**
     * Crée un élément div pour le message de félicitations.
     * @type {HTMLDivElement}
     */
    const congratulationDiv = document.createElement('div');

    /**
     * Ajoute une classe au div de félicitations pour le style.
     */
    congratulationDiv.classList.add('congratulations-message');

    /**
     * Définit le contenu HTML du div de félicitations avec un message stylisé.
     */
    congratulationDiv.innerHTML = `
        <div class="congratulations-header">Félicitations, ${playerName} ${playerSurname} !</div>
        <div class="congratulations-body">
            Tu as terminé tous les niveaux avec ${currentPoints} points.
        </div>
        <div class="congratulations-footer">Rechargez la page pour jouer à nouveau.</div>
    `;

    /**
     * Ajoute le div de félicitations au corps du document.
     */
    document.body.appendChild(congratulationDiv);
}

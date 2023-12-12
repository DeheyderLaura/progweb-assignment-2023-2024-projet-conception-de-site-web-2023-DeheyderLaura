let cards = [];
let flippedCards = [];
let matchedCards = [];
let username = '';
let currentLevel = 1;
const maxLevel = 10;

function createCards(rows, cols) {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  for (let i = 0; i < rows * cols; i++) {
    const card = document.createElement('div');
    card.className = 'card col-3 col-md-2';
    card.dataset.cardIndex = i;
    card.addEventListener('click', flipCard);
    
    const image = document.createElement('img');
    image.src = 'path_to_your_image'; // Chemin vers l'image
    card.appendChild(image);
    
    cards.push(card);
    gameBoard.appendChild(card);
  }
}

function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const index1 = card1.dataset.cardIndex;
  const index2 = card2.dataset.cardIndex;

  if (index1 !== index2 && card1.innerHTML === card2.innerHTML) {
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      setTimeout(nextLevel, 1000);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards = [];
}

function nextLevel() {
  currentLevel++;
  if (currentLevel <= maxLevel) {
    const level = calculateLevel();
    createCards(level.rows, level.cols);
  } else {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '<h2>Partie finie !</h2>';
    const nextLevelPrompt = confirm('Voulez-vous passer au niveau suivant ?');
    if (nextLevelPrompt) {
      currentLevel = 1;
      const level = calculateLevel();
      createCards(level.rows, level.cols);
    }
  }
}

function checkLevelCompletion() {
  if (matchedCards.length === cards.length) {
    setTimeout(nextLevel, 1000);
  }
}

document.getElementById('user-form').addEventListener('submit', function(event) {
  event.preventDefault();
  username = document.getElementById('username').value;
  const level = calculateLevel();
  createCards(level.rows, level.cols);
});

function calculateLevel() {
    // Définition des dimensions initiales du plateau de jeu
    let rows = 2 + Math.floor((currentLevel - 1) / 2); // Augmente d'une ligne à chaque deux niveaux
    let cols = 2 + Math.floor((currentLevel - 1) / 2); // Augmente d'une colonne à chaque deux niveaux
  
    // Limiter le nombre de lignes et de colonnes à un maximum de 6x6
    rows = Math.min(rows, 6);
    cols = Math.min(cols, 6);
  
    return { rows, cols };
  }

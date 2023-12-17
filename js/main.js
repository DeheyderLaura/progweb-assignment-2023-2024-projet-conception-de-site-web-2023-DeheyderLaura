let playerName, playerSurname, currentLevel, currentPoints;
let cards = [];
let flippedCards = [];
let matchedCards = [];
let isFlipping = false;

function startGame() {
    playerName = document.getElementById('name').value;
    playerSurname = document.getElementById('surname').value;
    currentLevel = parseInt(document.getElementById('level').value);
    currentPoints = 0;

    document.getElementById('start-form').style.display = 'none';

    generateCards();
    displayLevel();
    renderGameBoard();
}

function generateCards() {
    cards = [];
    currentLevel = currentLevel === 1 || currentLevel === 0  ? currentLevel * 2 : currentLevel;
    
    for (let i = 1; i <= currentLevel; i++) {
        cards.push({ value: i, isFlipped: false });
        cards.push({ value: i, isFlipped: false });
    }
    shuffle(cards);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card', card.isFlipped ? 'hidden' : 'visible');
        cardElement.classList.add('background');
        cardElement.textContent = card.isFlipped ? card.value : '';
        cardElement.addEventListener('click', () => flipCard(index));
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(index) {
    if (isFlipping || flippedCards.length >= 2 || cards[index].isFlipped) {
        return;
    }

    cards[index].isFlipped = true;
    flippedCards.push(index);
    renderGameBoard();

    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [index1, index2] = flippedCards;
    if (cards[index1].value === cards[index2].value) {
        matchedCards.push(index1, index2);
        currentPoints += 10;
        if(matchedCards.length === cards.length){
            if (currentLevel >=  10) {
                showCongratulations();
            } else {
                nextLevel();
            }
        }
    } else {
        cards[index1].isFlipped = false;
        cards[index2].isFlipped = false;
    }
    flippedCards = [];
    isFlipping = false;
    renderGameBoard();
}

function nextLevel() 
{
    currentLevel++;
    generateCards();
    displayLevel();
    renderGameBoard();
    matchedCards = [];
}

function displayLevel() {
    document.getElementById('level-display').textContent = `Joueur: ${playerName} ${playerSurname} - Niveau ${currentLevel} - Points: ${currentPoints}`;
}

function showCongratulations() {
    alert(`Félicitations, ${playerName} ${playerSurname} ! Vous avez terminé tous les niveaux avec ${currentPoints} points.`);
    location.reload();
}

"use strict";
// Selectors
const cardsGrid = document.getElementById('cards-grid');
const attemptsLeft = document.getElementById('attempts-left');
const winMessage = document.getElementById('win-message');
const restartButton = document.getElementById('restart-button');
// Game Variables
let attempts = 3;
let cardValues = [];
let flippedCards = [];
// Generate a full deck of cards
function generateDeck() {
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return ranks;
}
// Function to setup game
function setupGame() {
    const deck = generateDeck();
    deck.sort(() => Math.random() - 0.5); // Shuffle the deck
    // Select 3 random pairs from the shuffled ranks
    const selectedCards = deck.slice(0, 3).reduce((acc, card) => {
        acc.push(card, card);
        return acc;
    }, []);
    selectedCards.sort(() => Math.random() - 0.5); // Shuffle selected cards
    // Reset UI and game variables
    attempts = 3;
    flippedCards = [];
    cardsGrid.innerHTML = '';
    attemptsLeft.textContent = attempts.toString();
    winMessage.style.display = 'none';
    restartButton.style.display = 'none';
    // Create card elements
    selectedCards.forEach((value) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', () => handleCardClick(card));
        cardsGrid.appendChild(card);
    });
}
// Function to handle card flips
function handleCardClick(card) {
    if (card.classList.contains('flipped') || flippedCards.length === 2)
        return;
    // Flip the card
    card.classList.add('flipped');
    card.textContent = card.dataset.value; // Show card rank
    flippedCards.push(card);
    // Check for match
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.dataset.value === secondCard.dataset.value) {
            flippedCards = []; // Reset flipped cards
            checkWinCondition();
        }
        else {
            setTimeout(() => {
                // Unflip cards after delay
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                firstCard.textContent = '';
                secondCard.textContent = '';
                flippedCards = [];
                attempts--;
                attemptsLeft.textContent = attempts.toString();
                checkGameOver();
            }, 1000);
        }
    }
}
// Check if all cards are matched
function checkWinCondition() {
    const allFlipped = Array.from(cardsGrid.children).every((card) => card.classList.contains('flipped'));
    if (allFlipped) {
        winMessage.style.display = 'block';
        restartButton.style.display = 'block';
    }
}
// Check if game is over
function checkGameOver() {
    if (attempts === 0) {
        alert('Game Over! Try Again!');
        restartButton.style.display = 'block';
    }
}
// Restart the game
restartButton.addEventListener('click', setupGame);
// Initialize game
setupGame();

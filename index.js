let deck = [
    { card: '2♥', value: 2 },
    { card: '3♥', value: 3 },
    { card: '4♥', value: 4 },
    { card: '5♥', value: 5 },
    { card: '6♥', value: 6 },
    { card: '7♥', value: 7 },
    { card: '8♥', value: 8 },
    { card: '9♥', value: 9 },
    { card: '10♥', value: 10 },
    { card: 'J♥', value: 10 },
    { card: 'Q♥', value: 10 },
    { card: 'K♥', value: 10 },
    { card: 'A♥', value: 11 },
    
    { card: '2♦', value: 2 },
    { card: '3♦', value: 3 },
    { card: '4♦', value: 4 },
    { card: '5♦', value: 5 },
    { card: '6♦', value: 6 },
    { card: '7♦', value: 7 },
    { card: '8♦', value: 8 },
    { card: '9♦', value: 9 },
    { card: '10♦', value: 10 },
    { card: 'J♦', value: 10 },
    { card: 'Q♦', value: 10 },
    { card: 'K♦', value: 10 },
    { card: 'A♦', value: 11 },
    
    { card: '2♠', value: 2 },
    { card: '3♠', value: 3 },
    { card: '4♠', value: 4 },
    { card: '5♠', value: 5 },
    { card: '6♠', value: 6 },
    { card: '7♠', value: 7 },
    { card: '8♠', value: 8 },
    { card: '9♠', value: 9 },
    { card: '10♠', value: 10 },
    { card: 'J♠', value: 10 },
    { card: 'Q♠', value: 10 },
    { card: 'K♠', value: 10 },
    { card: 'A♠', value: 11 },
    
    { card: '2♣', value: 2 },
    { card: '3♣', value: 3 },
    { card: '4♣', value: 4 },
    { card: '5♣', value: 5 },
    { card: '6♣', value: 6 },
    { card: '7♣', value: 7 },
    { card: '8♣', value: 8 },
    { card: '9♣', value: 9 },
    { card: '10♣', value: 10 },
    { card: 'J♣', value: 10 },
    { card: 'Q♣', value: 10 },
    { card: 'K♣', value: 10 },
    { card: 'A♣', value: 11 }
];

let drawnCards = [];
let DealerDrawnCards = [];
let hasDrawn = false;
const player = document.getElementById('player');
const dealer = document.getElementById('dealer');
const dealerState = document.getElementById('dealerState');
const playerState = document.getElementById('playerState');
const cardCounter = document.getElementById("cardCounter");
let dealerScore = 0;
let dealerIsStanding = false;
let playerScore = 0;
const gameState = document.getElementById("gameState");
let gameEnded = false
let standing = false
let hitting = false
let money = 100
let won = false
const betInput = document.getElementById("betInput")
const moneyCounter = document.getElementById("money")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function hit() {
    if (!gameEnded && !hitting){    
        if (deck.length === 0) {
            console.log('No more cards');
            return;
        } else {
            // PLAYER DRAW
            let index = Math.floor(Math.random() * deck.length);
            let card = deck[index];
            deck.splice(index, 1); 
            console.log(card);
            drawnCards.push(card);
            player.textContent = ""
            for (singleCard of drawnCards) {
                let cardElement = document.createElement('span');
                cardElement.innerText = singleCard.card;
                if (singleCard.card.includes("♥") || singleCard.card.includes("♦")){
                    cardElement.className = "redCard"
                } else {
                    cardElement.className = "blackCard"
                }
                player.appendChild(cardElement);
            }
            playerScore = drawnCards.reduce((score, card) => score + card.value, 0);
            if (playerScore > 21 && drawnCards.some(card => card.value === 11)){
                playerScore -= 10
            }
            playerState.textContent = `score: ${playerScore}`;
            cardCounter.textContent = `${deck.length}/52 cards`;
            hitting = true
            await sleep(1000);
            hitting = false
            dealerHit();

        }
    } else if (hitting){
        console.log("meow")
    }else {
        reset();
        hit()
    }
}

async function dealerHit() {
    if (deck.length === 0) {
        dealerState.textContent = "No more cards, shuffle the deck";
        return;
    } else {
        if (dealerScore < 17) {
            // DEALER DRAW
            let index = Math.floor(Math.random() * deck.length);
            let card = deck[index];
            deck.splice(index, 1); 
            console.log(card.card + " " + card.value + " (dealer's)");
            dealerScore += card.value;
            DealerDrawnCards.push(card);
            dealerState.textContent = "Dealer is drawing";
            dealerScore = DealerDrawnCards.reduce((score, card) => score + card.value, 0);
            
            if (dealerScore > 21 && DealerDrawnCards.some(card => card.value === 11)) {
                dealerScore -= 10;
            }

            dealer.textContent = ""; // Vyčistí předchozí obsah

            if (hasDrawn === false) {
                for (let card of DealerDrawnCards) {
                    let cardElement = document.createElement('span');
                    cardElement.innerText = card.card;
                    if (card.card.includes("♥") || card.card.includes("♦")) {
                        cardElement.className = "redCard";
                    } else {
                        cardElement.className = "blackCard";
                    }
                    dealer.appendChild(cardElement);
                }
                hasDrawn = true;
            } else {
                let firstCard = DealerDrawnCards[0];
                let firstCardElement = document.createElement('span');
                firstCardElement.innerText = firstCard.card;
                if (firstCard.card.includes("♥") || firstCard.card.includes("♦")) {
                    firstCardElement.className = "redCard";
                } else {
                    firstCardElement.className = "blackCard";
                }
                dealer.appendChild(firstCardElement);

                for (let i = 1; i < DealerDrawnCards.length; i++) {
                    let hiddenCard = document.createElement('span');
                    hiddenCard.innerText = " ???";
                    hiddenCard.className = "idkCard";
                    dealer.appendChild(hiddenCard);
                }
            }

            cardCounter.textContent = `${deck.length}/52 cards`;
        } else {
            dealerState.textContent = "Dealer is standing";
            dealerIsStanding = true;
        }
    }
}



async function stand() {
    try {
        if (typeof userBet === 'undefined') {
            dealerState.innerText = "choose a bet!";
            await sleep(1000);
            dealerState.innerText = "";
            return;
        }

        if (!standing && money >= userBet && userBet > 1) {
            standing = true;
            while (!dealerIsStanding) {
                await sleep(500);
                dealerHit();
            }
            hitting = true;
            await sleep(1000);
            dealerState.textContent = "3";
            await sleep(1000);
            dealerState.textContent = "2";
            await sleep(1000);
            dealerState.textContent = "1";
            await sleep(1000);
            hitting = false;
            dealer.innerHTML = "";
            for (let card of DealerDrawnCards) {
                let cardElement = document.createElement('span');
                cardElement.innerText = card.card;
                if (card.card.includes("♥") || card.card.includes("♦")) {
                    cardElement.className = "redCard";
                } else {
                    cardElement.className = "blackCard";
                }
                dealer.appendChild(cardElement);
            }
            hasDrawn = true;

            if (dealerScore <= playerScore && playerScore < 21) {
                if (dealerScore < playerScore) {
                    dealerState.innerText = "You won !!!, click reset to play again";
                    won = true;
                } else if (dealerScore == playerScore) {
                    dealerState.innerText = "Push, dealer takes it!";
                    won = false;
                }
            } else if (playerScore === 21 && drawnCards.length === 2) {
                dealerState.innerText = "BLACK JACK!!!";
                won = true;
            } else if (playerScore === 21 && drawnCards.length !== 2 && dealerScore === playerScore) {
                dealerState.innerText = "Push, dealer takes it!";
                won = false;
            } else {
                if (dealerScore > 21 && playerScore < dealerScore) {
                    dealerState.innerText = "You won !!!, click reset to play again";
                    won = true;
                } else if (dealerScore > 21 && playerScore === dealerScore) {
                    dealerState.innerText = "Push, dealer takes it all!";
                    won = false;
                } else if (playerScore === 21 && playerScore !== dealerScore) {
                    dealerState.innerText = "You won!!! click reset to play again";
                    won = true;
                } else {
                    dealerState.innerText = "You lost, reset to try again";
                    won = false;
                }
            }

            gameEnded = true;
            calculateMoney();
        } else if (!(money >= userBet && userBet > 1)) {
            dealerState.innerText = "choose a valid bet";
            await sleep(1000);
            dealerState.innerText = "";
        } else if (gameEnded) {
            reset();
        }
    } catch (err) {
        dealerState.innerText = "choose a bet!";
        await sleep(1000);
        dealerState.innerText = "";
    }
}



function calculateMoney(){
    if (won){
        money = money + Number(userBet)
        moneyCounter.innerText = `${money} $`
    } else if (!won){
        money = money - Number(userBet)
        moneyCounter.innerText = `${money} $`
    }
}

function reset() {
    drawnCards = [];
    DealerDrawnCards = [];
    player.textContent = 'draw card'; 
    dealer.textContent = 'draw card'; 
    hasDrawn = false;
    dealerScore = 0;
    dealerIsStanding = false
    playerScore = 0;
    dealerState.innerText = "";
    gameEnded =false;
    gameState.innerText = "";
    standing = false;
    deck = [
        { card: '2♥', value: 2 },
        { card: '3♥', value: 3 },
        { card: '4♥', value: 4 },
        { card: '5♥', value: 5 },
        { card: '6♥', value: 6 },
        { card: '7♥', value: 7 },
        { card: '8♥', value: 8 },
        { card: '9♥', value: 9 },
        { card: '10♥', value: 10 },
        { card: 'J♥', value: 10 },
        { card: 'Q♥', value: 10 },
        { card: 'K♥', value: 10 },
        { card: 'A♥', value: 11 },
        
        { card: '2♦', value: 2 },
        { card: '3♦', value: 3 },
        { card: '4♦', value: 4 },
        { card: '5♦', value: 5 },
        { card: '6♦', value: 6 },
        { card: '7♦', value: 7 },
        { card: '8♦', value: 8 },
        { card: '9♦', value: 9 },
        { card: '10♦', value: 10 },
        { card: 'J♦', value: 10 },
        { card: 'Q♦', value: 10 },
        { card: 'K♦', value: 10 },
        { card: 'A♦', value: 11 },
        
        { card: '2♠', value: 2 },
        { card: '3♠', value: 3 },
        { card: '4♠', value: 4 },
        { card: '5♠', value: 5 },
        { card: '6♠', value: 6 },
        { card: '7♠', value: 7 },
        { card: '8♠', value: 8 },
        { card: '9♠', value: 9 },
        { card: '10♠', value: 10 },
        { card: 'J♠', value: 10 },
        { card: 'Q♠', value: 10 },
        { card: 'K♠', value: 10 },
        { card: 'A♠', value: 11 },
        
        { card: '2♣', value: 2 },
        { card: '3♣', value: 3 },
        { card: '4♣', value: 4 },
        { card: '5♣', value: 5 },
        { card: '6♣', value: 6 },
        { card: '7♣', value: 7 },
        { card: '8♣', value: 8 },
        { card: '9♣', value: 9 },
        { card: '10♣', value: 10 },
        { card: 'J♣', value: 10 },
        { card: 'Q♣', value: 10 },
        { card: 'K♣', value: 10 },
        { card: 'A♣', value: 11 }
    ];    
    cardCounter.textContent = `${deck.length}/52 cards`  
    playerState.textContent = `0`
}

function resetMoney(){
    money = 100
    moneyCounter.textContent = `${money} $`
}

function shuffle(){
    deck = [
        { card: '2♥', value: 2 },
        { card: '3♥', value: 3 },
        { card: '4♥', value: 4 },
        { card: '5♥', value: 5 },
        { card: '6♥', value: 6 },
        { card: '7♥', value: 7 },
        { card: '8♥', value: 8 },
        { card: '9♥', value: 9 },
        { card: '10♥', value: 10 },
        { card: 'J♥', value: 10 },
        { card: 'Q♥', value: 10 },
        { card: 'K♥', value: 10 },
        { card: 'A♥', value: 11 },
        
        { card: '2♦', value: 2 },
        { card: '3♦', value: 3 },
        { card: '4♦', value: 4 },
        { card: '5♦', value: 5 },
        { card: '6♦', value: 6 },
        { card: '7♦', value: 7 },
        { card: '8♦', value: 8 },
        { card: '9♦', value: 9 },
        { card: '10♦', value: 10 },
        { card: 'J♦', value: 10 },
        { card: 'Q♦', value: 10 },
        { card: 'K♦', value: 10 },
        { card: 'A♦', value: 11 },
        
        { card: '2♠', value: 2 },
        { card: '3♠', value: 3 },
        { card: '4♠', value: 4 },
        { card: '5♠', value: 5 },
        { card: '6♠', value: 6 },
        { card: '7♠', value: 7 },
        { card: '8♠', value: 8 },
        { card: '9♠', value: 9 },
        { card: '10♠', value: 10 },
        { card: 'J♠', value: 10 },
        { card: 'Q♠', value: 10 },
        { card: 'K♠', value: 10 },
        { card: 'A♠', value: 11 },
        
        { card: '2♣', value: 2 },
        { card: '3♣', value: 3 },
        { card: '4♣', value: 4 },
        { card: '5♣', value: 5 },
        { card: '6♣', value: 6 },
        { card: '7♣', value: 7 },
        { card: '8♣', value: 8 },
        { card: '9♣', value: 9 },
        { card: '10♣', value: 10 },
        { card: 'J♣', value: 10 },
        { card: 'Q♣', value: 10 },
        { card: 'K♣', value: 10 },
        { card: 'A♣', value: 11 }
    ];    
    cardCounter.textContent = `${deck.length}/52 cards`  
}

betInput.addEventListener('input', () => {
    userBet = (betInput.value);
});
const getOneCard = 'https://www.deckofcardsapi.com/api/deck/new/draw/?count=1';
const card = document.querySelector('#card');
const higherBtn = document.querySelector('#high-button');
const lowerBtn = document.querySelector('#low-button');

const scoreEle = document.querySelector('#score')
const highscoreEle = document.querySelector('#highscore')


const history = [];
let buttonClicked = "";
let score = 0;
let highscore = 0;


let currentCardData = {
    cardNumber: 6,
    suit: "HEARTS",
    image: "",
}


// Converts String > Number
// Otherwise comparing if "2" > "11" would return true
const cardValues = {
    "ACE": 1,
    "2" : 2,
    "3": 3,
    "4" : 4,
    "5": 5,
    "6" : 6,
    "7": 7,
    "8" : 8,
    "9": 9,
    "10" : 10,
    "JACK": 11,
    "QUEEN" : 12,
    "KING": 13
}

// Call the API once on page load to display a starter card
document.onload = updateUI();

async function drawOneCard() {
    let response = await fetch(getOneCard);
    let card = await response.json();
    let value = card.cards[0].value;
    currentCardData.cardNumber = cardValues[value];
    currentCardData.suit = card.cards[0].suit;
    currentCardData.image = card.cards[0].image;

    // Converts picture values to be numbers
    // before we push them to our history array

    history.push(currentCardData.cardNumber);

    // Check if the user chose correctly
    calculateHighOrLow();

    // Update our scores
    updateHighscore();

}

async function updateUI() {
    await drawOneCard();
    card.src = currentCardData.image;
    scoreEle.textContent = `Current Score: ${score}`;
    highscoreEle.textContent = `Highscore: ${highscore}`;

}

function updateHighscore() {
    if (score > highscore) {
        highscore = score;
    }
}

// compare the second to last item in the array with the last
function calculateHighOrLow() {

    // Page loaded so index would be -1
    // don't check
    if (history[history.length - 2] === undefined) {
        return;
    }

    if (history[history.length - 2] === history[history.length - 1]) {
        // both cards were the same, draw
        console.log("Cards were the same, draw")
        return;
    }

    if (buttonClicked == "higher") {

        if (history[history.length - 2] < history[history.length - 1]) {
            score++;
            console.log("Choosing higher was correct!")
            console.log(`${history[history.length - 2]} : ${history[history.length - 1]}`)
        } else {
            // reset the score
            score = 0;
            console.log("Higher was wrong")
            console.log(`${history[history.length - 2]} : ${history[history.length - 1]}`)
        }

    } else if (buttonClicked == "lower") {
        if (history[history.length - 2] > history[history.length - 1]) {
            score++;
            console.log("Choosing lower was correct!")
            console.log(`${history[history.length - 2]} : ${history[history.length - 1]}`)
        } else {
            // reset the score
            score = 0;
            console.log("Lower was wrong")
            console.log(`${history[history.length - 2]} : ${history[history.length - 1]}`)
        }
    }


}



higherBtn.addEventListener('click', () => {
    buttonClicked = 'higher';
    updateUI();
})

lowerBtn.addEventListener('click', () => {
    buttonClicked = 'lower';
    updateUI();
})

import pi from "./pi.js";

const piDigits = pi.split("").map((digit) => parseInt(digit));
let currentDigitIndex = 0; // Index of the current digit to guess
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");
const correctGuessesString = document.getElementById("correctGuesses");
const numCorrectGuesses = document.getElementById("numCorrectGuesses");
const guessButton = document.getElementById("guess_button");
const newGameButton = document.getElementById("new_game_button");

let correctGuessCount = 0; // Counter for correct guesses
let correctGuessString = ""; // String to store correct guesses

function checkGuess() {
    const guess = parseInt(guessInput.value);
    if (guess.toString().length !== 1 || isNaN(guess)) {
        message.classList.value = ''
        message.textContent = "Syötettävän arvon tulee olla yksi numero!";
    } else if (guess === piDigits[currentDigitIndex]) {
        message.classList.value = ''
        message.textContent = "Oikein!";
        message.classList.add("text-green", "font-bold");
        if (currentDigitIndex === 0) {
            correctGuessString += "3," + guess.toString();
        } else {
            correctGuessString += guess;
        }
        currentDigitIndex++;
        correctGuessCount++;
        correctGuessesString.textContent = `${correctGuessString}`;
        numCorrectGuesses.textContent = `Desimaaleja oikein: ${correctGuessCount}`;

        if (currentDigitIndex === piDigits.length) {
            message.textContent = "Hienoa! Arvasit oikein 100 000 piin desimaalia!";
            guessInput.disabled = true;
            guessButton.disabled = true;
            newGameButton.style.display = "block";
        }
    } else {
        message.classList.value = ''
        message.textContent = "Väärin! Jos haluat osallistua tällä tuloksella kisaan, näytä se Merille! Voit myös yrittää uudestaan.";
        message.classList.add("text-red", "font-bold");
        guessInput.disabled = true;
        guessButton.disabled = true;
        guessButton.style.display = "none";
        newGameButton.style.display = "block";
    }

    guessInput.value = "";
    guessInput.focus();
}

// Attach the event listener to the "Check" button
guessButton.addEventListener("click", checkGuess);

// Attach the event listener to the "New Game" button
newGameButton.addEventListener("click", () => {
    // Reset the game state
    currentDigitIndex = 0;
    correctGuessCount = 0;
    correctGuessString = "";
    message.textContent = "";
    correctGuessesString.textContent = "";
    numCorrectGuesses.textContent = "Desimaaleja oikein: 0";
    guessInput.disabled = false;
    guessButton.disabled = false;
    guessButton.style.display = "block";
    newGameButton.style.display = "none";
});

// Initially, hide the "New Game" button
newGameButton.style.display = "none";

// Add an event listener for the Enter key
guessInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});
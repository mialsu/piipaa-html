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

    if (isNaN(guess)) {
        message.textContent = "Please enter a valid number.";
    } else if (guess === piDigits[currentDigitIndex]) {
        message.textContent = "Correct!";
        if (currentDigitIndex === 1) {
            correctGuessString += "," + guess.toString();
        } else {
            correctGuessString += guess;
        }
        currentDigitIndex++;
        correctGuessCount++;
        correctGuessesString.textContent = `Correct Guesses: ${correctGuessString}`;
        numCorrectGuesses.textContent = `Number of Correct Guesses: ${correctGuessCount}`;

        if (currentDigitIndex === piDigits.length) {
            message.textContent = "You guessed all the digits of Pi correctly!";
            guessInput.disabled = true;
            guessButton.disabled = true;
            newGameButton.style.display = "block";
        }
    } else {
        message.textContent = "Incorrect. Game Over!";
        guessInput.disabled = true;
        guessButton.disabled = true;
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
    numCorrectGuesses.textContent = "Number of Correct Guesses: 0";
    guessInput.disabled = false;
    guessButton.disabled = false;
    newGameButton.style.display = "none";
});

// Initially, hide the "New Game" button
newGameButton.style.display = "none";
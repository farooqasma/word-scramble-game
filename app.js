const startBox = document.querySelector("#startBox");
const startBtn = document.querySelector("#startBtn");
const gameBox = document.querySelector("#gameBox");
const playBox = document.querySelector("#playBox");
const guess = document.querySelector("#guess");
const checkBtn = document.querySelector("#chckAns");
const result = document.querySelector("#result");
const nextBtn = document.querySelector("#nxtWord");
const tryAgainBtn = document.querySelector("#tryAgain");
const timeupBox = document.querySelector("#timeupBox");
const restart = document.querySelector("#restart");
const rounds = document.querySelector("#rounds");
const finishBox = document.querySelector("#gameFinish");
const startNewBtn = document.querySelector("#startNewBtn");
const timer = document.querySelector("#timer");
const startAgainBtn = document.querySelector("#startAgainBtn");

const words = [
  "planet", "candle", "bucket", "forest", "mirror", "blanket",
  "rocket", "tunnel", "window", "button", "pencil", "wallet",
  "castle", "camera", "helmet", "rabbit", "cloudy", "purple",
  "silver", "basket", "coffee", "pillow", "jungle", "smooth",
  "butter", "farmer", "harbor", "market", "cookie", "shadow",
  "bridge", "pocket", "planet", "stream", "trophy", "circle",
  "napkin", "velvet", "anchor", "bucket", "rocket", "corner",
  "tablet", "jacket", "valley", "ticket", "copper","winter",
  "flower", "hammer", "forest"
];

let currentWord = "";
let currentRound;
let totalSeconds;
let countdownTimer;
const timeStart = 180;
const startRound = 1;
const totalRounds = 5;

// Start Game:
function getRandomWord() {
    const randomIdx = Math.floor(Math.random()*words.length);
    return words[randomIdx];
}

function shuffle(word) {
    let arr = word.split("");
    for (let i = arr.length - 1 ; i > 0; i--) {
        const j = Math.floor(Math.random()* (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function loadWord(attempt = 0) {
    if (attempt > 5) return;
    currentWord = getRandomWord();
    const scrambled = shuffle(currentWord);
    if (scrambled === currentWord) return loadWord();
    playBox.textContent = scrambled;
}

function startGame () {
    resetTimer();
    guess.value = "";
    startBox.classList.add("hidden");
    gameBox.classList.add("active");
    resetRounds();
    updateRounds();
    loadWord();
    startTimer();
}

// Check for Answers:
function checkAns() {
    const userInput = guess.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (userInput === currentWord) {
        result.textContent = "✅ Correct!";
        disableInputs();
        showNextBtn();
        
    } else if (userInput === "") {
        result.textContent = "⚠️ Fill in the blank first...";
        return;
    
    } else {
        result.textContent = "❌ Sorry... Wrong guess!";
        disableInputs();
        hideNextBtn();
        tryAgainBtn.classList.replace("hidden", "active");
    }
}

// Show/hide NEXT button:
function showNextBtn() {
    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("active");
}

function hideNextBtn() {
    nextBtn.classList.remove("active");
    nextBtn.classList.add("hidden");
}

// Enable/Disable Inputs:
function disableInputs() {
    guess.disabled = true;
    checkBtn.disabled = true;
}

function enableInputs() {
    guess.disabled = false;
    checkBtn.disabled = false;
}

// Reset display settings(when game is started again):
function resetSettings() {
    guess.value = "";
    result.textContent = "";
    enableInputs();
    hideNextBtn();
    hideTryAgainBtn();
}

// Load Next Word:
function loadNextWord() {
    guess.value = "";
    result.textContent = "";
    loadWord();
    enableInputs();   
    hideNextBtn();
    nextRound();
}

// Try Again(if guessed wrong):
function tryGuessAgain() {
    guess.value = "";
    result.textContent = "";
    hideTryAgainBtn();
    enableInputs();
}

// Show/hide TRY-AGAIN button:
function hideTryAgainBtn() {
    tryAgainBtn.classList.replace("active", "hidden");
}

// Restart Game:
function restartGame() {
    resetRounds();
    resetSettings();
    gameBox.classList.remove("active");
    startBox.classList.remove("hidden");
    resetTimer();
}

// GAME ROUNDS:
function updateRounds() {
    rounds.textContent = `${currentRound}/${totalRounds}`; 
}

function nextRound () {
    if (currentRound < totalRounds) {
        currentRound++;
        updateRounds();
    } else {
        gameFinished();
    }
}

function resetRounds() {
    currentRound = startRound;
}

// FINISH GAME:
function gameFinished() {
    resetRounds();
    gameBox.classList.remove("active");
    finishBox.classList.add("active");
    resetTimer();
}

// Start New Game(when prev game is completed):
function startNewGame() {
    finishBox.classList.remove("active");
    startBox.classList.remove("hidden");
}

// Countdown Timer:
function startTimer() {
    updateCountdownDisplay();

    countdownTimer = setInterval(() => {
        totalSeconds--;
        updateCountdownDisplay();
        if(totalSeconds <= 0 ) {
            endGameDueToTime();
        }
    }, 1000);
}

function updateCountdownDisplay() {
    const minutes = Math.floor(totalSeconds/60);
    const seconds = totalSeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    timer.textContent = formattedTime;
}

function resetTimer() {
    totalSeconds = timeStart;
    clearInterval(countdownTimer);
}

// Game end due to Time-Up:
function endGameDueToTime() {
    gameBox.classList.remove("active");
    timeupBox.classList.add("active");
    resetRounds();
    resetTimer();
    resetSettings();
}

// Start Again due to Time Button:
function startAgainDuetoTime() {
    timeupBox.classList.remove("active");
    startBox.classList.remove("hidden");
}

// BUTTONS:
startBtn.addEventListener("click", startGame);
checkBtn.addEventListener("click", checkAns);
nextBtn.addEventListener("click", loadNextWord);
tryAgainBtn.addEventListener("click", tryGuessAgain);
restart.addEventListener("click", restartGame);
startNewBtn.addEventListener ("click", startNewGame);
startAgainBtn.addEventListener ("click", startAgainDuetoTime);
const btn = document.querySelector(".btn")
const minutesDisplay = document.querySelector(".minutes")
const secondsDisplay = document.querySelector(".seconds")
const movesCounter = document.querySelector(".movesCounter")
const cardsTable = document.querySelector(".table")
const lastTimeDisplay = document.querySelector(".lastTimeDisp");
const lastMoveDisplay = document.querySelector(".lastMovesDisp");
const win = document.querySelector(".win");

let seconds = 0;
let minutes = 0;
let gameTime = 0;

// ADDING ZERO AT THE BEGINNING IF seconds < 10
function leftFillSecondsValue(seconds, targetLength) {
  return seconds.toString().padStart(targetLength, 0);
}

//  TIMER START FUNCTION
const setTimerInterval = () => {
  seconds++;
  seconds = leftFillSecondsValue(seconds, 2)
  if (seconds > 59) {
    seconds = 0;
    seconds = leftFillSecondsValue(seconds, 2);
    minutes++;
  };
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
  gameTime++
}

let interval;
let active = false;
let lastTime = 0;
let newCard;
let cards = [];
let move = 0;
const cardsCount = 20;
let cardsColor = ["red", "red", "blue", "blue", "green", "green", "black", "black", "yellow", "yellow", "violet", "violet", "cyan", "cyan", "indigo", "indigo", "saddlebrown", "saddlebrown", "white", "white"]

// INITIAL FUNCTION FOR COLOR AND EVENT LISTENER
const init = () => {
  cards.forEach(card => {
    let position = Math.floor(Math.random() * cardsColor.length);
    card.classList.add(cardsColor[position])
    cardsColor.splice(position, 1)
  });
  setTimeout(function () {
    cards.forEach(card => {
      card.classList.add("hidden");
      card.addEventListener('click', result);
    });
  }, 3000)
}
// START GAME FUNCTION
const startGame = () => {
  if (!active) {
    interval = setInterval(setTimerInterval, 1000);
    active = !active;
    btn.textContent = "stop";
    lastMoveDisplay.textContent = movesCounter.textContent;
    movesCounter.textContent = move;
    win.style.display = "none";;
    lastTime = gameTime;
    if (lastTime > 60) {
      lastTimeDisplay.textContent = (lastTime / 60).toFixed(0) + ":" + (lastTime % 60 < 10 ? "0" + lastTime % 60 : lastTime % 60);
    } else {
      lastTimeDisplay.textContent = "0:" + (lastTime < 10 ? lastTime = "0" + lastTime : lastTime);
    };
    gameTime = 0;
    // CREATE AND ADD CARD TO TABLE
    for (i = 0; i < cardsCount; i++) {
      newCard = document.createElement("div");
      cardsTable.appendChild(newCard);
      cards = document.querySelectorAll(".table div");
      gamePair = cards.length / 2;
    }
    cards = [...cards];
    cardsColor = ["red", "red", "blue", "blue", "green", "green", "black", "black", "yellow", "yellow", "violet", "violet", "cyan", "cyan", "indigo", "indigo", "saddlebrown", "saddlebrown", "white", "white"];
    init();
  } else {
    stopAndResetGame();
  }
}

const stopAndResetGame = () => {
  gameEnd();
  movesCounter.textContent = 0;
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds + "0";
  gameTime = 0;
}

const gameEnd = () => {
  btn.textContent = "start";
  clearInterval(interval);
  active = !active;
  seconds = 0;
  minutes = 0;
  move = 0;
  let divElms = document.querySelectorAll(".table div");
  for (i = 0; i < divElms.length; i++) {
    cardsTable.removeChild(divElms[i])
  }
}

let activeCard = "";
const activeCards = [];
let gamePair;
let gameResult = 0;

// CARDS COMPARISON FUNCTION
const result = (e) => {
  activeCard = e.target;
  activeCard.classList.remove("hidden");
  activeCard.removeEventListener('click', result);
  activeCards.push(activeCard);
  ++move;
  if (move % 2 == 0) {
    movesCounter.textContent = move / 2;
  }
  if (activeCards.length === 2 && activeCards[0].classList.value === activeCards[1].classList.value) {
    activeCards.forEach(card => {
      card.removeEventListener('click', result);
      card.classList.add("pair");
    });
    ++gameResult;
    activeCard = "";
    activeCards.length = 0;
    resultCheck();
    return
  } else if (activeCards.length === 2 && activeCards[0].classList.value !== activeCards[1].classList.value) {
    cards.forEach(card => {
      card.removeEventListener('click', result);
    });
    setTimeout(function () {
      cards.forEach(card => {
        if (card.classList.contains("pair")) {
          card.removeEventListener('click', result);
        } else(
          card.addEventListener('click', result), card.classList.add("hidden")
        )
      });
      activeCard = "";
      activeCards.length = 0;
    }, 500)
  }
}

const resultCheck = function () {
  if (gameResult == gamePair) {
    gameEnd();
    gamePair = 0;
    gameResult = 0;
    win.style.display = "block";
  };
}

btn.addEventListener('click', startGame)
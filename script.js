const grid = document.querySelector(".grid");
const timerDisplay = document.querySelector(".timer");
const movesDisplay = document.querySelector(".moves");
let emojis = ["😀", "🐶", "🍕", "🚗", "🎵", "⚽", "🌈", "🔥"];
emojis = shuffle([...emojis, ...emojis]);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let seconds = 0;
let minutes = 0;
let moves = 0;
let timer = null;

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      if (seconds > 59) {
        minutes++;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = 0;
      }

      seconds = seconds < 10 ? "0" + seconds : seconds;

      if (minutes > 0) {
        timerDisplay.textContent = `Time: ${minutes} : ${seconds}s`;
        return;
      }

      timerDisplay.textContent = `Time: ${seconds}s`;
    }, 1000);
  }
}

function generateHTML() {
  grid.innerHTML = "";
  emojis.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerHTML = "";
    grid.appendChild(card);

    card.addEventListener("click", () => flipCard(card));
  });
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("flipped"))
    return;

  startTimer();
  card.classList.add("flipped");
  card.innerHTML = card.dataset.emoji;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;

  moves++;
  movesDisplay.innerHTML = `Moves: ${moves}`;

  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matchedPairs++;

    document.querySelector(".matches").innerHTML = `Matches: ${matchedPairs}`;

    resetBoard();
    if (matchedPairs === emojis.length / 2) {
      clearInterval(timer);
      setTimeout(() => {
        winMsg();
      }, 1000);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetBoard();
    }, 800);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function winMsg() {
  let gridContainer = document.querySelector(".gridContainer");
  gridContainer.classList.add("gridContainerStyles");
  gridContainer.innerHTML = `
    <h2>You win!</h2>
    <button onclick="location.reload()">want to play again ?</button>
`;
}

let newGameBtn = document.querySelector(".newGameBtn");

newGameBtn.addEventListener("click", () => {
  setTimeout(() => {
    location.reload();
  }, 500);
});

generateHTML();

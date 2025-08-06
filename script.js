const grid = document.querySelector(".grid");
const timerDisplay = document.querySelector(".timer");
let emojis = ["😀", "🐶", "🍕", "🚗", "🎵", "⚽", "🌈", "🔥"];
emojis = [...emojis, ...emojis]; // duplicate for pairs
emojis.sort(() => 0.5 - Math.random()); // shuffle

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let time = 0;
let timer = null;

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      time++;
      timerDisplay.textContent = `Time: ${time}s`;
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
    card.innerHTML = ""; // initially blank
    grid.appendChild(card);

    card.addEventListener("click", () => flipCard(card));
  });
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("flipped")) return;
  
  startTimer();
  card.classList.add("flipped");
  card.innerHTML = card.dataset.emoji;

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    matchedPairs++;
    resetBoard();
    if (matchedPairs === emojis.length / 2) {
      clearInterval(timer);
      alert(`You won in ${time} seconds!`);
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

generateHTML();

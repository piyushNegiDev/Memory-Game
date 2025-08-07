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

// let click = 0;
// let contentArray = [];

// function cardFlip() {}

// function generateHTML() {
//   let html = ``;
//   let grid = document.querySelector(".grid");

//   let afterNine = 1;
//   for (let index = 1; index <= 16; index++) {
//     if (index >= 9) {
//       html += `<div id="card${index}" class="card card${index}">${afterNine}</div>`;

//       afterNine++;
//     } else {
//       html += `<div id="card${index}" class="card card${index}">${index}</div>`;
//     }
//   }

//   grid.innerHTML = html;
// }
// generateHTML();

// for (let index = 1; index <= 16; index++) {
//   let card = document.querySelector(`.card${index}`);

//   card.addEventListener("click", () => {
//     card.style.visibility = "hidden";
//     click++;

//     contentArray.unshift(card.innerHTML);

//     console.log(contentArray);

//     if (click % 2 === 0) {
//       console.log("working");
//       compareContent();
//     }
//   });
// }

// function compareContent() {
//   if (contentArray[0] === contentArray[1]) {
//     console.log("matched");
//     contentArray = [];
//   } else {
//     contentArray.forEach((content) => {
//       document.getElementById(`card${content}`).style.visibility = "visible";
//     });
//     contentArray = [];
//   }
// }

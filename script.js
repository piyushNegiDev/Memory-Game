let click = 0;
let contentArray = [];

function cardFlip() {}

function generateHTML() {
  let html = ``;
  let grid = document.querySelector(".grid");

  let afterNine = 1;
  for (let index = 1; index <= 16; index++) {
    if (index >= 9) {
      html += `<div id="card${index}" class="card card${index}">${afterNine}</div>`;

      afterNine++;
    } else {
      html += `<div id="card${index}" class="card card${index}">${index}</div>`;
    }
  }

  grid.innerHTML = html;
}
generateHTML();

for (let index = 1; index <= 16; index++) {
  let card = document.querySelector(`.card${index}`);

  card.addEventListener("click", () => {
    card.style.visibility = "hidden";
    click++;

    contentArray.unshift(card.innerHTML);

    console.log(contentArray);

    if (click % 2 === 0) {
      console.log("working");
      compareContent();
    }
  });
}

function compareContent() {
  if (contentArray[0] === contentArray[1]) {
    console.log("matched");
    contentArray = [];
  } else {
    contentArray.forEach((content) => {
      document.getElementById(`card${content}`).style.visibility = "visible";
    });
    contentArray = [];
  }
}

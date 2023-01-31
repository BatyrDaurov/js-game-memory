import "./_vendor";
import "./components/_overlay";
import _vars from "./_vars";

const LEVEL = "EASY";
let game_status = false;
let seconds = 0;
let tens = 0;
let result_array = [];
export let timerID;

const startTimer = () => {
  tens++;
  tens < 9
    ? (_vars.appendTens.innerHTML = "0" + tens)
    : (_vars.appendTens.innerHTML = tens);

  if (tens > 99) {
    seconds++;
    seconds > 9
      ? (_vars.appendSeconds.innerHTML = seconds)
      : (_vars.appendSeconds.innerHTML = "0" + seconds);
    tens = 0;
    _vars.appendTens.innerHTML = "0" + 0;
  }
};

const getFullArray = (result_array, level = "EASY") => {
  switch (level) {
    case "EASY":
      for (let i = 0; i < 4; i++) {
        const random_number = Math.random() * (100 - 1) + 1;
        result_array.push(Math.ceil(random_number));
        result_array.push(Math.ceil(random_number));
      }
      break;
    case "MIDDLE":
      console.log("prikoldes");
      break;
    default:
      alert("ERROR");
      break;
  }
  result_array.sort(() => Math.random() - 0.5);
  return result_array;
};
getFullArray(result_array);

class Card {
  constructor(container, number) {
    this.container = container;
    this.number = number;
    this.#setup();
  }
  #setup() {
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.setAttribute("data-value", this.number);
    this.card.setAttribute("data-status", false);
    this.card.addEventListener("click", () => this.clickHandler());
    game_status = true;

    this.container.append(this.card);
  }
  clickHandler() {
    this.flip();
    this.selected = document.querySelectorAll('[data-status="selected"]');
    this.cards = document.querySelectorAll('[data-status="true"]');
    clearInterval(timerID);
    game_status && (timerID = setInterval(startTimer, 10));

    let last_card;
    if (this.cards.length >= 2) {
      this.cards.forEach((el) => {
        const value = el.getAttribute("data-value");
        value == last_card && this.family();
        if ((this.selected.length === 6) & (value == last_card)) {
          setTimeout(() => {
            this.gameOver();
          }, 400);
        }
        setTimeout(() => {
          value !== last_card && this.closeCards();
        }, 300);
        last_card = value;
      });
    }
  }
  flip() {
    if (this.card.getAttribute("data-status") == "selected") {
      console.log("pizda");
    } else if (!this.card.innerHTML) {
      this.card.innerHTML = `<h1>${this.number}</h1>`;
      this.card.setAttribute("data-status", true);
    } else {
      this.card.setAttribute("data-status", false);
      this.card.innerHTML = "";
    }
  }
  closeCards() {
    this.cards.forEach((el) => {
      el.innerHTML = "";
      el.setAttribute("data-status", false);
    });
  }
  family() {
    this.cards.forEach((el) => {
      el.classList.add("selected");
      el.setAttribute("data-status", "selected");
      el.style.backgroundColor = "#f8fe4e";
    });
  }
  gameOver() {
    clearInterval(timerID);
    _vars.gameWindow.innerHTML = `<div class="popup-win"><h1 class="popup-win__title">Победа🎈</h1>
    <h2 class="popup-win__title">⏰ ${seconds}:${tens}</h2>
    <a href="" class="popup-win__link">Еще каточку</a>
    </div>`;
  }
}

result_array.map((number) => new Card(_vars.grid, number));

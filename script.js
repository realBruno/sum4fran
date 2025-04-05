'use strict';

/* *********** GAME *********** */

const number = document.querySelector(".numero");

let firstRandom = parseInt(Math.random() * 10) + 1;
let secondRandom = parseInt(Math.random() * 10) + 1;

// shows a random sum on page load:
number.innerHTML =
    `${firstRandom} + <span class="secondNumber">${secondRandom}</span>`;

let secondNumber = document.querySelector(".secondNumber").innerHTML;

const game = function (first, second) { // chooses one box randomly
    const boxNumber = parseInt(Math.random() * 6) + 1;

    const correctSum = first + second;

    const correctBox = document.querySelector(`.option${boxNumber}`);
    correctBox.innerHTML = `${correctSum}`;

    const wrongSums = [];
    for (let i = 1; i <= 6;) {
        const wrongSum = parseInt(Math.random() * 20) + 1;

        /* checks if box is the correct one or if another
        * box has the same sum of the correct one: */
        if (i === boxNumber) {
            i++;
            continue;
        }
        else if (wrongSum === correctSum ||
            wrongSums.includes(wrongSum))
            continue;

        const wrongBox = document.querySelector(`.option${i}`);
        wrongBox.innerHTML = wrongSum;

        wrongSums.push(wrongSum);
        i++;
    }

    return boxNumber;
};

let correctBox = game(firstRandom, secondRandom);

const botoes = document.querySelectorAll('.botao');

/* This if checks if highest score (TOP) already exists in browser memory.
 * If it doesn't, create it; if it does, set TOP to have highest's value on
 * page load */
if (localStorage.getItem("highest") === null)
    localStorage.setItem("highest", 0);
else
    document.querySelector(".maior-pontuacao").innerHTML =
        localStorage.getItem("highest");

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const id = parseInt(botao.id);
        if (id === correctBox) {
            correctBox = correctAnswer();

            const score = updateScore();

            if (score > parseInt(localStorage.getItem("highest"))) {
                localStorage.setItem("highest", score);

                document.querySelector(".maior-pontuacao").innerHTML =
                    localStorage.getItem("highest");
            }

            clearTimeout(timer);
            startTimer();
        }
        else {
            alert("Resposta Errada!\nFim de jogo!");
            if (!navigator.onLine) {
                window.location.replace(window.location.href);
            } else {
                location.reload();
            }
        }
    });
});

function correctAnswer() {
    const newNumberToShow = parseInt(Math.random() * 10) + 1;

    secondNumber = parseInt(document.querySelector(".secondNumber").innerHTML);

    const boxNumber = game(newNumberToShow, secondNumber);

    number.innerHTML =
        `+ <span class="secondNumber">${newNumberToShow}</span>`;

    return boxNumber;
};

/* *************** TIMER *************** */

let timer;
function startTimer() {
    let seconds = 6;

    function countDown() {
        seconds--;
        document.querySelector(".segundos").innerHTML = seconds;
        if (seconds <= 0) {
            clearTimeout(timer);
            alert("Tempo Esgotado!\nFim de jogo!");
            if (!navigator.onLine) {
                window.location.replace(window.location.href);
            } else {
                location.reload();
            }
        }
        else {
            timer = setTimeout(countDown, 1000);
        }
    }

    countDown();
}

/* *********** SCORE *********** */

function updateScore() {
    let score = parseInt(document.querySelector(".pontuacao").innerHTML);

    score += 1;

    document.querySelector(".pontuacao").innerHTML = score;

    return score;
}

/* *************** SERVICE WORKER *************** */

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/serviceworker.js")
        .then(registration => {
          console.log("Service Worker registrado com sucesso:", registration.scope);
        })
        .catch(error => {
          console.log("Falha ao registrar o Service Worker:", error);
        });
    });
  }
  
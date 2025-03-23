'use strict';

/* *********** GAME *********** */

const number = document.querySelector(".numero");

const firstRandom = parseInt(Math.random() * 10) + 1;
const secondRandom = parseInt(Math.random() * 10) + 1;

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
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const id = parseInt(botao.id);
        if (id === correctBox) {
            correctBox = correctAnswer();
            updateScore();
            countDown();
        }
        else {
            alert("Resposta Errada!\nFim de jogo!");
            location.reload();
        }
    });
});

function correctAnswer() {
    const newNumberToShow = parseInt(Math.random() * 10) + 1;

    secondNumber = parseInt(document.querySelector(".secondNumber").innerHTML);

    const boxNumber = game(newNumberToShow, secondNumber);

    number.innerHTML =
        `<span class="secondNumber">${newNumberToShow}</span>`;

    return boxNumber;
};

/* *************** TIMER *************** */
/* 
function countDown() {
    let seconds = 5;

    const intervalId = setInterval(() => {
        seconds--;

        document.querySelector(".segundos").innerHTML = seconds;

        if (seconds <= 0) {
            alert("Tempo Esgotado!\nFim de jogo!");
            clearInterval(intervalId);
            location.reload();
            return;
        }

    }, 1000);

    return;
} */

/* countDown(); */

/* *********** SCORE *********** */


function updateScore() {
    const score = document.querySelector(".pontuacao");
    let totalScore = parseInt(score.innerHTML);

    totalScore += 5;

    score.innerHTML = totalScore
}
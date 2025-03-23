'use strict';

const number = document.querySelector(".numero");

const firstRandom = parseInt(Math.random() * 10) + 1;
const secondRandom = parseInt(Math.random() * 10) + 1;

// shows a random sum on page load:
number.innerHTML = `${firstRandom} + ${secondRandom}`;

const randomBox = function () { // chooses one box randomly
    const boxNumber = parseInt(Math.random() * 6) + 1;

    const correctSum = firstRandom + secondRandom;

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

    return correctBox;
}

const correctBox = randomBox();
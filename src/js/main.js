"use strict";
const containerTable = document.querySelector(".table");
const containerEndMatch = document.querySelector(".container-end-match");
const displayResult = document.querySelector("#display-result");
const allSquares = document.querySelectorAll(".square");
const btnRestartGame = document.querySelector("#btn-restart-game");
let turn = 0;
let player = "x";
const startGame = () => {
    turn++;
};
const checkTurnOfPlayer = () => {
    if (turn % 2) {
        player = "circle";
    }
    else {
        player = "x";
    }
};
const makeAPlay = (element) => {
    element.classList.add(player);
    checkIfPlayerWin();
};
const checkIfMatchDraw = () => {
    const arrayOfSquareElements = Array.from(allSquares);
    const checkIfElementHaveClass = (element) => element.classList.contains("circle") || element.classList.contains("x");
    const IfPlayMovesEnd = arrayOfSquareElements.every(element => checkIfElementHaveClass(element));
    if (IfPlayMovesEnd) {
        displayContainerOfFinalMatch("Draw!");
    }
};
const sequencesOfWin = (player) => {
    const element = (position) => allSquares[position].classList.contains(player);
    const rowOne = element(0) && element(1) && element(2);
    const rowTwo = element(3) && element(4) && element(5);
    const rowTree = element(6) && element(7) && element(8);
    const columnOne = element(0) && element(3) && element(6);
    const columnTwo = element(1) && element(4) && element(7);
    const columnThree = element(2) && element(5) && element(8);
    const diagonalOne = element(0) && element(4) && element(8);
    const diagonalTwo = element(2) && element(4) && element(6);
    return rowOne || rowTwo || rowTree || columnOne ||
        columnTwo || columnThree || diagonalTwo || diagonalOne;
};
const checkIfPlayerWin = () => {
    if (sequencesOfWin("circle") || sequencesOfWin("x")) {
        const playerMsg = player === "circle" ? "Circle" : "X";
        displayContainerOfFinalMatch(`${playerMsg} win!`);
    }
    else {
        checkIfMatchDraw();
    }
    ;
};
const displayContainerOfFinalMatch = (result) => {
    containerEndMatch.style.display = "block";
    containerTable.setAttribute("style", "pointer-events:none");
    displayResult.textContent = result;
};
const restartGame = () => {
    allSquares.forEach(square => {
        square.classList.remove("circle");
        square.classList.remove("x");
    });
    containerEndMatch.style.display = "none";
    containerTable.removeAttribute("style");
};
containerTable.addEventListener("click", e => {
    const element = e.target;
    if (element.className === "square") {
        startGame();
        checkTurnOfPlayer();
        makeAPlay(element);
    }
    ;
});
btnRestartGame.addEventListener("click", () => {
    restartGame();
});
//# sourceMappingURL=main.js.map
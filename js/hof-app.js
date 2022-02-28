// Global Variables Here

let currentPlayer = 'X';

const result = document.querySelector('.result');

const squareElements = document.querySelectorAll('.square');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const xScoreBox = document.getElementById('x-score');
const oScoreBox = document.getElementById('o-score');
const tieScoreBox = document.getElementById('tie-score');

let xScore = 0;
let oScore = 0;
let tieScore = 0;

let movesInCurrentGame = 0;

const restartButton = document.querySelector('.button');

////////////////////////////////
// Functions For Game Logic Here

function clickSquare(e) {
  const square = e.target;
  markSquare(square, currentPlayer);
  if (checkWin(currentPlayer)) {
    squareElements.forEach((square) => {
      square.removeEventListener('click', clickSquare);
    });
    result.innerText = `${currentPlayer} won!`;
    if (currentPlayer === 'X') {
      scoreForX();
    } else {
      scoreForO();
    }
  } else if (checkTie()) {
    result.innerText = `Cat's game! It's a tie!`;
    scoreTie();
  } else {
    toggle();
  }
}

const markSquare = (square, currentPlayer) => {
  square.innerText = currentPlayer;
  square.setAttribute('data-cell', currentPlayer);
  incrementMovesCounter();
};

const checkWin = (currentPlayer) => {
  return winningCombos.some((combination) => {
    return combination.every((index) => {
      const squareValue = squareElements[index].getAttribute('data-cell');
      const areEqual = squareValue === currentPlayer;
      return areEqual;
    });
  });
};

const scoreForX = () => {
  xScore++;
  xScoreBox.innerText = `${xScore}`;
};

const scoreForO = () => {
  oScore++;
  oScoreBox.innerText = `${oScore}`;
};

const incrementMovesCounter = () => {
  movesInCurrentGame++;
};

const scoreTie = () => {
  tieScore++;
  tieScoreBox.innerText = `${tieScore}`;
};

const checkTie = () => {
  return movesInCurrentGame === 9;
};

const toggle = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
  resultText();
};

const resultText = () => {
  result.innerText = `${currentPlayer}'s turn ...`;
};

const restartGame = () => {
  currentPlayer = 'X';
  resultText();
  movesInCurrentGame = 0;
  console.log(currentPlayer, result, movesInCurrentGame);
  for (let i = 0; i < squareElements.length; i++) {
    squareElements[i].innerText = '';
    squareElements[i].setAttribute('data-cell', '');
  }

  startGame();
};

////////////////////////////////
// Event Listeners Here
const startGame = () => {
  squareElements.forEach((square) => {
    square.addEventListener('click', clickSquare, { once: true });
  });
};

startGame();

restartButton.addEventListener('click', restartGame);

//////////////////////////////////////

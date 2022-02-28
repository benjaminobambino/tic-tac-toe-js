// Global Variables Here

let currentPlayer = 'X';

const result = document.querySelector('.result');

const squareElements = document.querySelectorAll('.square');

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
  if (
    squareElements[0].getAttribute('data-cell') === currentPlayer &&
    squareElements[1].getAttribute('data-cell') === currentPlayer &&
    squareElements[2].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
  if (
    squareElements[3].getAttribute('data-cell') === currentPlayer &&
    squareElements[4].getAttribute('data-cell') === currentPlayer &&
    squareElements[5].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
  if (
    squareElements[6].getAttribute('data-cell') === currentPlayer &&
    squareElements[7].getAttribute('data-cell') === currentPlayer &&
    squareElements[8].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
  if (
    squareElements[0].getAttribute('data-cell') === currentPlayer &&
    squareElements[3].getAttribute('data-cell') === currentPlayer &&
    squareElements[6].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
  if (
    squareElements[1].getAttribute('data-cell') === currentPlayer &&
    squareElements[4].getAttribute('data-cell') === currentPlayer &&
    squareElements[7].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
  if (
    squareElements[2].getAttribute('data-cell') === currentPlayer &&
    squareElements[5].getAttribute('data-cell') === currentPlayer &&
    squareElements[8].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
  if (
    squareElements[0].getAttribute('data-cell') === currentPlayer &&
    squareElements[4].getAttribute('data-cell') === currentPlayer &&
    squareElements[8].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
  if (
    squareElements[2].getAttribute('data-cell') === currentPlayer &&
    squareElements[4].getAttribute('data-cell') === currentPlayer &&
    squareElements[6].getAttribute('data-cell') === currentPlayer
  ) {
    return true;
  }
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
  for (let i = 0; i < squareElements.length; i++) {
    squareElements[i].addEventListener('click', clickSquare, { once: true });
  }
};

startGame();

restartButton.addEventListener('click', restartGame);

//////////////////////////////////////

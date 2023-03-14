const gameState = (() => {
  let turn = 1;
  function getTurn() {
    return turn;
  }
  function changeTurn() {
    if (turn === 1) {
      turn = 2;
    } else {
      turn = 1;
    }
  }
  function resetTurn() {
    turn = 1;
  }
  return { changeTurn, resetTurn, getTurn };
})();

const Player = (piece) => {
  let score = 0;
  return {
    piece,
    incrementScore() {
      score++;
    },
    getScore() {
      return score;
    },
  };
};

const playerOne = Player('x');
const playerTwo = Player('o');

const displayController = (() => {
  const scoreboard = document.querySelector('.scoreboard');
  const body = document.querySelector('body');
  function updateScoreboard() {
    scoreboard.innerText = `${playerOne.getScore()} / ${playerTwo.getScore()}`;
  }
  function flashBoard(condition) {
    let count = 0;
    if (condition === 'win') {
      const blink = setInterval(() => {
        if (count === 6) {
          clearInterval(blink);
          return;
        }
        body.style.backgroundColor = count % 2 === 0 ? 'hsl(120, 90%, 10%)' : 'rgb(0, 0, 0)'; // Green
        count++;
      }, 200);
    } else if (condition === 'tie') {
      const blink = setInterval(() => {
        if (count === 6) {
          clearInterval(blink);
          return;
        }
        body.style.backgroundColor = count % 2 === 0 ? 'hsl(0, 0%, 40%)' : 'rgb(0, 0, 0)'; // Gray
        count++;
      }, 200);
    }
  }
  return { updateScoreboard, flashBoard };
})();

const gameboard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  function validTurn(row, column) {
    if (board[row][column] === '') return true;
    return false;
  }
  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = '';
      }
    }
  }
  function removePieces() {
    const gameSquares = document.querySelectorAll('.gameSquare');
    gameSquares.forEach((gameSquare) => {
      gameSquare.innerText = '';
    });
  }
  function checkForWinner() {
    // Check rows
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        return true;
      }
    }
    // Check columns
    for (let j = 0; j < board[0].length; j++) {
      if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        return true;
      }
    }
    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return true;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return true;
    }
    // No winner found
    return false;
  }
  function emptySpaces() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === '') {
          return true;
        }
      }
    }
    return false;
  }
  function resetGame() {
    resetBoard();
    removePieces();
    gameState.resetTurn();
    displayController.updateScoreboard();
  }
  // Adds piece to array
  function addPiece(piece, row, column) {
    board[row][column] = piece;
  }
  // Checks who's turn it is and adds the piece
  function playTurn(row, column) {
    if (gameState.getTurn() === 1) {
      addPiece(playerOne.piece, row, column);
      gameState.changeTurn();
    } else {
      addPiece(playerTwo.piece, row, column);
      gameState.changeTurn();
    }
  }
  // Draws gameboard to screen
  const content = document.querySelector('.content');
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const button = document.createElement('button');
      button.className = `gameSquare ${i},${j}`;
      // Uses for loop variables to select correct element
      button.addEventListener('click', (e) => {
        if (validTurn(i, j)) {
          if (gameState.getTurn() === 1) {
            playTurn(i, j);
            button.innerText = 'X';
            if (checkForWinner()) {
              playerOne.incrementScore();
              displayController.flashBoard('win');
              resetGame();
            } else if (!emptySpaces()) {
              resetGame();
              displayController.flashBoard('tie');
            }
          } else if (gameState.getTurn() === 2) {
            playTurn(i, j);
            button.innerText = 'O';
            if (checkForWinner()) {
              playerTwo.incrementScore();
              displayController.flashBoard('win');
              resetGame();
            } else if (!emptySpaces()) {
              resetGame();
              displayController.flashBoard('tie');
            }
          }
        }
      });
      content.appendChild(button);
    }
  }
  return { resetBoard, resetGame, board }; // Prob remove board
})();

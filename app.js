const gameState = (() => {
  const turn = 1;
  function changeTurn() {
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
  }
  return { changeTurn };
})();

const Player = (piece) => ({
  piece,
});

const playerOne = Player('x');
const playerTwo = Player('o');

const gameboard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = 0;
      }
    }
  }
  // Adds piece to array
  function addPiece(piece, row, column) {
    board[row][column] = piece;
  }
  // Checks who's turn it is and adds the piece
  function playTurn(i, j) {
    if (gameState.turn === 1) {
      addPiece(playerOne.piece, i, j);
      gameState.changeTurn();
    } else {
      addPiece(playerTwo.piece, i, j);
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
        playTurn(i, j);
        if (gameState.turn === 1) {
          button.innerText = 'x';
        } else {
          button.innerText = 'o';
        }
      });
      content.appendChild(button);
    }
  }
  return { resetBoard, addPiece, board }; // Prob remove board
})();

const gameState = (() => {
  const turn = 1;
  function changeTurn() {
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
  }
  return { turn, changeTurn };
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
  function addPiece(piece, row, column) {
    board[row][column] = piece;
  }
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
      button.className = `gameSquare ${i} ${j}`;
      // Grab row and column from class
      button.addEventListener('click', (e) => {
        playTurn(i, j);
      });
      content.appendChild(button);
    }
  }
  return { resetBoard, addPiece, board }; // Prob remove board
})();

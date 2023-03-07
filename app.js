const gameboard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  // Draws gameboard to screen
  const content = document.querySelector('.content');
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const button = document.createElement('button');
      button.className = `gameSquare row-${i} column-${j}`;
      content.appendChild(button);
    }
  }
  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = 0;
      }
    }
  }
  function addPiece(piece, row, column) {
    this.board[row][column] = piece;
  }
  return { resetBoard, addPiece, board }; // Prob remove board
})();

const gameState = (() => {
  const turn = 1;
  function changeTurn() {
    if (this.turn === 1) {
      this.turn = 2;
    } else { this.turn = 1; }
  }
  return { turn, changeTurn };
})();

const Player = (piece) => {
  this.piece = piece;
  function placePiece() {
    gameboard.addPiece(this.piece, row, column);
  }
};

const playerOne = Player('x');
const playerTwo = Player('o');

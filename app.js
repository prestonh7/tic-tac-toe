const gameState = (() => {
  const turn = 0;
  function changeTurn() {
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
  }
  function playTurn() {}
  return { turn, changeTurn, playTurn };
})();

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
  // Draws gameboard to screen
  const content = document.querySelector('.content');
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const button = document.createElement('button');
      button.className = `gameSquare ${i} ${j}`;
      button.addEventListener('click', (e) => {
        // const buttons = document.querySelectorAll('gameSquare');
        // const place = buttons.className.split(' ');
        // const row = buttons.split(' ')[1];
        // const column = buttons.split(' ')[2];
        // addPiece('x', row, column);
      });
      content.appendChild(button);
    }
  }
  return { resetBoard, addPiece, board }; // Prob remove board
})();

const Player = (piece) => {
  this.piece = piece;
  function placePiece() {} // Todo
};

const playerOne = Player('x');
const playerTwo = Player('o');

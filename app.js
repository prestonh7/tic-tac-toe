const gameState = (() => {
  const turn = 0;
  function changeTurn() {
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
  }
  function playTurn() {
    const number = button.split('-')[1];
  }
  return { turn, changeTurn, playTurn };
})();

const gameboard = (() => {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  // Draws gameboard to screen
  const content = document.querySelector('.content');
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const button = document.createElement('button');
      button.className = `gameSquare place-${count}`;
      count++;
      button.addEventListener('click', gameState.playTurn());
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

const Player = (piece) => {
  this.piece = piece;
  function placePiece() {} // Todo
};

const playerOne = Player('x');
const playerTwo = Player('o');

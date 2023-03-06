const gameboard = (() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
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
  function placePiece() {
    gameboard.addPiece(this.piece, row, column);
  }
  return { piece };
};

const playerOne = Player(1);

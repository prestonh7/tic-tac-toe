function Gameboard() {
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
  function addPiece(piece, column, row) {

  }
  return { resetBoard, addPiece };
}

const Player = (piece) => {
  this.piece = piece;
  return { piece };
};

const playerOne = Player(1);

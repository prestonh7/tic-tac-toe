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
        resetBoard();
        removePieces();
        return true;
      }
    }
    // Check columns
    for (let j = 0; j < board[0].length; j++) {
      if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
        resetBoard();
        removePieces();
        return true;
      }
    }
    // Check diagonals
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      resetBoard();
      removePieces();
      return true;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      resetBoard();
      removePieces();
      return true;
    }
    // No winner found
    return false;
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
        if (validTurn(i, j) === true) {
          if (gameState.turn === 1) {
            playTurn(i, j);
            button.innerText = 'X';
            checkForWinner();
          } else {
            playTurn(i, j);
            button.innerText = 'O';
            checkForWinner();
          }
        }
      });
      content.appendChild(button);
    }
  }
  return { resetBoard, board }; // Prob remove board
})();

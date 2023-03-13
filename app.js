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
              resetGame();
              console.log("X's wins!");
            } else if (!emptySpaces()) {
              resetGame();
              console.log('Tie!');
            }
          } else if (gameState.getTurn() === 2) {
            playTurn(i, j);
            button.innerText = 'O';
            if (checkForWinner()) {
              resetGame();
              console.log("O's wins!");
            } else if (!emptySpaces()) {
              resetGame();
              console.log('Tie!');
            }
          }
        }
      });
      content.appendChild(button);
    }
  }
  return { resetBoard, resetGame, board }; // Prob remove board
})();

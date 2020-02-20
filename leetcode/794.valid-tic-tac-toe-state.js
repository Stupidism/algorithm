const assert = require('assert');

/**
 * @param {string[]} board
 * @return {boolean}
 */
var validTicTacToe = function(board) {
  const counts = {
    'O': 0,
    'X': 0,
    ' ': 0,
  }
  for (let i = 0; i < 3; i++) {
    const row = board[i];
    for (let j = 0; j < 3; j++) {
      counts[row[j]] ++ ;
    }
  }
  
  const diff = counts.X - counts.O;
  if (diff !== 0 && diff !== 1) return false;

  if (diff === 0) {
    return !doesPlayerWin('X');
  }
    return !doesPlayerWin('O');

  
  function doesPlayerWin(player) {
    if (board[0][0] === player && board[0][1] === player && board[0][2] === player) return true;
    if (board[0][0] === player && board[1][0] === player && board[2][0] === player) return true;
    if (board[2][2] === player && board[2][1] === player && board[2][0] === player) return true;
    if (board[2][2] === player && board[1][2] === player && board[0][2] === player) return true;
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[1][0] === player && board[1][1] === player && board[1][2] === player) return true;
    if (board[0][1] === player && board[1][1] === player && board[2][1] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;

    return false;
  };
};


assert.deepEqual(validTicTacToe(["XXO", "XOX", "OXO"]), false);
assert.deepEqual(validTicTacToe(["   ", "   ", "   "]), true);
assert.deepEqual(validTicTacToe(["XOX", "O O", "XOX"]), true);
assert.deepEqual(validTicTacToe(["XXX", "XOO", "XOO"]), true);
assert.deepEqual(validTicTacToe(["O  ", "   ", "   "]), false);
assert.deepEqual(validTicTacToe(["XOX", " X ", "   "]), false);
assert.deepEqual(validTicTacToe(["XXX", "   ", "OOO"]), false);

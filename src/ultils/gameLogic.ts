
//creating a object Player
export enum Player {
  X = 'X',
  O = 'O',
}


// object typescripts
export interface GameState {
  board: (Player | null)[]
  currentPlayer: Player
  scores: {
    [Player.X]: number
    [Player.O]: number
  }
}

// core functions

// initialize the game when use click "start new game" button
export function initializeGame(): GameState {
  return {
    board: Array(9).fill(null), // initialize an empty board
    currentPlayer: Player.X, // sets the starting player
    scores: {
      [Player.X]: 0, // initial score for Player X
      [Player.O]: 0, // initial score for Player O
    },
  }
}


/*
* This function then iterates through these combination, checking if any combination is filled
* by the same player
* If a winning ombination is found, the function returns the player occupying those positions
* If no winning combination is found and the board is full (i.e. no 'null' valies), the function
* return 'Draw'
* If no winner and the board is not full, the function return "Null" indicating the game should continue
* 
*/
export function makeMove(state: GameState, position: number): GameState {
  // step 1 : check if the position is valid
  // position is invalid or  cell is already taken
  if (
    position < 0 ||
    position >= state.board.length ||
    state.board[position] !== null
  ) {
    return state
  }

  // step 2 : update the board.
  const newBoard = [...state.board]
  newBoard[position] = state.currentPlayer

  // step 3 : switch the current player
  const nextPlayer = state.currentPlayer === Player.X ? Player.O : Player.X
  // state.currentPlayer === Player.X: this is a condition that checks if the current player is 'Player.X'
  //
  // '? Player.O': the '?' makes begining the then-clause. if the condition (`state.currentPlayer === Player.X`)
  // is true, then the value of the expression is '
  //
  // ': Player.X': The `:` marks the beginning of the else-clause. if the condition is false,
  // (i.e., the current player is not `Player.X`), then `Player.X` is the result. So if the current player
  // is `Player.O`, the next player should `Player.X'

  // step 4 : return the updated state
  return {
    ...state,
    board: newBoard,
    currentPlayer: nextPlayer,
  }
}

export function checkWinner(board: (Player | null)[]): Player | 'Draw' | null {
  // reuse this function
  const winner = calculateWinner(board); 

  //check condition of winner 
  if(winner){
    return winner;
  }else if(isBoardFull(board)){
    return 'Draw';
  }else{
    return null;
  }
}



export function nextPlayer(currentPlayer: Player): Player {
  return currentPlayer === Player.X ? Player.O : Player.X;
  /*
    if (currentPlayer === Player.X) {
      return Player.O
    }else{
      return Player.X
    }
  */
}

export function resetGame(): GameState {
  // return{
  //   board: Array(9).fill(null), // reset the board all empty cells
  //   currentPlayer: Player.X,    // reset the starting player to Player.X
  //   scores:{
  //     [Player.X]: 0,            // Reset the score for the Player X
  //     [Player.O]: 0,            // Reset the score for the Player O
  //   }
  // }
  return initializeGame();
};

function calculateWinner(board: (Player | null)[]): Player | null {
  // define the winning combination
  // winningCombination array defines all possible
  // sets of positions that constitute a win
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // left-to-right diagonal
    [2, 4, 6], // right-to-left diagonal
  ]

  // Check for a winner
  // Loop through the winning combination
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] // return the winner (Player.X or Player.O)
    }
  }

  // no winner found 
  return null;
}

function isBoardFull(board: (Player | null)[]): boolean {
  return board.every(cell => cell !== null);
}

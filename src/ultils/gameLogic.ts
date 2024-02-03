import Scoreboard from '../components/Scoreboard'
import { Player } from '../components/PlayerEnum'
import { ScoresType } from '../components/ScoresType'


// object typescripts
export interface GameState {
	board: (Player | null)[]
	currentPlayer: Player
	scores: ScoresType;
}





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

	// calculate the next player
	const nextPlayer = state.currentPlayer === Player.X ? Player.O : Player.X

	// use checkWinner to determine the game result
	const gameResult = checkWinner(newBoard)

	// If the game already have a winner or is draw, not futher move should be allowed
	if (checkWinner(state.board) !== null || isBoardFull(state.board)) {
		return state
	}

	// if there is  a winner or draw, handle the game conclusion
	if (gameResult === Player.X || gameResult === Player.O) {
		// using spread operator in JS. for cloning an object
		// in react, it is a good practice to treat state as immutable. this means programmer should not directly modify the state the object
		// instead, we should create a new object with the updated values
		const newScores = { ...state.scores } // clone the score object
		if (gameResult === Player.X) { // if the game result is Player.X, increment the score the Player.X
			newScores[Player.X]++
		} else if (gameResult === Player.O) { // if the game result is Player.O, increment the score the Player.O
			newScores[Player.O]++
		}
		return{ // return the updated state
			...state, // spread operator. for cloning an object
			board: newBoard, // update the board
			currentPlayer: nextPlayer, // update the current player
			scores: newScores // update the scores
		};
	}

	
	return {
		...state, // spread operator.
		board: newBoard, // update the board
		currentPlayer: nextPlayer, // update the current player
	}
}

export function checkWinner(board: (Player | null)[]): Player | 'Draw' | null {
	// reuse this function
	const winner = calculateWinner(board)

	//check condition of winner
	if (winner) { 
		// if there is a winner that 
		// match up with the winning combination
		return winner
	} else if (isBoardFull(board)) {
		// if there is no winner is not having any winning combination 
		// and the board is full, then return "Draw"
		return 'Draw'
	} else {
		// continue the game 
		return null
	}
}

export function resetGame(currentScores: ScoresType): GameState{
	return{
		board: Array(9).fill(null),
		currentPlayer: Player.X,
		scores: currentScores
	};
}

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
	// continue the game
	return null
}

export function isBoardFull(board: (Player | null)[]): boolean {
	return board.every((cell) => cell !== null)
}

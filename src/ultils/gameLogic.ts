//import Scoreboard from '../components/Scoreboard'
import { Player } from '../components/PlayerEnum'
import { ScoresType } from '../components/ScoresType'
import RLAgent from '../ai/RLAgent'
//import React,{useState} from 'react'
import { error } from 'console'

/**
 * Converts the game board into a string representation.
 * @param board The game board as an array of Player or null values.
 * @returns A string representation of the board.
 */



// object typescripts
export interface GameState {
	board: (Player | null)[]
	currentPlayer: Player
	scores: ScoresType;
}


// intialize the RLAgent Instance
const rlAgent = new RLAgent()




// initialize the game when use click "start new game" button
export function initializeGame(): GameState {
	// console.log("Initialize game state \n")
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


//----------------------------------------------------------------------------------------------------------//
// AI Integration

// Assuming you have a function to get the current game state as a string
function getCurrentGameState(): string {
    // Implementation depends on how your game state is stored.
    // This should match the state format expected by RLAgent
	return '___'
}

// Assume this function is part of your game logic where you handle turns.
function onPlayerMove(position: number, gameState: GameState, setGameState: (newState: GameState) => void) {
	let newState = makeMove(gameState, position);
	setGameState(newState);
  
	// Check if the game is over after the player's move
	if (isGameOver(newState)) {
	  // Handle game over logic
	} else {
	  // It's AI's turn now
	  let aiState = aiMakeMove(newState,setGameState)
	}
}

// game over check
function isGameOver(state: GameState): boolean{
	// implement logic to check for a win or draw
	return checkWinner(state.board) !== null || isBoardFull(state.board)
}

// Function called within the game loop or event handler
export function aiMakeMove(gameState: GameState, setGameState:(newState:GameState) => void):GameState {
    

	const currentStateString = convertBoardToString(gameState.board)
	const aiAction = rlAgent.chooseAction(currentStateString)
	let newState = applyActionToGameState(gameState, aiAction, Player.O)

	// Assuming applyActionToGameState modifies the state directly or returns a new state
	setGameState(newState)

	// After AI's move, check if the game is over
	if (isGameOver(newState)) {
		// handle game over logic
	}

	return newState
}

// You need to implement applyActionToGameState, calculateReward, and other necessary functions
// based on your game's rules and state representation.


// In gameLogic.ts
export function applyActionToGameState(currentState: GameState, action: number, player: Player): GameState {
    // Logic to apply the move to the game state
    // This is a simplified example, adjust based on your actual game state structure
    let newState = { ...currentState };
    if (newState.board[action] === null) {
        newState.board[action] = player;
        // Additional logic to update game state based on the move
    }
    return newState;
}

// Then, in your React component or wherever you manage state:
// import { applyActionToGameState } from './gameLogic';
// Use applyActionToGameState to update the game state based on the AI's chosen action


export function handlePlayerMove(position: number, gameState: GameState, setGameState: (newState: GameState) => void): void{
	let newState = makeMove(gameState, position)

	//update game state based on player's move

	if (!isGameOver(newState)) {
		newState = aiMakeMove(newState,setGameState)
	}
}

export function convertBoardToString(board: (Player | null)[]): string{
	return board.map(cell => {
		switch (cell) {
			case Player.X:
				return 'X'
			case Player.O:
				return 'O'
			case null:
				return '-'
			default:
				return '-';
		}
	}).join('');
}



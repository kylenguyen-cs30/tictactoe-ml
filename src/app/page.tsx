'use client'
//import Image from 'next/image'
import React, { useState } from 'react'
import { 
	checkWinner,
	initializeGame, 
	makeMove, 
	resetGame, 
	convertBoardToString, 
	applyActionToGameState, 
	aiMakeMove 
} from '../ultils/gameLogic'
import Board from '../components/Board'
import GameControls from '../components/GameControls'
import Scoreboard from '../components/Scoreboard'
import RLAgent from '../ai/RLAgent'

const rlAgent = new RLAgent() 

export default function Home() {
	// usestate variable to set the state of the game
	const [gameState, setGameState] = useState(initializeGame())
	const [gameStatus, setGameStatus] = useState<string | null>(null)

	const triggerAIMove = () =>{
		aiMakeMove(gameState,setGameState)
	}

	// when player click on box 
	// const handleCellClick = (position: number) => {
	// 	const newState = makeMove(gameState, position)
	// 	setGameState(newState)
	// 	const winner = checkWinner(newState.board)
	// 	if (winner) {
	// 		setGameStatus(
	// 			winner === 'Draw' ? 'Game is a Draw' : `Winner is Player ${winner}`
	// 		)
	// 	}
	// }

	const handleCellClick = (position: number) =>{
		// human move 
		let newState = makeMove(gameState, position)
		setGameState(newState)

		// check for game over
		let winner = checkWinner(newState.board)
		if (winner) {
			setGameStatus(winner === 'Draw' ? 'Game is a Draw' : `Winner is Player ${winner}`)
		}else{
			// AI's turn 
			const aiAction = rlAgent.chooseAction(convertBoardToString(newState.board))
			newState = makeMove(newState, aiAction)
			setGameState(newState)

			// update game status based on ai move
			winner = checkWinner(newState.board)
			if (winner) {
				setGameStatus(winner === 'Draw' ? 'Game is a Draw' : `Winner is Player ${winner}`)
			}
		}
	}

	// handle reset when user click on the 'start new button'
	const handleReset = () => {
		setGameState(resetGame(gameState.scores))
		setGameStatus(null)
	};

	//Function to handle button click
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24 ">
			<div className="py-20 flex flex-col p-10 items-center justify-between">
				<h1
					className="text-4xl front-bold items-center"
					style={{ color: 'rgb(187, 171, 140)' }}
				>
					Tic Tac Toe{' '}
				</h1>

				<h2
					className="text-2xl py-5 items-center"
					style={{ color: 'rgb(187, 171, 140)' }}
				>
					{' '}
					Created by Kyle Nguyen
				</h2>

				{/* Display Game Status */}

				{gameStatus && <div className="game-status text-black">{gameStatus}</div>}

				{/* this is grid layout */}

				<Board board={gameState.board} onCellClick={handleCellClick} />

				{/* Button to start a new game */}

				<GameControls onReset={handleReset} />

				{/* Score Board  */}

				<Scoreboard scores={gameState.scores} />
			</div>

		</main>
	)
}

/*
    Purpose: This file appears to be a specific page in your Next.js application, possibly the main or home page.
    Content:
        The file defines a functional component Home that returns a JSX structure for the page's layout.
        It includes headings, buttons, and other elements, styled using Tailwind CSS classes.
    Usage: This is where you define the actual content and structure of a specific page. It seems to be set up for a Tic-tac-toe game, with buttons for game squares and a button to start a new game.
*/

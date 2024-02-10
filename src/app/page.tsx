'use client'
import React, { useEffect, useState } from 'react'
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

	
	
	
	// loadQTable
	// react component responsible for load data
	// into the AI model. using api routing 
	useEffect(() =>{
		console.log("data is being loaded\n")

		fetch("/api/loadQTable")
			.then(async (res) =>{
				// check if the reponse is ok (status in the range from 200-299)
				if(!res.ok){
					// if not okay, throw an error including the status 
					const text = await res.text();
					throw new Error(`HTTP ERROR : ${res.status} - ${text}`);
				}
				return res.json();
			})
			.then((data) =>{
				console.log("Loaded QTable data: ", data)
				rlAgent.loadData(data);
				console.log("QTable loaded succesffuly")
			})
			.catch((error: any) => {
				console.error("Fail to load QTable: ", error)
			})
	}, [])

	

	const handleCellClick = (position: number) =>{
		// human move
		console.log("gameState: ",gameState)
		console.log("position: ",position) 
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
			console.log("AI Action: ",aiAction)
			console.log("New State: ",newState)

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


//-----------------------------------------------------------------------
	//api call saveTable 
	// const handleSaveQTable = () => {
	// 	const qTableData = rlAgent.getQTableData();
	// 	saveQTable(qTableData)
	// }


	// saveQTable 
	// this function save the q-table after training
	// agent. 
	//
	// I need to firgure out away to call this function 
	// after training the model. 
	// async function saveQTable(qTableData: any){
	// 	console.log("saveQTable page.tsx is called")
	// 	try {
	// 		const response = await fetch('/api/saveQTable',{
	// 			method: 'POST',
	// 			headers:{
	// 				'Content-Type' : 'application/json',
	// 			},
	// 			body: JSON.stringify(qTableData),
	// 		});
	// 		if (!response.ok) {
	// 			throw new Error("Network response was not ok")
	// 		}
	// 		const responseData = await response.json()
	// 		console.log(responseData.message)
	// 	} catch (error) {
	// 		console.error('Failed to save QTable: ', error)
	// 	}
	// }
	//-----------------------------------------------------------------------




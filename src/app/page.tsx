'use client'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Home() {
	//initialize a state array with 9 elements, all set to null initially
	const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null))

	//Function to handle button click
	const handleButtonClick = (index: number) => {
		console.log('function is called')
		const newBoard = [...board]
		// set the clicked position to 'X' or 'O' based on the game logic
		//newBoard[index] = newBoard[index] === 'X'?'O': 'X'; // Or 'O', or alternating based on the current player
		newBoard[index] = 'X'
		setBoard(newBoard)
	}

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

				{/* this is grid layout */}

				<div className="grid grid-cols-3 gap-4 flex flex-col py-12 px-12 rounded items-center">
					{board.map((value, index) => (
						<div key={index}>
							{' '}
							{/*Add key prop here*/}
							<button
								// flex items-center justify-center are utility classes to center the content both vertically and horizontally within the button.
								className="bg-customColor hover:bg-blue-500 text-white font-bold text-lg py-12 px-12 rounded w-16 h-16 flex items-center justify-center"
								onClick={() => handleButtonClick(index)}
							>
								{value}
							</button>
						</div>
					))}
				</div>

				{/* Button to start a new game */}

				<div className="flex min-h-fit flex-col py-10">
					<button className="bg-startBtnColor hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
						Start a new game
					</button>
				</div>
				<div className="grid grid-cols-2 gap-5 flex flex-col p-10 items-center justify-between">
					<div>
						<h1
							className="text-2xl py-5"
							style={{ color: 'rgb(187, 171, 140)' }}
						>
							Player
						</h1>
					</div>
					<div>
						<h1
							className="text-2xl py-5"
							style={{ color: 'rgb(187, 171, 140)' }}
						>
							AI
						</h1>
					</div>
					<div>
						<h1
							className="text-2xl py-5"
							style={{ color: 'rgb(187, 171, 140)' }}
						>
							Result
						</h1>
					</div>
					<div>
						<h1
							className="text-2xl py-5"
							style={{ color: 'rgb(187, 171, 140)' }}
						>
							Result
						</h1>
					</div>
				</div>
			</div>
			<div>
				<h2 className="text-2xl py-5" style={{ color: 'rgb(187, 171, 140)' }}>
					Please visit my github:{' '}
				</h2>
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

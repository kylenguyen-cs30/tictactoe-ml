import React from 'react'
import Cell from './Cell'
import { Player } from './PlayerEnum'

// Define the types for the props that Board component will receive
type BoardProps = {
	// an array representing the game board. each cell
	// can be Player X, Player O, or null (empty)
	board: (Player | null)[]
	// a function to handle clicks on individual cells, takes
	// the cell index as argument
	onCellClick: (index: number) => void
}

// Board definition
const Board = ({ board, onCellClick }: BoardProps) => {
	/*
        1. JSX Context: the 'return' statement is returning JSX, which is HTML-like syntax used in React components
        2. Javascript expression: inside this JSX, you want to run a Javascript expression
    */
	return (
		<div className="grid grid-cols-3 gap-4">
			{board.map((value, index) => (
				<Cell
					key={index} // unique key for each cell
					value={value} // the value of cell (Player X, Player O or Null)
					onClick={() => onCellClick(index)} // Pass the click handler, calling onCellClick with cell's index
				/>
			))}
		</div>
	)
}

export default Board

/*Explanation:

    BoardProps: This type definition specifies the props 
    that the Board component expects. It includes the current 
    state of the game board (board) and a function to handle 
    cell clicks (onCellClick).

    Board Component: The Board function component is defined 
    with these props. It renders the game board using a grid layout.

    Mapping over board: Inside the component, we map over the board 
    array. For each cell in the array, a Cell component is rendered. The 
    key prop is essential for React to manage the list of elements efficiently.

    Passing Props to Cell: Each Cell component is given a value 
    (which can be Player.X, Player.O, or null) and an onClick handler. The onClick 
    handler is set up to call onCellClick with the index of the cell, 
    allowing the cell to communicate which position was clicked.
*/

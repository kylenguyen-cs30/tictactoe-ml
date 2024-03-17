import React, {useState} from 'react'
import { Player } from './PlayerEnum'

type CellProps = {
	value: Player | null
	onClick: () => void
}

const Cell = ({ value, onClick }: CellProps) => {
	const [isClicked, setIsClicked] = useState(false); // setting state variable for isClicked
	
	// handleClick function
	const handleClick = () =>{
		setIsClicked(true)
		onClick() // call the passed onClick function
		setTimeout(() => setIsClicked(false), 300) // reset after animation
	}

	const cellClass = `bg-customColor hover:bg-blue-500 text-white font-bold text-lg py-12 px-12 rounded w-16 h-16 flex items-center justify-center ${isClicked ?'animate-click' : ''}`

	return (
		<button
			className={cellClass}
			onClick={handleClick}
		>
			{value}
		</button>
	)
}

export default Cell

import React from 'react'
import { Player } from './PlayerEnum'

type CellProps = {
	value: Player | null
	onClick: () => void
}

const Cell = ({ value, onClick }: CellProps) => {
	return (
		<button
			className="bg-customColor hover:bg-blue-500 text-white font-bold text-lg py-12 px-12 rounded w-16 h-16 flex items-center justify-center"
			onClick={onClick}
		>
			{value}
		</button>
	)
}

export default Cell

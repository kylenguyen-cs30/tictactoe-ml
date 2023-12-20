import React from 'react';
import Cell from "./Cell";

const Board = ({ board, onCellClick }) => {
    return (
        <div className='grid grid-cols-3 gap4'>
            {board.map((value, index) =>(
                <Cell key={index} value={value} onClick={() => onCellClick(index)} />
            ))}
        </div>   
    );
};

export default Board;
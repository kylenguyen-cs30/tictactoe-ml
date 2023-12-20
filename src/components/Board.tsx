import React from 'react';
import Cell from "./Cell";

const Board = ({ board, onCellClick }) => {
    /*
        1. JSX Context: the 'return' statement is returning JSX, which is HTML-like syntax used in React components
        2. Javascript expression: inside this JSX, you want to run a Javascript expression
    */
    return (
        <div className='grid grid-cols-3 gap4'>
            {board.map((value, index) => (
                <Cell key={index} value={value} onClick={() => onCellClick(index)} />
            ))}
        </div>
    );
};

export default Board;
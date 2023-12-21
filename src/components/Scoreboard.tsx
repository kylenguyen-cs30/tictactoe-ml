import React from 'react';
import {Player} from './PlayerEnum';

type ScoreboardProps ={
    scores: {
        [Player.X]: number;
        [Player.O]: number;
    }
}

const Scoreboard = ({scores}: ScoreboardProps ) =>{
    return(
        <div className='scoreboard'>
            <div>Player X: {scores[Player.X]}</div>
            <div>Player O: {scores[Player.O]}</div>
        </div>
    );
};

export default Scoreboard;
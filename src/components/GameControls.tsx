import React from 'react';

type GameControlsProps = {
    onReset: () => void
}



const GameControls = ({onReset}: GameControlsProps) =>{
    return(
        <div className='flex min-h-fit flex-col py-10'>
            <button 
                className='bg-startBtnColor hover:bg-blue-500 text-white font-bold py-2 px-4 rounded'
                onClick = {onReset}
            >
                    Start a new game
            </button>
        </div>
    )
};

export default GameControls;
import { Player } from '@/components/PlayerEnum';
import {initializeGame, makeMove, checkWinner } from '../gameLogic'

describe('Game Logic Tests' , () => {
    test('initializeGame should create a new game state', () => {
        const initialState = initializeGame()
        expect(initialState.board).toEqual(Array(9).fill(null))
        expect(initialState.currentPlayer).toBe(Player.X)
        expect(initialState.scores).toEqual({ [Player.X]: 0, [Player.O]: 0})
    });

    test('makeMove shoud not update the board for invalid move', () =>{
        const initialState = initializeGame();
        const newState = makeMove(initialState, 0);
        const finalState = makeMove(newState, 0);
        expect(finalState).toEqual(newState);
    });

    test('makeMove shoud alternate players', () =>{

    });


    test('makeMove should update the board correctly', ()=>{
        const initialState = initializeGame();
        const newState = makeMove(initialState,0);
        expect(newState.board[0]).toBe(Player.X);
    });

    test('checkWiner should correctly identify the winner', ()=>{
        const winningBoard = [Player.X, Player.X, Player.X, null, null, null, null, null, null];
        expect(checkWinner(winningBoard)).toBe(Player.X);    
    });
})



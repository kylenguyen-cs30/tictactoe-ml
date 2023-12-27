import { Player } from '../components/PlayerEnum';
import {initializeGame, makeMove, checkWinner } from '../gameLogic'
import { init } from 'next/dist/compiled/webpack/webpack';

describe('Game Logic Tests' , () => {
    test('initializeGame should create a new game state', () => {
        const initialState = initializeGame()
        expect(initialState.board).toEqual(Array(9).fill(null))
        expect(initialState.currentPlayer).toBe(Player.X)
        expect(initialState.scores).toEqual({ [Player.X]: 0, [Player.O]: 0})
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

    // extra test

    test('makeMove shoud not update the board for invalid move', () =>{
        const initialState = initializeGame();
        const newState = makeMove(initialState, 0);
        const finalState = makeMove(newState, 0);
        expect(finalState).toEqual(newState);
    });

    test('makeMove shoud alternate players', () =>{
        const initialState = initializeGame();
        const newState = makeMove(initialState, 0); // first move is X
        expect(newState.currentPlayer).toBe(Player.O); // next move is O
    });

    test('checkWinner should return null for no winner', () =>{
        const noWinnerBoard = [Player.X, Player.O, Player.X, Player.O, Player.X, null, null, null, null];
        expect(checkWinner(noWinnerBoard)).toBe('Draw');
    })

    // additional test for vertical and diagonal wins
    test('checkWinner should return X for vertical win', () =>{
        const verticalWinBoard = [Player.X, null, null, Player.X, null, null, Player.X, null, null];
        expect(checkWinner(verticalWinBoard)).toBe(Player.X);
    });

    test('checkWinner should identify a diagonal win', () =>{
        const diagonalWinBoard = [Player.O, null, null, null, Player.O, null, null, null, Player.O];
        expect(checkWinner(diagonalWinBoard)).toBe(Player.O);  
    })

})





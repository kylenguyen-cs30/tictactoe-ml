import { Player } from '@/components/PlayerEnum';
import {initializeGame, makeMove, checkWinner } from '../gameLogic'

describe('Game Logic Tests' , () => {
    test('initializeGame should create a new game state', () => {
        const initialState = initializeGame()
        expect(initialState.board).toEqual(Array(9).fill(null))
        expect(initialState.currentPlayer).toBe(Player.X)
        expect(initialState.scores).toEqual({ [Player.X]: 0, [Player.O]: 0})
    });
})
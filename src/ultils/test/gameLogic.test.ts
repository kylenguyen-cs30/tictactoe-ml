import { Player } from '../../components/PlayerEnum'
import { initializeGame, makeMove, checkWinner, resetGame, isBoardFull } from '../gameLogic'
import { init } from 'next/dist/compiled/webpack/webpack'

describe('Game Logic Tests', () => {
	test('initializeGame should create a new game state', () => {
		const initialState = initializeGame()
		expect(initialState.board).toEqual(Array(9).fill(null))
		expect(initialState.currentPlayer).toBe(Player.X)
		expect(initialState.scores).toEqual({ [Player.X]: 0, [Player.O]: 0 })
	})

	test('makeMove should update the board correctly', () => {
		const initialState = initializeGame()
		const newState = makeMove(initialState, 0)
		expect(newState.board[0]).toBe(Player.X)
	})

	test('checkWiner should correctly identify the winner', () => {
		const winningBoard = [
			Player.X,
			Player.X,
			Player.X,
			null,
			null,
			null,
			null,
			null,
			null,
		]
		expect(checkWinner(winningBoard)).toBe(Player.X)
	})

	// extra test

	test('makeMove shoud not update the board for invalid move', () => {
		const initialState = initializeGame()
		const newState = makeMove(initialState, 0)
		const finalState = makeMove(newState, 0)
		expect(finalState).toEqual(newState)
	})

	test('makeMove shoud alternate players', () => {
		const initialState = initializeGame()
		const newState = makeMove(initialState, 0) // first move is X
		expect(newState.currentPlayer).toBe(Player.O) // next move is O
	})

	test('checkWinner should return null for no winner', () => {
		const noWinnerBoard = [
			Player.X,
			Player.O,
			Player.X,
			Player.O,
			Player.X,
			null,
			null,
			null,
			null,
		]
		expect(checkWinner(noWinnerBoard)).toBeNull
	})

	// additional test for vertical and diagonal wins
	test('checkWinner should return X for vertical win', () => {
		const verticalWinBoard = [
			Player.X,
			null,
			null,
			Player.X,
			null,
			null,
			Player.X,
			null,
			null,
		]
		expect(checkWinner(verticalWinBoard)).toBe(Player.X)
	})

	test('checkWinner should identify a diagonal win', () => {
		const diagonalWinBoard = [
			Player.O,
			null,
			null,
			null,
			Player.O,
			null,
			null,
			null,
			Player.O,
		]
		expect(checkWinner(diagonalWinBoard)).toBe(Player.O)
	})

	// test for invalid move
	test('makeMove should not update the board for move on taken cell', () => {
		const initialState = initializeGame()
		let newState = makeMove(initialState, 0) // player X move
		newState = makeMove(newState, 0) // player O move
		expect(newState.board[0]).toBe(Player.X) // board should not change
	})

	// test for resetGame function
	test('resetGame should reset the game to initial state', () => {
		let state = initializeGame()
		state = makeMove(state, 0) // make a move
		state = resetGame() // reset game
		expect(state).toEqual(initializeGame()) //state should be equal to initial state
	})

	//test for full board without winner
	test('checkWinner should return draw for a fullboard without winner', () => {
        const fullboard = [
            Player.X,
            Player.O,
            Player.X,
            Player.X,
            Player.O,
            Player.O,
            Player.O,
            Player.X,
            Player.X,
        ];
        expect(checkWinner(fullboard)).toBe('Draw');
    })

    //test for checking if board is full
    test('isBoardFull should return true for a full board', () =>{
        const fullBoard = Array(9).fill(Player.X);
        expect(isBoardFull(fullBoard)).toBeTruthy();
    })

    //test for checking if board is not full
    test('isBoardFull should return false', () => {
        const notFullBoard = [Player.X, null, Player.O, null, Player.X, null, Player.O, Player.X, null];
        expect(isBoardFull(notFullBoard)).toBeFalsy();
    })
})

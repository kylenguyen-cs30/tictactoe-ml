export enum Player{
    X = 'X',
    O = 'O',
}

export interface GameState{
    board: (Player | null)[];
    currentPlayer: Player;
    scores: {
        [Player.X]: number;
        [Player.O]: number;
    };
}

// core functions

export function initializeGame(): GameState {
    return{
        board: Array(9).fill(null), // initialize an empty board
        currentPlayer: Player.X,    // sets the starting player
        scores:{
            [Player.X]: 0,          // initial score for Player X
            [Player.O]: 0,          // initial score for Player O
        }
    };
}

export function makeMove(state: GameState, position: number): GameState {}

export function checkWinner(board: (Player | null)[]): Player | 'Draw' | null {}

export function nextPlayer(currentPlayer : Player): Player {}

export function resetGame(): GameState {}

function calculateWinner(board: (Player | null)[]): Player | null {}

function isBoardFull(board: (Player | null)[]):boolean {}

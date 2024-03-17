import { Player } from '../components/PlayerEnum'

// define a type for scores
export type ScoresType = {
    [Player.X]: number;
    [Player.O]: number;
}
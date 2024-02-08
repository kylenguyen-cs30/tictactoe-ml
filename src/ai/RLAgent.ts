import next from 'next';
import { QTable } from './QTable';

class RLAgent {
	private qTable: QTable
	private learningRate: number
	private discountFactor: number
	private epsilon: number

	constructor(learningRate = 0.1, discountFactor = 0.9, epsilon = 0.1) {
		// Initialize Q-Table
		// using a map to store state-action and their Q-Values
		this.qTable = new QTable()
		// Learning rate (alpha) - controls how much the Q-Value is updated
		this.learningRate = learningRate
		// dicount factor (gamma) - importance of future reward
		this.discountFactor = discountFactor
		// Epsilon - controls the trade-off between exploration and exploitation
		this.epsilon = epsilon
	}



	// given a state, choose an action
	// method to choose the next action
	chooseAction(state: string): number {
		// Exploration: Choose a random action
		if (Math.random() < this.epsilon) {
			// Exploration: choose a random action
			return this.chooseRandomAction(state)
		} else {
			// Exploitation: choose the action with the highest Q-Value
			return this.chooseBestAction(state)
		}
	}

	
	// helper to choose a random valid action
	private chooseRandomAction(state: string): number {
		const validActions = this.getValidActions(state)
		return validActions[Math.floor(Math.random() * validActions.length)]
	}
	// helper method to get valid actions (empty cells) from the current state
	private getValidActions(state: string): number[] {
		// Convert the state into an array of valid actions (indices of empty cells)
		return state
			.split('')
			.map((cell, index) => (cell === '-' ? index : -1))
			.filter((index) => index !== -1)
	}



	// helper method to choose the best action based on Q-values
	private chooseBestAction(state: string): number {
		return this.qTable.getBestAction(state)
	}


	// Train Agent Function
	// This funtion responsible for training the AI. 
	train(episodes: number) {
		for (let episode = 0; episode < episodes; episode++) {
			let state = this.initializeGameState();
			let loopDone = false;

			while (!loopDone) {
				const action = this.chooseAction(state)
				const {nextState, reward, done} = this.takeAction(state,action)
				//this.updateQTable(state, action, reward, nextState)
				this.qTable.update(state,action,reward,nextState, this.learningRate, this.discountFactor);
				state = nextState

				if (done) {
					// log the episode's outcome
					loopDone = true
					console.log(`Episode ${episode + 1}: Game Over`)
				}
			}
		}
	}

	// initializeGameState
	private initializeGameState(): string {
		// initialize the game state
		return '---------'
	}

	// isTerminal
	private isTerminal(state: string): boolean {
		// implement logic to determine if the game is over
		// this could involve chekcing for a win or draw
		return this.checkForWin(state) || this.checkForDraw(state) || this.isBoardFull(state)
	}

	// checkForWin
	private checkForWin(state: string): boolean {
		const winningCombination = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]

		for (const [a, b, c] of winningCombination) {
			if (state[a] !== '-' && state[a] === state[b] && state[a] === state[c]) {
				return true
			}
		}
		return false
	}

	// checkForDraw
	private checkForDraw(state: string): boolean {
		// check if there are no more empty cells and no win
		return !state.includes('-') && !this.checkForWin(state)
	}

	// takeAction
	private takeAction(
		state: string,
		action: number
	): { nextState: string; reward: number; done: boolean } {
		// implement the logic to update the state based on the action
		// and determine the reward for the action
		let nextState = this.updateState(state, action)
		let reward = this.calculateReward(state, action)
		let done = this.isTerminal(nextState)
		return { nextState, reward, done }
	}

	// updateState
	private updateState(state: string, action: number): string {
		// update the board with the agent's action
		return state.substring(0, action) + 'X' + state.substring(action + 1)
	}

	// calculateReward
	private calculateReward(state: string, action: number): number {
		// Calculate the reward based on the state
        const nextState = this.updateState(state,action);
        if(this.checkForWin(nextState)){
            return 1; // reward for winning
        }else if(this.checkForDraw(nextState)){
            return 0.5; // smaller reward for draw
        }else{
            return 0; // no reward for continuting game
        }
	}

	private isBoardFull(state: string): boolean{
		return !state.includes('-');
	}

	public saveQTable(filePath:string){
		this.qTable.save(filePath)
	}
}


export default RLAgent

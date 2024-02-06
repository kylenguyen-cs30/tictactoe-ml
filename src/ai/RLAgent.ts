

class RLAgent {
	private qTable: Map<string, Map<string, number>>
	private learningRate: number
	private discountFactor: number
	private epsilon: number

	constructor(learningRate = 0.1, discountFactor = 0.9, epsilon = 0.1) {
		// Initialize Q-Table
		// using a map to store state-action and their Q-Values
		this.qTable = new Map()
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
		const validActions = this.getValidActions(state)
		let bestAction =
			validActions[Math.floor(Math.random() * validActions.length)]
		let maxQValue = Number.NEGATIVE_INFINITY

		// check if the current state is in the Q-Table
		if (this.qTable.has(state)) {
			validActions.forEach((action) => {
				// retrieve the Q-Value for the each action and update the best action if needed
				const qValue = this.qTable.get(state)?.get(action.toString()) || 0
				if (qValue > maxQValue) {
					maxQValue = qValue
					bestAction = action
				}
			})
		}

		return bestAction
	}

	// update the Q-Table
	updateQTable(
		state: string,
		action: number,
		reward: number,
		nextState: string
	) {
		// Initialize Q-value for the current state-action pair if not already
		if (!this.qTable.has(state)) {
			this.qTable.set(state, new Map())
		}
		if (!this.qTable.get(state)?.has(action.toString())) {
			this.qTable.get(state)?.set(action.toString(), 0)
		}

		// Get current Q-value for the state-action pair
		const currentQValue = this.qTable.get(state)?.get(action.toString()) || 0

		// Calculate the maximum Q-Value for the next state
		let maxNextQValue = 0
		const nextStateValue = this.qTable.get(nextState)
		if (nextStateValue) {
			maxNextQValue = Math.max(...Array.from(nextStateValue.values()))
		}

		// Calculate the new Q-Value using the Q-learning formula
		const newQValue =
			currentQValue +
			this.learningRate *
				(reward + this.discountFactor * maxNextQValue - currentQValue)

		// Update the Q-Table with the new Q-value
		this.qTable.get(state)?.set(action.toString(), newQValue)
	}


	// Train Agent Function
	// This funtion responsible for training the AI. 
	train(episodes: number) {
		for (let episode = 0; episode < episodes; episode++) {
			let state = this.initializeGameState();
			let done = false;

			while (!done) {
				const action = this.chooseAction(state)
				const {nextState, reward, done} = this.takeAction(state,action)
				this.updateQTable(state, action, reward, nextState)
				state = nextState

				if (done) {
					// log the episode's outcome
					console.log(`Episode ${episode+1}: Game Over`)
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
}


export default RLAgent

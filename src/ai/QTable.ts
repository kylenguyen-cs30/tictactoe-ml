/*
QTable.ts

    Purpose: This file likely contains the implementation of a Q-Table, which 
    is a fundamental concept in reinforcement learning. A Q-Table helps the AI
    learn and store the values (Q-values) of taking certain actions in specific 
    states, guiding it towards making decisions that maximize the cumulative 
    reward over time.
    Functionality: The Q-Table represents a table where each row corresponds to 
    a possible state in the game, and each column corresponds to the possible actions 
    the AI can take in those states. The values in the table (Q-values) are updated as 
    the AI learns from its actions' outcomes. This learning process is guided by the 
    Q-learning algorithm, which iteratively updates the Q-values based on the reward 
    received for actions taken, the learning rate, and the discount factor for future rewards.
*/

//import fs, { stat } from 'fs';
//import * as fs from 'fs';

export class QTable {
	private table: Map<string, Map<number, number>>

	constructor() {
		this.table = new Map()
	} // create a new Map()

	// Method to update the Q-Value for a given state and action
	/*
    Q(s,a)=Q(s,a) + α × (r + γ × maxa′Q(s′,a′)−Q(s,a))
    */

	update(
		state: string,
		action: number,
		reward: number,
		nextState: string,
		learningRate: number,
		discountFactor: number
	) {
		// Implementation of the Q-Learning update rule
		// similar to your updateQTable method in RLAgent.ts

		console.log('state: ', state)
		console.log('action: ', action)
		console.log('reward: ', reward)
		console.log('nextState: ', nextState)

		if (!this.table.has(state)) {
			this.table.set(state, new Map())
		}
		// get the current q-Value for the state-action pair, defaulting to 0 if
		// it does not exist
		let currentQValue = this.table.get(state)?.get(action) || 0

		let nextStateActions = this.table.get(nextState)
		let maxNextQValue = 0
		if (nextStateActions) {
			maxNextQValue = Math.max(...Array.from(nextStateActions.values()))
		}

		// calculate the new Q-Value using the Q-learning fomula
		let newQValue =
			currentQValue +
			learningRate * (reward + discountFactor * maxNextQValue - currentQValue)

		// update the Q-table with the new Q-value for the state-action pair
		this.table.get(state)?.set(action, newQValue)
	}

	// Method to get the best action for a given state
	// the data which this getBestAction() function is getting from pre-train session
	// that is setting up and save into data sheets
	getBestAction(state: string): number {
		console.log('getBestAction() is called')
		// logic to determine the best action

		// Check if the state exists in the table
		const stateActions = this.table.get(state)

		// if there are no actions for this state, return -1
		if (!stateActions || stateActions.size === 0) {
			return -1
		}

		// Iterate over all actions to find the one with highest Q-Value
		let bestAction = -1
		let maxQValue = -Infinity
		for (const [action, qValue] of stateActions.entries()) {
			if (qValue > maxQValue) {
				maxQValue = qValue
				bestAction = action
			}
		}
		return bestAction
	}

	//load data from client side
	loadFromData(data: [string, [number, number][]][]): void {
		//console.log("Data received from leading into Q-Table:", actions);

		// DEBUGGING : check if each pair can be used to construct a MAP without errors
		// data.forEach(([state,actions]) => {
		// 	console.log(`State : ${state}, Actions: `, actions);
		// 	try{
		// 		console.log(`Test Map for state ${state}: `, error)
		// 	}catch(error){
		// 		console.error(`Error creating map for state ${state}: `,error)
		// 	}
		// })

		try {
			this.table.clear()
			//const tableArray = data
			//this.table = new Map(tableArray.map(([state, actions]) => [state, new Map(actions)]))
			data.forEach(([state, actions]) => {
				console.log(`Loading state: ${state}, Actions: `, actions)
				// Ensure 'actions' is in the correct format
				console.log(Array.isArray(actions), actions) // Should log true followed by the array of actions
				try {
					this.table.set(state, new Map(actions))
				} catch (error) {
					console.error('Error creating map for state ' + state + ': ', error)
				}
			})
			console.log('Q-table loaded from data succesfully')
		} catch (error) {
			console.error('Fail to load Q-Table: ', error)
		}
	}

	serialize() {
		return Array.from(this.table.entries()).map(([state, actions]) => {
			return [state, Array.from(actions.entries())]
		})
	}
}

// load the Q-table from a file
// this one is only used in server-side
// load(filePath: string){

//     try {
//         const tableString = fs.readFileSync(filePath, 'utf8');
//         const tableArray: [string, [number, number][]][] = JSON.parse(tableString)
//         this.table = new Map(tableArray.map(([state,actions])=> [state, new Map(actions)]))
//         console.log("Q-table loaded successfully\n")
//     } catch (error) {
//         console.log('Failed to load Q-Table: ' ,error )
//     }
// }

// save the Q-table to a file
// save(filePath: string){
//     try {
//         const tableString = JSON.stringify(Array.from(this.table.entries()))
//         fs.writeFileSync(filePath, tableString)
//         console.log("Save Q-Table Succesfully \n")
//     } catch (error) {
//         console.log("Fail to save Q-Table: " , error)
//     }
// }

//--------------------------------------------------------------------------------
/*

	// update the q-table
	updateqtable(
		state: string,
		action: number,
		reward: number,
		nextstate: string
	) {
		if (typeof action !== 'number') {
			console.error('invalid action',action)
			return
		}
		// debug
		console.log("state: ", state)
		console.log("action: ", action)
		console.log("reward: ", reward)
		console.log("nextstate: ", nextstate)
		// initialize q-value for the current state-action pair if not already
		if (!this.qtable.has(state)) {
			this.qtable.set(state, new map())
		}
		if (!this.qtable.get(state)?.has(action.tostring())) {
			this.qtable.get(state)?.set(action.tostring(), 0)
		}

		// get current q-value for the state-action pair
		const currentqvalue = this.qtable.get(state)?.get(action.tostring()) || 0

		// calculate the maximum q-value for the next state
		let maxnextqvalue = 0
		const nextstatevalue = this.qtable.get(nextstate)
		if (nextstatevalue) {
			maxnextqvalue = math.max(...array.from(nextstatevalue.values()))
		}

		// calculate the new q-value using the q-learning formula
		const newqvalue =
			currentqvalue +
			this.learningrate *
				(reward + this.discountfactor * maxnextqvalue - currentqvalue)

		// update the q-table with the new q-value
		this.qtable.get(state)?.set(action.tostring(), newqvalue)
 	}

    */

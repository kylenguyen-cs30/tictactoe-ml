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

		console.log("stateActions: ", stateActions)
		// if there are no actions for this state, return -1
		if (!stateActions || stateActions.size === 0) {
			const validActions = this.getValidActions(state)
			return validActions[Math.floor(Math.random() * validActions.length)]
			//return -1
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

	getValidActions(state: string):number[]{
		const validActions = []
		for(let i = 0; i < state.length; i++){
			if (state[i] === '-') {
				validActions.push(i)
			}
		}
		return validActions

	}

    loadFromData(data: { [key: string]: { [action: number]: number } }): void {
        try {
            this.table.clear();
            Object.entries(data).forEach(([state, actions]) => {
                //console.log(`Loading state: ${state}, Actions: `, actions);
                const actionMap = new Map<number, number>();
                Object.entries(actions).forEach(([action, qValue]) => {
                    actionMap.set(Number(action), qValue);
                });
                this.table.set(state, actionMap);
            });
            console.log('Q-table loaded from data successfully');
        } catch (error) {
            console.error('Failed to load Q-Table: ', error);
        }
    }
    

	serialize() {
		return Array.from(this.table.entries()).map(([state, actions]) => {
			return [state, Array.from(actions.entries())]
		})
	}


    getQTableData(): any {
        const tableObject: { [key: string]: { [key: number]: number } } = {};
        this.table.forEach((actionsMap, state) => {
            tableObject[state] = {};
            actionsMap.forEach((qValue, action) => {
                tableObject[state][action] = qValue;
            });
        });
        return tableObject;
    }
}


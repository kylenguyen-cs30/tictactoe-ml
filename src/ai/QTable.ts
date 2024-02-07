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
import fs from 'fs';

export class QTable{
    private table: Map<string, Map<number,number>>;

    constructor(){ this.table = new Map()} // create a new Map()

    // Method to update the Q-Value for a given state and action
    /*
    Q(s,a)=Q(s,a) + α × (r + γ × maxa′Q(s′,a′)−Q(s,a))
    

    */
    update(
        state:string,
        action:number,
        reward:number,
        nextState:string,
        learningRate: number, 
        discountFactor: number
        ){
            // Implementation of the Q-Learning update rule
            // similar to your updateQTable method in RLAgent.ts

        }

    // Method to get the best action for a given state
    getBestAction(state : string): number{
        // logic to determine the best action
        return 0
    }

    // save the Q-table to a file
    save(filePath: string){
        const tableString = JSON.stringify(Array.from(this.table.entries()))
        fs.writeFileSync(filePath, tableString)
    }


    // load the Q-table from a file
    load(filePath: string){
        const tableString = fs.readFileSync(filePath, 'utf8');
        const tableArray: [string, [number, number][]][] = JSON.parse(tableString)
        this.table = new Map(tableArray.map(([state,actions])=> [state, new Map(actions)]))
    }

}
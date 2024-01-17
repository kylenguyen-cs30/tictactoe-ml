

class RLAgent {
    private qTable: Map<string, Map<string, number>>;
    private learningRate: number;
    private discountFactor: number;
    private epsilon: number;
    
    constructor(learningRate = 0.1, discountFactor = 0.9, epsilon = 0.1){
        // Initialize Q-Table
        // using a map to store state-action and their Q-Values
        this.qTable = new Map(); 
        // Learning rate (alpha) - controls how much the Q-Value is updated
        this.learningRate = learningRate; 
        // dicount factor (gamma) - importance of future reward
        this.discountFactor = discountFactor;
        // Epsilon - controls the trade-off between exploration and exploitation
        this.epsilon = epsilon;
    }
    
    // given a state, choose an action
    // method to choose the next action
    chooseAction(state: string): number{
        // Exploration: Choose a random action
        if(Math.random() < this.epsilon){
            // Exploration: choose a random action
            return this.chooseRandomAction(state);
        }else{
            // Exploitation: choose the action with the highest Q-Value
            return this.chooseBestAction(state);
        }


    }
    // helper to choose a random valid action
    private chooseRandomAction(state: string): number{
        const validActions = this.getValidActions(state)
        return validActions[Math.floor(Math.random() * validActions.length)]
    }
    // helper method to get valid actions (empty cells) from the current state
    private getValidActions(state: string): number[]{
        // Convert the state into an array of valid actions (indices of empty cells)
        return state.split('').map((cell,index) => cell ==='-' ? index :-1).filter(index => index !== -1)
    }

    // helper method to choose the best action based on Q-values
    private chooseBestAction(state:string): number{
        const validActions = this.getValidActions(state)
        let bestAction = validActions[Math.floor(Math.random()* validActions.length)]
        let maxQValue = Number.NEGATIVE_INFINITY;

        // check if the current state is in the Q-Table
        if(this.qTable.has(state)){
            validActions.forEach(action =>{
                // retrieve the Q-Value for the each action and update the best action if needed
                const qValue = this.qTable.get(state)?.get(action.toString()) || 0;
                if(qValue > maxQValue){
                    maxQValue = qValue;
                    bestAction = action;
                }
            });
        }

        return bestAction;

    }



    // update the Q-Table
    updateQTable(state : string,action : number, reward : number, nextState : string){
        // Initialize Q-value for the current state-action pair if not already
        if(!this.qTable.has(state)){
            this.qTable.set(state, new Map())
        }
        if(!this.qTable.get(state)?.has(action.toString())){
            this.qTable.get(state)?.set(action.toString(),0)
        }

        // Get current Q-value for the state-action pair
        const currentQValue = this.qTable.get(state)?.get(action.toString()) || 0;

        // Calculate the maximum Q-Value for the next state
        let maxNextQValue = 0
        const nextStateValue = this.qTable.get(nextState)
        if(nextStateValue){
            maxNextQValue = Math.max(...Array.from(nextStateValue.values()));
        }

        // Calculate the new Q-Value using the Q-learning formula
        const newQValue = currentQValue + this.learningRate * (reward + this.discountFactor * maxNextQValue - currentQValue);

        // Update the Q-Table with the new Q-value
        this.qTable.get(state)?.set(action.toString(), newQValue);        
    }

    // Train the agent
    train(episodes : number){
        for (let i = 0; i < episodes; i++) {
            // initialize the state (start a new game)
            let state = this.initializeGameState()

            // Continue the episode until it reaches a terminal state
            while(!this.isTerminal(state)){
                // choose an action based on the current state
                const action = this.chooseAction(state)

                // take the action, observe the new state and reward
                const {nextState, reward} = this.takeAction(state, action)

                // update the Q-Table based on the state, action, reward and next state
                this.updateQTable(state, action, reward, nextState)

                // Move to the next state
                state = nextState
            }
        }
    }

}

export default RLAgent;




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

    private chooseRandomAction(state: string): number{}

    private chooseBestAction(state:string): number{}



    // updaet the Q-Table
    updateQTable(state,action, reward, nextState){}

    // Train the agent
    train(episodes){
        for (let i = 0; i < episodes; i++) {
            
        }
    }

}

export default RLAgent;


/*
REINFORCEMENT LEARNING is a machine learning model that is using learning over time tech in order to 
imporve the intelligent. 

key terminology :

- State Representation : define how you will repsent the state of the Tic Tac Toe board in a way that the RL agent 
can understand. this could be a simple string or numerical representation of the board.

- Action Space: In Tictactoe, the action is relatively simple - choosing a cell to place the mark (X or O)
. Ensure the agent knows the valid action at each state 

- Reward : Define the reward structure. Commonly, wins could have a positive reward, losses a negative reward,


DOCUMENTATION: 

1. constructor(): 

- The `constructor` method is called when a new instance of `RLAgent` is created. it is used
to initialize the agent with properties it will need.

- `this.qTable` : this is a data structure ( like a Map or an Object) used to store the 
Q-Values for state-action pairs. Q-Values represent the "quality" or expected utility of taking
a given action in a given state.

2. chooseAction(state): 

- this method determines which action the agent should take in a given state.

- input - `state`: represent the current state of the environment (the Tic Tac Toe board in your case).

- output: chosen action (e.g. the position where the agent decides to place its mark on the Tic Tac Toe Board)

- Functionality: initially, this might involve choosing an action randomly or following a simple heuristic. as the 
agent learns it should use the information in the Q-table to choose actions that maximize expected rewards

3. updateQTable(state, action, reward, nextState): 

- this method updates the Q-Table based on the agent experience.
- inputs: 
    * `state`: the current state of the environment
    * `action`: the action taken by the agent
    * `reward`: the reward received for taking the action
    * `nextState`: the next state of the environment after taking the action
- Functionality : the method implements the Q-Learning update rule it. It adjust the Q-Value for the given
state-action pair based on the observed reward and the maximum expected future rewards (derived from the `nextState`)

4. train(episodes):





*/
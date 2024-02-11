# REINFORCEMENT LEARNING is a machine learning model that is using learning over time tech in order to imporve the intelligent. 

# key terminology :

- State Representation : define how you will repsent the state of the Tic Tac Toe board in a way that the RL agent 
can understand. this could be a simple string or numerical representation of the board.

- Action Space: In Tictactoe, the action is relatively simple - choosing a cell to place the mark (X or O)
. Ensure the agent knows the valid action at each state 

- Reward : Define the reward structure. Commonly, wins could have a positive reward, losses a negative reward,
# AI Constructor
## Learning Rate (α)
- Definition: The learning rate, often denoted as α (alpha), determines how much new information overrides old information. It is a factor that weighs the update to the Q-value of a given state-action pair.

- Role in Learning: A higher learning rate means that newer information is considered more important, allowing the agent to adapt more quickly to changing conditions. A lower learning rate means that older information retains its value longer, leading to more stable but slower learning.

- Typical Values: Usually between 0 and 1. Setting it too high can cause the learning to be unstable, while setting it too low can cause the learning to be too slow.
## Discount Factor (γ)
- Definition: The discount factor, denoted as γ (gamma), is used to balance the importance of immediate rewards versus future rewards. It determines the present value of future rewards.

- Role in Learning: A discount factor close to 1 values future rewards almost as highly as immediate rewards, encouraging strategies that consider long-term benefits. A discount factor close to 0 makes the agent short-sighted by prioritizing immediate rewards.

- Impact: Influences the agent's strategy by balancing exploration of unknown strategies that might yield higher future rewards against exploitation of known strategies that yield immediate rewards.
## Epsilon (ε)
- Definition: Epsilon, denoted as ε (epsilon), is used in epsilon-greedy strategies to balance the exploration of the action space against the exploitation of the agent's current knowledge.

- Role in Exploration and Exploitation: A higher epsilon value increases the likelihood of taking random actions, promoting exploration of the environment. A lower epsilon value encourages the agent to rely on its current Q-values to make decisions, promoting exploitation of known information.

- Adaptation Over Time: Typically, epsilon starts high and gradually decreases over time (epsilon decay), allowing the agent to explore widely initially, then gradually shift towards exploiting its accumulated knowledge as it learns more about the environment.

# DOCUMENTATION RLAgent() : 

## constructor(): 

- The `constructor` method is called when a new instance of `RLAgent` is created. it is used
to initialize the agent with properties it will need.

- `this.qTable` : this is a data structure ( like a Map or an Object) used to store the 
Q-Values for state-action pairs. Q-Values represent the "quality" or expected utility of taking
a given action in a given state.

'''
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
'''

## chooseAction(state): 

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

## train(episodes):

- this method is responsible for trainning the RL agent

- Input- `episodes`: the number of games the agent should play to learn from. 

- Functionality: the agent plays sever games against either itself or a predefined strategy, learning from each game's outcome. It repeatedly calls

- `chooseAction` to make decissions and `updateQTable` to learn from the results of those decisions. Trainning involves letting the agent explore different strtegies, make mistakes, and gradually improve its policy (strategy) for choosing actions.


- Q-Value in reinforcement learning is a fundamental concept, particularly in Q-learning, a specific type of reinforcement learning. 

1. Basic Definition : A Q-value, or "Quality" value, is a numerical measure used in reinforcement learning to represent the expected utility of taking a certain action in a given state. it essentially answer the questions.

2. Purpose : Q-value helps the learning agent (like your AI in Tic Tac Toe) make decisions. By comparing the Q-Values of different actions in a given state, the agent can choose the action that it believes will yeild the highest reward, not just immediately, but over time. 

3. Calculation: in Q-learning, the Q-value for state action pair is calculated using the Bellman equation, which considers: 
    * the immediate reward received after taking action
    * the discounted future rewards that the agent expects to receive from the next state. This is where the 'discount factor' plays a role, indicating the importance of future rewards compared to immediate rewards. 


```
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

```

- Input- `episodes`: the number of games the agent should play to learn from.
- Functionality: the agent plays sever games against either itself or a predefined strategy, learning from each game's outcome. It repeatedly calls
- `chooseAction` to make decissions and `updateQTable` to learn from the results of those decisions. Trainning involves letting the agent



## initializeGameState()

```
private initializeGameState():string{
        // initialize game state
        return '---------'; 
}
```

- this method initializes the game state.
- input: none
- output: the initial game state
- Functionality: this method initializes the game state. It is called at the start of each new game.


## isTerminal() 

```
private isTerminal(state: string): boolean{
        // implement logic to determine if the game is over
        // this could involve chekcing for a win or draw
        return this.checkForWin(state) || this.checkForDraw(state);
}

```

- this method determines if the game is over.
- input: `state`: the current game state
- output: `boolean`: true if the game is over, false otherwise
- Functionality: this method determines if the game is over. It is called at the end of each game.


## checkForWin()

```
private checkForWin(state: string):boolean{
    // check if the game is over
    return false
}
```

- this method determines if the game is over.
- input: `state`: the current game state
- output: `boolean`: true if the game is over, false otherwise
- Functionality: this method determines if the game is over. It is called at the end of each game.

## takeAction()

```
private takeAction(state: string, action: number): {nextState: string, reward: number}{
        // implement the logic to update the state based on the action
        // and determine the reward for the action
        let nextState = this.updateState(state, action);
        let reward = this.calculateReward(state, action);
        return {nextState, reward}
}
```

- this method takes the action and updates the game state.
- input: `state`: the current game state, `action`: the action taken
- output: `nextState`: the new game state, `reward`: the reward for the action
- Functionality: this method takes the action and updates the game state. It is called at the end of each game.

## checkForDraw()
'''
private checkForDraw(state: string): boolean {
		// check if there are no more empty cells and no win
		return !state.includes('-') && !this.checkForWin(state)
	}
'''
- 

# DOCUMENTATION QTable.ts:

## Application: 
- This file contains implementation of a class QTable which is an important component for Reinforcement Learning Machine Learning. This component respondsbile for storing data after finishing training agent in this case game "tic tac toe" will also train with another ai in order for the AI to be better at planning and stategry. 

## constructor(): 
- initialize 'table' property as an empty table 
'''
constructor(){ this.table = new Map()} // create a new Map()
'''

## Method : update(state: string, action: number, reward: number, nextState: string, learningRate: number, discountFactor: number)
- Implement the Q-learning update rule. This method is supposed to update the Q-Value 

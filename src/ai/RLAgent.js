"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RLAgent = /** @class */ (function () {
    function RLAgent(learningRate, discountFactor, epsilon) {
        if (learningRate === void 0) { learningRate = 0.1; }
        if (discountFactor === void 0) { discountFactor = 0.9; }
        if (epsilon === void 0) { epsilon = 0.1; }
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
    RLAgent.prototype.chooseAction = function (state) {
        // Exploration: Choose a random action
        if (Math.random() < this.epsilon) {
            // Exploration: choose a random action
            return this.chooseRandomAction(state);
        }
        else {
            // Exploitation: choose the action with the highest Q-Value
            return this.chooseBestAction(state);
        }
    };
    // helper to choose a random valid action
    RLAgent.prototype.chooseRandomAction = function (state) {
        var validActions = this.getValidActions(state);
        return validActions[Math.floor(Math.random() * validActions.length)];
    };
    // helper method to get valid actions (empty cells) from the current state
    RLAgent.prototype.getValidActions = function (state) {
        // Convert the state into an array of valid actions (indices of empty cells)
        return state
            .split('')
            .map(function (cell, index) { return (cell === '-' ? index : -1); })
            .filter(function (index) { return index !== -1; });
    };
    // helper method to choose the best action based on Q-values
    RLAgent.prototype.chooseBestAction = function (state) {
        var _this = this;
        var validActions = this.getValidActions(state);
        var bestAction = validActions[Math.floor(Math.random() * validActions.length)];
        var maxQValue = Number.NEGATIVE_INFINITY;
        // check if the current state is in the Q-Table
        if (this.qTable.has(state)) {
            validActions.forEach(function (action) {
                var _a;
                // retrieve the Q-Value for the each action and update the best action if needed
                var qValue = ((_a = _this.qTable.get(state)) === null || _a === void 0 ? void 0 : _a.get(action.toString())) || 0;
                if (qValue > maxQValue) {
                    maxQValue = qValue;
                    bestAction = action;
                }
            });
        }
        return bestAction;
    };
    // update the Q-Table
    RLAgent.prototype.updateQTable = function (state, action, reward, nextState) {
        var _a, _b, _c, _d;
        if (typeof action !== 'number') {
            console.error('Invalid action', action);
            return;
        }
        // debug
        console.log("state: ", state);
        console.log("action: ", action);
        console.log("reward: ", reward);
        console.log("nextState: ", nextState);
        // Initialize Q-value for the current state-action pair if not already
        if (!this.qTable.has(state)) {
            this.qTable.set(state, new Map());
        }
        if (!((_a = this.qTable.get(state)) === null || _a === void 0 ? void 0 : _a.has(action.toString()))) {
            (_b = this.qTable.get(state)) === null || _b === void 0 ? void 0 : _b.set(action.toString(), 0);
        }
        // Get current Q-value for the state-action pair
        var currentQValue = ((_c = this.qTable.get(state)) === null || _c === void 0 ? void 0 : _c.get(action.toString())) || 0;
        // Calculate the maximum Q-Value for the next state
        var maxNextQValue = 0;
        var nextStateValue = this.qTable.get(nextState);
        if (nextStateValue) {
            maxNextQValue = Math.max.apply(Math, Array.from(nextStateValue.values()));
        }
        // Calculate the new Q-Value using the Q-learning formula
        var newQValue = currentQValue +
            this.learningRate *
                (reward + this.discountFactor * maxNextQValue - currentQValue);
        // Update the Q-Table with the new Q-value
        (_d = this.qTable.get(state)) === null || _d === void 0 ? void 0 : _d.set(action.toString(), newQValue);
    };
    // Train Agent Function
    // This funtion responsible for training the AI. 
    RLAgent.prototype.train = function (episodes) {
        for (var episode = 0; episode < episodes; episode++) {
            var state = this.initializeGameState();
            var loopDone = false;
            while (!loopDone) {
                var action = this.chooseAction(state);
                var _a = this.takeAction(state, action), nextState = _a.nextState, reward = _a.reward, done = _a.done;
                this.updateQTable(state, action, reward, nextState);
                state = nextState;
                if (done) {
                    // log the episode's outcome
                    loopDone = true;
                    console.log("Episode ".concat(episode + 1, ": Game Over"));
                }
            }
        }
    };
    // initializeGameState
    RLAgent.prototype.initializeGameState = function () {
        // initialize the game state
        return '---------';
    };
    // isTerminal
    RLAgent.prototype.isTerminal = function (state) {
        // implement logic to determine if the game is over
        // this could involve chekcing for a win or draw
        return this.checkForWin(state) || this.checkForDraw(state) || this.isBoardFull(state);
    };
    // checkForWin
    RLAgent.prototype.checkForWin = function (state) {
        var winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (var _i = 0, winningCombination_1 = winningCombination; _i < winningCombination_1.length; _i++) {
            var _a = winningCombination_1[_i], a = _a[0], b = _a[1], c = _a[2];
            if (state[a] !== '-' && state[a] === state[b] && state[a] === state[c]) {
                return true;
            }
        }
        return false;
    };
    // checkForDraw
    RLAgent.prototype.checkForDraw = function (state) {
        // check if there are no more empty cells and no win
        return !state.includes('-') && !this.checkForWin(state);
    };
    // takeAction
    RLAgent.prototype.takeAction = function (state, action) {
        // implement the logic to update the state based on the action
        // and determine the reward for the action
        var nextState = this.updateState(state, action);
        var reward = this.calculateReward(state, action);
        var done = this.isTerminal(nextState);
        return { nextState: nextState, reward: reward, done: done };
    };
    // updateState
    RLAgent.prototype.updateState = function (state, action) {
        // update the board with the agent's action
        return state.substring(0, action) + 'X' + state.substring(action + 1);
    };
    // calculateReward
    RLAgent.prototype.calculateReward = function (state, action) {
        // Calculate the reward based on the state
        var nextState = this.updateState(state, action);
        if (this.checkForWin(nextState)) {
            return 1; // reward for winning
        }
        else if (this.checkForDraw(nextState)) {
            return 0.5; // smaller reward for draw
        }
        else {
            return 0; // no reward for continuting game
        }
    };
    RLAgent.prototype.isBoardFull = function (state) {
        return !state.includes('-');
    };
    return RLAgent;
}());
exports.default = RLAgent;

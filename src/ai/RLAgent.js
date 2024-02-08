"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QTable_1 = require("./QTable");
var RLAgent = /** @class */ (function () {
    function RLAgent(learningRate, discountFactor, epsilon) {
        if (learningRate === void 0) { learningRate = 0.1; }
        if (discountFactor === void 0) { discountFactor = 0.9; }
        if (epsilon === void 0) { epsilon = 0.1; }
        // Initialize Q-Table
        // using a map to store state-action and their Q-Values
        this.qTable = new QTable_1.QTable();
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
        return this.qTable.getBestAction(state);
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
                //this.updateQTable(state, action, reward, nextState)
                this.qTable.update(state, action, reward, nextState, this.learningRate, this.discountFactor);
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
    RLAgent.prototype.saveQTable = function (filePath) {
        console.log("save the table to the system\n");
        this.qTable.save(filePath);
    };
    return RLAgent;
}());
exports.default = RLAgent;

"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QTable = void 0;
//import fs, { stat } from 'fs';
var fs = require("fs");
var QTable = /** @class */ (function () {
    function QTable() {
        this.table = new Map();
    } // create a new Map()
    // Method to update the Q-Value for a given state and action
    /*
    Q(s,a)=Q(s,a) + α × (r + γ × maxa′Q(s′,a′)−Q(s,a))
    */
    QTable.prototype.update = function (state, action, reward, nextState, learningRate, discountFactor) {
        // Implementation of the Q-Learning update rule
        // similar to your updateQTable method in RLAgent.ts
        var _a, _b;
        console.log("state: ", state);
        console.log("action: ", action);
        console.log("reward: ", reward);
        console.log("nextState: ", nextState);
        if (!this.table.has(state)) {
            this.table.set(state, new Map());
        }
        // get the current q-Value for the state-action pair, defaulting to 0 if
        // it does not exist
        var currentQValue = ((_a = this.table.get(state)) === null || _a === void 0 ? void 0 : _a.get(action)) || 0;
        var nextStateActions = this.table.get(nextState);
        var maxNextQValue = 0;
        if (nextStateActions) {
            maxNextQValue = Math.max.apply(Math, Array.from(nextStateActions.values()));
        }
        // calculate the new Q-Value using the Q-learning fomula
        var newQValue = currentQValue + learningRate * (reward + discountFactor * maxNextQValue - currentQValue);
        // update the Q-table with the new Q-value for the state-action pair
        (_b = this.table.get(state)) === null || _b === void 0 ? void 0 : _b.set(action, newQValue);
    };
    // Method to get the best action for a given state
    // the data which this getBestAction() function is getting from pre-train session
    // that is setting up and save into data sheets
    QTable.prototype.getBestAction = function (state) {
        // logic to determine the best action
        // Check if the state exists in the table
        var stateActions = this.table.get(state);
        // if there are no actions for this state, return -1
        if (!stateActions || stateActions.size === 0) {
            return -1;
        }
        // Iterate over all actions to find the one with highest Q-Value
        var bestAction = -1;
        var maxQValue = -Infinity;
        for (var _i = 0, _a = stateActions.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], action = _b[0], qValue = _b[1];
            if (qValue > maxQValue) {
                maxQValue = qValue;
                bestAction = action;
            }
        }
        return bestAction;
    };
    // save the Q-table to a file
    QTable.prototype.save = function (filePath) {
        var tableString = JSON.stringify(Array.from(this.table.entries()));
        fs.writeFileSync(filePath, tableString);
    };
    // load the Q-table from a file
    QTable.prototype.load = function (filePath) {
        var tableString = fs.readFileSync(filePath, 'utf8');
        var tableArray = JSON.parse(tableString);
        this.table = new Map(tableArray.map(function (_a) {
            var state = _a[0], actions = _a[1];
            return [state, new Map(actions)];
        }));
    };
    return QTable;
}());
exports.QTable = QTable;
//--------------------------------------------------------------------------------
/*

    // update the Q-Table
    updateQTable(
        state: string,
        action: number,
        reward: number,
        nextState: string
    ) {
        if (typeof action !== 'number') {
            console.error('Invalid action',action)
            return
        }
        // debug
        console.log("state: ", state)
        console.log("action: ", action)
        console.log("reward: ", reward)
        console.log("nextState: ", nextState)
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

    */ 

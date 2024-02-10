/**
 * Imports the RLAgent class, os module, path module, and fs module.
 * Creates an instance of the RLAgent class.
 * Calls the .train() method on the rlAgent instance to train the agent for 100,000 steps.
 */


import RLAgent from './RLAgent'
import { homedir } from 'os'
import path from 'path'
import fs from 'fs'

async function trainAndSaveAgent(){
    
    const rlAgent = new RLAgent()
    rlAgent.train(10000)

    const qTableFilePath = path.join(__dirname, '../models/qtable.json');
    rlAgent.save(qTableFilePath)
    
}

trainAndSaveAgent().catch(console.error);
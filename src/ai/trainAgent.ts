import RLAgent from "./RLAgent";
import {homedir} from 'os';
import path from 'path'
import fs from 'fs'


const rlAgent = new RLAgent();
rlAgent.train(100000);

//const filePath = path.join(homedir(),"Developer/web/personal-project/tictactoe-ml/src/models/qtable.json" )
//const filePath = path.join(__dirname, "/src/model/qtable.json")

//rlAgent.saveQTable(filePath)

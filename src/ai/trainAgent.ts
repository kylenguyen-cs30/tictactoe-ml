import RLAgent from "./RLAgent";
import {homedir} from 'os';
import path from 'path'

const rlAgent = new RLAgent();
rlAgent.train(100000);

const filePath = path.join(homedir(),"Developer/web/personal-project/tictactoe-ml/src/models/qtable.json" )

//rlAgent.saveQTable("~/Developer/web/personal-project/tictactoe-ml/src/models")
rlAgent.saveQTable(filePath)

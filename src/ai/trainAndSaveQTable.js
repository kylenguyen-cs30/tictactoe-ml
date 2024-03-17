//const RLAgent = require('./RLAgent')
import RLAgent  from './RLAgent'
const path = require('path')
const fs = require('fs')

async function trainAndSaveAgent(){
    const rlAgent = new RLAgent()
    await rlAgent.train(10000000)

    console.log("Point 1")

    // serialize the q-table
    const getQtableData = rlAgent.getQTableData()
    console.log("Point 2")
    // define the path for saving the q-table
    const qTableFilePath = path.join(__dirname, '..', 'models' , 'qtable.json')

    //save the q table to a file
    fs.writeFileSync(qTableFilePath, JSON.stringify(getQtableData), 'utf8')
    console.log('Q-table saved successfully to: ', qTableFilePath)

    
}

trainAndSaveAgent().catch(console.error)


// const qTableFilePath = path.join(__dirname, 'src/models/qtable.json')

// rlAgent.saveQTable(qTableFilePath);
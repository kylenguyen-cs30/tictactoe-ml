import fs from 'fs/promises';
import path from 'path'

export default async function handler(req,res){
    const jsonPath = path.join(process.cwd(), 'src/models', 'qtable.json')
    try {
        const fileData = await  fs.readFile(jsonPath, 'utf8')
        const qTable = JSON.parse(fileData);

        res.status(200).json(qTable)
    } catch (error) {
        	console.log("ERROR: ",error)
		res.status(500).join({ error: "Failed to load QTable"});
    }

}


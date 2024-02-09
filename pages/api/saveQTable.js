// import fs from 'fs';
// import path from 'path';

// export default function Handler(req, res) {
//   if (req.method === 'POST') {
//     // Assuming the body of the request contains the Q-table data
//     const qTableData = req.body;
//     const filePath = path.join(process.cwd(), 'src/models/qtable.json');
//     fs.writeFile(filePath, JSON.stringify(qTableData), (err) => {
//       if (err) {
//         console.error('Error saving Q-table:', err);
//         return res.status(500).json({ message: 'Error saving Q-table' });
//       }
//       res.status(200).json({ message: 'Q-table saved successfully' });
//     });
//   } else {
//     // Handle any non-POST requests
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// This is an example of how the API route for saving Q-table might look
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Path where you want to save the Q-table
        const filePath = path.join(process.cwd(), 'src/models/qtable.json');
        // Save the data from request body to the file
        fs.writeFile(filePath, JSON.stringify(req.body), err => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save Q-table' });
            }
            res.status(200).json({ message: 'Q-table saved successfully' });
        });
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

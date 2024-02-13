# Tic Tac Toe ML

A modern take on the classic game of Tic Tac Toe, integrating machine learning for an enhanced gaming experience. This project uses a Q-learning algorithm to train an AI, making it capable of playing Tic Tac Toe with a competitive edge. Built with Next.js and React, this game is a showcase of AI's potential in learning and mastering games.

## Features

- **AI Opponent**: Play against a machine learning-based AI trained with Q-learning.
- **Interactive UI**: A sleek, user-friendly interface built with React and styled with TailwindCSS for an engaging gameplay experience.
- **API for Q-Table**: Includes an API endpoint to load the Q-Table, enabling dynamic updates to the AI's knowledge base.

## Technologies Used

- Next.js for the frontend and server-side logic.
- React for building the user interface.
- TailwindCSS for styling.
- Reinforce-js for the reinforcement learning algorithm implementation.
- TypeScript for type-safe code.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

```bash git clone https://github.com/kylenguyen-cs30/tictactoe-ml.git```

## Navigate to the project directory:

``` cd tictactoe-ml ```
## Install dependencies:
``` npm install ```
## Start the development server:
```npm run dev```


- The application should now be running on http://localhost:3000.

## Usage
- To play the game, simply navigate to the application URL in your browser. You'll be playing against the AI by default. Click on the grid to make your move. The AI will automatically make its move after you.

# Training the AI
To further train the AI, you can use the train script included in the package.json:

```npm run train```

- This will initiate a training session for the AI, improving its gameplay over time by updating the Q-Table.

# Contributing
Contributions are welcome! If you have suggestions for improvements or bug fixes, please feel free to fork the repository and submit a pull request.

# License
This project is licensed under the MIT License - see the LICENSE file for details.





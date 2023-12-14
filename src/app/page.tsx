import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <div className="py-20 flex flex-col p-10 items-center justify-between">



        <h1
          className="text-4xl front-bold items-center"
          style={{ color: 'rgb(187, 171, 140)' }}
        >
          Welcome to Tic Tac Toe{" "}
        </h1>

        <h2
          className="text-2xl py-5 items-center"
          style={{ color: 'rgb(187, 171, 140)' }}
        > Created by Kyle Nguyen</h2>



        {/* this is grid layout */}

        <div className="grid grid-cols-3 gap-4 flex flex-col py-10 items-center">
          <div>
            <button 
            className="hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              01
            </button>
          </div>
          <div>
            <button 
            className=" hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              02
            </button>
          </div>
          <div>
            {" "}
            <button 
            className=" hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              03
            </button>
          </div>
          <div>
            {" "}
            <button 
            className=" hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              04
            </button>
          </div>
          <div>
            {" "}
            <button 
            className=" hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              05
            </button>
          </div>
          <div>
            {" "}
            <button 
            className=" hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              06
            </button>
          </div>
          <div>
            {" "}
            <button 
            className=" hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              07
            </button>
          </div>

          {/* Button to start a new game */}
          <div>
            {" "}
            <button 
            className=" hover:bg-blue-500 text-white font-bold text-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              08
            </button>
          </div>
          <div>
            {" "}
            <button 
            className=" hover:bg-blue-500 text-white font-bold ext-lg py-6 px-6 rounded"
            style={{backgroundColor: 'rgb(96, 114, 116)'}}
            >
              09
            </button>
          </div>
        </div>

        <div className="flex min-h-fit flex-col py-10">
          <button className="bg-pink-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Start a new game
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5 flex flex-col p-10 items-center justify-between">
          <div>
            <h1
            className="text-2xl py-5"
            style={{ color: 'rgb(187, 171, 140)' }} 
            >Player</h1>
          </div>

          <div>
            <h1
            className="text-2xl py-5"
            style={{ color: 'rgb(187, 171, 140)' }}
            >AI</h1>
          </div>

          <div>
            <h1
            className="text-2xl py-5"
            style={{ color: 'rgb(187, 171, 140)' }}
            >Result</h1>
          </div>

          <div>
            <h1
            className="text-2xl py-5"
            style={{ color: 'rgb(187, 171, 140)' }}
            >Result</h1>
          </div>
          
        </div>




      </div>

      <div>
        <h2 
        className="text-2xl py-5"
        style={{ color: 'rgb(187, 171, 140)' }}
        >Please visit my github: </h2>

      </div>
    </main>
  );
}


/*
    Purpose: This file appears to be a specific page in your Next.js application, possibly the main or home page.
    Content:
        The file defines a functional component Home that returns a JSX structure for the page's layout.
        It includes headings, buttons, and other elements, styled using Tailwind CSS classes.
    Usage: This is where you define the actual content and structure of a specific page. It seems to be set up for a Tic-tac-toe game, with buttons for game squares and a button to start a new game.
*/
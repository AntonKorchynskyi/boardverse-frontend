// App.jsx
'use client';

import React from 'react';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { TicTacToe } from './TicTacToeGame'; // Ensure this points correctly to your game.js
import { TicTacToeBoard } from './TicTacToeBoard';
import { ToastContainer } from 'react-toastify';

// Configure the Boardgame.io client:
const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  debug: false,
  multiplayer: SocketIO({ server: 'localhost:8000' }),
});

const App = () => {
  // Extract the playerID and matchID from the URL.
  const urlParams = new URLSearchParams(window.location.search);
  const playerID = urlParams.get("playerID") || "0"; // "0" = host; "1" = joining player
  const matchID = urlParams.get("matchID") || "default";

  // Pass matchID as a key so that when it changes, the client remounts with fresh state.
  return (
    <div>
      <TicTacToeClient key={matchID} playerID={playerID} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;

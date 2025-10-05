"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { TicTacToe } from "./TicTacToeGame"; // Ensure this points correctly to your game.js
import { TicTacToeBoard } from "./TicTacToeBoard";
import { ToastContainer } from "react-toastify";

// Configure the Boardgame.io client:
const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  debug: false,
  multiplayer: SocketIO({ server: "localhost:8000" }),
});

const TicTacToeGame = () => {
  const searchParams = useSearchParams();
  
  // Extract the playerID and matchID from the URL using Next.js useSearchParams
  const playerID = searchParams.get("playerID") || "0"; // "0" = host; "1" = joining player
  const matchID = searchParams.get("matchID") || "default";

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

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-white text-xl">Loading game...</div>
  </div>
);

// Main App component with Suspense boundary
const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TicTacToeGame />
    </Suspense>
  );
};

export default App;

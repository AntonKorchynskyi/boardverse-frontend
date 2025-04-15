// MatchRoom.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const MatchRoom = () => {
  const router = useRouter();

  // Extract matchID from URL query parameters.
  const searchParams = new URLSearchParams(window.location.search);
  const matchID = searchParams.get("matchID");

  const [matchInfo, setMatchInfo] = useState(null);

  // Function to fetch detailed match information.
  const fetchMatchInfo = async () => {
    try {
      // Updated endpoint for a specific match.
      const res = await fetch(`http://localhost:8001/games/tic-tac-toe/${matchID}`);
      if (!res.ok) {
        throw new Error("Failed to fetch match info");
      }
      const data = await res.json();
      setMatchInfo(data);
    } catch (err) {
      console.error("Error fetching match info:", err);
    }
  };

  useEffect(() => {
    if (matchID) {
      fetchMatchInfo();
      const interval = setInterval(fetchMatchInfo, 3000); // Poll every 3 seconds.
      return () => clearInterval(interval);
    }
  }, [matchID]);

  if (!matchID) {
    return <p>Error: No matchID provided in the URL.</p>;
  }

  if (!matchInfo) {
    return <p>Loading match information...</p>;
  }

  // Extract players information from the match info.
  const players = matchInfo.players || {};
  const playerCount = Object.keys(players).length;
  // For a two-player game, we assume the match is ready when 2 players have joined.
  const isReady = playerCount >= 2;

  // Function to start the game.
  const handleStartGame = () => {
    // Typically, the host has playerID "0". Adjust this as required.
    router.push(`/tictactoe?matchID=${matchID}&playerID=0`);
  };

  return (
    <div className="p-4">
      <h1>Match Room — Lobby {matchID}</h1>
      <h2>Players Joined:</h2>
      {playerCount === 0 ? (
        <p>No players have joined yet.</p>
      ) : (
        <ul>
          {Object.entries(players).map(([pid, playerData]) => (
            <li key={pid}>
              Player {pid}: {playerData.name || "Anonymous"}
            </li>
          ))}
        </ul>
      )}
      {isReady ? (
        <div>
          <p>The match is ready!</p>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <p>Waiting for more players to join...</p>
      )}
      <br />
      <Link href="/browse/tic-tac-toe">
        Back to Lobby List
      </Link>
    </div>
  );
};

export default MatchRoom;

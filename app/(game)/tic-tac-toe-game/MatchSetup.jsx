'use client';

import React, { useState } from 'react';

export default function MatchSetup({ onSetupComplete }) {
  const [matchID, setMatchID] = useState('');
  const [playerID, setPlayerID] = useState('');
  const [credentials, setCredentials] = useState('');

  // Create a new match
  async function createMatch() {
    const res = await fetch('https://boarverse-websocket.onrender.com/games/six-nimmt-full/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numPlayers: 6, setupData: {} }),
    });
    const data = await res.json();
    console.log(data);
    
    setMatchID(data.matchID);
    // For host, assume playerID '0'
    joinMatch(data.matchID, '0');
  }

  // Join an existing match
  async function joinMatch(matchID, playerID) {
    const res = await fetch(`https://boarverse-websocket.onrender.com/games/six-nimmt-full/${matchID}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        matchID,
        playerID,
        credentials: {
          userId: 'user_123',
          userName: 'Alice',
          userProfilePic: 'https://example.com/alice.jpg',
        },
      }),
    });
    const data = await res.json();
    setCredentials(data.playerCredentials);
    // Notify parent that setup is complete
    onSetupComplete({ matchID, playerID, credentials: data.playerCredentials });
  }

  return (
    <div className="p-4">
      <button onClick={createMatch} className="px-4 py-2 bg-blue-600 rounded text-white">
        Create Match
      </button>
      <hr className="my-4" />
      <div>
        <label className="block">Match ID:</label>
        <input 
          value={matchID} 
          onChange={(e) => setMatchID(e.target.value)} 
          className="p-2 border rounded" 
        />
      </div>
      <div className="mt-2">
        <label className="block">Player ID:</label>
        <input 
          value={playerID} 
          onChange={(e) => setPlayerID(e.target.value)} 
          className="p-2 border rounded" 
        />
      </div>
      <button 
        onClick={() => joinMatch(matchID, playerID)}
        className="mt-4 px-4 py-2 bg-green-600 rounded text-white"
      >
        Join Match
      </button>
    </div>
  );
}

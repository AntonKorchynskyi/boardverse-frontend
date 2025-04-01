'use client';

// components/SixNimmtClient.jsx
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import SixNimmtGame from './SixNimmtGame'; // Your game logic definition
import SixNimmtBoard from './SixNimmtBoard';

const SixNimmtClient = Client({
  game: SixNimmtGame,
  board: SixNimmtBoard,
  debug: true, // Turn off in production
  server: 'http://localhost:8000/games/six-nimmt', // Adjust to your backend URL
  multiplayer: SocketIO({ server: 'http://localhost:8000/games/six-nimmt' }), // Ensures WebSocket connection
});

export default SixNimmtClient;

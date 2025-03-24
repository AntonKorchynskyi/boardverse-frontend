// components/SixNimmtClient.jsx
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import SixNimmtGame from './SixNimmtGame'; // Your game logic definition
import SixNimmtBoard from './SixNimmtBoard';

const SixNimmtClient = Client({
  game: SixNimmtGame,
  board: SixNimmtBoard,
  debug: true, // Turn off in production
  server: 'https://boarverse-websocket.onrender.com/games/six-nimmt-full', // Adjust to your backend URL
  multiplayer: SocketIO({ server: 'https://boarverse-websocket.onrender.com/games/six-nimmt-full' }), // Ensures WebSocket connection
});

export default SixNimmtClient;

import { Client } from 'boardgame.io/react';
import SixNimmtGame from './SixNimmtGame'; // Your game logic definition
import SixNimmtBoard from './SixNimmtBoard';

const SixNimmtClient = Client({
  game: SixNimmtGame,
  board: SixNimmtBoard,
  debug: true, // Turn off in production
  // server: 'http://localhost:8000', // Uncomment and adjust if connecting to a separate backend server
});

export default SixNimmtClient;

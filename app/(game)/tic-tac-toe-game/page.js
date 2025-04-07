'use client';

import React from 'react';
import { Client } from 'boardgame.io/react';
import { Local, SocketIO } from 'boardgame.io/multiplayer';
import { TicTacToe } from './TicTacToeGame';
import { TicTacToeBoard } from './TicTacToeBoard';

const TicTacToeClient = Client({
  game: TicTacToe,
  board: TicTacToeBoard,
  multiplayer: SocketIO({ server: 'localhost:8000'}),
});

const App = () => (
  <div>
    <TicTacToeClient playerID="0" />
    <TicTacToeClient playerID="1" />
  </div>
);

export default App;
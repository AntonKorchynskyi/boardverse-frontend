// components/BuiltInLobby.jsx
import React from 'react';
import { Lobby } from 'boardgame.io/react';
import SixNimmtGame from '@/app/(game)/take-5-game/SixNimmtGame';
import SixNimmtBoard from '@/app/(game)/take-5-game/SixNimmtBoard';

export default function BuiltInLobby() {
  return (
    <Lobby
      gameServer={`http://localhost:8000`}
      lobbyServer={`http://localhost:8000`}
      gameComponents={[
        {
          game: SixNimmtGame,
          board: SixNimmtBoard,
        },
      ]}
    />
  );
}

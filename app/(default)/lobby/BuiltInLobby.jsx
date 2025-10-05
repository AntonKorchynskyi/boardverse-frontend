// import React from 'react';
// import { Lobby } from 'boardgame.io/react';
// import TicTacToe from '@/app/(game)/take-5-game/TicTacToeGame';
// import TicTacToeBoard from '@/app/(game)/take-5-game/TicTacToeBoard';

// // Dummy game config for the lobby (only used for UI purposes).
// const DummyGame = {
//   name: 'six-nimmt',
//   minPlayers: 2,
//   maxPlayers: 10,
//   // A minimal setup; actual game logic runs on the server.
//   setup: () => ({}),
// };

// export default function BuiltInLobby() {
//   return (
//     <Lobby
//       gameServer={`http://localhost:8000`}
//       lobbyServer={`http://localhost:8000`}
//       gameComponents={[
//         {
//           game: TicTacToe,
//           board: TicTacToeBoard,
//         },
//       ]}
//     />
//   );
// }

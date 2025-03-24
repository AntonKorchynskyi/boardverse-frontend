// components/SixNimmtBoard.jsx
// TODO
import React from 'react';

const SixNimmtBoard = ({ G, ctx, moves, playerID }) => {
  // Handle selecting a card from the player's hand.
  const handleSelectCard = (card) => {
    moves.selectCard(card.value);
  };

  // Handle choosing a row if required.
  const handleChooseRow = (rowIndex) => {
    moves.chooseRow(rowIndex);
  };

  if (ctx.phase === 'waiting') {
    // Render the Lobby UI if we’re still waiting
    return <Lobby G={G} ctx={ctx} moves={moves} playerID={playerID} />;
  }

  return (
    <div className="text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">6 Nimmt Game</h1>

      {/* Game Table Rows */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Rows on Table</h2>
        <div className="grid grid-cols-2 gap-4">
          {G.rows && G.rows.map((row, index) => (
            <div key={index} className="border p-4">
              <h3 className="font-bold">Row {index}</h3>
              <div className="flex space-x-2">
                {row.map((card, i) => (
                  <div key={i} className="bg-gray-800 p-2 rounded">
                    {card.value} <span className="text-sm">({card.bullHeads})</span>
                  </div>
                ))}
              </div>
              {/* If the game is in a state where a player must choose a row */}
              {ctx.phase === 'choosingRow' && ctx.currentPlayer === playerID && (
                <button 
                  onClick={() => handleChooseRow(index)}
                  className="mt-2 px-2 py-1 bg-blue-600 rounded"
                >
                  Choose this row
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Player's Hand */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your Hand</h2>
        <div className="flex space-x-2">
          {G.players[playerID] && G.players[playerID].hand.map((card, i) => (
            <button 
              key={i}
              onClick={() => handleSelectCard(card)}
              className="bg-gray-700 p-2 rounded"
            >
              {card.value} <span className="text-sm">({card.bullHeads})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Player's Penalty Pile */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your Penalty Pile</h2>
        <div className="flex space-x-2">
          {G.players[playerID] && G.players[playerID].penaltyPile.map((card, i) => (
            <div key={i} className="bg-red-700 p-2 rounded">
              {card.value} <span className="text-sm">({card.bullHeads})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Host controls: Start game if in waiting phase */}
      {playerID === '0' && ctx.phase === 'waiting' && (
        <button 
          onClick={() => moves.startGame()} 
          className="px-4 py-2 bg-green-600 rounded"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default SixNimmtBoard;

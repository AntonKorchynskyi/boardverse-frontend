'use client';

import React from 'react';

const SixNimmtBoard = ({ G, ctx, moves, playerID }) => {
  // When game is still in waiting phase, display a waiting screen.
  if (ctx.phase === 'waiting') {

    console.log('board G: ', G);
    console.log('empty');
    console.log('ctx: ', ctx);
    
    console.log('before moves');
    
    console.log('moves ', moves);

    console.log('playerId ', playerID);
    
    console.log("Current phase:", ctx.phase);
    

    return (
      <div className="text-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Waiting for players to join...</h1>
        {/* Host can start the game */}
        {playerID === '0' && (
          <button 
            onClick={() => moves.startGame()}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Start Game
          </button>
        )}
      </div>
    );
  }

  // Main gameplay UI.
  return (
    <div className="text-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">6 Nimmt Game</h1>
      
      {/* Render rows */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Rows on Table</h2>
        <div className="grid grid-cols-2 gap-4">
          {G.rows.map((row, index) => (
            <div key={index} className="border p-4">
              <h3 className="font-bold">Row {index}</h3>
              <div className="flex space-x-2">
                {row.map((card, i) => (
                  <div key={i} className="bg-gray-800 p-2 rounded">
                    {card.value} <span className="text-sm">({card.bullheads})</span>
                  </div>
                ))}
              </div>
              {ctx.phase === 'choosingRow' && ctx.currentPlayer === playerID && (
                <button 
                  onClick={() => moves.chooseRow(index)}
                  className="mt-2 px-2 py-1 bg-blue-600 rounded"
                >
                  Choose this row
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Render player's hand */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your Hand</h2>
        <div className="flex space-x-2">
          {G.players && G.players[playerID] && G.players[playerID].hand.map((card, i) => (
            <button 
              key={i}
              onClick={() => moves.selectCard(card)}
              className="bg-gray-700 p-2 rounded"
            >
              {card.value} <span className="text-sm">({card.bullheads})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Render player's penalty pile */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your Penalty Pile</h2>
        <div className="flex space-x-2">
          {G.players && G.players[playerID] && G.players[playerID].penaltyPile.map((card, i) => (
            <div key={i} className="bg-red-700 p-2 rounded">
              {card.value} <span className="text-sm">({card.bullheads})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SixNimmtBoard;

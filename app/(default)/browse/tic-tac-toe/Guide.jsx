import React from 'react'

const Guide = () => {
  return (
    <div className="text-gray-300">
      <h1 className="text-3xl font-bold mb-4 text-[#ad4ef1]">Tic-Tac-Toe Game Guide</h1>
      <p>
        This is a simple guide for Tic-Tac-Toe—a classic game of strategy played on a 3x3 grid. This guide will walk you through the game’s overview, components, setup, rules, and some quick tips to help you play better.
      </p>

      <hr className="my-4 border-gray-600" />

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">1. Game Overview</h2>
      <p>
        <strong>Tic-Tac-Toe</strong> is a two-player game where players take turns marking “X” or “O” in a 3x3 grid. The objective is to be the first to place three of your marks in a straight line—either horizontally, vertically, or diagonally. It’s a quick game that challenges players to think ahead and block their opponent’s moves.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">2. Components</h2>
      <ul className="list-disc ml-6">
        <li><strong>Game Board:</strong> A 3x3 square grid.</li>
        <li><strong>Player Tokens:</strong> One player uses “X”, and the other uses “O”.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">3. Objective</h2>
      <p>
        Get three of your marks (“X” or “O”) in a row—vertically, horizontally, or diagonally—before your opponent does.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">4. Game Setup</h2>
      <ol className="list-decimal ml-6">
        <li>Choose who will play as “X” and who will play as “O”.</li>
        <li>“X” goes first.</li>
        <li>Start with an empty 3x3 grid.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">5. Gameplay</h2>
      <p>The game proceeds in turns as follows:</p>

      <h3 className="text-xl font-bold mt-2 ml-8 text-[#ad4ef1] mb-2">A. Taking Turns</h3>
      <ul className="list-disc ml-14">
        <li>Players alternate turns, marking one empty square per turn with their symbol (“X” or “O”).</li>
      </ul>

      <h3 className="text-xl font-bold mt-2 ml-8 text-[#ad4ef1] mb-2">B. Winning the Game</h3>
      <ul className="list-disc ml-14">
        <li>The first player to get three of their marks in a line (vertical, horizontal, or diagonal) wins.</li>
      </ul>

      <h3 className="text-xl font-bold mt-2 ml-8 text-[#ad4ef1] mb-2">C. Draw Condition</h3>
      <ul className="list-disc ml-14">
        <li>If all 9 squares are filled and no one has three in a row, the game ends in a draw.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">6. Strategy Tips</h2>
      <ul className="list-disc ml-6">
        <li><strong>Control the Center:</strong> The center square is the most versatile position. Start there if you can.</li>
        <li><strong>Block Your Opponent:</strong> Always watch for your opponent setting up a win and block them.</li>
        <li><strong>Plan Ahead:</strong> Try to force your opponent into a move that sets you up to win on your next turn.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">Conclusion</h2>
      <p>
        Tic-Tac-Toe is a timeless game that’s easy to learn and fast to play. With some strategic thinking, you can master the game and make every move count. Whether playing casually or competitively, it’s a great way to challenge your mind and outsmart your opponent!
      </p>
    </div>
  )
}

export default Guide

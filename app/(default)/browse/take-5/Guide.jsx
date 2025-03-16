import React from 'react'

const Guide = () => {
  return (
    <div className="text-gray-300">
      <h1 className="text-3xl font-bold mb-4 text-[#ad4ef1]">Take 5 Game Guide</h1>
      <p>
        This is a comprehensive guide for the Take 5 game—a fast‐paced card game of strategy and luck (often based on the classic game “6 Nimmt!”). This guide will walk you through the game’s background, components, setup, rules, and some strategic tips so that you can understand and start playing.
      </p>

      <hr className="my-4 border-gray-600" />

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">1. Game Overview</h2>
      <p>
        <strong>Take 5</strong> is a card game designed for 2–10 players. The objective is simple: avoid collecting cards that carry penalty points (represented as “bull heads”). While every card has a number, some cards are “heavier” than others in penalty value. Players must carefully choose which card to play each round to avoid being forced to pick up a row full of penalty cards. Over multiple rounds, the player who accumulates the fewest penalty points wins.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">2. Components</h2>
      <ul className="list-disc ml-6">
        <li><strong>Deck:</strong> 104 uniquely numbered cards (1–104).</li>
        <li>
          <strong>Penalty Indicators:</strong> Each card shows a number of bull heads (penalty points). The distribution is commonly as follows:
          <ul className="list-disc ml-6">
            <li><strong>Card 55:</strong> 7 bull heads.</li>
            <li><strong>Multiples of 11 (except 55):</strong> 5 bull heads.</li>
            <li><strong>Cards ending in 0:</strong> 3 bull heads.</li>
            <li><strong>Cards that are multiples of 5 (but not ending in 0):</strong> 2 bull heads.</li>
            <li><strong>All other cards:</strong> 1 bull head.</li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">3. Objective</h2>
      <p>
        Avoid collecting cards with bull heads. Since each bull head counts as a penalty point, your aim is to finish the game with the lowest penalty score.
      </p>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">4. Game Setup</h2>
      <ol className="list-decimal ml-6">
        <li>
          <strong>Shuffle and Deal:</strong>
          <ul className="list-disc ml-6">
            <li>The full deck is shuffled.</li>
            <li>10 cards are dealt to each player.</li>
          </ul>
        </li>
        <li>
          <strong>Initial Rows:</strong>
          <ul className="list-disc ml-6">
            <li>Randomly draw and place 4 cards face-up on the table in a row. These cards form the starting rows.</li>
          </ul>
        </li>
      </ol>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">5. Gameplay</h2>
      <p>Each round of Take 5 follows these steps:</p>

      <h3 className="text-xl font-bold mt-2 ml-8 text-[#ad4ef1] mb-2">A. Simultaneous Card Selection</h3>
      <ul className="list-disc ml-14">
        <li><strong>Secret Choice:</strong> Every player selects one card from their hand and keeps it hidden.</li>
        <li><strong>Reveal:</strong> Once everyone has chosen, all players reveal their selected card simultaneously.</li>
      </ul>

      <h3 className="text-xl font-bold mt-2 ml-8 text-[#ad4ef1] mb-2">B. Sorting & Placement of Cards</h3>
      <ul className="list-disc ml-14">
        <li>
          <strong>Ascending Order:</strong> The revealed cards are sorted in ascending numerical order.
        </li>
        <li>
          <strong>Placing Cards:</strong> For each card in order:
          <ul className="list-disc ml-14">
            <li>
              <strong>Standard Placement:</strong> Place the card in the row where the last (rightmost) card is the highest card that is still lower than the played card.
            </li>
            <li>
              <strong>No Valid Row:</strong> If the card is lower than the last card of every row, the player must choose one of the rows to pick up. The collected cards become penalty points, and the played card starts a new row.
            </li>
            <li>
              <strong>Row Overflow:</strong> If placing the card causes a row to exceed 5 cards (i.e., becomes the 6th card), then:
              <ul className="list-disc ml-14">
                <li>
                  The player who played that card must collect all 5 cards already in that row (adding their penalty points to their score).
                </li>
                <li>
                  The played card then becomes the first card of the new, empty row.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-2 ml-8 text-[#ad4ef1] mb-2">C. End of Round</h3>
      <ul className="list-disc ml-14">
        <li>Each player’s penalty points from collected cards are tallied.</li>
        <li>Players then discard the cards they played, and a new round begins using the remaining cards in their hand.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">6. Scoring & Game End</h2>
      <ul className="list-disc ml-6">
        <li>
          <strong>Scoring:</strong> At the end of each round, add up the penalty points from the cards each player has collected.
        </li>
        <li>
          <strong>Game End Conditions:</strong>
          <ul className="list-disc ml-6">
            <li>
              The game might be played over a fixed number of rounds (e.g., when players run out of cards) or until a player’s score exceeds a predetermined threshold (commonly 66 points).
            </li>
            <li>
              <strong>Winning:</strong> The player with the fewest penalty points at the end of the game wins.
            </li>
          </ul>
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">7. Strategy Tips</h2>
      <ul className="list-disc ml-6">
        <li><strong>Card Counting:</strong> Keep an eye on which cards have been played to estimate which rows may soon force you into taking penalty cards.</li>
        <li><strong>Hand Management:</strong> Weigh the risk of playing a high card (which might safely fit in a row) versus a low card (which might force you to pick up a row).</li>
        <li><strong>Controlled Losses:</strong> Sometimes it’s better to take a row with fewer bull heads rather than risk a row with a higher penalty.</li>
        <li><strong>Observation:</strong> Monitor opponents’ plays for clues about which cards they might still hold.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-4 text-[#ad4ef1] mb-2">Conclusion</h2>
      <p>
        Take 5 is an engaging blend of strategy and chance. With simple rules and quick rounds, it’s easy to learn but challenging to master. Understanding the mechanics of card placement, penalty point distribution, and tactical play will help you minimize risks and potentially turn a seemingly disadvantageous hand into a winning strategy. Enjoy your game!
      </p>
    </div>
  )
}

export default Guide
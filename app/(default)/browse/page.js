import GameCard from '@/components/GameCard';
import React from 'react'

// list of all games
const popularGames = [
  { gameName: "Take 5", gameDescription: "A fast-paced card game of risk and strategy. Avoid collecting penalty cards while planning your moves wisely!", gameUrl: "take-5", gameImageUrl: "/take-5-game.jpg"},
  { gameName: "Tic Tac Toe", gameDescription: "A quick two-player game of Xs and Os. Line up three in a row to win! Mark wisely to outsmart your rival and win!", gameUrl: "tic-tac-toe", gameImageUrl: "/tic-tac-toe-game.jpg"},
  { gameName: "Catan", gameDescription: "Build, trade, and settle your way to victory in this iconic resource-management board game. Every turn brings new opportunities!", gameUrl: "catan", gameImageUrl: "/catan-game.png"},
  { gameName: "Senators", gameDescription: "A game of cunning and negotiation where you vie for influence in ancient Rome. Outwit opponents to gain control of the Senate!", gameUrl: "senators", gameImageUrl: "/senators-game.png"},
  { gameName: "Carcassonne", gameDescription: "Build cities, roads, and farms in this classic tile-laying game. Strategize to claim territories and outscore your rivals!", gameUrl: "carcassonne", gameImageUrl: "/carcassonne-game.png"},
  { gameName: "Incan Gold", gameDescription: "An adventurous push-your-luck game where you explore ancient ruins for treasure. Will you cash out or risk it all?", gameUrl: "incan-gold", gameImageUrl: "/incan-gold-game.png"},
];

const BrowsePage = () => {
  return (
    <div className="p-8 bg-backgroundPanelSec min-h-screen">
      <h1 className="text-center text-4xl">Game Selection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {popularGames.map((game, index) => (
          <GameCard {...game} key={index}></GameCard>
        ))}
      </div>
    </div>
  )
}

export default BrowsePage
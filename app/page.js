import Image from "next/image";
import Link from "next/link";
import GameCard from "@/components/GameCard";

const popularGames = [
  { gameName: "Take 5", gameDescription: "A fast-paced card game of risk and strategy. Avoid collecting penalty cards while planning your moves wisely!", gameUrl: "take-5", gameImageUrl: "/take-5-game.jpg"},
  { gameName: "Scout", gameDescription: "A unique ladder-climbing game where strategy meets creativity. Outsmart opponents by cleverly playing or rearranging your hand!", gameUrl: "scout", gameImageUrl: "/scout-game.png"},
  { gameName: "Catan", gameDescription: "Build, trade, and settle your way to victory in this iconic resource-management board game. Every turn brings new opportunities!", gameUrl: "catan", gameImageUrl: "/catan-game.png"},
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col py-8">
      {/* Header Section */}
      <div className="flex items-center justify-center text-[#e9e6db] bg-[url('/home-background-image.png')] bg-cover bg-center bg-no-repeat text-center w-256 h-96">
        <div>
          <h1 className="text-5xl font-bold mb-4">BoardVerse</h1>
          <p className="text-lg font-medium mb-6">
            Play the best board games online
          </p>
          <Link href="/registration">
            <button className="bg-[#e9e6db] hover:bg-[#d3d0c5] text-backgroundPanel font-semibold px-6 py-3 rounded-lg transition">
              Let’s Start!
            </button>
          </Link>
        </div>
      </div>

      {/* Featured Games Section */}
      <div className="flex-grow">
        <div className="mx-auto px-4 pt-8">
          <div className="border-b-4 border-white mb-8 pb-4">
            <h2 className="text-2xl font-bold">FEATURED GAMES</h2>
          </div>

          {/* Game Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGames.map((game, index) => (
              <GameCard key={index} {...game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

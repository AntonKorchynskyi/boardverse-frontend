"use client";

import Image from "next/image";
import { ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function GameCard({ gameName, gameDescription, gameUrl, gameImageUrl }) {
  const isAvailable = gameName === "Tic Tac Toe"; // condition to check availability
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`bg-backgroundPanelThird rounded-lg shadow-lg p-4 opacity-0 transition-opacity duration-[900ms] ${visible ? 'opacity-100' : ''}`}>
      <Link href={`/browse/${gameUrl}`}>
        {/* Image Section */}
        <div className="relative w-full">
          <Image
            src={gameImageUrl}
            alt={gameName}
            className="rounded-lg object-cover"
            width={516}
            height={250}
          />
          {/* Availability Mark */}
          <div
            className={`absolute top-2 right-2 w-4 h-4 rounded-full ${
              isAvailable ? "bg-green-500" : "bg-red-500"
            }`}
            title={isAvailable ? "Available" : "Not Available"}
          ></div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mt-2">{gameName}</h3>

        <div className="flex items-center">
          {/* Description and Play Button */}
          <p className="text-sm text-gray-300">{gameDescription}</p>
          <button
            onClick={() => console.log("Redirect to game page")}
            className="ml-4 bg-gray-100 text-[#330059] w-16 h-16 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
          >
            <ArrowRightCircle className="w-8 h-8" />
          </button>
        </div>
      </Link>
    </div>
  );
}

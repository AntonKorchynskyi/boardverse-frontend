// LobbyScreen.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import joinMatch from "@/app/(default)/_actions/joinMatch";
import LobbyItem from "./LobbyItem";

const LobbyScreen = () => {
  const [matches, setMatches] = useState([]);

  // Fetch the list of matches from the Lobby REST API.
  const fetchMatches = async () => {
    try {
      // Updated endpoint for listing matches for tic-tac-toe.
      const res = await fetch("http://localhost:8001/games/tic-tac-toe");
      const data = await res.json();
      // The API returns an array of match objects.
      setMatches(data.matches || []);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  useEffect(() => {
    fetchMatches();
    // const interval = setInterval(fetchMatches, 5000); // Poll every 5 seconds.
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center flex-col justify-center mx-auto pt-8 overflow-hidden w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl mb-8">Available Lobbies</h1>
      {matches.length === 0 ? (
        <p>No lobbies available at the moment.</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <LobbyItem match={match} key={match.matchID}/>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LobbyScreen;

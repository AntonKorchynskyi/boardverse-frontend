"use server";

import { joinMatchHost } from "./joinMatch";

export default async function createMatch(state, formData) {
  const numPlayers = formData.get("numPlayers");

  try {
    const res = await fetch(
      "http://localhost:8001/games/tic-tac-toe/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numPlayers: numPlayers, setupData: {} }),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to create match: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Match created:", data);

    // For host, assume playerID "0"
    return joinMatchHost(data.matchID, "0");
  } catch (error) {
    console.error("Error in createMatch:", error);
    return { errors: { general: ["Unable to create match. Please try again."] } };
  }
}

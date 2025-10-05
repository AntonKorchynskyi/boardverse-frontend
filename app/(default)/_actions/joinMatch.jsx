"use server";

import getUserProfile from "./getUserProfile";
import getAvailablePlayerIDs from "./getAvailablePlayerIDs";
import { redirect } from "next/navigation";

export default async function joinMatch(state, formData) {
  console.log("joinMatch formData:", formData);
  const matchID = formData.get("matchID");
  console.log("Join matchID:", matchID);

  try {
    const { userId, userName } = await getUserProfile();
    // Determine the next available slot (starting from index 1)
    const providedPlayerID = await getAvailablePlayerIDs(matchID);

    const res = await fetch(
      `http://localhost:8001/games/tic-tac-toe/${matchID}/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerID: providedPlayerID,
          playerName: userName,
          credentials: {
            userId,
            userName,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Join request failed: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Join match response:", data);

    // Redirect to the game page, passing playerCredentials in the URL query.
    redirect(
      `/tic-tac-toe-game?matchID=${matchID}&playerID=${providedPlayerID}&playerCredentials=${encodeURIComponent(
        JSON.stringify(data.playerCredentials)
      )}`
    );
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Join match error:", error);
    return { errors: { general: ["Unexpected error during join."] } };
  }
}

export async function joinMatchHost(matchID, providedPlayerID) {
  const { userId, userName } = await getUserProfile();

  // Check the current state of the match.
  try {
    const matchRes = await fetch(
      `http://localhost:8001/games/tic-tac-toe/${matchID}`
    );
    if (!matchRes.ok) {
      throw new Error(`Failed to fetch match info: ${matchRes.statusText}`);
    }
    const matchData = await matchRes.json();

    // If the match is finished, call playAgain to generate a new match ID.
    if (matchData.gameover) {
      console.log("Match is finished – calling playAgain.");
      const playAgainRes = await fetch(
        `http://localhost:8001/games/tic-tac-toe/${matchID}/playAgain`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerID: providedPlayerID,
            credentials: { userId, userName },
          }),
        }
      );

      if (!playAgainRes.ok) {
        throw new Error(`Failed to play again: ${playAgainRes.statusText}`);
      }
      const playAgainData = await playAgainRes.json();
      console.log("playAgain response:", playAgainData);
      // Overwrite matchID with the new one.
      matchID = playAgainData.nextMatchID;
    }
  } catch (error) {
    console.error("Error checking match state:", error);
    return { errors: { general: ["Unexpected error checking match state."] } };
  }

  // Now join the (new or existing) match.
  try {
    const res = await fetch(
      `http://localhost:8001/games/tic-tac-toe/${matchID}/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerID: providedPlayerID,
          playerName: userName,
          credentials: {
            userId,
            userName,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Join (host) request failed: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Host join response:", data);

    // Redirect and pass playerCredentials in URL.
    redirect(
      `/tic-tac-toe-game?matchID=${matchID}&playerID=${providedPlayerID}&playerCredentials=${encodeURIComponent(
        JSON.stringify(data.playerCredentials)
      )}`
    );
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Join host error:", error);
    return { errors: { general: ["Unexpected error during join as host."] } };
  }
}

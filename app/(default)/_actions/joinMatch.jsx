"use server";

import getUserProfile from "./getUserProfile";
import getAvailablePlayerIDs from "./getAvailablePlayerIDs";
import { redirect } from "next/navigation";

// TODO maybe boardgame client call instead of lobby redirect

export default async function joinMatch(state, formData) {
  console.log(formData);

  const matchID = formData.get("matchID");

  console.log(matchID);

  const { userId, userName } = await getUserProfile();

  const providedPlayerID = await getAvailablePlayerIDs(matchID);

  try {
    const res = await fetch(
      `https://boarverse-websocket.onrender.com/games/six-nimmt-full/${matchID}/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerID: providedPlayerID,
          playerName: userName,
          credentials: {
            userId: userId,
            userName: userName,
            //   userProfilePic: 'https://example.com/alice.jpg',
          },
        }),
      }
    );

    const data = await res.json();
    console.log(data);

    redirect(`/lobby?matchID=${matchID}&playerID=${providedPlayerID}`);

  } catch (error) {
    // the redirect exception, need to rethrow it to allow for redirect (catching it breaks the action).
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.log(`Join error: ${error}`);
    return { errors: { general: ["Unexpected error during join"] } };
  }

}

export async function joinMatchHost(matchID, providedPlayerID) {
  const { userId, userName } = await getUserProfile();

  try {
    const res = await fetch(
      `https://boarverse-websocket.onrender.com/games/six-nimmt-full/${matchID}/join`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playerID: providedPlayerID,
          playerName: userName,
          credentials: {
            userId: userId,
            userName: userName,
            //   userProfilePic: 'https://example.com/alice.jpg',
          },
        }),
      }
    );
  
    const data = await res.json();

    redirect(`/lobby?matchID=${matchID}&playerID=${providedPlayerID}`);

  } catch (error) {
    // the redirect exception, need to rethrow it to allow for redirect (catching it breaks the action).
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.log(`Join error: ${error}`);
    return { errors: { general: ["Unexpected error during join"] } };
  }

}

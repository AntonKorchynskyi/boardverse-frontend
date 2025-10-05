"use server";

export default async function getAvailablePlayerIDs(matchID) {
  
  const res = await fetch(`http://localhost:8001/games/tic-tac-toe/${matchID}`);
  const matchData = await res.json();
  
  for (let i = 1; i < matchData.players.length; i++) {
    if (matchData.players[i].name == null) {
      return i.toString();
    }
  }

  throw new Error("No available player slots");
}

"use server";

import { joinMatchHost } from "./joinMatch";

export default async function createMatch(state, formData) {
    
    const numPlayers = formData.get("numPlayers");

    const res = await fetch('https://boarverse-websocket.onrender.com/games/six-nimmt-full/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numPlayers: numPlayers, setupData: {} }),
    });
    
    const data = await res.json();
    console.log(data);
    
    // setMatchID(data.matchID);
    // For host, assume playerID '0'
    return joinMatchHost(data.matchID, '0');
}
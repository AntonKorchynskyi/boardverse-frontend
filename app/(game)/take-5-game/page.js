"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically load the boardgame.io client component.
const SixNimmtClient = dynamic(() => import("./SixNimmtClient"), { ssr: false });

export default function GamePage() {
  const searchParams = useSearchParams();
  const matchID = searchParams.get("matchID");
  const playerID = searchParams.get("playerID");

  // Optionally, you might store credentials in context or pass via query
  // For simplicity, assume credentials are fetched or stored elsewhere.

  if (!matchID || !playerID) {
    return <div>Error: Missing match information.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <SixNimmtClient 
        matchID={matchID} 
        playerID={playerID} 
        // credentials={...} // Pass credentials if needed.
      />
    </div>
  );
}





// // app/game/page.jsx (or wherever you want your game page)
// "use client";

// import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
// import MatchSetup from './MatchSetup';

// // Dynamically load the boardgame.io client (rendered only on client)
// const SixNimmtClient = dynamic(() => import('./SixNimmtClient'), { ssr: false });

// export default function GamePage() {
//   const [matchInfo, setMatchInfo] = useState(null);

//   return (
//     <div className="min-h-screen bg-gray-900 p-8">
//       {!matchInfo ? (
//         // Render the match setup form if match info isn't ready.
//         <MatchSetup onSetupComplete={setMatchInfo} />
//       ) : (
//         // Once setup is complete, render the game client.
//         <SixNimmtClient 
//           matchID={matchInfo.matchID} 
//           playerID={matchInfo.playerID} 
//           credentials={matchInfo.credentials} 
//         />
//       )}
//     </div>
//   );
// }

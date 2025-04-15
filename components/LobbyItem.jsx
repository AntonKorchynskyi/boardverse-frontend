'use client';

import React from "react";
import joinMatch from "@/app/(default)/_actions/joinMatch"; // Adjust the import as needed

const LobbyItem = ({ match }) => {
  // Count only those players whose object includes a truthy 'name' property.
  const currentPlayerCount = Object.values(match.players || {}).filter(
    (player) => player && player.name
  ).length;

  // Build the button text.
  let buttonText = `Match ${match.matchID} — Players: ${currentPlayerCount}`;
  if (currentPlayerCount === 2) {
    buttonText += " (Full - join as spectator?)";
  }

  return (
    <li>
      <button
        className="p-8 bg-navBackground rounded-lg"
        onClick={() => {
            const formData = new FormData();
            formData.append("matchID", match.matchID);
            // For a full match the button is disabled so this click won't fire,
            // but for a match with less than 2 players we join normally.
            formData.append("playerID", "1");
            joinMatch(null, formData);
        }}
        // disabled={currentPlayerCount === 2}
      >
        {buttonText}
      </button>
    </li>
  );
};

export default LobbyItem;


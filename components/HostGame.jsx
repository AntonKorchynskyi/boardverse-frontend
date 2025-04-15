"use client";

import React, { useActionState } from "react";
import createMatch from "@/app/(default)/_actions/createMatch";

const HostGame = () => {
  const [state, action, pending] = useActionState(createMatch);

  return (
    <div className="flex items-center flex-col justify-center mx-auto pt-8 overflow-hidden w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Create a Lobby
      </h1>
      <form action={action} className="flex items-center flex-col justify-center">
        <label htmlFor="numPlayers">Number of players: </label>

        <select id="numPlayers" name="numPlayers">
          <option value="2">2</option>
        </select>

        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 my-4 bg-backgroundPanelFourth rounded text-white"
        >
          {pending ? "Submitting..." : "Create a Lobby"}
        </button>
      </form>
    </div>
  );
};

export default HostGame;

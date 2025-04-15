"use client";

import React, { useState } from "react";
import Guide from "./Guide";
import HostGame from "@/components/HostGame";
import JoinGame from "@/components/JoinGame";
import LobbyScreen from "@/components/LobbyScreen";

const TicTacToe = () => {
  const [selectedTab, setSelectedTab] = useState("host");

  return (
    <>

        <h1 className="text-gray-300 text-[8rem] bg-backgroundPanelSec rounded-lg my-4 text-center ">Tic Tac Toe</h1>


      <div className="p-8 bg-backgroundPanelSec min-h-screen w-11/12 m-auto">
        <div className="bg-[#4c0080] py-4">
          <div className="flex justify-around items-center  text-white font-medium">
            <button
              href="#"
              onClick={() => setSelectedTab("host")}
              className={`hover:underline transition duration-200 ${
                selectedTab === "host" ? "text-orange-500" : "text-gray-300"
              }`}
            >
              Host a session
            </button>
            {/* <button
              href="#"
              onClick={() => setSelectedTab("join")}
              className={`hover:underline transition duration-200 ${
                selectedTab === "join" ? "text-orange-500" : "text-gray-300"
              }`}
            >
              Join a session
            </button> */}
            <button
              href="#"
              onClick={() => setSelectedTab("leaderboard")}
              className={`hover:underline transition duration-200 ${
                selectedTab === "leaderboard" ? "text-orange-500" : "text-gray-300"
              }`}
            >
              Lobbies
            </button>
            <button
              href="#"
              onClick={() => setSelectedTab("guide")}
              className={`hover:underline transition duration-200 ${
                selectedTab === "guide" ? "text-orange-500" : "text-gray-300"
              }`}
            >
              Guide
            </button>
          </div>
        </div>
            
        <div className="mt-8 p-4">
          {selectedTab === "host" && <HostGame />}
          {/* {selectedTab === "join" && <JoinGame />} */}
          {selectedTab === "leaderboard" && <LobbyScreen/>}
          {selectedTab === "guide" && <Guide/>}
        </div>    
            
      </div>
    </>
  );
};

export default TicTacToe;

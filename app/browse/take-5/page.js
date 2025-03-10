"use client";

import React, { useState } from "react";
import Guide from "./Guide";

const Take5 = () => {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <>
      <div className="bg-yellow-500 w-full h-72 mt-8"></div>

      <div className="p-8 bg-backgroundPanelSec min-h-screen w-11/12 m-auto">
        <div className="bg-[#4c0080] py-4">
          <div className="flex justify-around items-center gap-8 text-white font-medium">
            <button
              href="#"
              onClick={() => setSelectedTab("host")}
              className={`hover:underline transition duration-200 ${
                selectedTab === "host" ? "text-orange-500" : "text-gray-300"
              }`}
            >
              Host a session
            </button>
            <button
              href="#"
              onClick={() => setSelectedTab("join")}
              className={`hover:underline transition duration-200 ${
                selectedTab === "join" ? "text-orange-500" : "text-gray-300"
              }`}
            >
              Join a session
            </button>
            <button
              href="#"
              onClick={() => setSelectedTab("leaderboard")}
              className={`hover:underline transition duration-200 ${
                selectedTab === "leaderboard" ? "text-orange-500" : "text-gray-300"
              }`}
            >
              Leaderboard
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
          {selectedTab === "host" && <h1>hello, host</h1>}
          {selectedTab === "join" && <h1>hello, join</h1>}
          {selectedTab === "leaderboard" && <h1>hello, leaderboard</h1>}
          {selectedTab === "guide" && <Guide/>}
        </div>    
            
      </div>
    </>
  );
};

export default Take5;

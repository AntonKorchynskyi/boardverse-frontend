"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Guide from "./Guide";
import HostGame from "@/components/HostGame";
import JoinGame from "@/components/JoinGame";

const Take5 = () => {
  const [selectedTab, setSelectedTab] = useState("host");
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Show modal on page load
    setShowModal(true);
    // Simulate development progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* <div className="bg-yellow-500 w-full h-72 mt-8"></div> */}

      <h1 className="text-gray-300 text-[8rem] bg-backgroundPanelSec rounded-lg my-4 text-center ">Take 5</h1>

      <div className={`p-8 bg-backgroundPanelSec min-h-screen w-11/12 m-auto ${showModal ? 'blur-sm' : ''}`}>
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
          {selectedTab === "host" && <HostGame />}
          {selectedTab === "join" && <JoinGame />}
          {selectedTab === "leaderboard" && <h1>hello, leaderboard</h1>}
          {selectedTab === "guide" && <Guide/>}
        </div>    
            
      </div>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-backgroundPanelThird rounded-lg p-8 max-w-md mx-4 relative">

            <div className="text-center">
              {/* Development Progress Animation */}
              <div className="mb-6">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  {/* Circular Progress Ring */}
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="#4c0080"
                      strokeWidth="6"
                      fill="none"
                      className="opacity-30"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="#ad4ef1"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 35}`}
                      strokeDashoffset={`${2 * Math.PI * 35 * (1 - progress / 100)}`}
                      className="transition-all duration-500 ease-out"
                    />
                    {/* Center Text */}
                    <text
                      x="50"
                      y="50"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl font-bold fill-white"
                      transform="rotate(90 50 50)"
                    >
                      {progress}%
                    </text>
                  </svg>
                </div>
              </div>

              {/* Message */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-3">
                  Coming Soon!
                </h2>
                <p className="text-gray-300 text-sm mb-2">
                  Take 5 is almost ready and will be available very soon!
                </p>
                <p className="text-gray-400 text-xs">
                  We're putting the finishing touches on this exciting card game.
                </p>
              </div>

              {/* Development Status */}
              <div className="mb-6">
                <div className="bg-backgroundPanelSec rounded-lg p-3">
                  <h3 className="text-lg font-semibold text-white mb-2">Development Progress</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Game Logic</span>
                      <span className="text-green-400">✓ Complete</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">UI/UX Design</span>
                      <span className="text-green-400">✓ Complete</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Multiplayer</span>
                      <span className="text-yellow-400">🔄 Final Testing</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Launch</span>
                      <span className="text-yellow-400">🔄 Almost Ready</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link href="/">
                <button
                  onClick={closeModal}
                  className="bg-[#ad4ef1] hover:bg-[#9a3dd9] text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Take5;

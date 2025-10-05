"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Senators = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    // Simulate development progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 60) {
          clearInterval(interval);
          return 60;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1 className="text-gray-300 text-[8rem] bg-backgroundPanelSec rounded-lg my-4 text-center">
        Senators
      </h1>

      <div className="p-8 bg-backgroundPanelSec min-h-screen w-11/12 m-auto">
        <div className="bg-[#4c0080] py-4 rounded-lg">
          <div className="flex justify-center items-center text-white font-medium">
            <span className="text-xl">Game Development Status</span>
          </div>
        </div>

        <div className="mt-8 p-8 bg-backgroundPanelThird rounded-lg">
          <div className={`text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Development Progress Animation */}
            <div className="mb-8">
              <div className="relative w-64 h-64 mx-auto mb-6">
                {/* Circular Progress Ring */}
                <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#4c0080"
                    strokeWidth="8"
                    fill="none"
                    className="opacity-30"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#ad4ef1"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                    className="transition-all duration-500 ease-out"
                  />
                  {/* Center Text */}
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold fill-white"
                    transform="rotate(90 50 50)"
                  >
                    {progress}%
                  </text>
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Sorry for the Inconvenience
              </h2>
              <p className="text-gray-300 text-lg mb-2">
                Senators is currently in development and will be available soon!
              </p>
              <p className="text-gray-400 text-sm">
                Our team is working hard to bring you the best board game experience.
              </p>
            </div>

            {/* Development Status */}
            <div className="mb-8">
              <div className="bg-backgroundPanelSec rounded-lg p-4">
                <h3 className="text-xl font-semibold text-white mb-3">Development Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Game Logic</span>
                    <span className="text-green-400">✓ Complete</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">UI/UX Design</span>
                    <span className="text-yellow-400">🔄 In Progress</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Multiplayer</span>
                    <span className="text-gray-400">⏳ Pending</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Testing</span>
                    <span className="text-gray-400">⏳ Pending</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Link href="/">
              <button className="bg-[#ad4ef1] hover:bg-[#9a3dd9] text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Senators;

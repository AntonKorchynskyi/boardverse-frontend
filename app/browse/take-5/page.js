import React from "react";

const Take5 = () => {
  return (
    <>
      <div className="bg-yellow-500 w-full h-72 mt-8"></div>
      <div className="p-8 bg-backgroundPanelSec min-h-screen w-11/12 m-auto">
        <div className="bg-[#4c0080] py-4">
          <div className="flex justify-around items-center gap-8 text-white font-medium">
            <a
              href="#"
              className="hover:underline hover:text-gray-300 transition duration-200"
            >
              Host a session
            </a>
            <a
              href="#"
              className="hover:underline hover:text-gray-300 transition duration-200"
            >
              Join a session
            </a>
            <a href="#" className="hover:underline hover:text-gray-300 transition duration-200">
              Leaderboard
            </a>
            <a
              href="#"
              className="hover:underline hover:text-gray-300 transition duration-200"
            >
              Guide
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Take5;

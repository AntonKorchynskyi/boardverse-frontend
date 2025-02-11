import React from "react";
import Image from "next/image";

const GameActivityCard = ({ imageUrl, title, hours }) => (
  <div className="flex items-center bg-[#4a007f] rounded-lg p-4">
    {/* Game Image */}
    <div className="w-72 h-38 rounded-lg overflow-hidden bg-gray-400 mr-4">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={400}
        className="object-cover"
      />
    </div>

    {/* Game Info */}
    <div>
      <h3 className="text-white text-2xl font-medium">{title}</h3>
      <p className="text-gray-400 text-lg mt-1">{hours}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  return (
    <div className="p-8 bg-backgroundPanelSec min-h-screen">
      {/* Upper Section */}
      <div className="flex mb-6 items-center">
        {/* Header Section (user picture and nickname) */}
        <div className="flex items-center w-2/3">
          {/* User Avatar */}
          <div className="bg-backgroundPanelThird mr-6 rounded-md p-2 h-full">
            <Image
              src="/avatar-placeholder.png" // Replace with dynamic avatar URL
              alt="User Avatar"
              width={80}
              height={80}
              className="object-cover w-44 h-44 rounded-full overflow-hidden bg-gray-400"
            />
          </div>

          {/* User Information */}
          <div>
            <h1 className="text-3xl font-bold text-white">VaTruShka02</h1>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 mt-2">
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <h2 className="text-sm text-green-400">Online</h2>
            </div>

            {/* User Description */}
            <p className="text-gray-300 text-lg mt-4 max-w-lg leading-6 bg-backgroundPanelThird p-4 rounded-md flex-grow w-full">
              Passionate about all things board games! I love strategic games
              that require a bit of thinking and planning. When I'm not playing
              games, I'm probably reading about medieval history or exploring
              new game mechanics.
            </p>
          </div>
        </div>

        {/* Level and Rank Section */}
        <div className="flex flex-col items-center rounded-lg ml-12 w-1/3">
          {/* Level Display */}
          <div className="flex items-center justify-between w-full mb-4">
            <h2 className="text-2xl text-white">Level</h2>
            <span className="text-2xl font-bold text-white border-2 border-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              10
            </span>
          </div>

          {/* Rank Score Display */}
          <div className="flex items-center justify-between  w-full mb-6">
            <h2 className="text-2xl text-white">Total Rank Score</h2>
            <div className="flex items-center gap-2 self-baseline">
              <span className="text-2xl font-bold text-white">623</span>
              <Image
                src="/achievement-award-medal-icon.svg" // Replace with your medal icon URL
                alt="Medal Icon"
                width={24}
                height={24}
                className="w-7 h-7 pt-1"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white text-[#330059] font-medium rounded-lg hover:bg-gray-200">
              Edit Profile
            </button>
            <button className="px-4 py-2 bg-white text-[#330059] font-medium rounded-lg hover:bg-gray-200">
              Games History
            </button>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex items-stretch">
        {/* Recent Activity Section */}
        <div className="flex flex-col w-2/3 bg-backgroundPanelThird">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#1a0d37] p-4">
            <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
            <p className="text-gray-400 text-xl">12 hrs</p>
          </div>

          {/* Game Activity Cards */}
          <div className="flex flex-col gap-4 p-6">
            <GameActivityCard
              imageUrl="/scout-game.png"
              title="Scout"
              hours="8 hrs on record"
            />
            <GameActivityCard
              imageUrl="/catan-game.png"
              title="Catan"
              hours="2 hrs on record"
            />
            <GameActivityCard
              imageUrl="/take-5-game.jpg"
              title="Take 5"
              hours="2 hrs on record"
            />
          </div>
        </div>

        {/* Total Statistics */}
        <div className="w-1/3 ml-12 p-2 bg-backgroundPanelThird">
          <h2 className="text-center text-3xl mb-8">Total Statistics</h2>
          <div className="flex flex-col px-4">
            <div className="flex justify-between text-2xl mb-6">
              <h3>Total Games Played</h3>
              <p className="text-gray-400">* 32</p>
            </div>

            <div className="flex justify-between text-2xl mb-6">
              <h3>Total Wins</h3>
              <p className="text-gray-400">* 32</p>
            </div>

            <div className="flex justify-between text-2xl mb-6">
              <h3>Total Losses</h3>
              <p className="text-gray-400">* 0</p>
            </div>

            <div className="flex justify-between text-2xl">
              <h3>Win Rate</h3>
              <p className="text-gray-400">* 0.52</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

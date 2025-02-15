import Image from "next/image";

// 1️⃣ Fetch Profile Data (Server-Side)
async function getUserProfile() {
  try {
    // 'cache: "no-store"' ensures a fresh call on every request
    const res = await fetch(
      "https://boardverse-backend.onrender.com/user/profile/1609a174-c314-487a-8f8c-0ee6ea043385",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data; // e.g., { userName, userDesc, userLevel, userStatus, ... }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

// 2️⃣ Fetch User Stats (Server-Side)
async function getUserStats() {
  try {
    const res = await fetch(
      "https://boardverse-backend.onrender.com/stats/stats/1609a174-c314-487a-8f8c-0ee6ea043385",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    ); 
    // Expected JSON response shape, for example: 
    // { "totalGamesPlayed": number, "totalWins": number, "totalLosses": number, "rankScore": number }

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
}

// 3️⃣ A Reusable Card Component
function GameActivityCard({ imageUrl, title, hours }) {
  return (
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
}

// 4️⃣ Main Profile Page as a Server Component
export default async function ProfilePage() {
  // Fetch data from both endpoints in parallel
  const [profileData, statsData] = await Promise.all([
    getUserProfile(),
    getUserStats(),
  ]);

  // If there's an error or null response in either fetch, show an error
  if (!profileData || !statsData) {
    return (
      <div className="p-8 bg-backgroundPanelSec min-h-screen">
        <h1 className="text-2xl text-red-500">Error</h1>
        <p className="text-red-400">Unable to fetch profile or stats data.</p>
      </div>
    );
  }

  // Destructure the profile fields
  const {
    userName = "Unnamed User",
    userDesc = null,
    userLevel = 1,
    userStatus = "Offline",
  } = profileData;

  // Destructure the stats fields
  const {
    totalGamesPlayed = 0,
    totalWins = 0,
    totalLosses = 0,
    rankScore = 0,
  } = statsData;

  // Optionally, compute winRate from stats if needed (uncomment below if desired):
  const winRate = totalGamesPlayed > 0 
    ? ((totalWins / totalGamesPlayed) * 100).toFixed(2) + "%"
    : "0%";

  return (
    <div className="p-8 bg-backgroundPanelSec min-h-screen">
      {/* ──────────────── Upper Section ──────────────── */}
      <div className="flex mb-6 items-center">
        {/* Header Section (user picture and nickname) */}
        <div className="flex items-center w-2/3">
          {/* User Avatar */}
          <div className="bg-backgroundPanelThird mr-6 rounded-md p-2 h-full">
            <Image
              src="/basic-profile-pic.png" // Replace with dynamic avatar URL if available
              alt="User Avatar"
              width={80}
              height={80}
              className="object-cover w-44 h-44 rounded-full overflow-hidden bg-gray-400"
            />
          </div>

          {/* User Information */}
          <div>
            <h1 className="text-3xl font-bold text-white">{userName}</h1>

            {/* Status Indicator */}
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  userStatus === "Online" ? "bg-green-400" : "bg-gray-500"
                }`}
              ></span>
              <h2
                className={`text-sm ${
                  userStatus === "Online" ? "text-green-400" : "text-gray-400"
                }`}
              >
                {userStatus}
              </h2>
            </div>

            {/* User Description */}
            <p className="text-gray-300 text-lg mt-4 max-w-lg leading-6 bg-backgroundPanelThird p-4 rounded-md flex-grow w-full">
              {userDesc}
            </p>
          </div>
        </div>

        {/* Level and Rank Section */}
        <div className="flex flex-col items-center rounded-lg ml-12 w-1/3">
          {/* Level Display */}
          <div className="flex items-center justify-between w-full mb-4">
            <h2 className="text-2xl text-white">Level</h2>
            <span className="text-2xl font-bold text-white border-2 border-red-500 rounded-full w-10 h-10 flex items-center justify-center">
              {userLevel}
            </span>
          </div>

          {/* Rank Score Display */}
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="text-2xl text-white">Rank Score</h2>
            <div className="flex items-center gap-2 self-baseline">
              <span className="text-2xl font-bold text-white">
                {rankScore}
              </span>
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

      {/* ──────────────── Lower Section ──────────────── */}
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
              <p className="text-gray-400">{totalGamesPlayed}</p>
            </div>

            <div className="flex justify-between text-2xl mb-6">
              <h3>Total Wins</h3>
              <p className="text-gray-400">{totalWins}</p>
            </div>

            <div className="flex justify-between text-2xl mb-6">
              <h3>Total Losses</h3>
              <p className="text-gray-400">{totalLosses}</p>
            </div>

            <div className="flex justify-between text-2xl">
              <h3>Win Rate</h3>
              <p className="text-gray-400">
                {winRate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

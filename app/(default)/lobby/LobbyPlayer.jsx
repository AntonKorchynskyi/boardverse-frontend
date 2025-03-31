import React from 'react';
import Image from 'next/image';

const LobbyPlayer = ({ playerID, playerData }) => {
  return (
    <div className="bg-backgroundPanelThird p-6 flex items-center gap-4">
      <Image
        src="/basic-profile-pic.png"
        width={50}
        height={50}
        alt="player-profile-picture"
      />
      <div>
        <h2 className="text-xl">{playerData.name || `Player ${playerID}`}</h2>
        <p className="text-sm">ID: {playerID}</p>
      </div>
    </div>
  );
};

export default LobbyPlayer;



// import React from "react";
// import Image from "next/image";

// //TODO

// const LobbyPlayer = () => {
//   return (
//     <div className="bg-backgroundPanelThird p-6 flex">
//       <Image
//         src={"/basic-profile-pic.png"}
//         width={100}
//         height={100}
//         alt="player-profile-picture"
//       />
//       <div className="ml-6 pt-3">
//         <h2 className="text-2xl">PlayerName</h2>
//         <p className="text-xl">playerID</p>
//       </div>
//     </div>
//   );
// };

// export default LobbyPlayer;

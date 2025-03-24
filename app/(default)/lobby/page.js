import React from 'react'
import LobbyPlayer from './LobbyPlayer'

const Lobby = () => {
  return (
    <div>
        <h1 className='text-3xl'>Lobby</h1>
        {/* Add Link maybe? */}
        <button>Start the Game</button> 
        <LobbyPlayer />
    </div>
  )
}

export default Lobby
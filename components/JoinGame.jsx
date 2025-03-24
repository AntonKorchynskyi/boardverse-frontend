import React, {useActionState} from 'react'
import joinMatch from '@/app/(default)/_actions/joinMatch'

const JoinGame = () => {

  const [state, action, pending] = useActionState(joinMatch);

  return (
    <div className="flex items-center justify-center pt-8 overflow-hidden w-full max-w-md bg-opacity-50 bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white mb-6">Join a Lobby</h1>
      <form action={action}>
        <label htmlFor="matchID">Match Id:</label>

        <input id="matchID" name="matchID" placeholder='Match Id'>
        </input>

        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 bg-backgroundPanelFourth rounded text-white"
        >
          {pending ? "Submitting..." : "Join a Lobby"}
        </button>
      </form>
    </div>
  )
}

export default JoinGame;
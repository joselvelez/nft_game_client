export default function Header({ setCurrentComponent }) {
    return (
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">Team America NFT Game</h2>
        </div>
        <div className="mr-10">
          <button
            onClick={() => setCurrentComponent('Rules')}
          >
            <p className="text-white">How to Play</p>
          </button>
        </div>
      </div>
    )
  }
  
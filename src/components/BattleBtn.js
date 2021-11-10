export const BattleBtn = ({ attackBoss, battleCharacter }) => {
    return (
        <button
        type="button"
        disabled={parseInt(battleCharacter.battleCharacter.hp) === 0 ? true : false}
        onClick={() => attackBoss(battleCharacter.id)}
        className="inline-flex justify-center md:w-96 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
            bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-20"
        >
            Fight the Big Boss!
        </button>
    )
}
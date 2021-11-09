
export default function BattleCardPlayer({ characterData }) {
    return (
      <div className="flex md:w-auto">
        <div className="mr-3 ml-3 flex-shrink-0">
          <img className="w-32 h-32 flex-shrink-0 rounded-full" src={characterData.imageURI} alt={characterData.name} />
        </div>
        <div className="md:w-72">
          <h4 className="text-lg font-bold">{characterData.name}</h4>
          <p>{`Attack Damage: ${characterData.attackDamage}`}</p>
          <div className="shadow w-full bg-gray-300 mt-2">
            <div className="bg-green-500 text-xs leading-none py-1 text-center text-white" 
              style={{width: `${(characterData.hp/characterData.maxHp)*100}%`}}>
                {`${characterData.hp}/${characterData.maxHp}`}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
import { useEffect, useState } from "react";
import { contractAddress } from "../constants/contractConstants";
import { fetchCharacter, getContractProvider, reviveCharacter } from "../contracts/contractAPI";
import reviveGif from '../images/revive.gif';
  
export default function ViewCharacter({ setCurrentComponent, selectedCharacter }) {
    const [isReviving, setIsReviving] = useState(false);
    const [currentCharacter, setCurrentCharacter] = useState({
        id: null,
        battleCharacter: {
            name: null,
            hp: null,
            maxHp: null,
            imageURI: null,
            attackDamage: null,
            characterIndex: null
        }
    });

    useEffect(() => {
        const provider = getContractProvider();
        let mounted = true;
        
        if (mounted) {
            console.log("loading character");
            loadCharacter(selectedCharacter);
        }

        provider.on("CharacterRevived", tokenID => {
            if (mounted) {
                console.log('Character revived');
                loadCharacter(selectedCharacter);
                setIsReviving(false);
            }
        });

        return function cleanup() {
            mounted = false;
        }
    }, [selectedCharacter]);

    async function loadCharacter(_selectedCharacter) {
        try {
            const _character = await fetchCharacter(_selectedCharacter);
            setCurrentCharacter(_character);
        } catch (e) {
            console.log("Unable to fetch character data");
        }
    }

    async function reviveCurrentCharacter(id) {
        try {
            setIsReviving(true);
            try {
                const _revived = await reviveCharacter(id);
                if (_revived) {
                    console.log("Character was revived");
                } else {
                    console.log("Error attempting to revive");
                    setIsReviving(false);
                }
            } catch (e) {
                console.log("Unable to revive character", e);
            }
        } catch (e) {
            console.log("Unable to revive character", e);
        }
    }

    return (
      <div className="bg-white rounded">
        <div className="mx-auto py-4 px-4 sm:px-4 lg:px-6 lg:py-6">
            {isReviving ?
                <div className="flex flex-col items-center">
                    <img src={reviveGif} className="inline" width="500" alt="revive" />
                    <p>We are doing our best to revive your character... stand by...</p>
                </div> :
                <div className=" shadow rounded-lg bg-gray-100 flex flex-row p-2">
                <div>
                    <img src={currentCharacter.battleCharacter.imageURI} 
                        alt={currentCharacter.battleCharacter.name}
                        className="w-40 h-40 rounded-lg"
                    />
                </div>
                <div className="py-2 pl-3">
                    <p className="text-2xl font-semibold text-gray-900">{currentCharacter.battleCharacter.name}</p>
                    <p>Health</p>
                    <div className="w-full shadow bg-gray-300">
                        <div className="bg-green-500 text-xs leading-none py-1 my-1 text-center text-black" 
                        style={{width: `${(currentCharacter.battleCharacter.hp / currentCharacter.battleCharacter.maxHp)*100}%`}}>
                            {`${currentCharacter.battleCharacter.hp}/${currentCharacter.battleCharacter.maxHp}`}
                        </div>
                    </div>
                    <p>Attack Damage: {parseInt(currentCharacter.battleCharacter.attackDamage)}</p>
                </div>
                <div>
                    <div className="flex flex-col ml-8 h-full justify-evenly">
                        <div className="flex flex-col place-items-center p-3">
                            <div className="">
                                <a href={`https://testnets.opensea.io/assets/${contractAddress.toLowerCase()}/${currentCharacter.id}`} 
                                    rel="noreferrer" target="_blank" className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150"
                                >
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                                            shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        View your character on OpenSea
                                    </button>
                                </a>
                            </div>
                            <div className="py-2 w-full">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentComponent('Battle')}
                                        disabled={parseInt(currentCharacter.battleCharacter.hp) === 0 ? true : false}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md w-full disabled:opacity-20
                                            shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        Battle the Boss!
                                    </button>
                            </div>
                            <div className="w-full">
                                    <button
                                        type="button"
                                        disabled={parseInt(currentCharacter.battleCharacter.hp) > 0 ? true : false}
                                        onClick={() => reviveCurrentCharacter(currentCharacter.id)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md w-full disabled:opacity-20
                                            shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        Revive your character
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
      </div>
    )
  }

  
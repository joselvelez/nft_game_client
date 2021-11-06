import { useEffect, useState } from "react";
import { contractAddress } from "../constants/contractConstants";
import { NoTeamAvailable } from "./NoTeamAvailable";
import { TeamAvailable } from "./TeamAvailable";
import { fetchCurrentTeam } from "../contracts/contractAPI";
  
export default function LoadCurrentTeam({ setCurrentComponent, setSelectedCharacter }) {
    const [currentTeam, setCurrentTeam] = useState([]);

    const prepArena = (_selectedCharacter) => {
        setSelectedCharacter(_selectedCharacter);
        setCurrentComponent('Battle');
    }

    useEffect(() => {
        console.log("Loading current team")
        loadTeam();
    },[]);

    async function loadTeam(_currentAccount) {
        try {
            const _team = await fetchCurrentTeam(_currentAccount);
            setCurrentTeam(_team);
        } catch (e) {
            console.log("Unable to fetch team data");
        }
    }

    return (
      <div className="bg-white rounded">
      <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-8">
        <div className="space-y-6">
            {currentTeam.length > 0 ? <TeamAvailable /> : <NoTeamAvailable />}
          <ul
            className="space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:grid-cols-3"
          >
                {currentTeam.map((person) => (
                <li key={person.id}>
                    <div className="space-y-1">
                    <div className="flex flex-row">
                        <img className="w-32 h-32 flex-shrink-0 rounded-full" src={person.battleCharacter.imageURI} alt="" />
                        <div className="mx-auto my-auto py-2 flex flex-col">
                            <a href={`https://testnets.opensea.io/assets/${contractAddress}/${person.id}`} target="_blank" rel="noreferrer">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-2.5 py-2 m-2 border border-transparent text-xs font-medium rounded shadow-sm text-white
                                    bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Open Sea
                                </button>
                            </a>
                            <button
                                type="button"
                                onClick={() => prepArena(person.id)}
                                className="inline-flex items-center px-2.5 py-2 m-2 border border-transparent text-xs font-medium rounded shadow-sm text-white
                                bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Battle
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="text-lg leading-7 font-normal space-y-1">
                        <h3>{person.battleCharacter.name}</h3>
                        </div>
                    </div>
                    </div>
                </li>
                ))}
          </ul>
        </div>
      </div>
      </div>
    )
  }
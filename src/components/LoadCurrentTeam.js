import { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";
import { contractAddress } from "../constants/contractConstants";
import { NoTeamAvailable } from "./NoTeamAvailable";
import { TeamAvailable } from "./TeamAvailable";
  
  export default function LoadCurrentTeam({ setCurrentComponent, setSelectedCharacter }) {
    const [currentTeam, setCurrentTeam] = useState([]);
    const appContext = useContext(AppContext);

    const prepArena = (_selectedCharacter) => {
        setSelectedCharacter(_selectedCharacter);
        setCurrentComponent('Battle');
    }

    const fetchCharacter = async (tokenId) => {
        try {
            const character = await appContext.state.contractProvider.getCharacter(tokenId);
            return {id: tokenId, character: character};
        } catch (e) {
            console.log("Error, cannot fetch chacter");
        }
    }

    const fetchCurrentTeam = async () => {
        try {
            const team = [];
            const result = await appContext.state.contractProvider.getListOfOwnedCharacters(appContext.state.currentAccount[0]);
            
            for (let i = 0; i < result.length; i++) {
                try {
                    const character = await fetchCharacter(result[i]);
                    team.push(character)
                } catch (e) {
                    console.log(e);
                }
            }
            setCurrentTeam(team);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
      console.log("Loading current team")
      fetchCurrentTeam();
    },[]);

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
                        <img className="w-32 h-32 flex-shrink-0 rounded-full" src={person.character.imageURI} alt="" />
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
                        <h3>{person.character.name}</h3>
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
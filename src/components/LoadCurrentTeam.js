import { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";
  
  export default function LoadCurrentTeam() {
    const [currentTeam, setCurrentTeam] = useState([]);
    const appContext = useContext(AppContext);

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
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Your current team</h2>
            <p className="text-gray-500">
            Select from one of the default characters below to mint your own personal NFT with unique traits based on the selected character.
            </p>
          </div>
          <ul
            className="space-y-8 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:grid-cols-3"
          >
                {currentTeam.map((person) => (
                <li key={person.id}>
                    <div className="space-y-1">
                    <div className="flex flex-row">
                        <img className="w-32 h-32 flex-shrink-0 rounded-full" src={person.character.imageURI} alt="" />
                        <div className="mx-auto my-auto py-2 flex flex-col">
                        <button
                            type="button"
                            className="inline-flex items-center px-2.5 py-2 m-2 border border-transparent text-xs font-medium rounded shadow-sm text-white
                            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Open Sea
                        </button>
                        <button
                            type="button"
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
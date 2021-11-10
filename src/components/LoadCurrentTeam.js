import { useEffect, useState } from "react";
import { NoTeamAvailable } from "./NoTeamAvailable";
import { TeamAvailable } from "./TeamAvailable";
import { fetchCurrentTeam } from "../contracts/contractAPI";
  
export default function LoadCurrentTeam({ setCurrentComponent, setSelectedCharacter }) {
    const [currentTeam, setCurrentTeam] = useState([]);

    useEffect(() => {
        console.log("Loading current team")
        loadTeam();
    },[]);

    async function loadTeam() {
        try {
            const _team = await fetchCurrentTeam();
            setCurrentTeam(_team);
        } catch (e) {
            console.log("Unable to fetch team data");
        }
    }

    const loadCharacter = (characterId) => {
        setSelectedCharacter(characterId);
        setCurrentComponent('ViewCharacter');
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
                        <div className="space-y-1 w-auto flex flex-col place-items-center">
                            <div className="flex flex-row">
                                <img className="w-32 h-32 flex-shrink-0 rounded-full cursor-pointer hover:shadow-lg" 
                                    src={person.battleCharacter.imageURI} alt="" onClick={() => loadCharacter(person.id)}/>
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
    );
  }
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";

const people = [
    {
      name: 'Matt Damon',
      imageUrl:
        'https://static.wikia.nocookie.net/teamamerica/images/0/08/Mattdamon.png',
    },
  ]
  
  export default function MintNewCharacterSelection() {
    const [defaultCharactersArray, setDefaultCharactersArray] = useState();
    const appContext = useContext(AppContext);

    const fetchDefaultCharacters = async () => {
        try {
            const _defaultCharactersArray = await appContext.contractSigner.getAllDefaultCharacters();
            console.log(_defaultCharactersArray);
            setDefaultCharactersArray(_defaultCharactersArray);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDefaultCharacters();
    }, []);

    return (
      <div className="bg-white rounded">
        <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-8">
          <div className="space-y-6">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Choose a character to mint</h2>
              <p className="text-gray-500">
              Select from one of the default characters below to mint your own personal NFT with unique traits based on the selected character.
              </p>
            </div>
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <img className="object-cover shadow-lg rounded-lg" src={person.imageUrl} alt="" />
                    </div>
  
                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.name}</h3>
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
  
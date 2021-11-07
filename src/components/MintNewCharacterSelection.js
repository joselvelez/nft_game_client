import { useEffect, useState } from "react";
import { fetchDefaultCharacters, mintNewCharacter } from "../contracts/contractAPI";
import loadingIndicator from '../images/loadingIndicator.gif';
import MintNotificationSuccess from "./MintNotificationSuccess";
  
  export default function MintNewCharacterSelection() {
    const [defaultCharactersArray, setDefaultCharactersArray] = useState([]);
    const [isMinting, setIsMinting] = useState(false);
    const [showMintNotification, setShowMintNotification] = useState(false);

    useEffect(() => {
      console.log("Loading default characters")
      loadDefaultCharacters();
    }, []);

    async function loadDefaultCharacters() {
      try {
        const _defaultCharacters = await fetchDefaultCharacters();
        setDefaultCharactersArray(_defaultCharacters);
      } catch (e) {
        console.log("Unable to load default characters");
      }
    }

    async function mintCharacter(_characterIndex) {
      try {
        setIsMinting(true);
        console.log("Minting new character...");
        try {
          const _minted = await mintNewCharacter(_characterIndex);
          if (_minted === true) {
            console.log("Mint successfull");
            setIsMinting(false);
            setShowMintNotification(true);
          } else {
            console.log(_minted.message);
            setIsMinting(false);
          }
        } catch (e) {
            console.log("Mint was not successful");
            setIsMinting(false);
        }
      } catch (e) {
        console.log("Unable to mint new character");
        setIsMinting(false);
      }
    }

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
              className="space-y-6 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:space-y-0 lg:grid-cols-4"
            >
              {defaultCharactersArray.map((person) => (
                <li key={parseInt(person.characterIndex) }>
                  <div className="space-y-1">
                    <div className="flex flex-row">
                      {isMinting ? <img className="w-32 h-32 flex-shrink-0 rounded-full" src={loadingIndicator} alt="NFT minting..." /> 
                        : <img className="w-32 h-32 flex-shrink-0 rounded-full" src={person.imageURI} alt="" />}
                      <div className="mx-auto my-auto p-2">
                        <button
                          type="button"
                          onClick={() => mintCharacter(person.characterIndex)}
                          className="inline-flex items-center px-3.5 py-2.5 border border-transparent text-xs font-medium rounded shadow-sm text-white
                            bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Mint
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-lg leading-7 font-normal space-y-1">
                        <h3>{person.name}</h3>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {showMintNotification ? <MintNotificationSuccess setMintNotificationValue={setShowMintNotification} /> : ''}
        </div>
      </div>
    )
  }
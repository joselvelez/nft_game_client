// Core Imports Begin
import { useContext, useState } from 'react';
import AppContext from '../../context/app-context';
import { Footer } from '../Footer';
import Header from '../Header';
import LoadCurrentTeam from '../LoadCurrentTeam';
import LoadTeam from '../LoadTeamBtn';
// Core Imports End

// Components Imports
import MintNewCharacter from '../MintNewCharacterBtn';
import MintNewCharacterSelection from '../MintNewCharacterSelection';

export const Content = () => {
  const appContext = useContext(AppContext);
  const [currentComponent, setCurrentComponent] = useState('MintNewCharacter'); // Options are MintNewCharacter, LoadTeam, Battle
  const ethereum = window.ethereum;

  // Handle wallet events (Docs @ https://docs.metamask.io/guide/ethereum-provider.html#events)
  ethereum.on('accountsChanged', (accounts) => {
  console.log("Changing account");
  appContext.getAccounts(accounts)
  });

  ethereum.on('chainChanged', (chainId) => {
  console.log(`Switching chains to ${chainId}`);
  appContext.getChain(chainId);
  window.location.reload();
  });

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Header />
      <div className="flex flex-row">
        <MintNewCharacter setCurrentComponent={setCurrentComponent}/>
        <LoadTeam setCurrentComponent={setCurrentComponent} />
      </div>

      <div className="p-4">
        {(() => {
            switch (currentComponent) {
              case 'LoadTeam':
                return <LoadCurrentTeam />;
              case 'Battle':
                return <LoadTeam />;
              default:
                return <MintNewCharacterSelection />;
            }
          })()}
        <Footer />
      </div>
    </div>
  );
};
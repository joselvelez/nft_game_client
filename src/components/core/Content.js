// Core Imports Begin
import { useContext } from 'react';
import AppContext from '../../context/app-context';
import { Footer } from '../Footer';
import Header from '../Header';
import LoadCurrentTeam from '../LoadCurrentTeam';
import LoadTeam from '../LoadTeam';
// Core Imports End

// Components Imports
import MintNewCharacter from '../MintNewCharacterBtn';
import MintNewCharacterSelection from '../MintNewCharacterSelection';

export const Content = () => {
  const appContext = useContext(AppContext);
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
        <MintNewCharacter />
        <LoadTeam />
      </div>

      <div className="p-4">
        <MintNewCharacterSelection />
        <LoadCurrentTeam />
        <Footer />
      </div>
    </div>
  );
};
// Core Imports Begin
import { useContext } from 'react';
import { contractAddress } from '../../constants/contractConstants';
import AppContext from '../../context/app-context';
// Core Imports End

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
    <section>
      <p>sup man</p>
    </section>
  );
};
import { useContext } from 'react';
import { Wave } from '../Wave';
import { WaveStats } from '../WaveStats';
import { TotalWaves } from '../TotalWaves';
import { TopWaverAddress } from '../TopWaverAddress';
import { MaxWaves } from '../MaxWaves';
import { Transactions } from '../Transactions';
import { contractAddress } from '../../constants/contractConstants';
import AppContext from '../../context/app-context';

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

      <div className="theme-switcher">
        <input className="switcherInput" type="checkbox" id="switcher" onChange={() => appContext.setTheme(!appContext.state.darkTheme)} />
        <label className="switcherLabel" htmlFor="switcher">Switch</label>
      </div>
      
      <div className="mainContainer">
          <div className="app">
            <div>
              <h1>Wave Portal Web3 dApp</h1>
              <p>
                Sending a wave creates a new transaction on 
                the blockchain that records the sender's address, the timestamp of the transaction, and a message (if the sender leaves one).
              </p>
              <p>
                The current contract address for this web3 app is &nbsp;
                <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`}>{contractAddress}</a>
              </p>
              <p>The code for this project is on my github:</p>
              <p>
                <b>Front End</b>: <a href="https://github.com/joselvelez/wave-portal-client">https://github.com/joselvelez/wave-portal-client</a>&nbsp; 
                <b>Hardhat project</b>: <a href="https://github.com/joselvelez/wave-portal-jv">https://github.com/joselvelez/wave-portal-jv</a>
              </p>
            </div>
        </div>

        <div className="app">
          <Wave />
        </div>

        <div className="app">
          <div className="waveStat">
            <TotalWaves />
          </div>
          <div className="waveStat">
            <TopWaverAddress />
          </div>
          <div className="waveStat">
            <MaxWaves />
          </div>
        </div>

        <div className="app">
          <WaveStats />
        </div>          

        <div className="app">
          <Transactions />
        </div>

      </div>
    </section>
  );
};
import { useContext } from 'react';
import { WalletContext } from '../../context/WalletContext';
import { Connect } from './Connect';
import { Content } from '../Content';
import { NoWallet } from './NoWallet';
import { WrongChain } from './WrongChain';
import { configuredChain } from '../../constants/networks';

export const Main = () => {
    const appContext = useContext(WalletContext);

    /*
        Do some pre-checks before rendering the app.
        1. Check if a wallet is installed
        2. Check if a wallet is installed AND is connected
        3. Check if a wallet is installed AND is connected to correct network
        4. Check if a wallet is installed, connected AND on the correct network (pass go :) )
    */

    if (appContext.state.walletInstalled === true && appContext.state.currentAccount.length > 0 && appContext.state.currentChain === configuredChain) {
        return (
            <div className="bg-gray-900 h-full p-5">
                <div className="md:container md:mx-auto">
                    <Content />
                </div>
            </div>
        );
    } else if (appContext.state.walletInstalled === true && appContext.state.currentAccount.length === 0 && appContext.state.currentChain === configuredChain) {
        return (
            <div className="bg-gray-900 h-full p-5">
                <div className="md:container md:mx-auto text-white">
                    <Connect />
                </div>
            </div>
        )
    } else if (appContext.state.walletInstalled === false) {
        return (
            <div className="bg-gray-900 h-full p-5">
                <div className="md:container md:mx-auto text-white">
                    <NoWallet />
                </div>
            </div>
        )
    } else if (appContext.state.walletInstalled === true && appContext.state.currentChain !== configuredChain) {
        return (
            <div className="bg-gray-900 h-full p-5">
                <div className="md:container md:mx-auto text-white">
                    <WrongChain />
                </div>
            </div>
        )
    }
}
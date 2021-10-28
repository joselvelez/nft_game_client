import { useContext, useEffect } from 'react';
import AppContext from '../../context/app-context';
import { Connect } from './Connect';
import { Content } from './Content';
import { NoWallet } from './NoWallet';
import { WrongChain } from './WrongChain';

export const Main = () => {
    const appContext = useContext(AppContext);
    const ethereum = window.ethereum;
    console.log(appContext);

    const fetchAccounts = async () => {
        try {
            const _accounts = await ethereum.request({ method: 'eth_accounts'});
            if (_accounts !== window.localStorage.getItem("lastAccount")) {
                appContext.getAccounts(_accounts);
            }
        } catch (e) {
            console.log("No wallet detected");
        };
    };

    const fetchChain = async () => {
        try {
            const _chain = await ethereum.request({method: 'eth_chainId'});
            appContext.getChain(_chain);
        } catch (e) {
            console.log("No chain found");
        }
    }

    useEffect(() => {
        if (typeof(ethereum) !== 'undefined') {
            appContext.walletInstalled();
            fetchAccounts()
            fetchChain();
        }
    }, []);

    /*
        Do some pre-checks before rendering the app.
        1. Check if a wallet is installed
        2. Check if a wallet is installed AND is connected
        3. Check if a wallet is installed AND is connected to correct network
        4. Check if a wallet is installed, connected AND on the correct network (pass go :) )
    */

    if (appContext.state.walletInstalled === true && appContext.state.currentAccount.length > 0 && appContext.state.currentChain === '0x4') {
        return (
            <Content />
        );
    } else if (appContext.state.walletInstalled === true && appContext.state.currentAccount.length === 0) {
        return (
            <Connect />
        )
    } else if (appContext.state.walletInstalled === false) {
        return (
            <NoWallet />
        )
    } else if (appContext.state.walletInstalled === true && appContext.state.currentChain !== '0x4') {
        return (
            <WrongChain />
        )
    }
}
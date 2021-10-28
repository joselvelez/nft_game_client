import { ethers } from "ethers";
import { useReducer, useLayoutEffect, useEffect } from "react";
import { contractABI, contractAddress } from "../constants/contractConstants";
import { GET_ACCOUNTS, GET_CHAIN, WALLET_INSTALLED, SET_CONTRACT_PROVIDER, SET_CONTRACT_SIGNER } from "./app-actions";
import AppContext from "./app-context";
import { appReducer } from "./app-reducer";

const AppStateProvider = ({ children }) => {
    // Initial App state
    const initialState = {
        walletInstalled: false,
        currentAccount: [],
        currentChain: null,
        contractProvider: null,
        contractSigner: null,
    }
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Set app theme
    useLayoutEffect(() => {
                        // research this some more
    }, []);

    useEffect(() => {
        setContractProvider();
        setContractSigner();
    }, []);

    // dispatch method to check if a wallet is installed
    const walletInstalled = () => {
        dispatch({
            type: WALLET_INSTALLED,
            payload: true,
        });
    };

    // dispatch method to retrieve the accounts array
    const getAccounts = (accounts) => {
        dispatch({
            type: GET_ACCOUNTS,
            payload: accounts,
        });
    };

    // dispatch method to retrieve the current network
    const getChain = (chainId) => {
        dispatch({
            type: GET_CHAIN,
            payload: chainId,
        });
    };

    // dispatch method to set the contract provider
    const setContractProvider = () => {
        try {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _contractProvider = new ethers.Contract(contractAddress, contractABI, _provider);
            dispatch({
                type: SET_CONTRACT_PROVIDER,
                payload: _contractProvider,
            });
        } catch (e) {
            console.log("No provider is available");
        }
    }

    // dispatch method to set the contract signer
    const setContractSigner = () => {
        try {
            const _provider = new ethers.providers.Web3Provider(window.ethereum);
            const _signer = _provider.getSigner();
            const _contractSigner = new ethers.Contract(contractAddress, contractABI, _signer);
            dispatch({
                type: SET_CONTRACT_SIGNER,
                payload: _contractSigner,
            });
        } catch (e) {
            console.log("No provider is available");
        }
    }

    const appState = {state, walletInstalled, getAccounts, getChain};

    return (
        <AppContext.Provider value={appState}>
            {children}
        </AppContext.Provider>
    );
}

export default AppStateProvider;
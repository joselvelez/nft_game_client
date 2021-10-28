import { CONNECT_WALLET, GET_ACCOUNTS, SET_CONTRACT_PROVIDER, SET_CONTRACT_SIGNER, WALLET_INSTALLED, GET_CHAIN } from './app-actions';

export const appReducer = (state, action) => {
    switch (action.type) {
        case WALLET_INSTALLED:
            return {
                ...state,
                walletInstalled: action.payload,
            }
        case CONNECT_WALLET:
            return {
                ...state,
                currentAccount: action.payload,
            }
        case GET_ACCOUNTS:
            return {
                ...state,
                currentAccount: action.payload,
            }
        case GET_CHAIN:
            return {
                ...state,
                currentChain: action.payload,
            }
        case SET_CONTRACT_PROVIDER:
            return {
                ...state,
                contractProvider: action.payload,
            }
        case SET_CONTRACT_SIGNER:
            return {
                ...state,
                contractSigner: action.payload,
            }
        default:
            return state;
    }
};
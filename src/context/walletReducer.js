import { CONNECT_WALLET, GET_ACCOUNTS, WALLET_INSTALLED, GET_CHAIN } from './walletActions';

export const walletReducer = (state, action) => {
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
        default:
            return state;
    }
};
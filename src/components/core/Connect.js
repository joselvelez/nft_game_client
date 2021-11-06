import { useContext } from "react";
import { WalletContext } from "../../context/WalletContext";
import { ConnectWalletAction } from "./ConnectWalletAction";

export function Connect() {
    const appContext = useContext(WalletContext);

    /*
        Setup dapp initialization flow per EIP 1102 specification
        https://eips.ethereum.org/EIPS/eip-1102
    */

    const connect = async () => {
        const ethereum = window.ethereum;

        try {
            const userAccounts = await ethereum.request({ method: 'eth_requestAccounts'});
            console.log('Connecting, fetching accounts...');
            console.log("Account found: ", userAccounts);
            appContext.getAccounts(userAccounts[0]);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <ConnectWalletAction connectAction={connect} />
    )
}
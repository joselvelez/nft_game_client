import { useContext } from "react";
import AppContext from "../../context/app-context";

export function Connect() {
    const appContext = useContext(AppContext);

    /*
        Setup dapp initialization flow per EIP 1102 specification
        https://eips.ethereum.org/EIPS/eip-1102
    */

    const connect = async () => {
        const ethereum = window.ethereum;

        try {
            const userAccounts = await ethereum.request({ method: 'eth_requestAccounts'});
            console.log('trying to get accounts...');
            console.log(userAccounts);
            appContext.getAccounts(userAccounts[0])
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
        <button className="btnConnectWallet" onClick={connect}>
            Connect your wallet
        </button>
        </>
    )
}
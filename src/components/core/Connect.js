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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                <div className="sm:flex sm:items-start sm:justify-between">
                    <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Connect Your Wallet</h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>
                        You must connect your wallet to access this site.
                        </p>
                    </div>
                    </div>
                    <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
                    <button
                        type="button"
                        onClick={() => connect()}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                        CONNECT
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
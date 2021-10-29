import { useEffect, useState } from "react";
import { networks } from "../../constants/networks";
import { ExclamationIcon } from '@heroicons/react/solid';

export const WrongChain = () => {
    const [network, setNetwork] = useState({});
    const ethereum = window.ethereum;

    ethereum.on('chainChanged', () => {
        window.location.reload();
    });

    useEffect(() => {
        const ethereum = window.ethereum;

        const fetchNetworks = async () => {
            try{
                const _chain = await ethereum.request({method: 'eth_chainId'});
                const _network = networks.find(i => i.hex === _chain);
                setNetwork(_network);
            } catch (e) {
                console.log("No network list found.");
            }
        };

        fetchNetworks();
    }, []);

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                    <p>
                        You are currently on the {network.name} network. You must be on Rinkeby to access this dapp.
                        Connect to the Rinkeby Network.
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}


import { useEffect, useState } from "react";
import { networks, configuredChain } from "../../constants/networks";

export const WrongChain = () => {
    const [network, setNetwork] = useState({});
    const _configuredChain = networks.find(i => i.hex === configuredChain);

    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });

    useEffect(() => {
        const ethereum = window.ethereum;
        let mounted = true;

        const fetchNetworks = async () => {
            try{
                const _chain = await ethereum.request({method: 'eth_chainId'});
                const _network = networks.find(i => i.hex === _chain);
                if (mounted) {
                    setNetwork(_network);
                }
            } catch (e) {
                console.log("No network list found.");
            }
        };

        fetchNetworks();

        return function cleanup() {
            mounted = false;
        }

    }, []);

    return (
        <div>
            <p>You are currently on the {network.name} network. You must be on {_configuredChain.name} network to access this dapp.</p>
            <p>Connect to {_configuredChain.name}</p>
        </div>
    )
}
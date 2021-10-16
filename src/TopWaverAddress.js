import { ethers } from "ethers";
import { useEffect, useState } from "react"
import { useWallet } from "./WalletContext";

export const TopWaverAddress = () => {
    const [topWaverAddress, setTopWaverAddress] = useState();
    const {contractAddress, contractABI} = useWallet();
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    useEffect(() => {
        getTopWaverAddress();
    });

    const getTopWaverAddress = async () => {
        try {
            setTopWaverAddress(await contract.getTopWaver());
        } catch(e) {
            console.log('No wallet connected.');
        }
    }
    return topWaverAddress ? `Top Waver Address: ${topWaverAddress}` : 'No waves';
}
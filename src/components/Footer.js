import { contractAddress, shortenAddress } from "../constants/contractConstants";
import githubIcon from '../images/Octocat.jpg';
import etherscanLogo from '../images/etherscan-logo-circle.png';

export const Footer = () => {
    const shortAddress = shortenAddress(contractAddress);
    return (
        <div className="bg-white my-4 pr-8 pl-8 py-4 md:rounded flex flex-row place-items-center justify-between">
            <div className="flex flex-row place-items-center">
                <img src={etherscanLogo} className="w-10 h-10 mr-3" alt="etherscan icon" />
                <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`}
                className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer"
                >
                    {shortAddress}
                </a>
            </div>
            <div className="flex flex-row place-items-center">
                <img src={githubIcon} className="w-10 h-10" alt="git hub icon" />
                <a href="https://github.com/joselvelez/nft_game"
                 className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer">
                     Contract Code
                 </a>
            </div>
            <div className="flex flex-row place-items-center">
                <img src={githubIcon} className="w-10 h-10" alt="git hub icon" />
                <a href="https://github.com/joselvelez/nft_game_client"
                className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer">
                    Front End Code
                </a>
            </div>
        </div>
    )
}
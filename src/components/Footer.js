import { contractAddress } from "../constants/contractConstants";

export const Footer = () => {
    return (
        <div className="bg-white my-4 pr-8 pl-8 py-4 md:rounded flex flex-row justify-between">
            <div>
                Contract Address: &nbsp;
                    <a href={`https://rinkeby.etherscan.io/address/${contractAddress}`}
                    className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer"
                    >
                        {contractAddress}
                    </a>
            </div>
            <div>
                Contract Code: <a href="https://github.com/joselvelez/nft_game"
                 className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer">Github Repo</a>
            </div>
            <div>
                Front End Code: <a href="https://github.com/joselvelez/nft_game_client"
                className="text-indigo-400 hover:text-indigo-500 transition ease-in-out duration-150" target="_blank" rel="noreferrer">Github Repo</a>
            </div>
        </div>
    )
}
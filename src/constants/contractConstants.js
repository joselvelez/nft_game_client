import abi from '../contracts/TeamAmericaSlayers.json';
export const contractAddress = '0xBF0dab116c4870fA4301271759F79B8AC99368aa';
export const contractABI = abi.abi;

export function shortenAddress(address) {
    return `${address.substring(0,6)}...${address.substring(address.length -  4)}`;
}
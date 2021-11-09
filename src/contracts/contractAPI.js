import { ethers } from "ethers";
import { contractABI, contractAddress } from "../constants/contractConstants";
import { fetchAccounts } from "../context/walletAPI";

const { ethereum } = window;

export const getContractSigner = () => {
    try {
        const _provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = _provider.getSigner();
        const _contractSigner = new ethers.Contract(contractAddress, contractABI, _signer);
        return _contractSigner;
    } catch (e) {
        console.log("No provider is available");
    }
}

export const getContractProvider = () => {
    try {
        const _provider = new ethers.providers.Web3Provider(ethereum);
        const _contractProvider = new ethers.Contract(contractAddress, contractABI, _provider);
        return _contractProvider;
    } catch (e) {
        console.log("No provider is available");
    }
}

/* Drop your custom contract logic below here */

export const fetchDefaultCharacters = async () => {
    try {
        const _provider = getContractProvider();
        const _defaultCharacters = await _provider.getAllDefaultCharacters();
        return _defaultCharacters;
    } catch (e) {
        console.log("Unable to fetch default characters from contract");
    }
};

export const fetchBossFromContract = async () => {
    try {
        const _contractProvider = getContractProvider();
        const _boss = await _contractProvider.getBigBoss();
        return _boss;
    } catch (e) {
        console.log("No boss found in contract");
    }
}

export const fetchCharacter = async (tokenId) => {
    try {
        const _provider = getContractProvider();
        const _character = await _provider.getCharacter(tokenId);
        const _characterObject = {
            name: _character.name,
            hp: _character.hp,
            maxHp: _character.maxHp,
            imageURI: _character.imageURI,
            attackDamage: _character.attackDamage,
            characterIndex: _character.characterIndex
        };
        return {id: tokenId, battleCharacter: _characterObject};
    } catch (e) {
        console.log("Error, cannot fetch character");
    }
}

export const fetchCurrentTeam = async () => {
    try {
        const team = [];
        const _currentAccounts = await fetchAccounts();
        const _currentAccount = _currentAccounts[0];
        const _provider = await getContractProvider();
        const result = await _provider.getListOfOwnedCharacters(_currentAccount);
        
        for (let i = 0; i < result.length; i++) {
            try {
                const character = await fetchCharacter(result[i]);
                team.push(character)
            } catch (e) {
                console.log("Unable to fetch current team from contract");
            }
        }
        return team;
    } catch (e) {
        console.log("Unable to fetch team data");
    }
};

export const attackBoss = async (_id) => {
    try {
        const _contractSigner = getContractSigner();
        const attackTxn = await _contractSigner.attackBoss(_id);
        attackTxn.wait();
        return true;
    } catch (e) {
        console.log("Unable to attack");
        return false;
    }
}

export const mintNewCharacter = async (characterIndex) => {
    try {
        const _signer = await getContractSigner();
        const txn = await _signer.mintNewCharacterNFT(characterIndex);
        await txn.wait();
        return true;
    } catch (e) {
        console.log("Unable to mint character from contract");
        return false;
    }
  }

export const reviveCharacter = async (characterId) => {
    try {
        const _signer = await getContractSigner();
        const txn = await _signer.reviveCharacter(characterId);
        txn.wait();
        return true;
    } catch (e) {
        console.log("Unable to call revive function on character", e);
        return false;
    }
}
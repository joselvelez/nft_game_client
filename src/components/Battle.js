import { useContext, useEffect, useState } from "react";
import AppContext from "../context/app-context";
import { BattleBtn } from "./BattleBtn";
import BattleCardBoss from "./BattleCardBoss";
import BattleCardPlayer from "./BattleCardPlayer";
import BattleNotification from "./BattleNotification";
import { BattleProgress } from "./BattleProgress";

export const Battle = ({ selectedCharacter }) => {
    const appContext = useContext(AppContext);
    const [battleCharacter, setBattleCharacter] = useState();
    const [boss, setBoss] = useState();
    const [attackState, setAttackState] = useState('peace');

    const attackBoss = async (_id) => {
        try {
            setAttackState('war');
            console.log("Battle in progress...");
            const attackTxn = await appContext.state.contractSigner.attackBoss(_id);
            attackTxn.wait();
            console.log("Attack Txn:", attackTxn);
        } catch (e) {
            console.log("Unable to attack", e);
            setAttackState('peace');
        }
    }

    const fetchBossFromContract = async () => {
        try {
            const _boss = await appContext.state.contractProvider.getBigBoss();
            setBoss(_boss);
        } catch (e) {
            console.log(e);
        }
    }

    const fetchCharacter = async (tokenId) => {
        try {
            const character = await appContext.state.contractProvider.getCharacter(tokenId);
            setBattleCharacter({id: tokenId, battleCharacter: character});
        } catch (e) {
            console.log("Error, cannot fetch chacter");
        }
    }

    appContext.state.contractSigner.on('AttackComplete', (newBossHp, newPlayerHp) => {
        console.log(`Battle Over. boss has ${newBossHp} & player has ${newPlayerHp}`);
        setAttackState('peace');
        fetchBossFromContract();
        fetchCharacter(selectedCharacter);
    })

    useEffect(() => {
        console.log("Getting boss...");
        fetchBossFromContract();
        fetchCharacter(selectedCharacter);
    }, [selectedCharacter]);

    return (
        <div className="bg-white rounded">
        <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-8">
            {attackState === 'peace' ?
                <div className="flex flex-row">
                    {boss ? <BattleCardBoss characterData={boss} attackState={attackState} /> : <p>No boss found.</p>}
                    {battleCharacter ? <BattleCardPlayer characterData={battleCharacter.battleCharacter}/> : <p>No character found for battle.</p>}
                </div> : ''
            }
          <div className="flex mt-3 justify-center">
            {attackState === 'peace' ? <BattleBtn attackBoss={attackBoss} battleCharacter={battleCharacter} /> : <BattleProgress />}
          </div>
        </div>
        <BattleNotification />
        </div>
    )
}
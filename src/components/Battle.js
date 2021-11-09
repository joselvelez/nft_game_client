import { useEffect, useState } from "react";
import { attackBoss, fetchBossFromContract, fetchCharacter, getContractProvider } from "../contracts/contractAPI";
import { BattleBtn } from "./BattleBtn";
import BattleCardBoss from "./BattleCardBoss";
import BattleCardPlayer from "./BattleCardPlayer";
import BattleNotification from "./BattleNotification";
import { BattleProgress } from "./BattleProgress";

export const Battle = ({ selectedCharacter }) => {
    const [battleCharacter, setBattleCharacter] = useState();
    const [boss, setBoss] = useState();
    const [attackState, setAttackState] = useState('peace');
    const [showBattleNotification, setShowBattleNotification] = useState(false);

    useEffect(() => {
        let mounted = true;
        console.log("Getting boss...");

        if (mounted) {
            loadBoss();
            loadBattleCharacter(selectedCharacter);
        }

        return function cleanup() {
            mounted = false;
        }
    }, [selectedCharacter]);

    useEffect(() => {
        const provider = getContractProvider();
        let mounted = true;

        provider.on('AttackComplete', (player, newBossHP, newPlayerHP) => {
            loadBoss();
            if (mounted) {
                setShowBattleNotification(true);
                setAttackState('peace');
                loadBattleCharacter(selectedCharacter);
            }
        });

        return function cleanup() {
            mounted = false;
        }
    }, [selectedCharacter]);

    async function loadBoss() {
        try {
            const _boss = await fetchBossFromContract();
            setBoss(_boss);
        } catch (e) {
            console.log("Unable to fetch boss data");
        }
    }

    async function loadBattleCharacter(_selectedCharacter) {
        try {
            const _battleCharacter = await fetchCharacter(_selectedCharacter);
            setBattleCharacter(_battleCharacter);
        } catch (e) {
            console.log("Unable to fetch battle character");
        }
    }

    async function attack(_id) {
        try {
            setAttackState('war');
            console.log("Battle in progress...");
            try {
                const battleResult = await attackBoss(_id)
                if (battleResult === true) {
                    console.log("Battle in progress");
                } else {
                    setAttackState('peace');
                }
            } catch (e) {
                console.log(e);
                return e;
            }
        } catch (e) {
            console.log("Error attempting to attack");
            setAttackState('peace');
        }
    }

    return (
        <div className="bg-white rounded">
        <div className="mx-auto py-6 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-8">
            {attackState === 'peace' ?
                <div className="flex flex-row justify-evenly">
                    {boss ? <BattleCardBoss characterData={boss} attackState={attackState} /> : <p>No boss found.</p>}
                    {battleCharacter ? <BattleCardPlayer characterData={battleCharacter.battleCharacter}/> : <p>No character found for battle.</p>}
                </div> : ''
            }
          <div className="flex mt-3 justify-center">
            {attackState === 'peace' ? <BattleBtn attackBoss={attack} battleCharacter={battleCharacter} /> : <BattleProgress />}
          </div>
        </div>
        {showBattleNotification ? <BattleNotification battleNotificationValue={setShowBattleNotification} /> : ''}
        </div>
    )
}
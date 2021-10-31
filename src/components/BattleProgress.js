import battleInProgress from '../images/catFight.gif';

export const BattleProgress = () => {
    return (
        <div className="flex flex-col">
            <img className="w-50 h-45 flex-shrink-0 " src={battleInProgress} alt="NFT Battle" />
            <p>💥💥💥 A LOT of stuff is being thrown around right now... not sure how this is gonna' turn out... 💥💥💥</p>
        </div>
    )
}
import './core/App/App.css';
import { LastWaveTimeStamp } from './LastWaveTimeStamp';
import { LastWaverAddress } from './LastWaverAddress';

export const WaveStats = () => {

    return (
        <>
        <div className="waveStats">
            <LastWaverAddress />
            <LastWaveTimeStamp />
        </div>
        </>
    )
}
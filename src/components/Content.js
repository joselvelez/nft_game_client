import { useState } from 'react';
import Header from './Header';
import { Battle } from './Battle';
import { Footer } from './Footer';
import LoadCurrentTeam from './LoadCurrentTeam';
import LoadTeam from './LoadTeamBtn';
import MintNewCharacter from './MintNewCharacterBtn';
import MintNewCharacterSelection from './MintNewCharacterSelection';
import ViewCharacter from './ViewCharacter';

export const Content = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentComponent, setCurrentComponent] = useState('MintNewCharacter'); // Options are MintNewCharacter, LoadTeam, Battle, ViewCharacter

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Header />
      <div className="flex flex-row">
        <MintNewCharacter setCurrentComponent={setCurrentComponent}/>
        <LoadTeam setCurrentComponent={setCurrentComponent} />
      </div>

      <div className="p-4">
        {(() => {
            switch (currentComponent) {
              case 'LoadTeam':
                return <LoadCurrentTeam setCurrentComponent={setCurrentComponent} setSelectedCharacter={setSelectedCharacter} />;
              case 'Battle':
                return <Battle selectedCharacter={selectedCharacter} />;
              case 'ViewCharacter':
                return <ViewCharacter selectedCharacter={selectedCharacter} setCurrentComponent={setCurrentComponent} />
              default:
                return <MintNewCharacterSelection />;
            }
          })()}
      </div>

      <div className="pl-4 pr-4">
        <Footer />
      </div>
    </div>
  );
};
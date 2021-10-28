import AppStateProvider from '../../../context/AppStateProvider';
import { Main } from '../Main';

function App() {
  return (
    <AppStateProvider>
      <div className="bg-gray-900 h-screen p-5">
        <div className="md:container md:mx-auto">
          <Main />
        </div>
      </div>
    </AppStateProvider>
  );
}

export default App;

import './App.css';
import AppStateProvider from '../../../context/AppStateProvider';
import { Main } from '../Main';

function App() {
  return (
    <AppStateProvider>
      <Main />
    </AppStateProvider>
  );
}

export default App;

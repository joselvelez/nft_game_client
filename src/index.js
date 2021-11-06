import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/core/App';
import { Main } from './components/core/Main';
import { ThemeProvider } from './context/ThemeProvider';
import WalletProvider from './context/WalletProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <WalletProvider>
        <App>
          <Main />
        </App>
      </WalletProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

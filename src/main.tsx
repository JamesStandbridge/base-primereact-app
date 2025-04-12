import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import { QueryProvider } from './providers/QueryProvider';
import { PrimeReactProvider } from 'primereact/api';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
);

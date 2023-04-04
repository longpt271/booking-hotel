import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';

import './index.css';
import store from 'store';
import { ApiContextProvider } from 'context/ApiContext';
import { AuthContextProvider } from 'context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ApiContextProvider>
          <App />
        </ApiContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import './index.css';
import { AuthContextProvider } from 'context/AuthContext';
import { ApiContextProvider } from 'context/ApiContext';
import { SearchContextProvider } from 'context/SearchContext';
import store from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <ApiContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </ApiContextProvider>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);

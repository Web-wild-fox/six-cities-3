import React from 'react';
import ReactDOM from 'react-dom/client';
import {fetchOfferListAction} from './store/api-actions';
import {Provider} from 'react-redux';
import {store} from './store';
import App from '@/app';

store.dispatch(fetchOfferListAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

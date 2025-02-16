import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {OffersCitiesCount} from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      allOffersCount = {OffersCitiesCount.AllOffersAmsterdam}
    />
  </React.StrictMode>
);

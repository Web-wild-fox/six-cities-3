import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {PlacesFoundCount} from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      allPlacesCount={PlacesFoundCount.AllOffersAmsterdam}
    />
  </React.StrictMode>
);

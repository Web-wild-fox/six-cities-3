import React from 'react';
import ReactDOM from 'react-dom/client';
import {scan} from 'react-scan';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import {store} from './store';
import {checkAuthAction} from './store/user/user.api';
import App from '@/app';

scan({
  enabled: true,
});

store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);

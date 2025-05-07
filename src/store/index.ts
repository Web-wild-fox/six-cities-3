import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {reducer} from './reducer';
import {router} from '@/services/router';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {api, router},
      },
    }),
});

import {createAction} from '@reduxjs/toolkit';

export const cityСhange = createAction('ui/changeCity', (value: string) => ({
  payload: value
}));

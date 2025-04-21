import {createReducer} from '@reduxjs/toolkit';
import {cityСhange} from '@/store/action';
import {offers} from '@/mocks/offers';
import {DEFAULT_CITY} from '@/constants';

const initialPoint = {
  city: DEFAULT_CITY,
  offers,
};

export const reducer = createReducer(initialPoint, (builder) => {
  builder
    .addCase(cityСhange, (state, action) => {
      state.city = action.payload;
    });
});

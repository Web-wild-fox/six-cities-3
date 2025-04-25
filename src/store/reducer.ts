import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSorting} from '@/store/action';
import {offers} from '@/mocks/offers';
import {DEFAULT_CITY, DEFAULT_SORTING_TYPE} from '@/constants';

const initialPoint = {
  city: DEFAULT_CITY,
  offers,
  sorting: DEFAULT_SORTING_TYPE,
};

export const reducer = createReducer(initialPoint, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    });
});

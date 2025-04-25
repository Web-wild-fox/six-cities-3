import {SortingType} from '@/constants';
import {createAction} from '@reduxjs/toolkit';

export const changeCity = createAction('ui/changeCity', (value: string) => ({
  payload: value
}));
export const changeSorting = createAction('ui/changeSortingType', (type: SortingType) => ({
  payload: type
}));

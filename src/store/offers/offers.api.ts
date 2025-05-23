import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@/types/state.js';
import {OfferListItem} from '@/types/offers';
import {APIRoute} from '@/constants.js';

export const fetchOfferListAction = createAsyncThunk<
  OfferListItem[],
  undefined,
  AsyncThunkConfig
  >(
    'data/fetchOfferList',
    async (_arg, {extra: {api}}) => {
      const {data} = await api.get<OfferListItem[]>(APIRoute.Offers);

      return data;
    }
  );

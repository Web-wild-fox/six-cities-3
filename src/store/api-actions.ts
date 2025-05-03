import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '@/types/state.js';
import {OfferListItem, FullOfferItem, Comment} from '@/types/offers';
import {
  loadOfferList,
  loadOffersNearby,
  loadFullOffer,
  loadComments,
  setOffersDataLoadingStatus
} from './action.js';
import {APIRoute} from '@/constants.js';

export const fetchOfferListAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
 }>(
   'data/fetchOfferList',
   async (_arg, {dispatch, extra: api}) => {
     dispatch(setOffersDataLoadingStatus(true));
     const {data} = await api.get<OfferListItem[]>(APIRoute.Offers);
     dispatch(setOffersDataLoadingStatus(false));
     dispatch(loadOfferList(data));
   },
 );

export const fetchFullOfferAction = createAsyncThunk<void, string, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
  }>(
    'data/fetchFullOfferList',
    async (id, {dispatch, extra: api}) => {
      try {
        dispatch(setOffersDataLoadingStatus(true));
        const [
          fullOfferResponse,
          offersNearbyResponse,
          commentsResponse
        ] = await Promise.all([
          api.get<FullOfferItem>(`${APIRoute.Offers}${id}`),
          api.get<OfferListItem[]>(`${APIRoute.Offers}${id}${APIRoute.Nearby}`),
          api.get<Comment[]>(`${APIRoute.Comments}${id}`),
        ]);
        dispatch(setOffersDataLoadingStatus(false));
        dispatch(loadFullOffer(fullOfferResponse.data));
        dispatch(loadOffersNearby(offersNearbyResponse.data));
        dispatch(loadComments(commentsResponse.data));
      } catch {
        dispatch(setOffersDataLoadingStatus(false));
      }
    },
  );

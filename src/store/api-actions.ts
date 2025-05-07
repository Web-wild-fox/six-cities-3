import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@/types/state.js';
import {
  OfferListItem,
  FullOfferItem,
  Comment
} from '@/types/offers';
import {
  loadOfferList,
  loadOffersNearby,
  loadFullOffer,
  loadComments,
  setError,
} from './action.js';
import {isAxiosError} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {APIRoute, AppRoute} from '@/constants.js';

export const fetchOfferListAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkConfig
  >(
    'data/fetchOfferList',
    async (_arg, {dispatch, extra: {api}}) => {
      try {
        const {data} = await api.get<OfferListItem[]>(APIRoute.Offers);

        dispatch(loadOfferList(data));
      } catch (error) {
        if (isAxiosError(error)) {
          dispatch(setError(error.message));
        }
      }
    },
  );

export const fetchFullOfferAction = createAsyncThunk<
  void,
  string,
  AsyncThunkConfig
  >(
    'data/fetchFullOfferList',
    async (id, {dispatch, extra: {api, router}}) => {
      try {
        const {data} = await api.get<FullOfferItem>(`${APIRoute.Offers}${id}`);

        dispatch(loadFullOffer(data));
      } catch (error) {
        if (isAxiosError(error)) {
          dispatch(setError(error.message));

          if (error.response?.status === StatusCodes.NOT_FOUND) {
            router.navigate(AppRoute.PageNotFound);
          }
        }
      }

      try {
        const offersNearbyResponse = await api.get<OfferListItem[]>(`${APIRoute.Offers}${id}${APIRoute.Nearby}`);

        dispatch(loadOffersNearby(offersNearbyResponse.data));
      } catch (error) {
        if (isAxiosError(error)) {
          dispatch(setError(error.message));
        }
      }

      try {
        const commentsResponse = await api.get<Comment[]>(`${APIRoute.Comments}${id}`);

        dispatch(loadComments(commentsResponse.data));
      } catch (error) {
        if (isAxiosError(error)) {
          dispatch(setError(error.message));
        }
      }
    },
  );

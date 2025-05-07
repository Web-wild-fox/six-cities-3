import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeSorting,
  loadOfferList,
  loadOffersNearby,
  loadFullOffer,
  loadComments,
  setOfferId,
  setError
} from '@/store/action';
import {OfferListItem, FullOfferItem, Comment} from '@/types/offers';
import {DEFAULT_CITY, DEFAULT_SORTING_TYPE} from '@/constants';

interface InitialPoint {
  id?: string;
  city: string;
  offers: OfferListItem[] | null;
  offersNearby: OfferListItem[] | null;
  fullOffer: FullOfferItem | null;
  comments: Comment[] | null;
  sorting: string;
  error: string | null;
}

const initialPoint: InitialPoint = {
  id: undefined,
  city: DEFAULT_CITY,
  offers: null,
  offersNearby: null,
  fullOffer: null,
  comments: null,
  sorting: DEFAULT_SORTING_TYPE,
  error: null,
};

export const reducer = createReducer(initialPoint, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(loadOfferList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadFullOffer, (state, action) => {
      state.fullOffer = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setOfferId, (state, action) => {
      state.id = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

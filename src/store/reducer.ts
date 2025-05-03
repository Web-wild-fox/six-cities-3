import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeSorting,
  loadOfferList,
  loadOffersNearby,
  loadFullOffer,
  loadComments,
  setOfferId,
  setOffersDataLoadingStatus
} from '@/store/action';
import {OfferListItem, FullOfferItem, Comment} from '@/types/offers';
import {DEFAULT_CITY, DEFAULT_SORTING_TYPE} from '@/constants';

interface InitialPoint {
  id?: string;
  city: string;
  offers: OfferListItem[];
  offersNearby: OfferListItem[];
  fullOffer?: FullOfferItem;
  comments: Comment[];
  sorting: string;
  isLoading: boolean;
}

const initialPoint: InitialPoint = {
  id: undefined,
  city: DEFAULT_CITY,
  offers: [],
  offersNearby: [],
  fullOffer: undefined,
  comments: [],
  sorting: DEFAULT_SORTING_TYPE,
  isLoading: false
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
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    });
});

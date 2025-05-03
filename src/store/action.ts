import {createAction} from '@reduxjs/toolkit';
import {OfferListItem, FullOfferItem, Comment} from '@/types/offers';
import {SortingType} from '@/constants';

export const changeCity = createAction('ui/changeCity', (value: string) => ({
  payload: value
}));
export const changeSorting = createAction('ui/changeSortingType', (type: SortingType) => ({
  payload: type
}));
export const loadOfferList = createAction('data/loadOfferList', (offers: OfferListItem[]) => ({
  payload: offers
}));
export const loadOffersNearby = createAction('data/loadOffersNearby', (offers: OfferListItem[]) => ({
  payload: offers
}));
export const loadFullOffer = createAction('data/loadFullOffer', (fullOffer: FullOfferItem) => ({
  payload: fullOffer
}));
export const loadComments = createAction('data/loadComments', (comments: Comment[]) => ({
  payload: comments
}));

export const setOfferId = createAction('data/setOfferId', (id?: string) => ({
  payload: id
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

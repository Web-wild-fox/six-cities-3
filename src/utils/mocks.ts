import {State} from '@/types/state';
import {Action} from 'redux';
import {ThunkDispatch} from '@reduxjs/toolkit';
import {UserData} from '@/types/user-data';
import {AuthData} from '@/types/auth-data';
import {CommentData} from '@/types/comment-data';
import {Comment, FullOfferItem, OfferListItem} from '@/types/offers';
import {date, image, internet, lorem, name} from 'faker';

export type AppThunkDispatch = ThunkDispatch<State, unknown, Action>;

const Location = {
  latitude: 0,
  longitude: 0,
  zoom: 10
};

const City = {
  location: Location,
  name: 'City',
};

const User = {
  isPro: false,
  name: name.title(),
  avatarUrl: image.imageUrl(),
};

const MockUserData: UserData = {
  ...User,
  token: 'token',
  email: internet.email(),
};

export const MockAuthData: AuthData = {
  login: 'login',
  password: 'password',
};

export const MockCommentData: CommentData = {
  id: 'id',
  comment: lorem.paragraph(),
  rating: 5,
};

const MockComment: Comment = {
  id: 'id',
  rating: 5,
  user: User,
  date: date.weekday(),
  comment: lorem.paragraph(),
};

const MockOffer: OfferListItem = {
  id: 'id',
  title: 'title',
  type: 'room',
  price: 100,
  rating: 5,
  city: City,
  location: Location,
  isFavorite: false,
  isPremium: false,
  previewImage: image.imageUrl(),
};

const MockFullOffer: FullOfferItem = {
  ...MockOffer,
  host: User,
  bedrooms: 1,
  maxAdults: 1,
  goods: [],
  images: [image.imageUrl()],
  description: lorem.paragraph(),
};

export const makeMockComments = () => MockComment;

export const makeMockOffers = () => MockOffer;

export const makeMockFullOffer = () => MockFullOffer;

export const makeMockUserData = () => MockUserData;

export const makeMockCommentData = () => MockCommentData;

export const makeMockAuthData = () => MockAuthData;

export const makeMockFavorites = makeMockOffers;

export const makeMockOffersNearby = makeMockOffers;

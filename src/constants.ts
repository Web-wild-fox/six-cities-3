export const MAX_RATING = 5;
export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export const OfferRatings = [
  {
    title: 'perfect',
    rating: 5
  },
  {
    title: 'good',
    rating: 4
  },
  {
    title: 'not bad',
    rating: 3
  },
  {
    title: 'badly',
    rating: 2
  },
  {
    title: 'terribly',
    rating: 1
  }
];

export const Locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const PlacesFoundCount = {
  AllOffersParis: 100,
  AllOffersCologne: 200,
  AllOffersBrussels: 300,
  AllOffersAmsterdam: 400,
  AllOffersHamburg: 500,
  AllOffersDusseldorf: 600,
};

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/',
  OfferId = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum TypeCard {
  VerticalCard = 'VERTICAL_CARD',
  HorizontalCard = 'HORIZONTAL_CARD',
}

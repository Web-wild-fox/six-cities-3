export const MAX_RATING = 5;

export const locations = [
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

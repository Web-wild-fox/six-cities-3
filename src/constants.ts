export const PERCENT_COUNT = 20;

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
  Favourites = '/favourites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

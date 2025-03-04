export type NavLocationsType = {
  id: number;
  location: string;
}

export type PlacesFoundCountType = {
  [key: string]: number;
}

export const NavLocations: NavLocationsType[] = [
  {
    id: 1,
    location: 'Paris'
  },
  {
    id: 2,
    location: 'Cologne'
  },
  {
    id: 3,
    location: 'Brussels'
  },
  {
    id: 4,
    location: 'Amsterdam'
  },
  {
    id: 5,
    location: 'Hamburg'
  },
  {
    id: 6,
    location: 'Dusseldorf'
  },
];

export const PlacesFoundCount: PlacesFoundCountType = {
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

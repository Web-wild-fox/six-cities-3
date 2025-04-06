export interface OfferListItem {
  id: string;
  title: string;
  type: string;
  price: number;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export interface ListItem extends OfferListItem {
  city: City;
  location: Location;
}

export interface City {
  name: string;
  location: Location;
}

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

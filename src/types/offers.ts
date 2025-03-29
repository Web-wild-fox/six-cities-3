export interface OfferListItem {
  id: string;
  title: string;
  type: string;
  price: number;
  city?: City;
  location?: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

interface City {
  name: string;
  location?: Location;
}

interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface OfferProps extends PageOfferProps {
  type: string;
  previewImage: string;
}

export interface PageOfferProps {
  id: string;
  title: string;
  price: number;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export interface MainOfferProps extends OfferProps {
  city: {
    name: string;
  };
}

export interface OfferCardProps extends OfferProps {
  currentPage: 'cities' | 'favorites';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

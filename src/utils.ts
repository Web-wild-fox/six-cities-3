import {SortingType} from './constants';
import {OfferListItem} from './types/offers';

export const getSortedOffers = (sort: string, offers: OfferListItem[]) => {
  switch (sort) {
    case SortingType.popular:
      return offers;
    case SortingType.priceUp:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortingType.priceDown:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortingType.rating:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      throw new Error(`Неизвестный тип сортировки: ${sort}`);
  }
};

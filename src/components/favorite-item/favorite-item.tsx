import {OfferListItem} from '@/types/offers';
import {TypeCard} from '@/constants';
import OfferCard from '@/components/offer-card/offer-card';

interface FavoritesItemProps {
  offers: OfferListItem[];
  location: string;
}

export default function FavoriteItem({offers, location}: FavoritesItemProps): JSX.Element | null {
  const cityOffers = offers.filter((offer) => {
    if (offer.city) {
      return offer.city.name === location;
    }
  });

  if (!cityOffers.length) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{location}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {
          cityOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              id={offer.id}
              title={offer.title}
              type={offer.type}
              price={offer.price}
              isFavorite={offer.isFavorite}
              isPremium={offer.isPremium}
              rating={offer.rating}
              previewImage={offer.previewImage}
              typeCard={TypeCard.HorizontalCard}
            />
          ))
        }
      </div>
    </li>
  );
}

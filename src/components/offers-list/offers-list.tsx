import {OfferCardProps} from '@/types/offers';
import OfferCard from '@/components/offer-card/offer-card';

interface OffersListProps {
  offers: OfferCardProps[];
}

export default function OffersList({offers}: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
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
          />
        ))
      }
    </div>
  );
}

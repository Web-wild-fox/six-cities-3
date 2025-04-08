import {OfferListItem} from '@/types/offers';
import {TypesCard} from '@/constants';
import OfferCard from '@/components/offer-card/offer-card';

interface OfferListProps {
  offers: OfferListItem[];
  onCardAction: (id: string | null) => void;
}

export default function OffersList({offers, onCardAction}: OfferListProps): JSX.Element {
  const handleCardAction = (id: string | null) => onCardAction(id);

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
            typeCard={TypesCard.VerticalCard}
            onCardHover={handleCardAction}
          />
        ))
      }
    </div>
  );
}

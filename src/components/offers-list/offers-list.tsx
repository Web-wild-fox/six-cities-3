import {useState} from 'react';
import {MainOfferProps} from '@/types/offers';
import OfferCard from '@/components/offer-card/offer-card';

interface OfferListProps {
  offers: MainOfferProps[];
}

export default function OffersList({offers}: OfferListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState({});

  const handleMouseEnter = (id: string) => () => {
    setActiveCard({
      ...activeCard,
      id
    });
  };

  const handleMouseLeave = () => {
    setActiveCard({});
  };

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
            onMouseEnter={handleMouseEnter(offer.id)}
            onMouseLeave={handleMouseLeave}
            currentPage={'cities'}
          />
        ))
      }
    </div>
  );
}

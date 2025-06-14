import clsx from 'clsx';
import {memo} from 'react';
import {ClassByTypeCard} from '@/constants';
import {OfferListItem} from '@/types/offers';
import OfferCard from '@/components/offer-card/offer-card';

interface OfferListProps {
  offers?: OfferListItem[];
  cardClassName: string;
}

export default function OffersList({offers, cardClassName}: OfferListProps): JSX.Element {
  const MemoOfferCard = memo(OfferCard);

  return (
    <div className={clsx(
      cardClassName === ClassByTypeCard.MainPageCardType &&
      `${cardClassName}__places-list places__list tabs__content`,
      cardClassName === ClassByTypeCard.FavoritesPageCardType &&
      `${cardClassName}__places`,
      cardClassName === ClassByTypeCard.OfferPageCardType &&
      `${cardClassName}__list places__list`
    )}
    >
      {
        offers?.map((offer) => (
          <MemoOfferCard
            key={offer.id}
            id={offer.id}
            title={offer.title}
            type={offer.type}
            price={offer.price}
            isPremium={offer.isPremium}
            rating={offer.rating}
            previewImage={offer.previewImage}
            cardClassName={cardClassName}
          />
        ))
      }
    </div>
  );
}

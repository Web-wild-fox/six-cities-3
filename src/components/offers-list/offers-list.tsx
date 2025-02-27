import OfferCard from '../../components/offer-card/offer-card';
import {Offers} from '../../mock-data/offers';

export default function OffersList(): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">

      {
        Offers.map((offer) => (
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

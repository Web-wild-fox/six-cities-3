import clsx from 'clsx';
import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {changeCity} from '@/store/action';
import {
  ClassByTypeCard
} from '@/constants';
import {getSortedOffers} from '@/utils';
import Header from '@/components/header/header';
import NavList from '@/components/nav-list/nav-list';
import PlacesEmpty from '@/components/places-empty/places-empty';
import PlacesSorting from '@/components/places-sorting/places-sorting';
import OffersList from '@/components/offers-list/offers-list';
import Map from '@/components/map/map';

export default function MainPage(): JSX.Element {
  const [selectedPointId, setSelectedPointId] = useState<string | undefined>(undefined);

  const currentCity = useAppSelector((state) => state.city);
  const currentSorting = useAppSelector((state) => state.sorting);
  const offers = useAppSelector((state) => state.offers);

  const dispatch = useAppDispatch();

  const getFilterOffers = (city: string) => offers.filter(
    (offer) => offer.city.name === city
  );

  const filteredOffers = getFilterOffers(currentCity);
  const isOffersList = filteredOffers[0];
  const sortedOffers = getSortedOffers(currentSorting, filteredOffers);

  const handleCardHover = (id?: string) => setSelectedPointId(id);

  const handleCityChangeClick = (city: string): void => {
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">

      <Helmet>
        <title>6 cities | Главная страница</title>
      </Helmet>

      <Header />

      <main
        className={clsx(
          'page__main page__main--index',
          !isOffersList && 'page__main--index-empty'
        )}
      >
        <h1 className="visually-hidden">Cities</h1>

        <NavList
          city={currentCity}
          onCityChangeClick={handleCityChangeClick}
        />

        <div className="cities">
          <div
            className={clsx(
              'cities__places-container container',
              !isOffersList && 'cities__places-container--empty'
            )}
          >
            {
              !isOffersList && (
                <PlacesEmpty
                  cityName={currentCity}
                />
              )
            }
            {
              isOffersList && (
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">
                      {filteredOffers.length} places to stay in {currentCity}
                    </b>

                    <PlacesSorting
                      currentSorting={currentSorting}
                    />
                    <OffersList
                      offers={sortedOffers}
                      cardClassName={ClassByTypeCard.MainPageCardType}
                      onCardAction={handleCardHover}
                    />

                  </section>
                  <div className="cities__right-section">
                    <section className="cities__map map">

                      <Map
                        points={filteredOffers}
                        startPoint={filteredOffers[0].city}
                        selectedPointId={selectedPointId}
                      />

                    </section>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </main>
    </div>
  );
}

import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {PlacesFoundCount} from '@/constants';
import {ListItem, City} from '@/types/offers';
import Header from '@/components/header/header';
import NavList from '@/components/nav-list/nav-list';
import PlacesSorting from '@/components/places-sorting/places-sorting';
import OffersList from '@/components/offers-list/offers-list';
import Map from '@/components/map/map';

interface MainPageProps {
  offers: ListItem[];
}

export default function MainPage({offers}: MainPageProps): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<City | undefined>(undefined);

  const getSelectedPointId = (id: string | null) => {
    setSelectedPoint(
      id ?
        offers.find((offer) => offer.id === id)?.city :
        undefined
    );
  };

  return (
    <div className="page page--gray page--main">

      <Helmet>
        <title>6 cities | Главная страница</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <NavList />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {PlacesFoundCount.AllOffersAmsterdam} places to stay in Amsterdam
              </b>

              <PlacesSorting />
              <OffersList
                offers={offers}
                selectedPointId={getSelectedPointId}
              />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">

                <Map
                  startPoint={offers[0].city}
                  points={offers}
                  selectedPoint={selectedPoint}
                />

              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

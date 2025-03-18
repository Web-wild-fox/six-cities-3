import {Helmet} from 'react-helmet-async';
import {PlacesFoundCount} from '@/constants';
import Header from '@/components/header/header';
import NavList from '@/components/nav-list/nav-list';
import PlacesSorting from '@/components/places-sorting/places-sorting';
import OffersList from '@/components/offers-list/offers-list';

export default function MainPage(): JSX.Element {
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
              <OffersList />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

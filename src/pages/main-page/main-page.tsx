import Header from '../../components/header/header';
import HeaderLogo from '../../components/header-logo/header-logo';
import HeaderNavigate from '../../components/header-navigate/header-navigate';
import NavList from '../../components/nav-list/nav-list';
import PlacesFound from '../../components/places-found/places-found';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import OffersList from '../../components/offers-list/offers-list';
import {PlacesFoundCountType} from '../../constants';

export default function MainPage({allPlacesCount}: PlacesFoundCountType): JSX.Element {
  return (
    <div className="page page--gray page--main">

      <Header>
        <HeaderLogo />
        <HeaderNavigate />
      </Header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <NavList />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <PlacesFound
                allPlacesCount={allPlacesCount}
              />
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

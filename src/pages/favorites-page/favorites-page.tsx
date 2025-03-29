import {Helmet} from 'react-helmet-async';
import {OfferListItem} from '@/types/offers';
import {Locations} from '@/constants';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Logo from '@/components/logo/logo';
import FavoriteItem from '@/components/favorite-item/favorite-item';

interface FavoritesPageProps {
  offers: OfferListItem[];
}

export default function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {

  return (
    <div className="page">

      <Helmet>
        <title>6 cities | Избранное</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                Locations.map((location) => (
                  <FavoriteItem
                    key={location}
                    location={location}
                    offers={offers}
                  />
                ))
              }
            </ul>
          </section>
        </div>
      </main>

      <Footer>
        <Logo type='footer' />
      </Footer>

    </div>
  );
}

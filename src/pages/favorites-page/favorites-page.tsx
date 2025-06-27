import clsx from 'clsx';
import {memo} from 'react';
import {Helmet} from 'react-helmet-async';
import {useAppSelector} from '@/hooks';
import {getFavorites} from '@/store/favorites/favorites.selectors';
import {LOCATIONS, PageTitle} from '@/constants';
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import Logo from '@/components/logo/logo';
import FavoriteItem from '@/components/favorite-item/favorite-item';
import FavoritesEmpty from '@/components/favorites-empty/favorites-empty';

export default function FavoritesPage(): JSX.Element {
  const MemoHeader = memo(Header);
  const MemoFooter = memo(Footer);
  const MemoLogo = memo(Logo);
  const MemoFavoriteItem = memo(FavoriteItem);
  const MemoFavoritesEmpty = memo(FavoritesEmpty);

  const favorites = useAppSelector(getFavorites);
  const isFavoritesEmpty = !favorites.length;

  return (
    <div
      className={clsx(
        'page',
        isFavoritesEmpty && 'page--favorites-empty'
      )}
      data-testid='favorites-page'
    >

      <Helmet>
        <title>
          {isFavoritesEmpty ?
            PageTitle.FavoritesPageEmpty :
            PageTitle.FavoritesPage}
        </title>
      </Helmet>

      <MemoHeader />

      <main
        className={clsx(
          'page__main page__main--favorites',
          isFavoritesEmpty && 'page__main--favorites-empty'
        )}
      >
        <div className="page__favorites-container container">
          {isFavoritesEmpty && (
            <MemoFavoritesEmpty />
          )}
          {!isFavoritesEmpty && (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {
                  LOCATIONS.map((location) => (
                    <MemoFavoriteItem
                      key={location}
                      location={location}
                      offers={favorites}
                    />
                  ))
                }
              </ul>
            </section>
          )}
        </div>
      </main>

      <MemoFooter>
        <MemoLogo type='footer' />
      </MemoFooter>

    </div>
  );
}

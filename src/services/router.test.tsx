import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import {withHistory, withStore} from '@/utils/mock-component';
import {
  makeMockStore,
  makeMockFavorites,
  makeMockFullOffer,
} from '@/utils/mocks';
import {NameSpace, RequestStatus} from '@/constants';
import Preloader from '@/components/preloader/preloader';
import NotFoundPage from '@/pages/not-found-page/not-found-page';
import LoginPage from '@/pages/login-page/login-page';
import MainPage from '@/pages/main-page/main-page';
import OfferPage from '@/pages/offer-page/offer-page';
import FavoritesPage from '@/pages/favorites-page/favorites-page';

describe('Router', () => {
  describe('MainPage', () => {
    it('should render "MainPage" when navigating to "/" and "offersStatus" is "Succeeded"', () => {
      const initialEntries = ['/'];
      const withHistoryComponent = withHistory(<MainPage />, initialEntries);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeMockStore(
          {[NameSpace.Offers]: {
            offers: [],
            errorMessage: null,
            offersStatus: RequestStatus.Succeeded,
          }},
        )
      );

      render(withStoreComponent);

      expect(screen.getByTestId('main-page')).toBeInTheDocument();
    });

    it('should render "Preloader" when navigating to "/" and "offersStatus" is "Idle"', () => {
      const initialEntries = ['/'];
      const withHistoryComponent = withHistory(<Preloader />, initialEntries);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeMockStore(
          {[NameSpace.Offers]: {
            offers: [],
            errorMessage: null,
            offersStatus: RequestStatus.Idle,
          }},
        )
      );

      render(withStoreComponent);

      expect(screen.getByTestId('preloader')).toBeInTheDocument();
    });
  });

  describe('OfferPage', () => {
    it('should render "OfferPage" when navigating to "/offer/:id" and "fullOfferStatus" is "Succeeded"', () => {
      const initialEntries = ['/offer/1'];
      const mockFullOffer = makeMockFullOffer();
      const withHistoryComponent = withHistory(<OfferPage />, initialEntries);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeMockStore(
          {[NameSpace.FullOffer]: {
            fullOffer: mockFullOffer,
            errorMessage: null,
            fullOfferStatus: RequestStatus.Succeeded,
          }},
        )
      );

      render(withStoreComponent);

      expect(screen.getByTestId('offer-page')).toBeInTheDocument();
    });
  });

  describe('FavoritesPage', () => {
    it('should render "FavoritesPage" when navigating to "/favorites"', () => {
      const initialEntries = ['/favorites'];
      const mockFavorites = makeMockFavorites();
      const withHistoryComponent = withHistory(<FavoritesPage />, initialEntries);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeMockStore(
          {[NameSpace.Favorites]: {
            favorites: [mockFavorites],
            favoritesStatus: RequestStatus.Succeeded,
          }},
        )
      );

      render(withStoreComponent);

      expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    });
  });

  describe('LoginPage', () => {
    it('should render "LoginPage" when navigating to "/login"', () => {
      const initialEntries = ['/login'];
      const withHistoryComponent = withHistory(<LoginPage />, initialEntries);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeMockStore()
      );

      render(withStoreComponent);

      expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
  });

  describe('NotFoundPage', () => {
    it('should render NotFoundPage on unknown route when navigating to "unknown"', () => {
      const initialEntries = ['unknown'];
      const withHistoryComponent = withHistory(<NotFoundPage />, initialEntries);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeMockStore()
      );

      render(withStoreComponent);

      expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
    });
  });
});

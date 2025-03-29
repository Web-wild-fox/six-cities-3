import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '@/constants';
import {OfferListItem} from '@/types/offers';
import MainPage from '@/pages/main-page/main-page';
import PrivateRoute from '@/components/private-route/private-route';
import Preloader from '@/components/preloader/preloader';

const OfferPage = lazy(() => import('@/pages/offer-page/offer-page'));
const FavoritesPage = lazy(() => import('@/pages/favorites-page/favorites-page'));
const LoginPage = lazy(() => import('@/pages/login-page/login-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page/not-found-page'));

interface AppProps {
  offers: OfferListItem[];
  favorites: OfferListItem[];
}

const fallBack = <Preloader/>;

export default function App({offers, favorites}: AppProps): JSX.Element {
  const router = createBrowserRouter([
    {
      path:`${AppRoute.Root}`,
      element:
        <MainPage
          offers={offers}
        />,
    },
    {
      path:`${AppRoute.OfferId}`,
      element:
        <Suspense
          fallback={fallBack}
        >
          <OfferPage
            offers={offers}
          />
        </Suspense>
    },
    {
      path:`${AppRoute.Favorites}`,
      element:
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.Auth}
        >
          <Suspense
            fallback={fallBack}
          >
            <FavoritesPage
              offers={favorites}
            />
          </Suspense>

        </PrivateRoute>
    },
    {
      path:`${AppRoute.Login}`,
      element:
        <Suspense
          fallback={fallBack}
        >
          <LoginPage />
        </Suspense>
    },
    {
      path: '*',
      element:
      <Suspense
        fallback={fallBack}
      >
        <NotFoundPage />
      </Suspense>
    }
  ]);

  return (
    <HelmetProvider>
      <RouterProvider
        router={router}
      />
    </HelmetProvider>
  );
}

import {lazy} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus} from '@/constants';
import {OfferCardProps} from '@/types/offers';
import MainPage from '@/pages/main-page/main-page';
import PrivateRoute from '@/components/private-route/private-route';

const OfferPage = lazy(() => import('@/pages/offer-page/offer-page'));
const FavoritesPage = lazy(() => import('@/pages/favorites-page/favorites-page'));
const LoginPage = lazy(() => import('@/pages/login-page/login-page'));
const NotFoundPage = lazy(() => import('@/pages/not-found-page/not-found-page'));

interface AppProps {
  offers: OfferCardProps[];
}

export default function App({offers}: AppProps): JSX.Element {
  const router = createBrowserRouter([
    {
      path:`${AppRoute.Root}`,
      element:
        <MainPage
          offers={offers}
        />,
    },
    {
      path:`${AppRoute.Offer}`,
      element: <OfferPage />,
    },
    {
      path:`${AppRoute.Favourites}`,
      element:
        <PrivateRoute
          authorizationStatus={AuthorizationStatus.Auth}
        >
          <FavoritesPage/>
        </PrivateRoute>
    },
    {
      path:`${AppRoute.Login}`,
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
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

import {Suspense} from 'react';
import {createBrowserRouter} from 'react-router-dom';
import {AppRoute} from '@/constants';
import PrivateRoute from '@/components/private-route/private-route';
import Preloader from '@/components/preloader/preloader';
import MainPage from '@/pages/main-page/main-page';

import OfferPage from '@/pages/offer-page/offer-page';
import FavoritesPage from '@/pages/favorites-page/favorites-page';
import LoginPage from '@/pages/login-page/login-page';
import NotFoundPage from '@/pages/not-found-page/not-found-page';

const fallBack = <Preloader/>;

export const router = createBrowserRouter([
  {
    path:`${AppRoute.Root}`,
    element:
      <MainPage />,
  },
  {
    path:`${AppRoute.OfferId}`,
    element:
      <Suspense
        fallback={fallBack}
      >
        <OfferPage />
      </Suspense>
  },
  {
    path:`${AppRoute.Favorites}`,
    element:
      <PrivateRoute
        redirectPath={AppRoute.Login}
      >
        <Suspense
          fallback={fallBack}
        >
          <FavoritesPage />
        </Suspense>

      </PrivateRoute>
  },
  {
    path:`${AppRoute.Login}`,
    element:
      <PrivateRoute
        redirectPath={AppRoute.Root}
        onlyUnAuth
      >
        <Suspense
          fallback={fallBack}
        >
          <LoginPage />
        </Suspense>
      </PrivateRoute>
  },
  {
    path: `${AppRoute.PageNotFound}`,
    element:
    <Suspense
      fallback={fallBack}
    >
      <NotFoundPage />
    </Suspense>
  }
]);

export type RouterType = typeof router;

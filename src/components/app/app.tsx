import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {PlacesFoundCountType, AppRoute, AuthorizationStatus} from '../../constants';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import PrivateRoute from '../private-route/private-route';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

export default function App({allPlacesCount}: PlacesFoundCountType): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<MainPage allPlacesCount={allPlacesCount} />}
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferPage />}
          />
          <Route
            path={AppRoute.Favourites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <FavoritesPage/>
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Login}
            element={<LoginPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

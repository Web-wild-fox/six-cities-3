import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '@/hooks';
import {AppRoute} from '@/constants';
import {getIsAuthStatus} from '@/store/user/user.selectors';

interface PrivateRouteProps {
  children: JSX.Element;
  redirectPath: AppRoute;
  onlyUnAuth?: boolean;
}

type FromType = {
  from?: Location;
};

export default function PrivateRoute({children, redirectPath, onlyUnAuth}: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuthStatus);
  const location = useLocation();

  if (isAuth && onlyUnAuth) {
    const from = (location.state as FromType)?.from || {pathname: redirectPath};

    return (
      <Navigate
        to={from}
      />
    );
  }

  if (!isAuth && !onlyUnAuth) {
    return (
      <Navigate
        state={{from: location}}
        to={redirectPath}
      />
    );
  }

  return children;
}

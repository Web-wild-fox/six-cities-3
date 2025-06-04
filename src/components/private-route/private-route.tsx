import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '@/hooks';
import {AppRoute} from '@/constants';
import {getToken} from '@/services/token';

interface PrivateRouteProps {
  children: JSX.Element;
  redirectPath: AppRoute;
  onlyUnAuth?: boolean;
}

type FromType = {
  from?: Location;
};

export default function PrivateRoute({children, redirectPath, onlyUnAuth}: PrivateRouteProps): JSX.Element {
  const isToken = Boolean(useAppSelector(getToken));
  const location = useLocation();

  if (isToken && onlyUnAuth) {
    const from = (location.state as FromType)?.from || {pathname: redirectPath};

    return (
      <Navigate
        to={from}
      />
    );
  }

  if (!isToken && !onlyUnAuth) {
    return (
      <Navigate
        state={{from: location}}
        to={redirectPath}
      />
    );
  }

  return children;
}

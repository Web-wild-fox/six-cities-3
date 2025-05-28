import {Navigate} from 'react-router-dom';
import {useAppSelector} from '@/hooks';
import {getIsAuthStatus} from '@/store/user/user.selectors';
import {AppRoute} from '@/constants';

type PrivateRouteProps = {
  children: JSX.Element;
  redirectPath: AppRoute;
}

export default function PrivateRoute({children, redirectPath}: PrivateRouteProps): JSX.Element {
  const isAuth = useAppSelector(getIsAuthStatus);

  return isAuth
    ? children
    : <Navigate to={redirectPath} />;
}

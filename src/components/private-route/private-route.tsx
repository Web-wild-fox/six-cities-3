import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '@/hooks';
import {getAuthStatus} from '@/store/user/user.selectors';
import {AppRoute, AuthorizationStatus} from '@/constants';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);
  const currentPathName = useLocation();

  const {children} = props;
  const isLoginPage = currentPathName.pathname === String(AppRoute.Login);

  if (isLoginPage) {
    return authStatus === String(AuthorizationStatus.Auth)
      ? <Navigate to={AppRoute.Root} />
      : children;
  }

  return authStatus === String(AuthorizationStatus.Auth)
    ? children
    : <Navigate to={AppRoute.Login} />;
}

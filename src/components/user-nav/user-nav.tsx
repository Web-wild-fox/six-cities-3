import {Link} from 'react-router-dom';
import {logoutAction} from '@/store/user/user.api';
import {getIsAuthStatus, getUserData} from '@/store/user/user.selectors';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {AppRoute} from '@/constants';

export default function UserNav(): JSX.Element {
  const userName = useAppSelector(getUserData);
  const userAvatar = useAppSelector(getUserData);
  const isAuth = useAppSelector(getIsAuthStatus);

  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link
            className="header__nav-link header__nav-link--profile"
            to={
              isAuth
                ? AppRoute.Favorites
                : AppRoute.Login
            }
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
              {isAuth && (
                <img
                  className="header__avatar user__avatar"
                  src={userAvatar.avatarUrl}
                  alt="User avatar"
                />
              )}
            </div>
            {isAuth && (
              <>
                <span className="header__user-name user__name">
                  {userName.email}
                </span>
                <span className="header__favorite-count">
                  3
                </span>
              </>
            )}
            {!isAuth && (
              <span className="header__login">
                Sign in
              </span>
            )}
          </Link>
        </li>
        {isAuth && (
          <li className="header__nav-item">
            <a
              className="header__nav-link"
              onClick={() => {
                dispatch(logoutAction());
              }}
            >
              <span className="header__signout">
                Sign out
              </span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}

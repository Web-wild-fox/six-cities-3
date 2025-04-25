import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {AppRoute, DEFAULT_SORTING_TYPE} from '@/constants';
import {useAppDispatch} from '@/hooks';
import {changeSorting} from '@/store/action';

interface NavItemProps {
  location: string;
  isActive: boolean;
  onCityChangeClick: (city: string) => void;
}

export default function NavItem({location, isActive, onCityChangeClick}: NavItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">

      <Link to={AppRoute.Root}
        className={clsx(
          'locations__item-link tabs__item',
          isActive && 'locations__item-link tabs__item tabs__item--active'
        )}
        onClick={
          () => {
            onCityChangeClick(location);
            dispatch(changeSorting(DEFAULT_SORTING_TYPE));
          }
        }
      >
        <span>{location}</span>
      </Link>
    </li>
  );
}

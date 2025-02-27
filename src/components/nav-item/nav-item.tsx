import {NavLocationsType} from '../../constants';

export default function NavItem({id, location}: NavLocationsType): JSX.Element {
  return (
    <li className="locations__item" id={`${id}`}>
      <a className="locations__item-link tabs__item" href="#">
        <span>{location}</span>
      </a>
    </li>
  );
}

import NavItem from '../nav-item/nav-item';
import {
  NavLocations,
  NavLocationsType
} from '../../constants';

export default function NavList(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {
            NavLocations.map((location: NavLocationsType) => (
              <NavItem
                key={location.id}
                id={location.id}
                location={location.location}
              />
            ))
          }

        </ul>
      </section>
    </div>
  );
}

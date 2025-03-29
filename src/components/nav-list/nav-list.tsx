import NavItem from '@/components/nav-item/nav-item';
import {Locations} from '@/constants';

export default function NavList(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Locations.map((location) => (
              <NavItem
                key={location}
                location={location}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}

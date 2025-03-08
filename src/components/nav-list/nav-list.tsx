import NavItem from '@/components/nav-item/nav-item';
import {locations} from '@/constants';

export default function NavList(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            locations.map((location) => (
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

import NavItem from '@/components/nav-item/nav-item';
import {LOCATIONS} from '@/constants';

interface NavListProps {
  city: string;
}

export default function NavList({city}:NavListProps): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            LOCATIONS.map((location) => (
              <NavItem
                key={location}
                location={location}
                isActive={location === city}
              />
            ))
          }
        </ul>
      </section>
    </div>
  );
}

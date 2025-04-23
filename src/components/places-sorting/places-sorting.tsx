import clsx from 'clsx';
import {SortingType} from '@/constants';

interface PlacesSortingProps {
  isActive: boolean;
  currentSorting: string;
  onSortingChange: (sortingType: string) => void;
  onSortingView: () => void;
}

export default function PlacesSorting({
  isActive,
  currentSorting,
  onSortingChange,
  onSortingView
}: PlacesSortingProps): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => onSortingView()}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx(
          'places__options places__options--custom',
          isActive && 'places__options--opened'
        )}
        tabIndex={0}
      >
        {
          Object.values(SortingType).map((type) => (
            <li
              key={type}
              className={clsx(
                'places__option',
                String(type) === currentSorting && 'places__option--active',
              )}
              tabIndex={0}
              onClick={() => onSortingChange(type)}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

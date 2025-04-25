import clsx from 'clsx';
import {useRef, useState} from 'react';
import {useClickAway} from 'react-use';
import {useAppDispatch} from '@/hooks';
import {SortingType} from '@/constants';
import {changeSorting} from '@/store/action';

interface PlacesSortingProps {
  currentSorting: string;
}

export default function PlacesSorting({
  currentSorting,
}: PlacesSortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const sortRef = useRef(null);

  const dispatch = useAppDispatch();

  useClickAway(
    sortRef,
    () => {
      setIsOpened(false);
    });

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
      ref={sortRef}
    >
      <span className="places__sorting-caption">
        Sort by&nbsp;
      </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened((prevActive) => !prevActive)}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx(
          'places__options places__options--custom',
          isOpened && 'places__options--opened'
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
              onClick={() => dispatch(changeSorting(type))}
            >
              {type}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

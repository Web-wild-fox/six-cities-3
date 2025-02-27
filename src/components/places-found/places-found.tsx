import {PlacesFoundCountType} from '../../constants';

export default function PlacesFound({allPlacesCount}: PlacesFoundCountType): JSX.Element {
  return (
    <b className="places__found">
      {allPlacesCount} places to stay in Amsterdam
    </b>
  );
}

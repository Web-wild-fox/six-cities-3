import MainPage from '../../pages/main-page/main-page';
import {PlacesFoundCountType} from '../../constants';

export default function App({allPlacesCount}: PlacesFoundCountType): JSX.Element {
  return (
    <MainPage
      allPlacesCount={allPlacesCount}
    />
  );
}

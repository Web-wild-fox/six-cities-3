import MainPage from '../../pages/main-page/main-page';

type AppProps = {
  allOffersCount: number;
}

export default function App({allOffersCount}: AppProps): JSX.Element {
  return (
    <MainPage
      allOffersCount = {allOffersCount}
    />
  );
}

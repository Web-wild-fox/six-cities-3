import {useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {cityСhange} from '@/store/action';
import {
  ClassByTypeCard,
  SortingType,
  DEFAULT_SORTING_TYPE
} from '@/constants';
import Header from '@/components/header/header';
import NavList from '@/components/nav-list/nav-list';
import PlacesSorting from '@/components/places-sorting/places-sorting';
import OffersList from '@/components/offers-list/offers-list';
import Map from '@/components/map/map';

export default function MainPage(): JSX.Element {
  const [selectedPointId, setSelectedPointId] = useState<string | undefined>(undefined);
  const [currentSorting, setCurrentSortingType] = useState<string>(DEFAULT_SORTING_TYPE);
  const [isActive, setIsActive] = useState<boolean>(false);

  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();

  const getSelectedPointId = (id: string | undefined) => {
    setSelectedPointId(id ? id : undefined);
  };

  const getFilterOffers = (city: string) => offers.filter(
    (offer) => offer.city.name === city
  );

  const filteredOffers = getFilterOffers(currentCity);
  const isOffersList = filteredOffers[0];

  const typesSort = {
    [SortingType.priceUp]:[...filteredOffers].sort(
      (a, b) => a.price - b.price),
    [SortingType.priceDown]:[...filteredOffers].sort(
      (a, b) => b.price - a.price),
    [SortingType.rating]:[...filteredOffers].sort(
      (a, b) => b.rating - a.rating),
    [SortingType.popular]: [...filteredOffers],
  };

  const getSortedOffers = (sort: string) => {
    switch (sort) {
      case SortingType.popular:
        return typesSort[sort];
      case SortingType.priceUp:
        return typesSort[sort];
      case SortingType.priceDown:
        return typesSort[sort];
      case SortingType.rating:
        return typesSort[sort];
      default:
        return filteredOffers;
    }
  };

  const sortedOffers = getSortedOffers(currentSorting);

  const handleSortingChangeClick = (type: string) => {
    setCurrentSortingType(type);
  };

  const handleSortingViewClick = () => {
    setIsActive((boolean) => !boolean);
  };

  const handleCityChangeClick = (city: string): void => {
    setCurrentSortingType(DEFAULT_SORTING_TYPE);
    setIsActive(false);

    dispatch(cityСhange(city));
  };

  return (
    <div className="page page--gray page--main">

      <Helmet>
        <title>6 cities | Главная страница</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <NavList
          city={currentCity}
          onCityChangeClick={handleCityChangeClick}
        />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {filteredOffers.length} places to stay in {currentCity}
              </b>
              {
                isOffersList && (
                  <>
                    <PlacesSorting
                      isActive={isActive}
                      currentSorting={currentSorting}
                      onSortingChange={handleSortingChangeClick}
                      onSortingView={handleSortingViewClick}
                    />
                    <OffersList
                      offers={sortedOffers}
                      cardClassName={ClassByTypeCard.MainPageCardType}
                      onCardAction={getSelectedPointId}
                    />
                  </>
                )
              }
            </section>
            {
              isOffersList && (
                <div className="cities__right-section">
                  <section className="cities__map map">
                    <Map
                      points={filteredOffers}
                      startPoint={filteredOffers[0].city}
                      selectedPointId={selectedPointId}
                    />
                  </section>
                </div>
              )
            }
          </div>
        </div>
      </main>
    </div>
  );
}

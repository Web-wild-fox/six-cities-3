import {State} from '@/types/state';
import {NameSpace, RequestStatus} from '@/constants';
import {makeMockFavorites} from '@/utils/mocks';
import {
  getFavorites,
  getFavoritesStatus,
  selectFavoriteIds
} from './favorites.selectors';

describe('Favorites selectors', () => {
  const mockFavorites = makeMockFavorites();

  let expectedState: Pick<State, NameSpace.Favorites>;

  beforeEach(() => {
    expectedState = {
      [NameSpace.Favorites]: {
        favorites: [mockFavorites],
        favoritesStatus: RequestStatus.Succeeded,
      }
    };
  });

  it('getFavorites: should return favorites', () => {
    const {favorites} = expectedState[NameSpace.Favorites];
    const result = getFavorites(expectedState);

    expect(result).toBe(favorites);
  });

  it('getFavoritesStatus: should return favorites status', () => {
    const {favoritesStatus} = expectedState[NameSpace.Favorites];
    const result = getFavoritesStatus(expectedState);

    expect(result).toBe(favoritesStatus);
  });

  it('selectFavoriteIds: should return selected favorites id', () => {
    const selectedFavoritesIds = [mockFavorites].map(({id}) => id);
    const result = selectFavoriteIds(expectedState);

    expect(result).toEqual(expect.arrayContaining(selectedFavoritesIds));
  });

});

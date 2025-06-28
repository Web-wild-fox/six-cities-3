import {RequestStatus} from '@/constants';
import {makeMockFavorites} from '@/utils/mocks';
import {favoritesLoadAction} from './favorites.slice';
import {fetchFavoritesAction, postFavoriteAction} from './favorites.api';

describe('Favorites slice', () => {
  const emptyAction = {type: 'UNKNOWN'};

  let expectedState: ReturnType<typeof favoritesLoadAction.reducer>;

  beforeEach(() => {
    expectedState = {
      favorites: [],
      favoritesStatus: RequestStatus.Idle,
    };
  });

  describe('State', () => {
    it('should return initial state with emptyAction', () => {
      const result = favoritesLoadAction.reducer(
        expectedState,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });

    it('should return default state with emptyAction and undefined', () => {
      const result = favoritesLoadAction.reducer(
        undefined,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should set "favoritesStatus" to "Loading" with fetchFavoritesAction.pending', () => {
      const result = favoritesLoadAction.reducer(
        expectedState,
        fetchFavoritesAction.pending
      );

      expect(result.favoritesStatus).toEqual(RequestStatus.Loading);
    });

    it('should set "favoritesStatus" to "Succeeded" and "favorites" to payload with fetchFavoritesAction.fulfilled', () => {
      const mockFavorites = makeMockFavorites();

      const result = favoritesLoadAction.reducer(
        expectedState,
        fetchFavoritesAction.fulfilled(
          [mockFavorites],
          ''
        )
      );

      expect(result.favorites).toEqual([mockFavorites]);
      expect(result.favoritesStatus).toEqual(RequestStatus.Succeeded);
    });

    it('should set "favoritesStatus" to "Failed" with fetchFavoritesAction.rejected', () => {
      const result = favoritesLoadAction.reducer(
        expectedState,
        fetchFavoritesAction.rejected
      );

      expect(result.favoritesStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('postFavoriteAction', () => {
    it('should push payload to "favorites" if "isFavorite" equal true with postFavoriteAction.fulfilled', () => {
      const mockFavorites = makeMockFavorites();
      const withIsFavoriteTrue = {
        ...mockFavorites,
        isFavorite: true
      };

      const result = favoritesLoadAction.reducer(
        expectedState,
        postFavoriteAction.fulfilled(
          withIsFavoriteTrue,
          '',
          {
            id: 'id',
            status: 1,
          },
        )
      );

      expect(result.favorites).toEqual([withIsFavoriteTrue]);
    });

    it('should remove payload from "favorites" if "isFavorite" equal false with postFavoriteAction.fulfilled', () => {
      const mockFavorites = makeMockFavorites();
      const withIsFavoriteFalse = {
        ...mockFavorites,
        isFavorite: false
      };
      expectedState.favorites = [withIsFavoriteFalse];

      const result = favoritesLoadAction.reducer(
        expectedState,
        postFavoriteAction.fulfilled(
          withIsFavoriteFalse,
          '',
          {
            id: 'id',
            status: 0
          }
        )
      );

      expect(result.favorites).toEqual([]);
    });
  });
});

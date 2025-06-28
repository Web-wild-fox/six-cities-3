import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeMockFavoriteData,
  makeMockFavorites,
} from '@/utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {fetchFavoritesAction, postFavoriteAction} from './favorites.api';
import {
  APIRoute,
  NameSpace,
  RequestStatus
} from '@/constants';

describe('Async favorites api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockFavorites = [makeMockFavorites()];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Favorites]: {
        favorites: [],
        favoritesStatus: RequestStatus.Idle
      }
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch fetchFavoritesAction.pending and fetchFavoritesAction.fulfilled, when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Favorites}`)
        .reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockFavorites);
    });
  });

  describe('postFavoriteAction', () => {
    it('should dispatch postFavoriteAction.pending and postFavoriteAction.fulfilled, when server response 200', async () => {
      const {id, status} = makeMockFavoriteData();
      mockAxiosAdapter
        .onPost(
          `${APIRoute.Favorites}/${id}/${status}`
        )
        .reply(200, mockFavorites);

      await store.dispatch(postFavoriteAction({id, status}));
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        postFavoriteAction.pending.type,
        postFavoriteAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockFavorites);
    });
  });
});

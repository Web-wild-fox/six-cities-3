import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeMockOffersNearby,
} from '@/utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {fetchOffersNearbyAction} from './offers-nearby.api';
import {
  APIRoute,
  NameSpace,
  RequestStatus
} from '@/constants';

describe('Async offers nearby api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockOffersNearby = makeMockOffersNearby();
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.OffersNearby]: {
        offersNearby: [],
        offersNearbyStatus: RequestStatus.Idle
      }
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should dispatch fetchOffersNearbyAction.pending and fetchOffersNearbyAction.fulfilled, when server response 200', async () => {
      const mockId = 'id';
      mockAxiosAdapter
        .onGet(
          `${APIRoute.Offers}/${mockId}/${APIRoute.Nearby}`
        )
        .reply(200, mockOffersNearby);

      await store.dispatch(fetchOffersNearbyAction(mockId));
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof fetchOffersNearbyAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockOffersNearby);
    });
  });
});

import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeMockOffers,
} from '@/utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {fetchOfferListAction} from './offers.api';
import {
  APIRoute,
  NameSpace,
  RequestStatus
} from '@/constants';

describe('Async offers api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockOffers = makeMockOffers();
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Offers]: {
        offers: [],
        offersStatus: RequestStatus.Idle
      }
    });
  });

  describe('fetchOfferListAction', () => {
    it('should dispatch fetchOfferListAction.pending and fetchOfferListAction.fulfilled, when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}`)
        .reply(200, mockOffers);

      await store.dispatch(fetchOfferListAction());
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof fetchOfferListAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        fetchOfferListAction.pending.type,
        fetchOfferListAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockOffers);
    });
  });
});

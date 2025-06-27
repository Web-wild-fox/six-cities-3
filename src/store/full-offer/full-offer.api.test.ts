import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeMockFullOffer,
} from '@/utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {fetchFullOfferAction} from './full-offer.api';
import {
  APIRoute,
  NameSpace,
  RequestStatus
} from '@/constants';

describe('Async full offer api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockFullOffer = makeMockFullOffer();
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.FullOffer]: {
        fullOffer: null,
        fullOfferStatus: RequestStatus.Idle
      }
    });
  });

  describe('fetchFullOfferAction', () => {
    it('should dispatch fetchFullOfferAction.pending and fetchFullOfferAction.fulfilled, when server response 200', async () => {
      const mockId = 'id';
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockId}`)
        .reply(200, mockFullOffer);

      await store.dispatch(fetchFullOfferAction(mockId));
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof fetchFullOfferAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        fetchFullOfferAction.pending.type,
        fetchFullOfferAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockFullOffer);
    });
  });
});

import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as tokenStorage from '@/services/token';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeMockAuthData,
  makeMockUserData,
} from '@/utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
} from './user.api';
import {
  APIRoute,
  AuthorizationStatus,
  DEFAULT_CITY,
  DEFAULT_SORTING_TYPE,
  NameSpace,
  RequestStatus
} from '@/constants';

describe('Async user api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockUserData = makeMockUserData();
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.User]: {
        id: undefined,
        city: DEFAULT_CITY,
        sorting: DEFAULT_SORTING_TYPE,
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        LoginStatus: RequestStatus.Idle,
      }
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch checkAuthAction.pending and checkAuthAction.fulfilled, when server response 200', async () => {
      mockAxiosAdapter
        .onGet(`${APIRoute.Login}`)
        .reply(200, mockUserData);

      await store.dispatch(checkAuthAction());
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof checkAuthAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockUserData);
    });
  });

  describe('loginAction', () => {
    it('should dispatch loginAction.pending and loginAction.fulfilled, when server response 200', async () => {
      const {login: email, password} = makeMockAuthData();
      mockAxiosAdapter
        .onPost(APIRoute.Login, {email, password})
        .reply(200, mockUserData);

      await store.dispatch(loginAction({login: email, password}));
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof checkAuthAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockUserData);
    });

    it('should call "SaveToken" once with th received token', async () => {
      const {login: email, password} = makeMockAuthData();
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');
      mockAxiosAdapter
        .onPost(APIRoute.Login, {email, password})
        .reply(200, mockUserData);

      await store.dispatch(loginAction({login: email, password}));

      expect(mockSaveToken).toHaveBeenCalledTimes(1);
      expect(mockSaveToken).toHaveBeenCalledWith(mockUserData.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch logoutAction.pending and logoutAction.fulfilled, when server response 204', async () => {
      mockAxiosAdapter
        .onDelete(APIRoute.Logout)
        .reply(204);

      await store.dispatch(logoutAction());
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with logoutAction', async () => {
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');
      mockAxiosAdapter
        .onDelete(APIRoute.Logout)
        .reply(204);

      await store.dispatch(logoutAction());

      expect(mockDropToken).toHaveBeenCalledTimes(1);
    });
  });
});

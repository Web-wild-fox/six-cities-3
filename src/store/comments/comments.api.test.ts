import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {router} from '@/services/router';
import {State} from '@/types/state';
import {Action} from '@reduxjs/toolkit';
import {createAPI} from '@/services/api';
import {
  AppThunkDispatch,
  extractActionsTypes,
  makeMockCommentData,
  makeMockComments
} from '@/utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {fetchCommentsAction, postCommentAction} from './comments.api';
import {
  APIRoute,
  NameSpace,
  RequestStatus
} from '@/constants';

describe('Async comments api actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument({api: axios, router})];
  const mockComments = [makeMockComments()];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Comments]: {
        comments: [],
        errorMessage: null,
        commentsStatus: RequestStatus.Idle
      }
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch fetchCommentsAction.pending and fetchCommentsAction.fulfilled, when server response 200', async () => {
      const mockId = 'id';
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockId}`)
        .reply(200, mockComments);

      await store.dispatch(fetchCommentsAction(mockId));
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockComments);
    });

    it('should dispatch fetchCommentsAction.pending and fetchCommentsAction.rejected, when server response 404', async () => {
      const mockId = 'id';
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockId}`)
        .reply(404, []);

      await store.dispatch(fetchCommentsAction(mockId));
      const actionsTypes = extractActionsTypes(store.getActions());

      expect(actionsTypes).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('postCommentAction', () => {
    it('should dispatch postCommentAction.pending and postCommentAction.fulfilled, when server response 200', async () => {
      const mockCommentData = makeMockCommentData();
      const mockComment = makeMockComments();
      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${mockCommentData.id}`)
        .reply(200, mockComment);

      await store.dispatch(postCommentAction(mockCommentData));
      const actionsTypes = extractActionsTypes(store.getActions());
      const payload = (
        store
          .getActions()
          .at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>
      ).payload;

      expect(actionsTypes).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);
      expect(payload).toEqual(mockComment);
    });
  });
});

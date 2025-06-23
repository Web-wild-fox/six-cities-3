// import { State } from '@/types/state';
// import { Action } from '@reduxjs/toolkit';
// import { createAPI } from '@/services/api';
// import { AppThunkDispatch, makeMockComments } from '@/utils/mocks';
// import { configureMockStore } from '@jedmao/redux-mock-store';
// import MockAdapter from 'axios-mock-adapter';
// import thunk from 'redux-thunk';
// import { fetchCommentsAction } from './comments.api';
// import { APIRoute, NameSpace, RequestStatus } from '@/constants';

// describe('Async comments actions', () => {
//   const axios = createAPI();
//   const mockAxiosAdapter = new MockAdapter(axios);
//   const middleware = [thunk.withExtraArgument(axios)];
//   const mockComments = [makeMockComments()];
//   const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

//   let store: ReturnType<typeof mockStoreCreator>;

//   beforeEach(() => {
//     store = mockStoreCreator({
//       [NameSpace.Comments]: {
//         comments: [],
//         errorMessage: null,
//         commentsStatus: RequestStatus.Idle
//       }
//     });
//   });

//   it('should dispatch fetchCommentsAction.pending and fetchCommentsAction.fulfilled, when server response 200', async () => {
//     const mockId = 'id';
//     mockAxiosAdapter
//       .onGet(`${APIRoute.Comments}/${mockId}`)
//       .reply(200, mockComments);

//     await store.dispatch(fetchCommentsAction(mockId));
//     const actions = store.getActions();

//     expect(actions).toEqual([
//       fetchCommentsAction.pending.type,
//       fetchCommentsAction.fulfilled.type,
//     ]);
//   });
// });

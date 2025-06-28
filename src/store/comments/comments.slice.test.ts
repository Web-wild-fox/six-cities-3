import {RequestStatus} from '@/constants';
import {makeMockCommentData, makeMockComments} from '@/utils/mocks';
import {commentsLoadAction} from './comments.slice';
import {fetchCommentsAction, postCommentAction} from './comments.api';

describe('Comments slice', () => {
  const emptyAction = {type: 'UNKNOWN'};

  let expectedState: ReturnType<typeof commentsLoadAction.reducer>;

  beforeEach(() => {
    expectedState = {
      comments: [],
      errorMessage: null,
      commentsStatus: RequestStatus.Idle,
      PostCommentStatus: RequestStatus.Idle,
    };
  });

  describe('State', () => {
    it('should return initial state with emptyAction', () => {
      const result = commentsLoadAction.reducer(
        expectedState,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });

    it('should return default state with emptyAction and undefined', () => {
      const result = commentsLoadAction.reducer(
        undefined,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should set "commentsStatus" to "Loading" with fetchCommentsAction.pending', () => {
      const result = commentsLoadAction.reducer(
        expectedState,
        fetchCommentsAction.pending
      );

      expect(result.commentsStatus).toEqual(RequestStatus.Loading);
    });

    it('should set "commentsStatus" to "Success" and "comments" to payload with fetchCommentsAction.fulfilled', () => {
      const mockComments = makeMockComments();

      const result = commentsLoadAction.reducer(
        expectedState,
        fetchCommentsAction.fulfilled(
          [mockComments],
          '',
          '',
        )
      );

      expect(result.comments).toEqual([mockComments]);
      expect(result.commentsStatus).toEqual(RequestStatus.Succeeded);
    });

    it('should set "commentsStatus" to "Failed" and "errorMessage" to "Error message" with fetchCommentsAction.rejected', () => {
      const errorMessage = 'Error message';

      const result = commentsLoadAction.reducer(
        expectedState,
        fetchCommentsAction.rejected(
          new Error(errorMessage),
          '',
          '',
        )
      );

      expect(result.errorMessage).toEqual(errorMessage);
      expect(result.commentsStatus).toEqual(RequestStatus.Failed);
    });

  });

  describe('postCommentAction', () => {
    it('should set "PostCommentStatus" to "Loading" with postCommentAction.pending', () => {
      const result = commentsLoadAction.reducer(
        expectedState,
        postCommentAction.pending
      );

      expect(result.PostCommentStatus).toEqual(RequestStatus.Loading);
    });

    it('should set "PostCommentStatus" to "Success" and "comments" to payload with postCommentAction.fulfilled', () => {
      const mockComment = makeMockComments();
      const mockCommentData = makeMockCommentData();

      const result = commentsLoadAction.reducer(
        expectedState,
        postCommentAction.fulfilled(
          mockComment,
          '',
          mockCommentData,
        )
      );

      expect(result.comments).toEqual([mockComment]);
      expect(result.PostCommentStatus).toEqual(RequestStatus.Succeeded);
    });

    it('should set "PostCommentStatus" to "Failed" with postCommentAction.rejected', () => {
      const result = commentsLoadAction.reducer(
        expectedState,
        postCommentAction.rejected
      );

      expect(result.PostCommentStatus).toEqual(RequestStatus.Failed);
    });
  });
});

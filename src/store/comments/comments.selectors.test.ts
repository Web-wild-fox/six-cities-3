import {State} from '@/types/state';
import {NameSpace, RequestStatus} from '@/constants';
import {makeMockComments} from '@/utils/mocks';
import {
  getComments,
  getCommentsError,
  getCommentsStatus,
  getPostCommentStatus,
} from './comments.selectors';

describe('Comments selectors', () => {
  const mockComments = makeMockComments();

  let expectedState: Pick<State, NameSpace.Comments>;

  beforeEach(() => {
    expectedState = {
      [NameSpace.Comments]: {
        comments: [mockComments],
        errorMessage: null,
        commentsStatus: RequestStatus.Succeeded,
        PostCommentStatus: RequestStatus.Succeeded
      }
    };
  });

  it('getComments: should return comments', () => {
    const {comments} = expectedState[NameSpace.Comments];
    const result = getComments(expectedState);

    expect(result).toBe(comments);
  });

  it('getCommentsStatus: should return comments status', () => {
    const {commentsStatus} = expectedState[NameSpace.Comments];
    const result = getCommentsStatus(expectedState);

    expect(result).toBe(commentsStatus);
  });

  it('getCommentsError: should return comments error message', () => {
    const {errorMessage} = expectedState[NameSpace.Comments];
    const result = getCommentsError(expectedState);

    expect(result).toBe(errorMessage);
  });

  it('getPostCommentStatus: should return post comment status', () => {
    const {PostCommentStatus} = expectedState[NameSpace.Comments];
    const result = getPostCommentStatus(expectedState);

    expect(result).toBe(PostCommentStatus);
  });
});

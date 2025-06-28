import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils/utils';

export const getComments = (state: Pick<State, NameSpace.Comments>) =>
  state[NameSpace.Comments].comments;
export const getCommentsError = (state: Pick<State, NameSpace.Comments>) =>
  state[NameSpace.Comments].errorMessage;
export const getCommentsStatus = (state: Pick<State, NameSpace.Comments>) =>
  state[NameSpace.Comments].commentsStatus;
export const getPostCommentStatus = (state: Pick<State, NameSpace.Comments>) => state[NameSpace.Comments].PostCommentStatus;

export const selectCommentsStatus = createStatusSelector(getCommentsStatus);

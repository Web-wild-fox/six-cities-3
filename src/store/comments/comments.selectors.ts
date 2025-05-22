import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils';

export const getComments = (state: State) => state[NameSpace.Comments].comments;
export const getCommentsError = (state: State) => state[NameSpace.Comments].errorMessage;
export const getCommentsStatus = (state: State) => state[NameSpace.Comments].commentsStatus;

export const selectCommentsStatus = createStatusSelector(getCommentsStatus);

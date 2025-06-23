import {createSlice,} from '@reduxjs/toolkit';
import {NameSpace, RequestStatus} from '@/constants';
import {Comment} from '@/types/offers';
import {fetchCommentsAction, postCommentAction} from './comments.api';

interface InitialStateProps {
  comments: Comment[];
  errorMessage: string | null;
  commentsStatus: RequestStatus;
  PostCommentStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  comments: [],
  errorMessage: null,
  commentsStatus: RequestStatus.Idle,
  PostCommentStatus: RequestStatus.Idle,
};

export const commentsLoadAction = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.commentsStatus = RequestStatus.Loading;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsStatus = RequestStatus.Succeeded;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        if (action.error.message) {
          state.errorMessage = action.error.message;
        }

        state.commentsStatus = RequestStatus.Failed;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.PostCommentStatus = RequestStatus.Loading;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = state.comments.concat(action.payload);
        state.PostCommentStatus = RequestStatus.Succeeded;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.PostCommentStatus = RequestStatus.Failed;
      });
  }
});

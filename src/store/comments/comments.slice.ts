import {createSlice,} from '@reduxjs/toolkit';
import {fetchCommentsAction} from './comments.api';
import {Comment} from '@/types/offers';
import {NameSpace, RequestStatus} from '@/constants';

interface InitialStateProps {
  comments: Comment[];
  errorMessage: string | null;
  commentsStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  comments: [],
  errorMessage: null,
  commentsStatus: RequestStatus.Idle,
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
      });
  }
});

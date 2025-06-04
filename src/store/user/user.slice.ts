import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DEFAULT_CITY,
  DEFAULT_SORTING_TYPE,
  NameSpace,
  SortingType,
  AuthorizationStatus,
  RequestStatus,
} from '@/constants';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
  postCommentAction,
} from './user.api';
import {UserData} from '@/types/user-data';
import {Comment} from '@/types/offers';

interface InitialStateProps {
  id?: string;
  city: string;
  sorting: SortingType;
  authorizationStatus: string;
  userData: UserData | null;
  addedComment: Comment | null;
  requestStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  id: undefined,
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING_TYPE,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  addedComment: null,
  requestStatus: RequestStatus.Idle,
};

export const userAction = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    changeSorting: (state, action: PayloadAction<SortingType>) => {
      state.sorting = action.payload;
    },
    setOfferId: (state, action: PayloadAction<string | undefined>) => {
      state.id = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.requestStatus = RequestStatus.Succeeded;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.addedComment = action.payload;
        state.requestStatus = RequestStatus.Succeeded;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const {
  setOfferId,
  changeCity,
  changeSorting,
} = userAction.actions;

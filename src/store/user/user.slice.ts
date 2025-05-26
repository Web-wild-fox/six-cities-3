import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  DEFAULT_CITY,
  DEFAULT_SORTING_TYPE,
  NameSpace,
  SortingType,
  AuthorizationStatus,
  AuthMessageNotification,
} from '@/constants';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
} from './user.api';
import {UserData} from '@/types/user-data';
import {dropToken, saveToken} from '@/services/token';
import {toast} from 'react-toastify';

interface InitialStateProps {
  id?: string;
  city: string;
  sorting: SortingType;
  authorizationStatus: string;
  userData: UserData;
}

const initialState: InitialStateProps = {
  id: undefined,
  city: DEFAULT_CITY,
  sorting: DEFAULT_SORTING_TYPE,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    name: '',
    avatarUrl: '',
    isPro: false,
    email: '',
    token: '',
  },
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

        toast.info(AuthMessageNotification.AuthUnknown);
      })
      .addCase(loginAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.InProgress;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;

        saveToken(state.userData.token);
        toast.success(AuthMessageNotification.AuthSuccess);
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;

        toast.error(AuthMessageNotification.AuthFailed);
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;

        dropToken();
        toast.success(AuthMessageNotification.LogoutSuccess);
      })
      .addCase(logoutAction.rejected, () => {
        toast.error(AuthMessageNotification.LogoutFailed);
      });
  }
});

export const {
  setOfferId,
  changeCity,
  changeSorting,
} = userAction.actions;

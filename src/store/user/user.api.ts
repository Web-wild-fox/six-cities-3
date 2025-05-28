import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@/types/state.js';
import {AuthData} from '@/types/auth-data';
import {UserData} from '@/types/user-data';
import {dropToken, saveToken} from '@/services/token';
import {toast} from 'react-toastify';
import {APIRoute, AuthMessageNotification} from '@/constants.js';

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  AsyncThunkConfig
  >(
    'user/checkAuth',
    async (_arg, {extra: {api}}) => {
      try {
        const {data} = await api.get<UserData>(APIRoute.Login);

        return data;
      } catch (err) {
        toast.info(AuthMessageNotification.AuthUnknown);

        throw err;
      }
    },
  );

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  AsyncThunkConfig
>(
  'user/login',
  async ({login: email, password}, {extra: {api}}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});

      saveToken(data.token);
      toast.success(AuthMessageNotification.AuthSuccess);

      return data;
    } catch (err) {
      toast.error(AuthMessageNotification.AuthFailed);

      throw err;
    }
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkConfig
>(
  'user/logout',
  async (_arg, {extra: {api}}) => {
    try {
      await api.delete(APIRoute.Logout);

      dropToken();
      toast.success(AuthMessageNotification.LogoutSuccess);
    } catch (err) {
      toast.error(AuthMessageNotification.LogoutFailed);

      throw err;
    }
  },
);


import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@/types/state.js';
import {AuthData} from '@/types/auth-data';
import {UserData} from '@/types/user-data';
import {APIRoute} from '@/constants.js';

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  AsyncThunkConfig
>(
  'user/checkAuth',
  async (_arg, {extra: {api}}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  AsyncThunkConfig
>(
  'user/login',
  async ({login: email, password}, {extra: {api}}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});

    return data;
  },
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  AsyncThunkConfig
>(
  'user/logout',
  async (_arg, {extra: {api}}) => {
    await api.delete(APIRoute.Logout);
  },
);

import {createAppAsyncThunk} from '@/hooks';
import {AuthData} from '@/types/auth-data';
import {UserData} from '@/types/user-data';
import {dropToken, saveToken} from '@/services/token';
import {toast} from 'react-toastify';
import {
  APIRoute,
  AuthNotification,
} from '@/constants.js';

export const checkAuthAction = createAppAsyncThunk<
  UserData,
  void
  >(
    'user/checkAuth',
    async (_arg, {extra: {api}}) => {
      try {
        const {data} = await api.get<UserData>(APIRoute.Login);

        return data;
      } catch (err) {
        toast.info(AuthNotification.AuthUnknown);

        throw err;
      }
    },
  );

export const loginAction = createAppAsyncThunk<
  UserData,
  AuthData
>(
  'user/login',
  async ({login: email, password}, {extra: {api}}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});

      saveToken(data.token);
      toast.success(`${AuthNotification.AuthSuccess}`);
      toast.success(`${AuthNotification.AuthGreetings}${data.name}`);

      return data;
    } catch (err) {
      toast.error(AuthNotification.AuthFailed);

      throw err;
    }
  },
);

export const logoutAction = createAppAsyncThunk<
  void,
  void
>(
  'user/logout',
  async (_arg, {extra: {api}}) => {
    try {
      await api.delete(APIRoute.Logout);

      dropToken();
      toast.success(AuthNotification.LogoutSuccess);
    } catch (err) {
      toast.error(AuthNotification.LogoutFailed);

      throw err;
    }
  },
);

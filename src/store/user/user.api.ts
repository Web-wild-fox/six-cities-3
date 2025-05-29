import {createAsyncThunk} from '@reduxjs/toolkit';
import {AsyncThunkConfig} from '@/types/state.js';
import {AuthData} from '@/types/auth-data';
import {UserData} from '@/types/user-data';
import {Comment} from '@/types/offers';
import {CommentData} from '@/types/comment-data';
import {dropToken, saveToken} from '@/services/token';
import {toast} from 'react-toastify';
import {
  APIRoute,
  AuthNotification,
  PostCommentNotification
} from '@/constants.js';

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
        toast.info(AuthNotification.AuthUnknown);

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
      toast.success(AuthNotification.AuthSuccess);

      return data;
    } catch (err) {
      toast.error(AuthNotification.AuthFailed);

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
      toast.success(AuthNotification.LogoutSuccess);
    } catch (err) {
      toast.error(AuthNotification.LogoutFailed);

      throw err;
    }
  },
);

export const postCommentAction = createAsyncThunk<
  Comment,
  CommentData,
  AsyncThunkConfig
  >(
    'user/postComment',
    async ({id, comment, rating}, {extra: {api}}) => {
      try {
        const {data} = await api.post<Comment>(
          `${APIRoute.Comments}${id}`, {comment, rating}
        );

        toast.success(PostCommentNotification.CommentPostSuccess);

        return data;
      } catch (err) {
        toast.error(PostCommentNotification.CommentPostFailed);

        throw err;
      }
    }
  );

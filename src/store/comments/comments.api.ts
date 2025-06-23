import axios from 'axios';
import {toast} from 'react-toastify';
import {createAppAsyncThunk} from '@/hooks';
import {Comment} from '@/types/offers';
import {CommentData} from '@/types/comment-data';
import {
  APIRoute,
  PostCommentNotification,
  RequestMessageError
} from '@/constants.js';

export const fetchCommentsAction = createAppAsyncThunk<
  Comment[],
  string
  >(
    'comments/fetchCommentsList',
    async (id, {extra: {api}}) => {
      try {
        const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.warn(`${RequestMessageError.CommentsLoadingFailed} ${err.message}`);
        }

        throw err;
      }
    }
  );

export const postCommentAction = createAppAsyncThunk<
  Comment,
  CommentData
  >(
    'comments/postComment',
    async ({id, comment, rating}, {extra: {api}}) => {
      try {
        const {data} = await api.post<Comment>(
          `${APIRoute.Comments}/${id}`,
          {comment, rating}
        );

        toast.success(PostCommentNotification.CommentPostSuccess);

        return data;
      } catch (err) {
        toast.error(PostCommentNotification.CommentPostFailed);

        throw err;
      }
    }
  );

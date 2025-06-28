import {AxiosInstance} from 'axios';
import {RouterType} from '@/services/router';
import {store} from '@/store/index.js';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: State;
  extra: ExtraArgument;
}

export interface ExtraArgument {
  api: AxiosInstance;
  router: RouterType;
}

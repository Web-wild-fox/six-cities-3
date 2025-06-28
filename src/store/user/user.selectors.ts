import {State} from '@/types/state';
import {AuthorizationStatus, NameSpace} from '@/constants';

export const getOfferId = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].id;
export const getCurrentCity = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].city;
export const getCurrentSorting = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].sorting;
export const getIsAuthStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus === String(AuthorizationStatus.Auth);
export const getUserData = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].userData;
export const getLoginStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].LoginStatus;

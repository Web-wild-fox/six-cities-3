import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createSelector} from '@reduxjs/toolkit';

export const getFavorites = (state: Pick<State, NameSpace.Favorites>) =>
  state[NameSpace.Favorites].favorites;
export const getFavoritesStatus = (state: Pick<State, NameSpace.Favorites>) =>
  state[NameSpace.Favorites].favoritesStatus;

export const selectFavoriteIds = createSelector(
  [getFavorites],
  (favorites) => favorites.map(({id}) => id)
);

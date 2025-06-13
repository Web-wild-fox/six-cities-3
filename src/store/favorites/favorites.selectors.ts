import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createSelector} from '@reduxjs/toolkit';

export const getFavorites = (state: State) => state[NameSpace.Favorites].favorites;
export const getFavoritesStatus = (state: State) => state[NameSpace.Favorites].favoritesStatus;

export const selectFavoriteIds = createSelector(
  [getFavorites],
  (favorites) => favorites.map(({id}) => id)
);

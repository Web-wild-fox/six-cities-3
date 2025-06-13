import {createSlice} from '@reduxjs/toolkit';
import {fetchFavoritesAction, postFavoriteAction} from './favorites.api';
import {OfferListItem} from '@/types/offers';
import {NameSpace, RequestStatus} from '@/constants';

interface InitialStateProps {
  favorites: OfferListItem[];
  favoritesStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  favorites: [],
  favoritesStatus: RequestStatus.Idle,
};

export const favoritesLoadAction = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.favoritesStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesStatus = RequestStatus.Succeeded;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favoritesStatus = RequestStatus.Failed;
      })
      .addCase(postFavoriteAction.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = (
            state.favorites
              .filter((favorite) => favorite.id !== action.payload.id)
          );
        }
      });
  }
});

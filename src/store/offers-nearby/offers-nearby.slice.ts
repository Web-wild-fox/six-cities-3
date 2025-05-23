import {createSlice} from '@reduxjs/toolkit';
import {fetchOffersNearbyAction} from './offers-nearby.api';
import {OfferListItem} from '@/types/offers';
import {NameSpace, RequestStatus} from '@/constants';

interface InitialStateProps {
  offersNearby: OfferListItem[];
  errorMessage: string | null;
  offersNearbyStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  offersNearby: [],
  errorMessage: null,
  offersNearbyStatus: RequestStatus.Idle,
};

export const offersNearbyLoadAction = createSlice({
  name: NameSpace.OffersNearby,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNearbyAction.pending, (state) => {
        state.offersNearbyStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.offersNearbyStatus = RequestStatus.Succeeded;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state, action) => {
        if (action.error.message) {
          state.errorMessage = action.error.message;
        }

        state.offersNearbyStatus = RequestStatus.Failed;
      });
  }
});

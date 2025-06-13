import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchFullOfferAction} from './full-offer.api';
import {FullOfferItem} from '@/types/offers';
import {NameSpace, RequestStatus} from '@/constants';

interface InitialStateProps {
  fullOffer: FullOfferItem | null;
  errorMessage: string | null;
  fullOfferStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  fullOffer: null,
  errorMessage: null,
  fullOfferStatus: RequestStatus.Idle,
};

export const fullOffersLoadAction = createSlice({
  name: NameSpace.FullOffer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFullOfferAction.pending, (state) => {
        state.fullOfferStatus = RequestStatus.Loading;
      })
      .addCase(fetchFullOfferAction.fulfilled, (state, action: PayloadAction<FullOfferItem>) => {
        state.fullOffer = action.payload;
        state.fullOfferStatus = RequestStatus.Succeeded;
      })
      .addCase(fetchFullOfferAction.rejected, (state, action) => {
        if (action.error.message) {
          state.errorMessage = action.error.message;
        }

        state.fullOfferStatus = RequestStatus.Failed;
      });
  }
});

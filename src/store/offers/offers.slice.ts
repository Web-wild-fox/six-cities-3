import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchOfferListAction} from './offers.api';
import {OfferListItem} from '@/types/offers';
import {NameSpace, RequestStatus} from '@/constants';

interface InitialStateProps {
  offers: OfferListItem[];
  errorMessage: string | null;
  offersStatus: RequestStatus;
}

const initialState: InitialStateProps = {
  offers: [],
  errorMessage: null,
  offersStatus: RequestStatus.Idle,
};

export const offersLoadAction = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferListAction.pending, (state) => {
        state.offersStatus = RequestStatus.Loading;
      })
      .addCase(fetchOfferListAction.fulfilled, (state, action: PayloadAction<OfferListItem[]>) => {
        state.offers = action.payload;
        state.offersStatus = RequestStatus.Succeeded;
      })
      .addCase(fetchOfferListAction.rejected, (state, action) => {
        if (action.error.message) {
          state.errorMessage = action.error.message;
        }

        state.offersStatus = RequestStatus.Failed;
      });
  }
});

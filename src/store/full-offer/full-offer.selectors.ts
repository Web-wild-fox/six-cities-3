import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils/utils';

export const getFullOffer = (state: Pick<State, NameSpace.FullOffer>) =>
  state[NameSpace.FullOffer].fullOffer;
export const getFullOfferError = (state: Pick<State, NameSpace.FullOffer>) =>
  state[NameSpace.FullOffer].errorMessage;
export const getFullOfferStatus = (state: Pick<State, NameSpace.FullOffer>) =>
  state[NameSpace.FullOffer].fullOfferStatus;

export const selectFullOfferStatus = createStatusSelector(getFullOfferStatus);

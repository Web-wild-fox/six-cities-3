import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils';

export const getFullOffer = (state: State) => state[NameSpace.FullOffer].fullOffer;
export const getFullOfferError = (state: State) => state[NameSpace.FullOffer].errorMessage;
export const getFullOfferStatus = (state: State) => state[NameSpace.FullOffer].fullOfferStatus;

export const selectFullOfferStatus = createStatusSelector(getFullOfferStatus);

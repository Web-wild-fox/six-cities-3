import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils';

export const getOffers = (state: State) => state[NameSpace.Offers].offers;
export const getOffersError = (state: State) => state[NameSpace.Offers].errorMessage;
export const getOffersStatus = (state: State) => state[NameSpace.Offers].offersStatus;

export const selectOffersStatus = createStatusSelector(getOffersStatus);

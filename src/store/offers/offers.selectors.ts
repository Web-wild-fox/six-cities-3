import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils/utils';

export const getOffers = (state: Pick<State, NameSpace.Offers>) =>
  state[NameSpace.Offers].offers;
export const getOffersError = (state: Pick<State, NameSpace.Offers>) =>
  state[NameSpace.Offers].errorMessage;
export const getOffersStatus = (state: Pick<State, NameSpace.Offers>) =>
  state[NameSpace.Offers].offersStatus;

export const selectOffersStatus = createStatusSelector(getOffersStatus);

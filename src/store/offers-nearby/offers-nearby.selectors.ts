import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils/utils';

export const getOffersNearby = (state: Pick<State, NameSpace.OffersNearby>) =>
  state[NameSpace.OffersNearby].offersNearby;
export const getOffersNearbyError = (state: Pick<State, NameSpace.OffersNearby>) =>
  state[NameSpace.OffersNearby].errorMessage;
export const getOffersNearbyStatus = (state: Pick<State, NameSpace.OffersNearby>) =>
  state[NameSpace.OffersNearby].offersNearbyStatus;

export const selectOffersNearbyStatus = createStatusSelector(getOffersNearbyStatus);

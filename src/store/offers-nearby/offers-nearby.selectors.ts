import {State} from '@/types/state';
import {NameSpace} from '@/constants';
import {createStatusSelector} from '@/utils';

export const getOffersNearby = (state: State) => state[NameSpace.OffersNearby].offersNearby;
export const getOffersNearbyError = (state: State) => state[NameSpace.OffersNearby].errorMessage;
export const getOffersNearbyStatus = (state: State) => state[NameSpace.OffersNearby].offersNearbyStatus;

export const selectOffersNearbyStatus = createStatusSelector(getOffersNearbyStatus);

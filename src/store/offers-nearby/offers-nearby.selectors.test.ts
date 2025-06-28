import {State} from '@/types/state';
import {NameSpace, RequestStatus} from '@/constants';
import {makeMockOffersNearby} from '@/utils/mocks';
import {
  getOffersNearby,
  getOffersNearbyError,
  getOffersNearbyStatus
} from './offers-nearby.selectors';

describe('Offers nearby selectors', () => {
  const mockOffersNearby = makeMockOffersNearby();

  let expectedState: Pick<State, NameSpace.OffersNearby>;

  beforeEach(() => {
    expectedState = {
      [NameSpace.OffersNearby]:{
        offersNearby: [mockOffersNearby],
        errorMessage: null,
        offersNearbyStatus: RequestStatus.Succeeded,
      }
    };
  });

  it('getOffersNearby: should return offers nearby', () => {
    const {offersNearby} = expectedState[NameSpace.OffersNearby];
    const result = getOffersNearby(expectedState);

    expect(result).toBe(offersNearby);
  });

  it('getOffersNearbyStatus: should return offers nearby status', () => {
    const {offersNearbyStatus} = expectedState[NameSpace.OffersNearby];
    const result = getOffersNearbyStatus(expectedState);

    expect(result).toBe(offersNearbyStatus);
  });

  it('getOffersNearbyError: should return offers nearby error message', () => {
    const {errorMessage} = expectedState[NameSpace.OffersNearby];
    const result = getOffersNearbyError(expectedState);

    expect(result).toBe(errorMessage);
  });
});

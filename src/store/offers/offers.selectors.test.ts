import {State} from '@/types/state';
import {NameSpace, RequestStatus} from '@/constants';
import {makeMockOffers} from '@/utils/mocks';
import {
  getOffers,
  getOffersError,
  getOffersStatus
} from './offers.selectors';

describe('Offers selectors', () => {
  const mockOffers = makeMockOffers();

  let expectedState: Pick<State, NameSpace.Offers>;

  beforeEach(() => {
    expectedState = {
      [NameSpace.Offers]:{
        offers: [mockOffers],
        errorMessage: null,
        offersStatus: RequestStatus.Succeeded,
      }
    };
  });

  it('getOffers: should return offers', () => {
    const {offers} = expectedState[NameSpace.Offers];
    const result = getOffers(expectedState);

    expect(result).toBe(offers);
  });

  it('getOffersStatus: should return offers status', () => {
    const {offersStatus} = expectedState[NameSpace.Offers];
    const result = getOffersStatus(expectedState);

    expect(result).toBe(offersStatus);
  });

  it('getOffersError: should return offers error message', () => {
    const {errorMessage} = expectedState[NameSpace.Offers];
    const result = getOffersError(expectedState);

    expect(result).toBe(errorMessage);
  });
});

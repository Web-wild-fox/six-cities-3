import {State} from '@/types/state';
import {NameSpace, RequestStatus} from '@/constants';
import {makeMockFullOffer} from '@/utils/mocks';
import {
  getFullOffer,
  getFullOfferError,
  getFullOfferStatus
} from './full-offer.selectors';

describe('Full offers selectors', () => {
  const mockFullOffer = makeMockFullOffer();

  let expectedState: Pick<State, NameSpace.FullOffer>;

  beforeEach(() => {
    expectedState = {
      [NameSpace.FullOffer]: {
        fullOffer: mockFullOffer,
        errorMessage: null,
        fullOfferStatus: RequestStatus.Succeeded,
      }
    };
  });

  it('getFullOffer: should return full offer', () => {
    const {fullOffer} = expectedState[NameSpace.FullOffer];
    const result = getFullOffer(expectedState);

    expect(result).toBe(fullOffer);
  });

  it('getFullOfferStatus: should return full offer status', () => {
    const {fullOfferStatus} = expectedState[NameSpace.FullOffer];
    const result = getFullOfferStatus(expectedState);

    expect(result).toBe(fullOfferStatus);
  });

  it('getFullOfferError: should return full offer error message', () => {
    const {errorMessage} = expectedState[NameSpace.FullOffer];
    const result = getFullOfferError(expectedState);

    expect(result).toBe(errorMessage);
  });
});

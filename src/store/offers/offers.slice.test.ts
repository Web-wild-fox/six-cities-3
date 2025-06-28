import {RequestStatus} from '@/constants';
import {makeMockOffers} from '@/utils/mocks';
import {offersLoadAction} from './offers.slice';
import {fetchOfferListAction} from './offers.api';

describe('Offers slice', () => {
  const emptyAction = {type: 'UNKNOWN'};

  let expectedState: ReturnType<typeof offersLoadAction.reducer>;

  beforeEach(() => {
    expectedState = {
      offers: [],
      errorMessage: null,
      offersStatus: RequestStatus.Idle,
    };
  });

  describe('State', () => {
    it('should return initial state with emptyAction', () => {
      const result = offersLoadAction.reducer(
        expectedState,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });

    it('should return default state with emptyAction and undefined', () => {
      const result = offersLoadAction.reducer(
        undefined,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOfferListAction', () => {
    it('should set "offersStatus" to "Loading" with fetchOfferListAction.pending', () => {
      const result = offersLoadAction.reducer(
        expectedState,
        fetchOfferListAction.pending
      );

      expect(result.offersStatus).toEqual(RequestStatus.Loading);
    });

    it('should set "offerStatus" to "Succeeded" and "offer" to payload with fetchOfferListAction.fulfilled', () => {
      const mockOffer = makeMockOffers();

      const result = offersLoadAction.reducer(
        expectedState,
        fetchOfferListAction.fulfilled(
          [mockOffer],
          '',
        )
      );

      expect(result.offers).toEqual([mockOffer]);
      expect(result.offersStatus).toEqual(RequestStatus.Succeeded);
    });

    it('should set "offerStatus" to "Failed" and "errorMessage" to "Error message" with fetchOfferListAction.rejected', () => {
      const errorMessage = 'Error message';

      const result = offersLoadAction.reducer(
        expectedState,
        fetchOfferListAction.rejected(
          new Error(errorMessage),
          '',
        )
      );

      expect(result.errorMessage).toEqual(errorMessage);
      expect(result.offersStatus).toEqual(RequestStatus.Failed);
    });
  });
});

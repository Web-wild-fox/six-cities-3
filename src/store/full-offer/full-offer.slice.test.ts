import {RequestStatus} from '@/constants';
import {makeMockFullOffer} from '@/utils/mocks';
import {fullOffersLoadAction} from './full-offer.slice';
import {fetchFullOfferAction} from './full-offer.api';

describe('Full offer slice', () => {
  const emptyAction = {type: 'UNKNOWN'};

  let expectedState: ReturnType<typeof fullOffersLoadAction.reducer>;

  beforeEach(() => {
    expectedState = {
      fullOffer: null,
      errorMessage: null,
      fullOfferStatus: RequestStatus.Idle,
    };
  });

  describe('State', () => {
    it('should return initial state with emptyAction', () => {
      const result = fullOffersLoadAction.reducer(
        expectedState,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });

    it('should return default state with emptyAction and undefined', () => {
      const result = fullOffersLoadAction.reducer(
        undefined,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFullOfferAction', () => {
    it('should set "fullOfferStatus" to "Loading" with fetchFullOfferAction.pending', () => {
      const result = fullOffersLoadAction.reducer(
        expectedState,
        fetchFullOfferAction.pending
      );

      expect(result.fullOfferStatus).toEqual(RequestStatus.Loading);
    });

    it('should set "fullOfferStatus" to "Succeeded" and "fullOffer" to payload with fetchFullOfferAction.fulfilled', () => {
      const mockFullOffer = makeMockFullOffer();

      const result = fullOffersLoadAction.reducer(
        expectedState,
        fetchFullOfferAction.fulfilled(
          mockFullOffer,
          '',
          'id',

        )
      );

      expect(result.fullOffer).toEqual(mockFullOffer);
      expect(result.fullOfferStatus).toEqual(RequestStatus.Succeeded);
    });

    it('should set "fullOfferStatus" to "Failed" and "errorMessage" to "Error message" with fetchFullOfferAction.rejected', () => {
      const errorMessage = 'Error message';

      const result = fullOffersLoadAction.reducer(
        expectedState,
        fetchFullOfferAction.rejected(
          new Error(errorMessage),
          '',
          '',
        )
      );

      expect(result.errorMessage).toEqual(errorMessage);
      expect(result.fullOfferStatus).toEqual(RequestStatus.Failed);
    });
  });
});

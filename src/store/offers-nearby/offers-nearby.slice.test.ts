import {RequestStatus} from '@/constants';
import {makeMockOffersNearby} from '@/utils/mocks';
import {offersNearbyLoadAction} from './offers-nearby.slice';
import {fetchOffersNearbyAction} from './offers-nearby.api';

describe('Offers slice', () => {
  const emptyAction = {type: 'UNKNOWN'};

  let expectedState: ReturnType<typeof offersNearbyLoadAction.reducer>;

  beforeEach(() => {
    expectedState = {
      offersNearby: [],
      errorMessage: null,
      offersNearbyStatus: RequestStatus.Idle,
    };
  });

  describe('State', () => {
    it('should return initial state with emptyAction', () => {
      const result = offersNearbyLoadAction.reducer(
        expectedState,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });

    it('should return default state with emptyAction and undefined', () => {
      const result = offersNearbyLoadAction.reducer(
        undefined,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should set "offersNearbyStatus" to "Loading" with fetchOffersNearbyAction.pending', () => {
      const result = offersNearbyLoadAction.reducer(
        expectedState,
        fetchOffersNearbyAction.pending
      );

      expect(result.offersNearbyStatus).toEqual(RequestStatus.Loading);
    });

    it('should set "offersNearbyStatus" to "Succeeded" and "offersNearby" to payload with fetchOffersNearbyAction.fulfilled', () => {
      const mockOffersNearby = makeMockOffersNearby();

      const result = offersNearbyLoadAction.reducer(
        expectedState,
        fetchOffersNearbyAction.fulfilled(
          [mockOffersNearby],
          '',
          ''
        )
      );

      expect(result.offersNearby).toEqual([mockOffersNearby]);
      expect(result.offersNearbyStatus).toEqual(RequestStatus.Succeeded);
    });

    it('should set "offersNearbyStatus" to "Failed" and "errorMessage" to "Error message" with fetchOffersNearbyAction.rejected', () => {
      const errorMessage = 'Error message';

      const result = offersNearbyLoadAction.reducer(
        expectedState,
        fetchOffersNearbyAction.rejected(
          new Error(errorMessage),
          '',
          ''
        )
      );

      expect(result.errorMessage).toEqual(errorMessage);
      expect(result.offersNearbyStatus).toEqual(RequestStatus.Failed);
    });
  });
});

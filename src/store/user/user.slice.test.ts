import {
  makeMockAuthData,
  makeMockUserData
} from '@/utils/mocks';
import {
  checkAuthAction,
  loginAction,
  logoutAction,
} from './user.api';
import {
  userAction,
  changeCity,
  changeSorting,
  setOfferId,
} from './user.slice';
import {
  SortingType,
  RequestStatus,
  AuthorizationStatus,
  DEFAULT_CITY,
  DEFAULT_SORTING_TYPE,
} from '@/constants';

describe('Users slice', () => {
  const emptyAction = {type: 'UNKNOWN'};

  let expectedState: ReturnType<typeof userAction.reducer>;

  beforeEach(() => {
    expectedState = {
      id: undefined,
      city: DEFAULT_CITY,
      sorting: DEFAULT_SORTING_TYPE,
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      LoginStatus: RequestStatus.Idle,
    };
  });

  describe('State', () => {
    it('should return initial state with empty action', () => {
      const result = userAction.reducer(
        expectedState,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });

    it('should return default state with empty action and undefined', () => {
      const result = userAction.reducer(
        undefined,
        emptyAction
      );

      expect(result).toEqual(expectedState);
    });
  });

  describe('checkAuthAction', () => {
    it('should return "authorizationStatus" to "Auth" and "userData" to payload with checkAuthAction.fullfilled', () => {
      const mockUserData = makeMockUserData();

      const result = userAction.reducer(
        expectedState,
        checkAuthAction.fulfilled(
          mockUserData,
          '',
        ),
      );

      expect(result.userData).toEqual(mockUserData);
      expect(result.authorizationStatus).toEqual(AuthorizationStatus.Auth);
    });

    it('should return "authorizationStatus" to "NoAuth" with checkAuthAction.rejected', () => {
      const result = userAction.reducer(
        expectedState,
        checkAuthAction.rejected
      );

      expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    });
  });

  describe('loginAction', () => {
    it('should set "LoginStatus" to "Loading" with loginAction.pending', () => {
      const result = userAction.reducer(
        expectedState,
        loginAction.pending
      );

      expect(result.LoginStatus).toEqual(RequestStatus.Loading);
    });

    it('should set "LoginStatus" to "Success" and "userData" to payload, and "authorizationStatus" to "Auth" with loginAction.fulfilled', () => {
      const mockUserData = makeMockUserData();
      const mockAuthData = makeMockAuthData();

      const result = userAction.reducer(
        expectedState,
        loginAction.fulfilled(
          mockUserData,
          '',
          mockAuthData,
        )
      );

      expect(result.userData).toEqual(mockUserData);
      expect(result.LoginStatus).toEqual(RequestStatus.Succeeded);
      expect(result.authorizationStatus).toEqual(AuthorizationStatus.Auth);
    });

    it('should set "LoginStatus" to "Failed" and "authorizationStatus" to "NoAuth" with loginAction.rejected', () => {
      const result = userAction.reducer(
        expectedState,
        loginAction.rejected
      );

      expect(result.LoginStatus).toEqual(RequestStatus.Failed);
      expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    });
  });

  describe('logoutAction', () => {
    it('should set "authorizationStatus" to "NoAuth" with logoutAction.fulfilled', () => {
      const result = userAction.reducer(
        expectedState,
        logoutAction.fulfilled
      );

      expect(result.authorizationStatus).toEqual(AuthorizationStatus.NoAuth);
    });
  });

  it('changeCity: should return state with new city', () => {
    const newCity = 'New City';

    const result = userAction.reducer(
      expectedState,
      changeCity(newCity)
    );

    expect(result.city).toEqual(newCity);
  });

  it('changeSorting: should return state with new sorting type', () => {
    const newSortingType = SortingType.Rating;

    const result = userAction.reducer(
      expectedState,
      changeSorting(newSortingType)
    );

    expect(result.sorting).toEqual(newSortingType);
  });

  it('setOfferId: should return state with new offer id', () => {
    const newOfferId = 'New id';

    const result = userAction.reducer(
      expectedState,
      setOfferId(newOfferId)
    );

    expect(result.id).toEqual(newOfferId);
  });
});

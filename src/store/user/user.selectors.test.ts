import {State} from '@/types/state';
import {
  AuthorizationStatus,
  NameSpace,
  RequestStatus,
  SortingType
} from '@/constants';
import {makeMockUserData} from '@/utils/mocks';
import {
  getOfferId,
  getCurrentCity,
  getCurrentSorting,
  getIsAuthStatus,
  getUserData,
  getLoginStatus,
} from './user.selectors';

describe('User selectors', () => {
  const mockUserData = makeMockUserData();

  let expectedState: Pick<State, NameSpace.User>;

  beforeEach(() => {
    expectedState = {
      [NameSpace.User]: {
        id: 'id',
        city: 'City',
        sorting: SortingType.Popular,
        authorizationStatus: AuthorizationStatus.Auth,
        userData: mockUserData,
        LoginStatus: RequestStatus.Succeeded,
      }
    };
  });

  it('getOfferId: should return offer id', () => {
    const {id} = expectedState[NameSpace.User];
    const result = getOfferId(expectedState);

    expect(result).toBe(id);
  });

  it('getCurrentCity: should return city', () => {
    const {city} = expectedState[NameSpace.User];
    const result = getCurrentCity(expectedState);

    expect(result).toBe(city);
  });

  it('getCurrentSorting: should return sorting', () => {
    const {sorting} = expectedState[NameSpace.User];
    const result = getCurrentSorting(expectedState);

    expect(result).toBe(sorting);
  });

  it('getIsAuthStatus: should return auth status', () => {
    const {authorizationStatus} = expectedState[NameSpace.User];
    const isAuth = authorizationStatus === String(AuthorizationStatus.Auth);
    const result = getIsAuthStatus(expectedState);

    expect(result).toBe(isAuth);
  });

  it('getUserData: should return user data', () => {
    const {userData} = expectedState[NameSpace.User];
    const result = getUserData(expectedState);

    expect(result).toBe(userData);
  });

  it('getLoginStatus: should return login status', () => {
    const {LoginStatus} = expectedState[NameSpace.User];
    const result = getLoginStatus(expectedState);

    expect(result).toBe(LoginStatus);
  });
});

import type { GeolocationError } from '@react-native-community/geolocation';

import { getLocationErrorStatus } from './location.utils';

function createError(code: number): GeolocationError {
  return {
    code,
    message: 'Location error',
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3,
  };
}

describe('getLocationErrorStatus', () => {
  it.each([
    [1, 'denied'],
    [2, 'unavailable'],
    [3, 'timeout'],
    [4, 'error'],
  ] as const)('maps error code %s to %s', (code, expectedStatus) => {
    expect(getLocationErrorStatus(createError(code))).toBe(expectedStatus);
  });
});

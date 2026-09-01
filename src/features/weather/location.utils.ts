import type { GeolocationError } from '@react-native-community/geolocation';

import type { UserLocationStatus } from './types/location.types';

export function getLocationErrorStatus(
  error: GeolocationError,
): UserLocationStatus {
  if (error.code === error.PERMISSION_DENIED) {
    return 'denied';
  }

  if (error.code === error.POSITION_UNAVAILABLE) {
    return 'unavailable';
  }

  if (error.code === error.TIMEOUT) {
    return 'timeout';
  }

  return 'error';
}

import Geolocation, {
  type GeolocationError,
  type GeolocationResponse,
} from '@react-native-community/geolocation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import { getLocationErrorStatus } from '../location.utils';
import type {
  UserCoordinates,
  UserLocationStatus,
} from '../types/location.types';

Geolocation.setRNConfiguration({
  authorizationLevel: 'whenInUse',
  locationProvider: 'auto',
  skipPermissionRequests: false,
});

async function requestAndroidLocationPermission() {
  if (Platform.OS !== 'android') {
    return 'granted' as const;
  }

  const finePermission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
  const coarsePermission =
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
  const results = await PermissionsAndroid.requestMultiple([
    coarsePermission,
    finePermission,
  ]);

  if (
    results[finePermission] === PermissionsAndroid.RESULTS.GRANTED ||
    results[coarsePermission] === PermissionsAndroid.RESULTS.GRANTED
  ) {
    return 'granted' as const;
  }

  if (
    results[finePermission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
    results[coarsePermission] === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
  ) {
    return 'blocked' as const;
  }

  return 'denied' as const;
}

function getCurrentPosition() {
  return new Promise<GeolocationResponse>((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 5 * 60 * 1000,
      timeout: 15_000,
    });
  });
}

interface UserLocationState {
  coordinates: UserCoordinates | null;
  status: UserLocationStatus;
}

const INITIAL_STATE: UserLocationState = {
  coordinates: null,
  status: 'idle',
};

export function useUserLocation() {
  const [state, setState] = useState(INITIAL_STATE);
  const isMounted = useRef(false);
  const requestId = useRef(0);

  const requestLocation = useCallback(async () => {
    const currentRequestId = requestId.current + 1;
    requestId.current = currentRequestId;
    setState({ coordinates: null, status: 'requesting' });

    try {
      const permissionStatus = await requestAndroidLocationPermission();

      if (permissionStatus !== 'granted') {
        if (isMounted.current && requestId.current === currentRequestId) {
          setState({ coordinates: null, status: permissionStatus });
        }
        return;
      }

      const position = await getCurrentPosition();

      if (isMounted.current && requestId.current === currentRequestId) {
        setState({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          status: 'success',
        });
      }
    } catch (error) {
      if (!isMounted.current || requestId.current !== currentRequestId) {
        return;
      }

      const status =
        typeof error === 'object' && error !== null && 'code' in error
          ? getLocationErrorStatus(error as GeolocationError)
          : 'error';

      setState({ coordinates: null, status });
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    requestLocation();

    return () => {
      isMounted.current = false;
      requestId.current += 1;
    };
  }, [requestLocation]);

  return {
    ...state,
    requestLocation,
  };
}

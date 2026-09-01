export type UserLocationStatus =
  | 'idle'
  | 'requesting'
  | 'success'
  | 'denied'
  | 'blocked'
  | 'unavailable'
  | 'timeout'
  | 'error';

export interface UserCoordinates {
  latitude: number;
  longitude: number;
}

import { useQuery } from '@tanstack/react-query';

import { getCurrentWeather } from '../../../api/weatherApi';
import type { WeatherLocation } from '../types/weather.types';

export function useCurrentWeather(location: WeatherLocation | null) {
  return useQuery({
    queryKey: ['weather', 'current', location],
    queryFn: () => {
      if (!location) {
        throw new Error('A weather location is required.');
      }

      return getCurrentWeather(location);
    },
    enabled: location !== null,
  });
}

import { useQuery } from '@tanstack/react-query';

import { getForecast } from '../../../api/weatherApi';
import type { WeatherLocation } from '../types/weather.types';

export function useForecast(location: WeatherLocation | null) {
  return useQuery({
    queryKey: ['weather', 'forecast', location],
    queryFn: () => {
      if (!location) {
        throw new Error('A weather location is required.');
      }

      return getForecast(location);
    },
    enabled: location !== null,
  });
}

import { apiClient } from './apiClient';
import type {
  CurrentWeatherResponse,
  ForecastResponse,
  WeatherLocation,
} from '../features/weather/types/weather.types';

type LocationParams =
  | { q: string }
  | {
      lat: number;
      lon: number;
    };

function getLocationParams(location: WeatherLocation): LocationParams {
  if ('city' in location) {
    return { q: location.city.trim() };
  }

  return {
    lat: location.latitude,
    lon: location.longitude,
  };
}

export async function getCurrentWeather(
  location: WeatherLocation,
): Promise<CurrentWeatherResponse> {
  const response = await apiClient.get<CurrentWeatherResponse>('weather', {
    params: getLocationParams(location),
  });

  return response.data;
}

export async function getForecast(
  location: WeatherLocation,
): Promise<ForecastResponse> {
  const response = await apiClient.get<ForecastResponse>('forecast', {
    params: getLocationParams(location),
  });

  return response.data;
}

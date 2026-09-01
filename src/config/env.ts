import Config from 'react-native-config';

const DEFAULT_OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const env = {
  openWeatherApiKey: Config.OPENWEATHER_API_KEY?.trim() ?? '',
  openWeatherBaseUrl:
    Config.OPENWEATHER_BASE_URL?.trim() || DEFAULT_OPENWEATHER_BASE_URL,
} as const;

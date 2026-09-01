export type WeatherLocation =
  | { city: string }
  | { latitude: number; longitude: number };

export interface WeatherCoordinates {
  lat: number;
  lon: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMeasurements {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface CurrentWeatherResponse {
  coord: WeatherCoordinates;
  weather: WeatherCondition[];
  main: WeatherMeasurements;
  wind: WeatherWind;
  dt: number;
  timezone: number;
  name: string;
  sys: {
    country: string;
  };
}

export interface ForecastItem {
  dt: number;
  main: WeatherMeasurements;
  weather: WeatherCondition[];
  wind: WeatherWind;
  dt_txt: string;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    id: number;
    name: string;
    coord: WeatherCoordinates;
    country: string;
    timezone: number;
  };
}

export interface ThreeHourForecast {
  timestamp: number;
  timeLabel: string;
  temperature: number;
  icon: string;
  description: string;
  humidity: number;
  windSpeed: number;
}

export interface ForecastDay {
  date: string;
  dateLabel: string;
  averageTemperature: number;
  icon: string;
  description: string;
  entries: ThreeHourForecast[];
}

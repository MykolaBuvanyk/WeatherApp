import axios from 'axios';

import { env } from '../config/env';

export const apiClient = axios.create({
  baseURL: env.openWeatherBaseUrl,
  timeout: 10_000,
  params: {
    appid: env.openWeatherApiKey,
    units: 'metric',
    lang: 'en',
  },
});

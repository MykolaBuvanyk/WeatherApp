import type { ForecastItem, ForecastResponse } from './types/weather.types';
import { mapForecastToDays } from './weather.mapper';

function createForecastItem(
  date: string,
  temperature: number,
  icon = '01d',
): ForecastItem {
  return {
    dt: Math.floor(new Date(date).getTime() / 1000),
    dt_txt: date,
    main: {
      feels_like: temperature,
      humidity: 50,
      pressure: 1000,
      temp: temperature,
      temp_max: temperature,
      temp_min: temperature,
    },
    weather: [
      {
        description: 'clear sky',
        icon,
        id: 800,
        main: 'Clear',
      },
    ],
    wind: {
      deg: 180,
      speed: 2,
    },
  };
}

function createForecast(): ForecastResponse {
  const list: ForecastItem[] = [];

  for (let day = 1; day <= 6; day += 1) {
    const date = `2026-09-${String(day).padStart(2, '0')}`;

    list.push(
      createForecastItem(`${date}T09:00:00Z`, 10),
      createForecastItem(`${date}T12:00:00Z`, 20, '02d'),
      createForecastItem(`${date}T15:00:00Z`, 30),
    );
  }

  return {
    city: {
      coord: { lat: 50.45, lon: 30.52 },
      country: 'UA',
      id: 703448,
      name: 'Kyiv',
      timezone: 0,
    },
    cnt: list.length,
    cod: '200',
    list,
    message: 0,
  };
}

describe('mapForecastToDays', () => {
  it('returns five selectable days with their three-hour entries', () => {
    const result = mapForecastToDays(createForecast());

    expect(result).toHaveLength(5);
    expect(result[0]).toMatchObject({
      averageTemperature: 20,
      date: '2026-09-01',
      icon: '02d',
    });
    expect(result[0].entries.map(entry => entry.timeLabel)).toEqual([
      '9:00 AM',
      '12:00 PM',
      '3:00 PM',
    ]);
  });
});

import type {
  ForecastDay,
  ForecastItem,
  ForecastResponse,
  ThreeHourForecast,
} from './types/weather.types';

const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC',
  weekday: 'short',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  hour12: true,
  minute: '2-digit',
  timeZone: 'UTC',
});

function getLocalDate(item: ForecastItem, timezone: number) {
  return new Date((item.dt + timezone) * 1000);
}

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function findForecastClosestToNoon(items: ForecastItem[], timezone: number) {
  let closestItem = items[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const item of items) {
    const localDate = getLocalDate(item, timezone);
    const minutesFromMidnight =
      localDate.getUTCHours() * 60 + localDate.getUTCMinutes();
    const distanceFromNoon = Math.abs(minutesFromMidnight - 12 * 60);

    if (distanceFromNoon < closestDistance) {
      closestItem = item;
      closestDistance = distanceFromNoon;
    }
  }

  return closestItem;
}

function mapForecastEntry(
  item: ForecastItem,
  timezone: number,
): ThreeHourForecast {
  const localDate = getLocalDate(item, timezone);
  const condition = item.weather[0];

  return {
    timestamp: item.dt,
    timeLabel: TIME_FORMATTER.format(localDate),
    temperature: Math.round(item.main.temp),
    icon: condition?.icon ?? '',
    description: condition?.description ?? 'Weather unavailable',
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
  };
}

export function mapForecastToDays(forecast: ForecastResponse): ForecastDay[] {
  const groupedByDate = new Map<string, ForecastItem[]>();

  for (const item of forecast.list) {
    const date = getLocalDate(item, forecast.city.timezone);
    const dateKey = getDateKey(date);
    const group = groupedByDate.get(dateKey);

    if (group) {
      group.push(item);
    } else {
      groupedByDate.set(dateKey, [item]);
    }
  }

  return Array.from(groupedByDate.entries())
    .slice(0, 5)
    .map(([dateKey, items]) => {
      const representative = findForecastClosestToNoon(
        items,
        forecast.city.timezone,
      );
      const representativeDate = getLocalDate(
        representative,
        forecast.city.timezone,
      );
      const condition = representative.weather[0];
      const temperatureSum = items.reduce(
        (sum, item) => sum + item.main.temp,
        0,
      );

      return {
        date: dateKey,
        dateLabel: DATE_FORMATTER.format(representativeDate),
        averageTemperature: Math.round(temperatureSum / items.length),
        icon: condition?.icon ?? '',
        description: condition?.description ?? 'Weather unavailable',
        entries: items.map(item =>
          mapForecastEntry(item, forecast.city.timezone),
        ),
      };
    });
}

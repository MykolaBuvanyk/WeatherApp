import type { StaticScreenProps } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

import { ForecastDaySelector } from '../../features/weather/components/ForecastDaySelector/ForecastDaySelector';
import { ThreeHourForecastList } from '../../features/weather/components/ThreeHourForecastList/ThreeHourForecastList';
import { useForecast } from '../../features/weather/hooks/useForecast';
import { mapForecastToDays } from '../../features/weather/weather.mapper';
import { styles } from './ForecastScreen.styles';

type ForecastScreenProps = StaticScreenProps<{
  cityName: string;
  latitude: number;
  longitude: number;
}>;

export function ForecastScreen({ route }: ForecastScreenProps) {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const forecast = useForecast({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  });
  const days = useMemo(
    () => (forecast.data ? mapForecastToDays(forecast.data) : []),
    [forecast.data],
  );
  const selectedDay = useMemo(
    () => days.find(day => day.date === selectedDate) ?? days[0],
    [days, selectedDate],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: theme.colors.background }}
    >
      <Text variant="headlineSmall">{route.params.cityName}</Text>
      {forecast.isFetching ? (
        <ActivityIndicator accessibilityLabel="Loading forecast" size="large" />
      ) : null}
      {forecast.isError ? (
        <Text style={styles.error} variant="bodyLarge">
          Unable to load the 5-day forecast. Try again.
        </Text>
      ) : null}
      {days.length > 0 && selectedDay ? (
        <>
          <ForecastDaySelector
            days={days}
            onSelect={setSelectedDate}
            selectedDate={selectedDay.date}
          />
          <ThreeHourForecastList day={selectedDay} />
        </>
      ) : null}
    </ScrollView>
  );
}

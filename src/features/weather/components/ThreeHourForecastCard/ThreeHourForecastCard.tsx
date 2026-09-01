import { Image, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import type { ThreeHourForecast } from '../../types/weather.types';
import { styles } from './ThreeHourForecastCard.styles';

interface ThreeHourForecastCardProps {
  forecast: ThreeHourForecast;
}

export function ThreeHourForecastCard({
  forecast,
}: ThreeHourForecastCardProps) {
  return (
    <Surface elevation={1} style={styles.card}>
      <Text style={styles.time} variant="titleMedium">
        {forecast.timeLabel}
      </Text>
      {forecast.icon ? (
        <Image
          accessibilityLabel={forecast.description}
          source={{
            uri: `https://openweathermap.org/img/wn/${forecast.icon}@2x.png`,
          }}
          style={styles.icon}
        />
      ) : null}
      <View style={styles.details}>
        <Text style={styles.description} variant="titleMedium">
          {forecast.description}
        </Text>
        <Text variant="bodyMedium">Humidity: {forecast.humidity}%</Text>
        <Text variant="bodyMedium">Wind: {forecast.windSpeed} m/s</Text>
      </View>
      <Text variant="headlineSmall">{forecast.temperature}°C</Text>
    </Surface>
  );
}

import { Image, View } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';

import type { CurrentWeatherResponse } from '../../types/weather.types';
import { styles } from './CurrentWeatherCard.styles';

interface CurrentWeatherCardProps {
  weather: CurrentWeatherResponse;
  onPress: () => void;
}

export function CurrentWeatherCard({
  weather,
  onPress,
}: CurrentWeatherCardProps) {
  const condition = weather.weather[0];

  return (
    <Surface elevation={2} style={styles.card}>
      <TouchableRipple
        accessibilityLabel={`View 5-day forecast for ${weather.name}`}
        accessibilityRole="button"
        onPress={onPress}
      >
        <View style={styles.content}>
          <Text variant="headlineSmall">
            {weather.name}, {weather.sys.country}
          </Text>
          <View style={styles.summary}>
            {condition ? (
              <Image
                accessibilityLabel={condition.description}
                source={{
                  uri: `https://openweathermap.org/img/wn/${condition.icon}@2x.png`,
                }}
                style={styles.icon}
              />
            ) : null}
            <Text variant="displaySmall">
              {Math.round(weather.main.temp)}°C
            </Text>
          </View>
          {condition ? (
            <Text style={styles.description} variant="titleMedium">
              {condition.description}
            </Text>
          ) : null}
          <Text variant="bodyLarge">Humidity: {weather.main.humidity}%</Text>
          <Text variant="bodyLarge">Wind: {weather.wind.speed} m/s</Text>
          <Text style={styles.hint} variant="labelLarge">
            Tap to view 5-day forecast
          </Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
}

import { Image, View } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';

import type { ForecastDay } from '../../types/weather.types';
import { styles } from './ForecastDayCard.styles';

interface ForecastDayCardProps {
  day: ForecastDay;
  selected: boolean;
  onPress: () => void;
}

export function ForecastDayCard({
  day,
  selected,
  onPress,
}: ForecastDayCardProps) {
  return (
    <Surface
      elevation={selected ? 3 : 1}
      style={[styles.card, selected ? styles.selectedCard : null]}
    >
      <TouchableRipple
        accessibilityLabel={`Select ${day.dateLabel}`}
        accessibilityRole="button"
        onPress={onPress}
        style={styles.ripple}
      >
        <View style={styles.content}>
          <Text variant="titleSmall">{day.dateLabel}</Text>
          {day.icon ? (
            <Image
              accessibilityLabel={day.description}
              source={{
                uri: `https://openweathermap.org/img/wn/${day.icon}@2x.png`,
              }}
              style={styles.icon}
            />
          ) : null}
          <Text variant="titleLarge">{day.averageTemperature}°C</Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
}

import { memo, useCallback, useMemo } from 'react';
import { Image, View } from 'react-native';
import { Surface, Text, TouchableRipple } from 'react-native-paper';

import type { ForecastDay } from '../../types/weather.types';
import { styles } from './ForecastDayCard.styles';

interface ForecastDayCardProps {
  day: ForecastDay;
  selected: boolean;
  onSelect: (date: string) => void;
}

function ForecastDayCardComponent({
  day,
  selected,
  onSelect,
}: ForecastDayCardProps) {
  const iconSource = useMemo(
    () => ({
      uri: `https://openweathermap.org/img/wn/${day.icon}@2x.png`,
    }),
    [day.icon],
  );
  const handlePress = useCallback(() => {
    onSelect(day.date);
  }, [day.date, onSelect]);

  return (
    <Surface
      elevation={selected ? 3 : 1}
      style={[styles.card, selected ? styles.selectedCard : null]}
    >
      <TouchableRipple
        accessibilityLabel={`Select ${day.dateLabel}`}
        accessibilityRole="button"
        onPress={handlePress}
        style={styles.ripple}
      >
        <View style={styles.content}>
          <Text variant="titleSmall">{day.dateLabel}</Text>
          {day.icon ? (
            <Image
              accessibilityLabel={day.description}
              fadeDuration={0}
              source={iconSource}
              style={styles.icon}
            />
          ) : null}
          <Text variant="titleLarge">{day.averageTemperature}°C</Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
}

export const ForecastDayCard = memo(ForecastDayCardComponent);

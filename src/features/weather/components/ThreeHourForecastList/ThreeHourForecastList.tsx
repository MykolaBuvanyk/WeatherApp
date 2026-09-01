import { View } from 'react-native';
import { Text } from 'react-native-paper';

import type { ForecastDay } from '../../types/weather.types';
import { ThreeHourForecastCard } from '../ThreeHourForecastCard/ThreeHourForecastCard';
import { styles } from './ThreeHourForecastList.styles';

interface ThreeHourForecastListProps {
  day: ForecastDay;
}

export function ThreeHourForecastList({ day }: ThreeHourForecastListProps) {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">3-Hour Forecast · {day.dateLabel}</Text>
      <View style={styles.list}>
        {day.entries.map(entry => (
          <ThreeHourForecastCard forecast={entry} key={entry.timestamp} />
        ))}
      </View>
    </View>
  );
}

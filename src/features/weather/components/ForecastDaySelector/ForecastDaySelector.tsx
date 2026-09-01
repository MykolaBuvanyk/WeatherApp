import { ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

import type { ForecastDay } from '../../types/weather.types';
import { ForecastDayCard } from '../ForecastDayCard/ForecastDayCard';
import { styles } from './ForecastDaySelector.styles';

interface ForecastDaySelectorProps {
  days: ForecastDay[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

export function ForecastDaySelector({
  days,
  selectedDate,
  onSelect,
}: ForecastDaySelectorProps) {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Select a day</Text>
      <ScrollView
        contentContainerStyle={styles.content}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {days.map(day => (
          <ForecastDayCard
            day={day}
            key={day.date}
            onPress={() => onSelect(day.date)}
            selected={day.date === selectedDate}
          />
        ))}
      </ScrollView>
    </View>
  );
}

import { Appbar, TextInput } from 'react-native-paper';

import { styles } from './WeatherSearch.styles';

interface WeatherSearchProps {
  value: string;
  loading: boolean;
  onChangeText: (value: string) => void;
  onSearch: () => void;
}

export function WeatherSearch({
  value,
  loading,
  onChangeText,
  onSearch,
}: WeatherSearchProps) {
  return (
    <Appbar.Header style={styles.header}>
      <TextInput
        accessibilityLabel="City name"
        autoCapitalize="words"
        autoCorrect={false}
        dense
        mode="outlined"
        onChangeText={onChangeText}
        onSubmitEditing={onSearch}
        placeholder="Search city"
        returnKeyType="search"
        style={styles.input}
        value={value}
      />
      <Appbar.Action
        accessibilityLabel="Search"
        disabled={loading || value.trim().length === 0}
        icon="magnify"
        onPress={onSearch}
      />
    </Appbar.Header>
  );
}

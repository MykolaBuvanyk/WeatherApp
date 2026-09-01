import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Keyboard, Linking, ScrollView, StatusBar, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { CurrentWeatherCard } from '../../features/weather/components/CurrentWeatherCard/CurrentWeatherCard';
import { LocationStatus } from '../../features/weather/components/LocationStatus/LocationStatus';
import { WeatherErrorBanner } from '../../features/weather/components/WeatherErrorBanner/WeatherErrorBanner';
import { WeatherSearch } from '../../features/weather/components/WeatherSearch/WeatherSearch';
import { useCurrentWeather } from '../../features/weather/hooks/useCurrentWeather';
import { useUserLocation } from '../../features/weather/hooks/useUserLocation';
import type { WeatherLocation } from '../../features/weather/types/weather.types';
import { styles } from './WeatherScreen.styles';

export function WeatherScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const [searchedLocation, setSearchedLocation] =
    useState<WeatherLocation | null>(null);
  const userLocation = useUserLocation();
  const activeLocation = searchedLocation ?? userLocation.coordinates;
  const currentWeather = useCurrentWeather(activeLocation);

  const handleSearch = () => {
    const city = searchText.trim();

    if (!city) {
      return;
    }

    Keyboard.dismiss();
    setSearchedLocation({ city });
  };

  const handleUseLocation = () => {
    setSearchedLocation(null);
    userLocation.requestLocation();
  };

  const handleOpenSettings = () => {
    Linking.openSettings().catch(() => undefined);
  };

  const handleOpenForecast = () => {
    if (!currentWeather.data) {
      return;
    }

    navigation.navigate('Forecast', {
      cityName: currentWeather.data.name,
      latitude: currentWeather.data.coord.lat,
      longitude: currentWeather.data.coord.lon,
    });
  };

  const handleRetryWeather = () => {
    currentWeather.refetch();
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar barStyle="dark-content" />
      <WeatherSearch
        loading={Boolean(searchedLocation) && currentWeather.isFetching}
        onChangeText={setSearchText}
        onSearch={handleSearch}
        value={searchText}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <LocationStatus
          manualSearchActive={searchedLocation !== null}
          onOpenSettings={handleOpenSettings}
          onRequestLocation={handleUseLocation}
          status={userLocation.status}
        />
        {currentWeather.isFetching ? (
          <ActivityIndicator
            accessibilityLabel="Loading weather"
            size="large"
          />
        ) : null}
        <WeatherErrorBanner
          message={
            searchedLocation
              ? 'Unable to load weather. Check the city name and try again.'
              : 'Unable to load weather for your current location. Try again.'
          }
          onRetry={handleRetryWeather}
          visible={currentWeather.isError}
        />
        {currentWeather.data ? (
          <CurrentWeatherCard
            onPress={handleOpenForecast}
            weather={currentWeather.data}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

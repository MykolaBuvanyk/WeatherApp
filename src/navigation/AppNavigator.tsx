import {
  createStaticNavigation,
  DefaultTheme as NavigationDefaultTheme,
  type StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ForecastScreen } from '../screens/ForecastScreen/ForecastScreen';
import { WeatherScreen } from '../screens/WeatherScreen/WeatherScreen';
import { theme } from '../theme/theme';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    contentStyle: {
      backgroundColor: theme.colors.background,
    },
    headerTintColor: theme.colors.primary,
  },
  screens: {
    Weather: {
      screen: WeatherScreen,
      options: {
        headerShown: false,
      },
    },
    Forecast: {
      screen: ForecastScreen,
      options: {
        title: '5-Day Forecast',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const navigationTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    primary: theme.colors.primary,
    text: theme.colors.onSurface,
  },
};

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export function AppNavigator() {
  return <Navigation theme={navigationTheme} />;
}

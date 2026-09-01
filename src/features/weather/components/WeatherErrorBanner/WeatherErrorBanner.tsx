import { Banner } from 'react-native-paper';

import { styles } from './WeatherErrorBanner.styles';

interface WeatherErrorBannerProps {
  message: string;
  onRetry: () => void;
  visible: boolean;
}

export function WeatherErrorBanner({
  message,
  onRetry,
  visible,
}: WeatherErrorBannerProps) {
  return (
    <Banner
      actions={[
        {
          label: 'Try again',
          onPress: onRetry,
        },
      ]}
      icon="alert-circle-outline"
      style={styles.banner}
      visible={visible}
    >
      {message}
    </Banner>
  );
}

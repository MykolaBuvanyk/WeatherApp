import { View } from 'react-native';
import { ActivityIndicator, Button, Surface, Text } from 'react-native-paper';

import type { UserLocationStatus } from '../../types/location.types';
import { styles } from './LocationStatus.styles';

interface LocationStatusProps {
  manualSearchActive: boolean;
  status: UserLocationStatus;
  onOpenSettings: () => void;
  onRequestLocation: () => void;
}

const STATUS_MESSAGES: Partial<Record<UserLocationStatus, string>> = {
  blocked:
    'Location permission is blocked. Enable it in settings or search manually.',
  denied: 'Location permission was denied. Search manually or try again.',
  error: 'Unable to get your location. Search manually or try again.',
  timeout: 'Location request timed out. Search manually or try again.',
  unavailable: 'Your location is unavailable. Search manually or try again.',
};

export function LocationStatus({
  manualSearchActive,
  status,
  onOpenSettings,
  onRequestLocation,
}: LocationStatusProps) {
  if (manualSearchActive) {
    return (
      <Button
        disabled={status === 'requesting'}
        icon="crosshairs-gps"
        mode="outlined"
        onPress={onRequestLocation}
      >
        Use my location
      </Button>
    );
  }

  if (status === 'idle' || status === 'requesting') {
    return (
      <Surface elevation={1} style={styles.statusCard}>
        <ActivityIndicator size="small" />
        <Text variant="bodyLarge">Finding your location...</Text>
      </Surface>
    );
  }

  const message = STATUS_MESSAGES[status];

  if (!message) {
    return null;
  }

  return (
    <Surface elevation={1} style={styles.errorCard}>
      <Text style={styles.message} variant="bodyLarge">
        {message}
      </Text>
      <View style={styles.actions}>
        {status === 'blocked' || status === 'denied' ? (
          <Button mode="outlined" onPress={onOpenSettings}>
            Open settings
          </Button>
        ) : null}
        <Button mode="contained-tonal" onPress={onRequestLocation}>
          Try again
        </Button>
      </View>
    </Surface>
  );
}

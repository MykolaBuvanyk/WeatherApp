import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  description: {
    textTransform: 'capitalize',
  },
  details: {
    flex: 1,
    gap: 2,
  },
  icon: {
    height: 52,
    width: 52,
  },
  time: {
    width: 72,
  },
});

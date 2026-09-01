import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    width: 128,
  },
  content: {
    alignItems: 'center',
    gap: 4,
    padding: 12,
  },
  icon: {
    height: 56,
    width: 56,
  },
  ripple: {
    flex: 1,
  },
  selectedCard: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
    borderWidth: 2,
  },
});

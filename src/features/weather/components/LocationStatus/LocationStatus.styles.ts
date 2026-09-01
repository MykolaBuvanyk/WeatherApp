import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  errorCard: {
    borderRadius: 16,
    gap: 12,
    padding: 16,
  },
  message: {
    textAlign: 'center',
  },
  statusCard: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    padding: 16,
  },
});

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  content: {
    gap: 8,
    padding: 20,
  },
  description: {
    textTransform: 'capitalize',
  },
  icon: {
    height: 88,
    width: 88,
  },
  hint: {
    marginTop: 8,
  },
  summary: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

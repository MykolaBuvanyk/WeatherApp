module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^@react-native-community/geolocation$':
      '<rootDir>/__mocks__/react-native-geolocation.js',
    '^react-native-config$': '<rootDir>/__mocks__/react-native-config.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-screens|react-native-safe-area-context)/)',
  ],
};

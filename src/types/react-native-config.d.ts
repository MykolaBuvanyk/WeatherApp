declare module 'react-native-config' {
  export interface NativeConfig {
    OPENWEATHER_API_KEY?: string;
    OPENWEATHER_BASE_URL?: string;
  }

  const Config: NativeConfig;

  export default Config;
}

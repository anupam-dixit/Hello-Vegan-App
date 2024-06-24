import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vegans.hello',
  appName: 'Hello Vegans',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
};

export default config;

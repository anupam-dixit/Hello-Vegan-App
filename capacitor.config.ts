import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hello.vegans',
  appName: 'Hello Vegans',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
};

export default config;

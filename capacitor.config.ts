import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jeep.angular.test.angular.sqlite.app',
  appName: 'test-angular-sqlite-app',
  webDir: 'dist/test-angular-sqlite-app',
  server: {
    androidScheme: 'https'
  }
};

export default config;

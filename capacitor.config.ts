import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.generativeos.app',
  appName: 'Generative OS',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
    backgroundColor: '#F5F5F5',
  },
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#F5F5F5',
    },
    SplashScreen: {
      launchAutoHide: true,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      backgroundColor: '#F5F5F5',
    },
  },
};

export default config;

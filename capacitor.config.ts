import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.generativeos.app',
  appName: 'Generative OS',
  webDir: 'dist',
  ios: {
    contentInset: 'always',
    backgroundColor: '#F5F5F5',
  },
  server: {
    // Live reload: point to your Vite dev server
    // Comment out this block for production builds
    url: 'http://192.168.1.128:5173',
    cleartext: true,
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

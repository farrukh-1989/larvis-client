import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/token': {
        target: 'http://127.0.0.1:5173',
        changeOrigin: true,
      },
      '/acquisitions': {
        target: 'http://127.0.0.1:5173',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://127.0.0.1:5173',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@Assets': `${path.resolve(__dirname, './src/assets')}`,
      '@Components': `${path.resolve(__dirname, './src/components')}`,
      '@Features': `${path.resolve(__dirname, './src/features')}`,
      '@Routes': `${path.resolve(__dirname, './src/routes')}`,
      '@Store': `${path.resolve(__dirname, './src/store')}`,
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@Assets': `${path.resolve(__dirname, './src/assets')}`,
      '@Components': `${path.resolve(__dirname, './src/components')}`,
      '@Features': `${path.resolve(__dirname, './src/features')}`,
      '@Routes': `${path.resolve(__dirname, './src/routes')}`,
    },
  },
});

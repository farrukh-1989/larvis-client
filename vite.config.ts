import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${env.VITE_API_URL ?? 'localhost:3000'} `;
  const PORT = Number(`${env.VITE_API_PORT ?? 8080}`);
  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        '/token': {
          target: `${API_URL.trim()}:${PORT}`,
          changeOrigin: true,
        },
        '/acquisitions': {
          target: `${API_URL.trim()}:${PORT}`,
          changeOrigin: true,
        },
        '/users': {
          target: `${API_URL.trim()}:${PORT}`,
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
  };
});

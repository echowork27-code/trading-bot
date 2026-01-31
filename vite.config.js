import { defineConfig } from 'vite';

export default defineConfig({
  base: '/trading-bot/',
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/gg-api': {
        target: 'https://api.getgems.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gg-api/, '/public-api'),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});

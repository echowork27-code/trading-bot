import { defineConfig } from 'vite';

export default defineConfig({
  base: '/trading-bot/',
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});

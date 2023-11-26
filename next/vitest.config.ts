import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: 'text',
      },
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "./src/style/style.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
  })
);

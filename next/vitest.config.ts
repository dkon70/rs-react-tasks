import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig(
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
        reporter: 'text',
        exclude: ['src/components/ErrorBoundary/', 'src/pages/index.tsx'],
      },
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
  })
);

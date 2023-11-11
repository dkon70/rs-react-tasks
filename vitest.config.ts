import { defineConfig } from 'vitest/config';
import { mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      coverage: {
        provider: 'v8',
      },
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  })
);

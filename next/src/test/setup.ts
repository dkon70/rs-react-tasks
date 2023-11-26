import * as matchers from '@testing-library/jest-dom/matchers';
import { afterEach, expect, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

expect.extend(matchers);

beforeAll(() => {
  vi.mock('next/router', () => ({
    useRouter: () => ({
      query: { search: '', page: 1, productsPerPage: 5 },
    }),
  }));
});

afterEach(() => {
  cleanup();
});

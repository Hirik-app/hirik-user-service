// Vitest configuration for unit tests
import { defineConfig } from 'vitest/config';
import baseConfig from '../../vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    name: 'unit',
    include: ['tests/unit/**/*.{test,spec}.{js,ts}', 'tests/**/*.unit.{test,spec}.{js,ts}'],
    exclude: [
      '**/node_modules/**',
      '**/integration/**',
      '**/e2e/**',
      '**/*.integration.{test,spec}.{js,ts}',
      '**/*.e2e.{test,spec}.{js,ts}'
    ],
    environment: 'node',
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true, // Unit tests should be isolated
        minForks: 1,
        maxForks: 1
      }
    },
    setupFiles: ['./tests/configs/setup-unit.ts'],
    testTimeout: 10000, // Shorter timeout for unit tests
    coverage: {
      ...baseConfig.test?.coverage,
      thresholds: {
        global: {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95
        }
      }
    },
    // Unit tests should not use external services
    env: {
      NODE_ENV: 'test',
      TEST_TYPE: 'unit',
      TEST_EXTERNAL_SERVICES: 'false',
      TEST_DATABASE: 'false'
    }
  }
});
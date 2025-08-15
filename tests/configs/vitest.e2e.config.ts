// Vitest configuration for end-to-end tests
import { defineConfig } from 'vitest/config';
import baseConfig from '../../vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    name: 'e2e',
    include: ['tests/e2e/**/*.{test,spec}.{js,ts}', 'tests/**/*.e2e.{test,spec}.{js,ts}'],
    exclude: [
      '**/node_modules/**',
      '**/unit/**',
      '**/integration/**',
      '**/*.unit.{test,spec}.{js,ts}',
      '**/*.integration.{test,spec}.{js,ts}'
    ],
    environment: 'happy-dom',
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: false,
        minForks: 1,
        maxForks: 2
      }
    },
    setupFiles: ['./tests/configs/setup-e2e.ts'],
    testTimeout: 60000, // Much longer timeout for e2e tests
    hookTimeout: 30000,
    coverage: {
      ...baseConfig.test?.coverage,
      enabled: false // Usually disable coverage for e2e tests
    },
    // E2E tests use all services and realistic scenarios
    env: {
      NODE_ENV: 'test',
      TEST_TYPE: 'e2e',
      TEST_EXTERNAL_SERVICES: 'true',
      TEST_DATABASE: 'true',
      TEST_REALISTIC_DELAYS: 'true'
    },
    // Sequential execution for e2e tests to avoid conflicts
    sequence: {
      concurrent: false,
      shuffle: false
    }
  }
});
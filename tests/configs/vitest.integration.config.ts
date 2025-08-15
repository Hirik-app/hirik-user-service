// Vitest configuration for integration tests
import { defineConfig } from 'vitest/config';
import baseConfig from '../../vitest.config';

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    name: 'integration',
    include: ['tests/integration/**/*.{test,spec}.{js,ts}', 'tests/**/*.integration.{test,spec}.{js,ts}'],
    exclude: [
      '**/node_modules/**',
      '**/unit/**',
      '**/e2e/**',
      '**/*.unit.{test,spec}.{js,ts}',
      '**/*.e2e.{test,spec}.{js,ts}'
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
    setupFiles: ['./tests/configs/setup-integration.ts'],
    testTimeout: 20000, // Longer timeout for integration tests
    coverage: {
      ...baseConfig.test?.coverage,
      thresholds: {
        global: {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85
        }
      }
    },
    // Integration tests can use external services and database
    env: {
      NODE_ENV: 'test',
      TEST_TYPE: 'integration',
      TEST_EXTERNAL_SERVICES: 'true',
      TEST_DATABASE: 'true'
    }
  }
});
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
      '@auth': path.resolve(__dirname, './src/auth-module'),
      '@user': path.resolve(__dirname, './src/user-module'),
      '@education': path.resolve(__dirname, './src/education-module'),
      '@preferences': path.resolve(__dirname, './src/preferences-module'),
      '@recruiter': path.resolve(__dirname, './src/recruiter-module'),
      '@resume': path.resolve(__dirname, './src/resume-module'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup/test-setup.ts'],
    include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/src/generated/**',
      '**/*.config.*'
    ],
    // Test execution configuration
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: false,
        minForks: 1,
        maxForks: 4
      }
    },
    sequence: {
      shuffle: false,
      concurrent: true
    },
    isolate: true,
    passWithNoTests: false,
    // Timeouts optimized for unit tests
    testTimeout: 15000,
    hookTimeout: 10000,
    teardownTimeout: 5000,
    // Performance settings
    bail: 0,
    retry: 0,
    logHeapUsage: false,
    // Coverage configuration
    coverage: {
      provider: 'v8',
      enabled: true,
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      cleanOnRerun: true,
      include: [
        'src/**/*.{js,ts}',
        '!src/**/*.d.ts',
        '!src/generated/**',
        '!src/index.ts'
      ],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.test.{js,ts}',
        '**/*.spec.{js,ts}',
        '**/coverage/**',
        '**/dist/**',
        'src/generated/**',
        '**/*.config.{js,ts}'
      ],
      // Module-specific coverage thresholds per spec requirements
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        },
        // Auth module - highest coverage due to security criticality
        'src/auth-module/**': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        },
        // Core modules - 85% coverage target
        'src/user-module/**': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85
        },
        'src/education-module/**': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85
        },
        'src/preferences-module/**': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85
        },
        'src/recruiter-module/**': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85
        },
        'src/resume-module/**': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85
        },
        // Utils and services - 80% coverage target
        'src/utils/**': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        },
        'src/services/**': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      },
      all: true,
      skipFull: false,
      perFile: true
    },
    // Test environment variables
    env: {
      NODE_ENV: 'test',
      VITEST: 'true',
      DATABASE_URL: 'file:./prisma/test.db'
    },
    // Enhanced reporting for development
    reporter: ['verbose', 'json'],
    outputFile: {
      json: './coverage/test-results.json'
    }
  },
  // Build configuration for test environment
  define: {
    __TEST__: true,
    __DEV__: false,
    __PROD__: false
  }
});
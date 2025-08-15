import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@auth': path.resolve(__dirname, './src/auth-module'),
      '@user': path.resolve(__dirname, './src/user-module'),
      '@recruiter': path.resolve(__dirname, './src/recruiter-module'),
      '@education': path.resolve(__dirname, './src/education-module'),
      '@preferences': path.resolve(__dirname, './src/preferences-module'),
      '@resume': path.resolve(__dirname, './src/resume-module'),
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/src/generated/**'
    ],
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
    logHeapUsage: true,
    testTimeout: 30000,
    hookTimeout: 10000,
    teardownTimeout: 10000,
    bail: 0,
    retry: 1,
    // Performance benchmarking
    benchmark: {
      include: ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)'],
      exclude: ['node_modules', 'dist', '.idea', '.git', '.cache']
    },
    coverage: {
      provider: 'v8',
      enabled: false,
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov', 'clover'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      include: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/generated/**',
        '!src/**/*.test.{js,jsx,ts,tsx}',
        '!src/**/*.spec.{js,jsx,ts,tsx}'
      ],
      exclude: [
        'node_modules/**',
        'tests/**',
        '**/*.d.ts',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/*.spec.{js,jsx,ts,tsx}',
        '**/coverage/**',
        '**/dist/**',
        'src/generated/**',
        'src/index.ts',
        '**/*.config.{js,ts}',
        '**/types.ts'
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        },
        'src/auth-module/**': {
          branches: 95,
          functions: 95,
          lines: 95,
          statements: 95
        },
        'src/user-module/**': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      },
      all: true,
      skipFull: false,
      perFile: false
    },
    // Environment-specific configurations
    env: {
      NODE_ENV: 'test',
      VITEST: 'true'
    },
    // Reporter configuration for enhanced output
    reporter: ['verbose', 'json', 'html'],
    outputFile: {
      json: './coverage/test-results.json',
      html: './coverage/test-results.html'
    },
    // Browser mode configuration (if needed for e2e)
    browser: {
      enabled: false,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
      screenshotOnFailure: false
    }
  },
  // Shared configuration for different test types
  define: {
    __TEST__: true,
    __DEV__: false,
    __PROD__: false
  }
});
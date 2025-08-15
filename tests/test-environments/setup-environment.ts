// Test environment setup and configuration
import { vi } from 'vitest';

export function setupTestEnvironment() {
  // Set NODE_ENV to test
  process.env.NODE_ENV = 'test';
  process.env.VITEST = 'true';
  
  // Mock environment variables for Cloudflare Workers
  process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-12345';
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key-for-testing-67890';
  process.env.API_BASE_URL = 'http://localhost:3000';
  process.env.MEILISEARCH_HOST = 'http://localhost:7700';
  process.env.MEILISEARCH_API_KEY = 'test-meilisearch-key';
  process.env.MEILISEARCH_INDEX = 'test-index';
  
  // Database URLs for testing
  process.env.DATABASE_URL = 'file:./test.db';
  process.env.DIRECT_URL = 'file:./test.db';
  
  // SMS and Email service mocks
  process.env.TWILIO_ACCOUNT_SID = 'test-twilio-sid';
  process.env.TWILIO_AUTH_TOKEN = 'test-twilio-token';
  process.env.TWILIO_PHONE_NUMBER = '+1234567890';
  
  // File upload configuration
  process.env.CLOUDFLARE_R2_ACCESS_KEY = 'test-r2-access-key';
  process.env.CLOUDFLARE_R2_SECRET_KEY = 'test-r2-secret-key';
  process.env.CLOUDFLARE_R2_BUCKET = 'test-bucket';
  
  // Debug settings
  process.env.VITEST_DEBUG = process.env.DEBUG === 'true' ? 'true' : 'false';
  
  console.log('Test environment configured');
}

export const TEST_CONFIG = {
  jwt: {
    secret: 'test-jwt-secret-key-for-testing-12345',
    refreshSecret: 'test-refresh-secret-key-for-testing-67890',
    expiresIn: '15m',
    refreshExpiresIn: '7d'
  },
  database: {
    url: 'file:./test.db?connection_limit=1',
    retryAttempts: 3,
    timeout: 10000
  },
  api: {
    baseUrl: 'http://localhost:3000',
    timeout: 5000,
    retryAttempts: 2
  },
  meilisearch: {
    host: 'http://localhost:7700',
    apiKey: 'test-meilisearch-key',
    index: 'test-index'
  },
  performance: {
    maxResponseTime: 2000, // 2 seconds
    maxDbQueryTime: 500,   // 500ms
    maxMemoryUsage: 100 * 1024 * 1024 // 100MB
  }
};

export function getTestConfig() {
  return TEST_CONFIG;
}

// Environment-specific configurations for different test types
export const TEST_ENVIRONMENTS = {
  unit: {
    name: 'unit',
    isolated: true,
    externalServices: false,
    database: false
  },
  integration: {
    name: 'integration',
    isolated: true,
    externalServices: true,
    database: true
  },
  e2e: {
    name: 'e2e',
    isolated: false,
    externalServices: true,
    database: true
  }
};

export function setupEnvironmentForTestType(testType: keyof typeof TEST_ENVIRONMENTS) {
  const config = TEST_ENVIRONMENTS[testType];
  
  // Set environment-specific variables
  process.env.TEST_TYPE = config.name;
  process.env.TEST_ISOLATED = config.isolated.toString();
  process.env.TEST_EXTERNAL_SERVICES = config.externalServices.toString();
  process.env.TEST_DATABASE = config.database.toString();
  
  console.log(`Configured ${testType} test environment`);
  return config;
}
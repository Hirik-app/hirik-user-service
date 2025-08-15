/**
 * Global Test Setup Configuration
 * Sets up test environment, mocks, and utilities for all test files
 */

import { vi, beforeAll, afterAll, beforeEach, afterEach, expect } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from '../__mocks__/handlers';

// Setup MSW server for API mocking
export const server = setupServer(...handlers);

// Global test configuration
beforeAll(() => {
  // Start MSW server
  server.listen({ onUnhandledRequest: 'error' });
  
  // Mock console methods to reduce noise in tests
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
  
  // Set up global test environment variables
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = 'file:./test.db';
  process.env.MEILISEARCH_HOST = 'https://meilisearch.hirik.online';
  process.env.MEILISEARCH_API_KEY = '1d97196c01a455e08bcfc6c510517d7632c35a663211dcdb1df60d5fad13b057';
});

afterAll(() => {
  // Clean up MSW server
  server.close();
  
  // Restore console methods
  vi.restoreAllMocks();
});

beforeEach(() => {
  // Reset MSW handlers before each test
  server.resetHandlers();
});

afterEach(() => {
  // Clear all mocks after each test
  vi.clearAllMocks();
});

// Custom matchers for domain-specific assertions
expect.extend({
  toHaveValidResumeStructure(received: any) {
    const requiredFields = ['id', 'userId', 'filename', 'fileSize', 'uploadedAt'];
    const hasAllFields = requiredFields.every(field => field in received);
    
    return {
      message: () => `Expected resume to have valid structure with fields: ${requiredFields.join(', ')}`,
      pass: hasAllFields
    };
  },
  
  toHaveValidUserStructure(received: any) {
    const requiredFields = ['id', 'email', 'createdAt', 'updatedAt'];
    const hasAllFields = requiredFields.every(field => field in received);
    
    return {
      message: () => `Expected user to have valid structure with fields: ${requiredFields.join(', ')}`,
      pass: hasAllFields
    };
  },
  
  toHaveValidEducationStructure(received: any) {
    const requiredFields = ['id', 'userId', 'institution', 'degree', 'startDate'];
    const hasAllFields = requiredFields.every(field => field in received);
    
    return {
      message: () => `Expected education to have valid structure with fields: ${requiredFields.join(', ')}`,
      pass: hasAllFields
    };
  }
});

// Global test utilities
global.testUtils = {
  // Helper to create test database connection
  createTestDb: () => {
    // Mock database connection for tests
    return {
      user: {
        create: vi.fn(),
        findUnique: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
      },
      resume: {
        create: vi.fn(),
        findUnique: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
      },
      education: {
        create: vi.fn(),
        findUnique: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
        delete: vi.fn()
      }
    };
  },
  
  // Helper to wait for async operations
  waitFor: async (fn: () => boolean, timeout = 5000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (fn()) return;
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    throw new Error(`Timeout waiting for condition after ${timeout}ms`);
  }
};

// Type declarations for custom matchers
declare global {
  namespace Vi {
    interface AsymmetricMatchersContaining {
      toHaveValidResumeStructure(): any;
      toHaveValidUserStructure(): any;
      toHaveValidEducationStructure(): any;
    }
  }
  
  var testUtils: {
    createTestDb: () => any;
    waitFor: (fn: () => boolean, timeout?: number) => Promise<void>;
  };
}
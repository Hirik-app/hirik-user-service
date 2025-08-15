// Cloudflare Workers environment mocking utilities
import { vi } from 'vitest';
import { faker } from '@faker-js/faker';

// Mock D1 Database interface
export class MockD1Database {
  private mockData: Map<string, any[]> = new Map();
  
  prepare(query: string) {
    return new MockD1PreparedStatement(query, this.mockData);
  }
  
  // Helper methods for test data management
  seedTable(tableName: string, data: any[]) {
    this.mockData.set(tableName, data);
  }
  
  clearTable(tableName: string) {
    this.mockData.set(tableName, []);
  }
  
  clearAll() {
    this.mockData.clear();
  }
  
  getTableData(tableName: string) {
    return this.mockData.get(tableName) || [];
  }
}

class MockD1PreparedStatement {
  private query: string;
  private mockData: Map<string, any[]>;
  private boundParams: any[] = [];
  
  constructor(query: string, mockData: Map<string, any[]>) {
    this.query = query;
    this.mockData = mockData;
  }
  
  bind(...params: any[]) {
    this.boundParams = params;
    return this;
  }

  raw(options?: any) {
    // Mock implementation for Prisma raw queries
    return this.all();
  }
  
  async first() {
    const results = await this.all();
    return results.length > 0 ? results[0] : null;
  }
  
  async all() {
    // Simple mock implementation - in real tests you might want more sophisticated SQL parsing
    const queryLower = this.query.toLowerCase();
    
    if (queryLower.includes('select')) {
      // Extract table name (basic implementation)
      const tableMatch = this.query.match(/from\s+(\w+)/i);
      if (tableMatch) {
        const tableName = tableMatch[1];
        const data = this.mockData.get(tableName) || [];
        
        // Apply basic WHERE filtering if parameters exist
        if (this.boundParams.length > 0 && queryLower.includes('where')) {
          // Basic parameter substitution for common patterns
          return data.filter(row => this.applyWhereFilter(row, queryLower));
        }
        
        return data;
      }
    }
    
    return [];
  }
  
  async run() {
    const queryLower = this.query.toLowerCase();
    
    if (queryLower.includes('insert')) {
      return {
        success: true,
        meta: {
          changes: 1,
          last_row_id: faker.number.int({ min: 1, max: 10000 })
        }
      };
    }
    
    if (queryLower.includes('update') || queryLower.includes('delete')) {
      return {
        success: true,
        meta: {
          changes: faker.number.int({ min: 0, max: 5 })
        }
      };
    }
    
    return { success: true, meta: { changes: 0 } };
  }
  
  private applyWhereFilter(row: any, query: string): boolean {
    // Very basic filter implementation - expand as needed
    if (query.includes('id = ?') && this.boundParams[0]) {
      return row.id === this.boundParams[0];
    }
    
    if (query.includes('phone_number = ?') && this.boundParams[0]) {
      return row.phoneNumber === this.boundParams[0] || row.phone_number === this.boundParams[0];
    }
    
    if (query.includes('email = ?') && this.boundParams[0]) {
      return row.email === this.boundParams[0];
    }
    
    // Default to include all rows if we can't parse the WHERE clause
    return true;
  }
}

// Mock KV Namespace
export class MockKVNamespace {
  private storage: Map<string, { value: string; expiration?: number }> = new Map();
  
  async get(key: string, options?: { type?: 'text' | 'json' | 'arrayBuffer' | 'stream' }) {
    const item = this.storage.get(key);
    
    if (!item) return null;
    
    // Check expiration
    if (item.expiration && Date.now() > item.expiration) {
      this.storage.delete(key);
      return null;
    }
    
    if (options?.type === 'json') {
      try {
        return JSON.parse(item.value);
      } catch {
        return null;
      }
    }
    
    return item.value;
  }
  
  async put(
    key: string, 
    value: string | ArrayBuffer | ReadableStream,
    options?: { expiration?: number; expirationTtl?: number }
  ) {
    let expiration: number | undefined;
    
    if (options?.expiration) {
      expiration = options.expiration * 1000; // Convert to milliseconds
    } else if (options?.expirationTtl) {
      expiration = Date.now() + (options.expirationTtl * 1000);
    }
    
    this.storage.set(key, {
      value: typeof value === 'string' ? value : JSON.stringify(value),
      expiration
    });
  }
  
  async delete(key: string) {
    return this.storage.delete(key);
  }
  
  async list(options?: { prefix?: string; limit?: number }) {
    const keys = Array.from(this.storage.keys())
      .filter(key => !options?.prefix || key.startsWith(options.prefix))
      .slice(0, options?.limit || 1000);
      
    return {
      keys: keys.map(name => ({ name })),
      list_complete: true,
      curosr: ''
    };
  }
  
  // Test utility methods
  clear() {
    this.storage.clear();
  }
  
  size() {
    return this.storage.size;
  }
}

// Mock R2 Bucket
export class MockR2Bucket {
  private objects: Map<string, { body: string; metadata: Record<string, string> }> = new Map();
  
  async get(key: string) {
    const object = this.objects.get(key);
    if (!object) return null;
    
    return {
      key,
      body: object.body,
      httpMetadata: object.metadata
    };
  }
  
  async put(key: string, object: string | ArrayBuffer | ReadableStream, options?: {
    httpMetadata?: Record<string, string>;
    customMetadata?: Record<string, string>;
  }) {
    this.objects.set(key, {
      body: typeof object === 'string' ? object : JSON.stringify(object),
      metadata: { ...options?.httpMetadata, ...options?.customMetadata }
    });
    
    return {
      key,
      etag: faker.string.alphanumeric(32),
      uploaded: new Date()
    };
  }
  
  async delete(key: string) {
    return this.objects.delete(key);
  }
  
  async head(key: string) {
    const object = this.objects.get(key);
    if (!object) return null;
    
    return {
      key,
      size: object.body.length,
      httpMetadata: object.metadata
    };
  }
  
  async list(options?: { prefix?: string; delimiter?: string; limit?: number }) {
    const keys = Array.from(this.objects.keys())
      .filter(key => !options?.prefix || key.startsWith(options.prefix))
      .slice(0, options?.limit || 1000);
      
    return {
      objects: keys.map(key => ({
        key,
        size: this.objects.get(key)!.body.length,
        etag: faker.string.alphanumeric(32),
        uploaded: new Date()
      })),
      truncated: false
    };
  }
  
  // Test utility methods
  clear() {
    this.objects.clear();
  }
  
  hasObject(key: string) {
    return this.objects.has(key);
  }
}

// Complete Cloudflare Environment Mock
export function createMockCloudflareEnv(overrides: Partial<CloudflareEnv> = {}): CloudflareEnv {
  const mockDB = new MockD1Database();
  const mockKV = new MockKVNamespace();
  const mockR2 = new MockR2Bucket();
  
  return {
    // Database
    DB: mockDB,
    
    // KV Storage
    CACHE: mockKV,
    SESSIONS: mockKV,
    
    // R2 Storage
    BUCKET: mockR2,
    
    // Environment Variables
    JWT_SECRET: 'test-jwt-secret-for-testing-12345',
    JWT_REFRESH_SECRET: 'test-refresh-secret-for-testing-67890',
    API_BASE_URL: 'http://localhost:3000',
    MEILISEARCH_HOST: 'http://localhost:7700',
    MEILISEARCH_API_KEY: 'test-meilisearch-key',
    MEILISEARCH_INDEX: 'test-users',
    
    // SMS/Email service keys
    TWILIO_ACCOUNT_SID: 'test-twilio-sid',
    TWILIO_AUTH_TOKEN: 'test-twilio-token',
    TWILIO_PHONE_NUMBER: '+1234567890',
    
    // Email service
    SENDGRID_API_KEY: 'test-sendgrid-key',
    FROM_EMAIL: 'test@hirik.app',
    
    // Other services
    SENTRY_DSN: 'https://test@sentry.io/123',
    
    // Override with any provided values
    ...overrides,
    
    // Test utility methods
    __testUtils: {
      mockDB,
      mockKV,
      mockR2,
      reset() {
        mockDB.clearAll();
        mockKV.clear();
        mockR2.clear();
      }
    }
  } as CloudflareEnv & { __testUtils: any };
}

// Type definitions for Cloudflare Environment
export interface CloudflareEnv {
  DB: MockD1Database;
  CACHE?: MockKVNamespace;
  SESSIONS?: MockKVNamespace;
  BUCKET?: MockR2Bucket;
  
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
  API_BASE_URL: string;
  MEILISEARCH_HOST: string;
  MEILISEARCH_API_KEY: string;
  MEILISEARCH_INDEX: string;
  
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_PHONE_NUMBER?: string;
  
  SENDGRID_API_KEY?: string;
  FROM_EMAIL?: string;
  
  SENTRY_DSN?: string;
}

// Mock Hono Context
export function createMockHonoContext(
  request: Partial<Request> = {},
  env: Partial<CloudflareEnv> = {}
) {
  const mockEnv = createMockCloudflareEnv(env);
  
  return {
    req: {
      json: vi.fn().mockResolvedValue({}),
      text: vi.fn().mockResolvedValue(''),
      formData: vi.fn().mockResolvedValue(new FormData()),
      header: vi.fn().mockReturnValue(''),
      query: vi.fn().mockReturnValue(''),
      param: vi.fn().mockReturnValue(''),
      method: 'GET',
      url: 'http://localhost:3000/test',
      ...request
    },
    env: mockEnv,
    json: vi.fn(),
    text: vi.fn(),
    html: vi.fn(),
    status: vi.fn().mockReturnThis(),
    header: vi.fn().mockReturnThis(),
    var: vi.fn(),
    set: vi.fn(),
    get: vi.fn(),
    executionCtx: {
      waitUntil: vi.fn(),
      passThroughOnException: vi.fn()
    }
  };
}

// Test utilities
export const CloudflareMockUtils = {
  createEnv: createMockCloudflareEnv,
  createContext: createMockHonoContext,
  
  // Pre-configured environments
  testEnv: () => createMockCloudflareEnv(),
  
  productionLikeEnv: () => createMockCloudflareEnv({
    JWT_SECRET: 'production-like-secret-key',
    API_BASE_URL: 'https://api.hirik.app',
    MEILISEARCH_HOST: 'https://search.hirik.app'
  })
};

export default CloudflareMockUtils;
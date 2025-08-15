// Global test setup
import { beforeAll, afterAll, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { setupTestEnvironment } from './test-environments/setup-environment';

let prisma: PrismaClient | undefined;
let mockServer: any;

// Setup function to be called before all tests
export async function setupTests() {
  try {
    // Set up test environment variables
    setupTestEnvironment();
    
    // Initialize MSW server conditionally
    if (process.env.TEST_EXTERNAL_SERVICES === 'true') {
      const { setupMockServer } = await import('./mocks/msw-server');
      mockServer = setupMockServer();
      mockServer.listen({
        onUnhandledRequest: 'warn'
      });
    }
    
    // Initialize Prisma client for testing with SQLite in-memory
    if (process.env.TEST_DATABASE === 'true') {
      prisma = new PrismaClient({
        datasources: {
          db: {
            url: 'file:./test.db?connection_limit=1'
          }
        },
        log: process.env.VITEST_DEBUG === 'true' ? ['query', 'error'] : ['error']
      });
      
      // Connect to database
      await prisma.$connect();
      
      // Run any required database migrations or seeding
      await setupTestDatabase();
    }
    
    console.log('Test setup completed successfully');
  } catch (error) {
    console.error('Test setup failed:', error);
    throw error;
  }
}

// Cleanup function to be called after all tests
export async function teardownTests() {
  try {
    // Clean up database if it was initialized
    if (prisma && process.env.TEST_DATABASE === 'true') {
      await cleanDatabase();
      await prisma.$disconnect();
      prisma = undefined;
    }
    
    // Close MSW server if it was started
    if (mockServer && process.env.TEST_EXTERNAL_SERVICES === 'true') {
      mockServer.close();
      mockServer = undefined;
    }
    
    // Reset all mocks
    vi.clearAllMocks();
    vi.restoreAllMocks();
    
    console.log('Test teardown completed successfully');
  } catch (error) {
    console.warn('Test teardown warning:', error);
  }
}

// Clean database function for use before each test
export async function cleanDatabase() {
  if (!prisma) {
    console.log('Prisma not initialized, skipping database cleanup');
    return;
  }
  
  try {
    // Clean up database in correct order (respecting foreign key constraints)
    await prisma.resume.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.education.deleteMany();
    await prisma.skillUserMap.deleteMany();
    await prisma.savedJob.deleteMany();
    await prisma.fCMToken.deleteMany();
    await prisma.notificationPreferences.deleteMany();
    await prisma.jobSearchPreferences.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.recruiterProfile.deleteMany();
    await prisma.user.deleteMany();
  } catch (error) {
    console.warn('Database cleanup warning:', error);
  }
}

// Setup test database with initial schema
async function setupTestDatabase() {
  // This would typically run migrations
  // For now, we assume the test database is already set up
  console.log('Test database setup completed');
}

// Export prisma instance for use in tests
export { prisma };

// Mock Cloudflare Workers environment
export function mockCloudflareEnvironment() {
  const mockEnv = {
    DB: {
      prepare: vi.fn().mockReturnValue({
        bind: vi.fn().mockReturnThis(),
        first: vi.fn().mockResolvedValue(null),
        all: vi.fn().mockResolvedValue([]),
        run: vi.fn().mockResolvedValue({ success: true })
      })
    },
    JWT_SECRET: 'test-jwt-secret',
    API_BASE_URL: 'http://localhost:3000',
    MEILISEARCH_HOST: 'http://localhost:7700',
    MEILISEARCH_API_KEY: 'test-key'
  };

  // Mock global fetch if needed
  if (!global.fetch) {
    global.fetch = vi.fn();
  }

  return mockEnv;
}

// Performance monitoring setup
export function setupPerformanceMonitoring() {
  const performanceMetrics = {
    apiResponseTimes: new Map<string, number[]>(),
    databaseQueryTimes: new Map<string, number[]>(),
    
    recordApiCall(endpoint: string, duration: number) {
      if (!this.apiResponseTimes.has(endpoint)) {
        this.apiResponseTimes.set(endpoint, []);
      }
      this.apiResponseTimes.get(endpoint)!.push(duration);
    },
    
    recordDatabaseQuery(query: string, duration: number) {
      if (!this.databaseQueryTimes.has(query)) {
        this.databaseQueryTimes.set(query, []);
      }
      this.databaseQueryTimes.get(query)!.push(duration);
    },
    
    getAverageResponseTime(endpoint: string): number {
      const times = this.apiResponseTimes.get(endpoint) || [];
      return times.length > 0 ? times.reduce((a, b) => a + b) / times.length : 0;
    },
    
    reset() {
      this.apiResponseTimes.clear();
      this.databaseQueryTimes.clear();
    }
  };
  
  return performanceMetrics;
}

// Global test hooks
beforeAll(async () => {
  await setupTests();
});

afterAll(async () => {
  await teardownTests();
});

beforeEach(async () => {
  // Reset MSW handlers if available
  if (mockServer && process.env.TEST_EXTERNAL_SERVICES === 'true') {
    mockServer.resetHandlers();
  }
  
  // Clean database before each test if available
  if (process.env.TEST_DATABASE === 'true') {
    await cleanDatabase();
  }
  
  // Reset all mocks
  vi.clearAllMocks();
});
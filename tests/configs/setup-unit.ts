// Setup for unit tests - minimal dependencies, maximum isolation
import { vi } from 'vitest';
import { setupEnvironmentForTestType } from '../test-environments/setup-environment';

// Configure environment for unit testing
setupEnvironmentForTestType('unit');

// Mock all external dependencies for unit tests
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => ({
    $connect: vi.fn(),
    $disconnect: vi.fn(),
    user: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn()
    },
    profile: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn()
    },
    recruiterProfile: {
      create: vi.fn(),
      findUnique: vi.fn(),
      findMany: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn()
    },
    education: { deleteMany: vi.fn() },
    experience: { deleteMany: vi.fn() },
    resume: { deleteMany: vi.fn() },
    skillUserMap: { deleteMany: vi.fn() },
    savedJob: { deleteMany: vi.fn() },
    fCMToken: { deleteMany: vi.fn() },
    notificationPreferences: { deleteMany: vi.fn() },
    jobSearchPreferences: { deleteMany: vi.fn() }
  }))
}));

// Mock Meilisearch
vi.mock('meilisearch', () => ({
  MeiliSearch: vi.fn(() => ({
    index: vi.fn(() => ({
      search: vi.fn().mockResolvedValue({ hits: [] }),
      addDocuments: vi.fn().mockResolvedValue({ taskUid: 123 }),
      updateSettings: vi.fn().mockResolvedValue({ taskUid: 124 })
    }))
  }))
}));

// Mock Hono
vi.mock('hono', () => ({
  Hono: vi.fn(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    use: vi.fn(),
    route: vi.fn(),
    fire: vi.fn()
  })),
  Context: vi.fn(),
  Next: vi.fn()
}));

// Mock bcryptjs
vi.mock('bcryptjs', () => ({
  hash: vi.fn().mockResolvedValue('hashed-password'),
  compare: vi.fn().mockResolvedValue(true),
  genSalt: vi.fn().mockResolvedValue('salt')
}));

// Mock JWT utilities
vi.mock('jsonwebtoken', () => ({
  sign: vi.fn().mockReturnValue('mocked-jwt-token'),
  verify: vi.fn().mockReturnValue({ userId: 'test-user-id' }),
  decode: vi.fn().mockReturnValue({ userId: 'test-user-id' })
}));

// Mock global fetch
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: vi.fn().mockResolvedValue({}),
  text: vi.fn().mockResolvedValue('')
});

// Mock console methods to reduce noise in unit tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: console.error // Keep errors visible
};

console.log('Unit test environment configured with full mocking');
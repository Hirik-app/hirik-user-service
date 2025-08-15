/**
 * Prisma Client Mocks
 * Mock implementations for all database operations
 */

import { vi } from 'vitest';

// Create mock functions for database operations
const createMockModel = () => ({
  create: vi.fn(),
  createMany: vi.fn(),
  findUnique: vi.fn(),
  findFirst: vi.fn(),
  findMany: vi.fn(),
  update: vi.fn(),
  upsert: vi.fn(),
  delete: vi.fn(),
  deleteMany: vi.fn(),
  count: vi.fn(),
  aggregate: vi.fn(),
  groupBy: vi.fn()
});

// Create mock Prisma client with all models from schema
export const mockPrismaClient = {
  user: createMockModel(),
  profile: createMockModel(),
  recruiterProfile: createMockModel(),
  recruiterVerificationMethods: createMockModel(),
  savedJob: createMockModel(),
  skillUserMap: createMockModel(),
  education: createMockModel(),
  experience: createMockModel(),
  resume: createMockModel(),
  notificationPreferences: createMockModel(),
  jobSearchPreferences: createMockModel(),
  fCMToken: createMockModel(),
  oTP: createMockModel(),
  emailOTP: createMockModel(),
  
  $connect: vi.fn(),
  $disconnect: vi.fn(),
  $transaction: vi.fn(),
  $executeRaw: vi.fn(),
  $executeRawUnsafe: vi.fn(),
  $queryRaw: vi.fn(),
  $queryRawUnsafe: vi.fn()
};

// Mock Prisma module
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrismaClient)
}));

// Helper functions for setting up mock responses
export const setupMockUser = (userData: any) => {
  mockPrismaClient.user.findUnique.mockResolvedValue(userData);
  mockPrismaClient.user.create.mockResolvedValue(userData);
  mockPrismaClient.user.update.mockResolvedValue(userData);
};

export const setupMockProfile = (profileData: any) => {
  mockPrismaClient.profile.findUnique.mockResolvedValue(profileData);
  mockPrismaClient.profile.create.mockResolvedValue(profileData);
  mockPrismaClient.profile.update.mockResolvedValue(profileData);
};

export const setupMockResume = (resumeData: any) => {
  mockPrismaClient.resume.findUnique.mockResolvedValue(resumeData);
  mockPrismaClient.resume.create.mockResolvedValue(resumeData);
  mockPrismaClient.resume.update.mockResolvedValue(resumeData);
};

export const setupMockEducation = (educationData: any) => {
  mockPrismaClient.education.findUnique.mockResolvedValue(educationData);
  mockPrismaClient.education.create.mockResolvedValue(educationData);
  mockPrismaClient.education.update.mockResolvedValue(educationData);
};

export const setupMockJobSearchPreferences = (preferencesData: any) => {
  mockPrismaClient.jobSearchPreferences.findUnique.mockResolvedValue(preferencesData);
  mockPrismaClient.jobSearchPreferences.create.mockResolvedValue(preferencesData);
  mockPrismaClient.jobSearchPreferences.update.mockResolvedValue(preferencesData);
};

export const setupMockRecruiterProfile = (recruiterData: any) => {
  mockPrismaClient.recruiterProfile.findUnique.mockResolvedValue(recruiterData);
  mockPrismaClient.recruiterProfile.create.mockResolvedValue(recruiterData);
  mockPrismaClient.recruiterProfile.update.mockResolvedValue(recruiterData);
};

// Reset all mocks
export const resetPrismaMocks = () => {
  Object.values(mockPrismaClient).forEach(model => {
    if (typeof model === 'object' && model !== null) {
      Object.values(model).forEach(method => {
        if (typeof method === 'function' && 'mockReset' in method) {
          method.mockReset();
        }
      });
    }
  });
};
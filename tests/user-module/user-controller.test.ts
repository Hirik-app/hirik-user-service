/**
 * User Module Controller Tests
 * Tests for user controller methods including profile management, experience, and skills
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Context } from 'hono';
import UserController from '../../src/user-module/controller';
import { mockPrismaClient, setupMockUser, setupMockProfile, resetPrismaMocks } from '../__mocks__/prisma';
import { createMockUser, createMockProfile, createMockExperience } from '../__mocks__/factories';

// Mock PrismaClient constructor to return our mock
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrismaClient)
}));

// Mock PrismaD1 adapter
vi.mock('@prisma/adapter-d1', () => ({
  PrismaD1: vi.fn()
}));

// Mock Meilisearch
vi.mock('../../src/utils/meilisearch', () => ({
  createMeiliSearchClient: vi.fn().mockReturnValue({
    ensureProfilesIndexExists: vi.fn().mockResolvedValue(true),
    indexProfile: vi.fn().mockResolvedValue({ taskUid: 1 }),
    searchProfiles: vi.fn().mockResolvedValue({ hits: [], estimatedTotalHits: 0 }),
    deleteProfile: vi.fn().mockResolvedValue({ taskUid: 2 })
  })
}));

// Mock context helper
const createMockContext = (body: any = {}, params: any = {}, jwtPayload: any = null, env: any = {}, url: string = 'http://localhost:3000/test'): Context => {
  const mockRequest = {
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(JSON.stringify(body)),
    headers: new Headers(),
    method: 'GET',
    url: url,
    param: vi.fn().mockImplementation((key) => params[key])
  };

  return {
    req: {
      ...mockRequest,
      param: vi.fn().mockImplementation((key) => params[key])
    },
    env: { ...env, DB: 'mock-db' },
    json: vi.fn().mockImplementation((data, status) => 
      new Response(JSON.stringify(data), { 
        status: status || 200,
        headers: { 'Content-Type': 'application/json' }
      })
    ),
    text: vi.fn().mockImplementation((text, status) => 
      new Response(text, { status: status || 200 })
    ),
    status: vi.fn().mockReturnThis(),
    header: vi.fn().mockReturnThis(),
    get: vi.fn().mockImplementation((key) => {
      if (key === 'jwtPayload') return jwtPayload;
      return params[key];
    }),
    set: vi.fn(),
    var: vi.fn(),
    newResponse: vi.fn()
  } as any;
};

describe('User Controller', () => {
  let userController: UserController;
  let mockContext: Context;
  let mockJwtPayload: any;
  let mockEnv: any;

  beforeEach(() => {
    resetPrismaMocks();
    mockEnv = {
      DB: 'mock-db',
      MEILISEARCH_HOST: 'https://meilisearch.hirik.online',
      MEILISEARCH_API_KEY: '1d97196c01a455e08bcfc6c510517d7632c35a663211dcdb1df60d5fad13b057'
    };
    userController = new UserController(mockEnv); // Pass environment variables
    mockJwtPayload = {
      userId: 'test-user-id',
      phoneNumber: '1234567890', // Fixed phone number format
      type: 'access',
      exp: Date.now() + 3600000
    };
    mockContext = createMockContext({}, {}, mockJwtPayload, mockEnv);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getMe', () => {
    it('should return user data for authenticated user', async () => {
      const user = createMockUser({ id: 'test-user-id' });
      mockContext = createMockContext({}, {}, mockJwtPayload, mockEnv);
      
      // Explicitly reset and set up mocks for this test
      mockPrismaClient.user.findUnique.mockReset();
      mockPrismaClient.profile.findFirst.mockReset();
      mockPrismaClient.recruiterProfile.findFirst.mockReset();
      
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      mockPrismaClient.profile.findFirst.mockResolvedValue(null);
      mockPrismaClient.recruiterProfile.findFirst.mockResolvedValue(null);

      const response = await userController.getMe(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toEqual({
        id: user.id,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
        isOnboardingComplete: false,
        isVerified: false
      });
    });

    it('should handle missing JWT payload', async () => {
      mockContext = createMockContext({}, {}, null, mockEnv); // No JWT payload

      const response = await userController.getMe(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Unauthorized');
    });

    it('should handle user not found', async () => {
      mockContext = createMockContext({}, {}, mockJwtPayload, mockEnv);
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      const response = await userController.getMe(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('User not found');
    });

    it('should handle database errors', async () => {
      mockContext = createMockContext({}, {}, mockJwtPayload, mockEnv);
      mockPrismaClient.user.findUnique.mockRejectedValue(new Error('Database error'));

      const response = await userController.getMe(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Internal server error');
    });
  });

  describe('getProfile', () => {
    it('should return user profile with all related data', async () => {
      const user = createMockUser({ id: 'test-user-id' });
      const profile = createMockProfile({ userId: user.id });

      mockContext = createMockContext({}, {}, mockJwtPayload, mockEnv);
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);

      const response = await userController.getProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toBeDefined();
      expect(responseData.data.id).toBe(profile.id);
    });

    it('should handle user with no profile', async () => {
      mockContext = createMockContext({}, {}, mockJwtPayload, mockEnv);
      mockPrismaClient.profile.findFirst.mockResolvedValue(null);

      const response = await userController.getProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toEqual({ jobRole: null });
    });

    it('should handle unauthorized access', async () => {
      mockContext = createMockContext({}, {}, null);

      const response = await userController.getProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
    });
  });

  describe('updateProfile', () => {
    it('should update profile with valid data', async () => {
      const user = createMockUser({ id: 'test-user-id' });
      const existingProfile = createMockProfile({ userId: user.id });
      const updateData = {
        fullName: 'Updated Name',
        email: 'updated@example.com',
        bio: 'Updated bio'
      };

      mockContext = createMockContext(updateData, {}, mockJwtPayload);
      
      const updatedProfile = { ...existingProfile, ...updateData };
      mockPrismaClient.profile.findFirst.mockResolvedValue(existingProfile);
      mockPrismaClient.profile.update.mockResolvedValue(updatedProfile);

      const response = await userController.updateProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.fullName).toBe(updateData.fullName);
      expect(responseData.data.email).toBe(updateData.email);
    });

    it('should create new profile if none exists', async () => {
      const user = createMockUser({ id: 'test-user-id' });
      const profileData = {
        fullName: 'New User',
        email: 'new@example.com'
      };

      mockContext = createMockContext(profileData, {}, mockJwtPayload);
      mockPrismaClient.user.findUnique.mockResolvedValue({
        ...user,
        profiles: [] // No existing profile
      });
      
      const newProfile = { ...createMockProfile({ userId: user.id }), ...profileData };
      mockPrismaClient.profile.findFirst.mockResolvedValue(null); // No existing profile
      mockPrismaClient.profile.create.mockResolvedValue(newProfile);

      const response = await userController.updateProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.fullName).toBe(profileData.fullName);
      expect(mockPrismaClient.profile.create).toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      const invalidData = {
        email: 'invalid-email-format'
      };

      mockContext = createMockContext(invalidData, {}, mockJwtPayload);

      const response = await userController.updateProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Validation error');
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        fullName: 'x'.repeat(101), // Too long
        bio: 'x'.repeat(1001) // Too long
      };

      mockContext = createMockContext(invalidData, {}, mockJwtPayload);

      const response = await userController.updateProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Validation error');
    });
  });

  describe('getExperienceByProfileId', () => {
    it('should return experience records for valid profile', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const experiences = [
        createMockExperience({ profileId }),
        createMockExperience({ profileId })
      ];

      mockContext = createMockContext({}, { profileId }, mockJwtPayload, mockEnv);
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);
      mockPrismaClient.experience.findMany.mockResolvedValue(experiences);

      const response = await userController.getExperienceByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toHaveLength(2);
      expect(responseData.data[0].profileId).toBe(profileId);
    });

    it('should handle empty experience list', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });

      mockContext = createMockContext({}, { profileId }, mockJwtPayload, mockEnv);
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);
      mockPrismaClient.experience.findMany.mockResolvedValue([]);

      const response = await userController.getExperienceByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toHaveLength(0);
    });

    it('should handle missing profile ID parameter', async () => {
      mockContext = createMockContext({}, {}, mockJwtPayload); // No profileId param

      const response = await userController.getExperienceByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Profile ID is required');
    });
  });

  describe('addExperienceByProfileId', () => {
    it('should add new experience with valid data', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const experienceData = {
        companyId: 'company-123',
        startDate: '2023-01-01',
        isCurrent: true,
        rolesAndResponsibilities: 'Software development'
      };

      mockContext = createMockContext(experienceData, { profileId }, mockJwtPayload);
      
      // Setup profile mock
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);
      
      const newExperience = createMockExperience({ profileId, ...experienceData });
      mockPrismaClient.experience.create.mockResolvedValue(newExperience);

      const response = await userController.addExperienceByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.data.companyId).toBe(experienceData.companyId);
      expect(responseData.data.profileId).toBe(profileId);
    });

    it('should validate required fields', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const invalidData = {
        // Missing companyId and startDate
        isCurrent: true
      };

      mockContext = createMockContext(invalidData, { profileId }, mockJwtPayload);
      
      // Setup profile mock
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);

      const response = await userController.addExperienceByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Validation error');
    });

    it('should handle long roles and responsibilities', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const experienceData = {
        companyId: 'company-123',
        startDate: '2023-01-01',
        isCurrent: true,
        rolesAndResponsibilities: 'x'.repeat(2001) // Too long
      };

      mockContext = createMockContext(experienceData, { profileId }, mockJwtPayload);
      
      // Setup profile mock
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);

      const response = await userController.addExperienceByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Validation error');
    });
  });

  describe('updateExperienceById', () => {
    it('should update experience with valid data', async () => {
      const experienceId = 'experience-123';
      const updateData = {
        rolesAndResponsibilities: 'Updated responsibilities',
        endDate: '2023-12-31',
        isCurrent: false
      };

      mockContext = createMockContext(updateData, { id: experienceId }, mockJwtPayload);
      
      // Setup existing experience with profile
      const profile = createMockProfile({ userId: 'test-user-id' });
      const existingExperience = {
        ...createMockExperience({ id: experienceId }),
        profile: profile
      };
      mockPrismaClient.experience.findFirst.mockResolvedValue(existingExperience);
      
      const updatedExperience = createMockExperience({ id: experienceId, ...updateData });
      mockPrismaClient.experience.update.mockResolvedValue(updatedExperience);

      const response = await userController.updateExperienceById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data.rolesAndResponsibilities).toBe(updateData.rolesAndResponsibilities);
      expect(responseData.data.isCurrent).toBe(false);
    });

    it('should handle non-existent experience', async () => {
      const experienceId = 'non-existent-id';
      const updateData = { rolesAndResponsibilities: 'Updated' };

      mockContext = createMockContext(updateData, { id: experienceId }, mockJwtPayload);
      mockPrismaClient.experience.findFirst.mockResolvedValue(null); // No experience found

      const response = await userController.updateExperienceById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('not found');
    });
  });

  describe('deleteExperienceById', () => {
    it('should delete experience successfully', async () => {
      const experienceId = 'experience-123';

      mockContext = createMockContext({}, { id: experienceId }, mockJwtPayload);
      
      // Setup existing experience with profile
      const profile = createMockProfile({ userId: 'test-user-id' });
      const existingExperience = {
        ...createMockExperience({ id: experienceId }),
        profile: profile
      };
      mockPrismaClient.experience.findFirst.mockResolvedValue(existingExperience);
      mockPrismaClient.experience.delete.mockResolvedValue(createMockExperience({ id: experienceId }));

      const response = await userController.deleteExperienceById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toContain('deleted successfully');
    });

    it('should handle non-existent experience deletion', async () => {
      const experienceId = 'non-existent-id';

      mockContext = createMockContext({}, { id: experienceId }, mockJwtPayload);
      mockPrismaClient.experience.delete.mockRejectedValue(new Error('Record not found'));

      const response = await userController.deleteExperienceById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('not found');
    });
  });

  describe('getSkillsByProfileId', () => {
    it('should return skills for valid profile', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const skills = [
        { id: 'skill-1', profileId, skillId: 'js-skill' },
        { id: 'skill-2', profileId, skillId: 'ts-skill' }
      ];

      mockContext = createMockContext({}, { profileId }, mockJwtPayload);
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);
      mockPrismaClient.skillUserMap.findMany.mockResolvedValue(skills);

      const response = await userController.getSkillsByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toHaveLength(2);
    });

    it('should handle profile with no skills', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });

      mockContext = createMockContext({}, { profileId }, mockJwtPayload);
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);
      mockPrismaClient.skillUserMap.findMany.mockResolvedValue([]);

      const response = await userController.getSkillsByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toHaveLength(0);
    });
  });

  describe('addSkillsToProfile', () => {
    it('should add skills to profile successfully', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const skillData = {
        skillIds: ['skill-1', 'skill-2', 'skill-3']
      };

      mockContext = createMockContext(skillData, { profileId }, mockJwtPayload);
      
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);
      mockPrismaClient.skillUserMap.deleteMany.mockResolvedValue({ count: 0 });
      mockPrismaClient.skillUserMap.createMany.mockResolvedValue({ count: 3 });

      const response = await userController.addSkillsToProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.data.count).toBe(3);
    });

    it('should validate skill IDs array', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const invalidData = {
        skillIds: [] // Empty array
      };

      mockContext = createMockContext(invalidData, { profileId }, mockJwtPayload);
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);

      const response = await userController.addSkillsToProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Validation error');
    });

    it('should handle duplicate skill assignments', async () => {
      const profileId = 'test-profile-id';
      const profile = createMockProfile({ id: profileId, userId: 'test-user-id' });
      const skillData = {
        skillIds: ['skill-1', 'skill-2']
      };

      mockContext = createMockContext(skillData, { profileId }, mockJwtPayload);
      mockPrismaClient.profile.findFirst.mockResolvedValue(profile);
      mockPrismaClient.skillUserMap.deleteMany.mockResolvedValue({ count: 0 });
      mockPrismaClient.skillUserMap.createMany.mockRejectedValue(new Error('Unique constraint violation'));

      const response = await userController.addSkillsToProfile(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Internal server error');
    });
  });

  describe('searchProfiles', () => {
    it('should search profiles with query parameters', async () => {
      const searchQuery = 'software engineer';
      const mockSearchResults = {
        hits: [
          { id: 'profile-1', fullName: 'John Doe', preferredRole: 'Software Engineer' },
          { id: 'profile-2', fullName: 'Jane Smith', preferredRole: 'Senior Software Engineer' }
        ],
        estimatedTotalHits: 2,
        processingTimeMs: 5
      };

      const searchUrl = `http://localhost/search/profiles?q=${encodeURIComponent(searchQuery)}`;
      mockContext = createMockContext({}, {}, mockJwtPayload, {}, searchUrl);
      
      // Mock Meilisearch client
      const { createMeiliSearchClient } = await import('../../src/utils/meilisearch');
      const mockClient = (createMeiliSearchClient as any)();
      mockClient.searchProfiles.mockResolvedValue(mockSearchResults);

      const response = await userController.searchProfiles(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.profiles).toHaveLength(2);
      expect(responseData.totalHits).toBe(2);
    });

    it('should handle empty search results', async () => {
      const mockSearchResults = {
        hits: [],
        estimatedTotalHits: 0,
        processingTimeMs: 2
      };

      const searchUrl = 'http://localhost/search/profiles?q=nonexistent';
      mockContext = createMockContext({}, {}, mockJwtPayload, {}, searchUrl);
      
      const { createMeiliSearchClient } = await import('../../src/utils/meilisearch');
      const mockClient = (createMeiliSearchClient as any)();
      mockClient.searchProfiles.mockResolvedValue(mockSearchResults);

      const response = await userController.searchProfiles(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.profiles).toHaveLength(0);
      expect(responseData.totalHits).toBe(0);
    });

    it('should handle Meilisearch unavailable', async () => {
      // Create controller without Meilisearch
      const controllerWithoutSearch = new UserController({});
      
      const response = await controllerWithoutSearch.searchProfiles(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(503);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Search service unavailable');
    });
  });

  describe('Authorization and Security', () => {
    it('should reject requests with invalid JWT type', async () => {
      const invalidJwtPayload = {
        userId: 'test-user-id',
        phoneNumber: '+1234567890',
        type: 'refresh', // Should be 'access'
        exp: Date.now() + 3600000
      };

      mockContext = createMockContext({}, {}, invalidJwtPayload);

      const response = await userController.getMe(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
    });

    it('should reject expired JWT tokens', async () => {
      const expiredJwtPayload = {
        userId: 'test-user-id',
        phoneNumber: '+1234567890',
        type: 'access',
        exp: Date.now() - 3600000 // Expired 1 hour ago
      };

      mockContext = createMockContext({}, {}, expiredJwtPayload);

      const response = await userController.getMe(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
    });

    it('should handle malformed JWT payload', async () => {
      const malformedJwtPayload = {
        // Missing required fields
        type: 'access'
      };

      mockContext = createMockContext({}, {}, malformedJwtPayload);

      const response = await userController.getMe(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
    });
  });
});
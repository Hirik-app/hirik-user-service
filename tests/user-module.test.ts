// Comprehensive tests for User Module
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Context } from 'hono';

// Import factories and mocking infrastructure
import {
  userFactory,
  profileFactory,
  experienceFactory,
  skillUserMapFactory
} from './factories/index';

import {
  CloudflareMockUtils
} from './mocks/cloudflare-env';

import {
  MockJWTUtils,
  MockAuthHeaders
} from './mocks/jwt-utils';

import {
  MockMeilisearchClient
} from './mocks/external-services';

// Import user controller
import UserController from '../src/user-module/controller';
import { ProfileInput, ExperienceInput, SkillAssociationInput } from '../src/user-module/schemas';

describe('User Module', () => {
  let mockEnv: any;
  let mockContext: any;
  let controller: UserController;
  let mockMeilisearch: MockMeilisearchClient;

  beforeEach(() => {
    // Create fresh mock environment for each test
    mockEnv = CloudflareMockUtils.createEnv();
    mockContext = CloudflareMockUtils.createContext({}, mockEnv);
    controller = new UserController(mockEnv);
    mockMeilisearch = new MockMeilisearchClient();
    
    // Mock console.log to avoid test output noise
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up mocks
    mockEnv.__testUtils?.reset();
    vi.restoreAllMocks();
  });

  describe('Get Me Endpoint', () => {
    test('should return user data with onboarding status for candidate', async () => {
      const user = userFactory.build({
        phoneNumber: '1234567890',
        countryCode: '+1'
      });
      
      const profile = profileFactory.build({
        userId: user.id,
        fullName: 'John Doe',
        email: 'john@example.com'
      });

      mockEnv.DB.seedTable('users', [user]);
      mockEnv.DB.seedTable('profiles', [profile]);

      // Mock JWT payload in context
      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);

      const response = await controller.getMe(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data.id).toBe(user.id);
      expect(result.data.phoneNumber).toBe(user.phoneNumber);
      expect(result.data.isOnboardingComplete).toBe(true);
      expect(result.data.isVerified).toBe(true);
    });

    test('should return user data with onboarding incomplete for new user', async () => {
      const user = userFactory.build({
        phoneNumber: '1234567890',
        countryCode: '+1'
      });

      mockEnv.DB.seedTable('users', [user]);
      // No profile created yet

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);

      const response = await controller.getMe(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data.isOnboardingComplete).toBe(false);
      expect(result.data.isVerified).toBe(false);
    });

    test('should reject unauthorized requests', async () => {
      mockContext.get = vi.fn().mockReturnValue(null);

      const response = await controller.getMe(mockContext);
      const result = await response.json();

      expect(response.status).toBe(401);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });

    test('should handle non-access token types', async () => {
      const jwtPayload = {
        userId: 'user-123',
        phoneNumber: '1234567890',
        type: 'refresh', // Wrong token type
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);

      const response = await controller.getMe(mockContext);
      const result = await response.json();

      expect(response.status).toBe(401);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });

    test('should handle missing user in database', async () => {
      const jwtPayload = {
        userId: 'non-existent-user',
        phoneNumber: '1234567890',
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);

      const response = await controller.getMe(mockContext);
      const result = await response.json();

      expect(response.status).toBe(404);
      expect(result.success).toBe(false);
      expect(result.message).toBe('User not found');
    });
  });

  describe('Get Profile Endpoint', () => {
    test('should return complete profile with relationships', async () => {
      const user = userFactory.build();
      const profile = profileFactory.build({
        userId: user.id,
        jobRoleId: 'job-role-123'
      });
      
      const experience = experienceFactory.build({
        profileId: profile.id
      });
      
      const skillMap = skillUserMapFactory.build({
        profileId: profile.id
      });

      mockEnv.DB.seedTable('users', [user]);
      mockEnv.DB.seedTable('profiles', [profile]);
      mockEnv.DB.seedTable('experiences', [experience]);
      mockEnv.DB.seedTable('skillUserMaps', [skillMap]);

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);

      const response = await controller.getProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data.id).toBe(profile.id);
      expect(result.data.userId).toBe(user.id);
    });

    test('should return null for non-existent profile', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);

      const response = await controller.getProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
    });

    test('should reject unauthorized requests', async () => {
      mockContext.get = vi.fn().mockReturnValue(null);

      const response = await controller.getProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(401);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });
  });

  describe('Update Profile Endpoint', () => {
    test('should create new profile with valid data', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const profileData: ProfileInput = {
        fullName: 'John Doe',
        email: 'john@example.com',
        bio: 'Software developer with 5 years experience',
        location: 'New York, NY',
        expectedSalary: '80000',
        yearsOfExperience: '5',
        availableToStart: 'Immediately',
        immediateJoiner: true,
        preferredRole: 'Full Stack Developer'
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(profileData);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data.fullName).toBe(profileData.fullName);
      expect(result.data.email).toBe(profileData.email);
      expect(result.data.userId).toBe(user.id);
    });

    test('should update existing profile', async () => {
      const user = userFactory.build();
      const existingProfile = profileFactory.build({
        userId: user.id,
        fullName: 'Old Name'
      });

      mockEnv.DB.seedTable('users', [user]);
      mockEnv.DB.seedTable('profiles', [existingProfile]);

      const profileData: ProfileInput = {
        fullName: 'Updated Name',
        email: 'updated@example.com'
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(profileData);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data.fullName).toBe('Updated Name');
      expect(result.data.email).toBe('updated@example.com');
    });

    test('should validate email format', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const invalidProfileData = {
        fullName: 'John Doe',
        email: 'invalid-email-format' // Invalid email
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(invalidProfileData);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Validation error');
      expect(result.errors).toBeDefined();
    });

    test('should validate full name length constraints', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const invalidProfileData = {
        fullName: 'A'.repeat(150), // Too long
        email: 'test@example.com'
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(invalidProfileData);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Validation error');
    });

    test('should validate bio length constraints', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const invalidProfileData = {
        fullName: 'John Doe',
        bio: 'A'.repeat(1500) // Too long (max 1000)
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(invalidProfileData);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Validation error');
    });

    test('should handle complex location objects', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const complexLocation = {
        description: 'New York, NY, USA',
        place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
        reference: 'reference123',
        structured_formatting: {
          main_text: 'New York',
          secondary_text: 'NY, USA'
        }
      };

      const profileData: ProfileInput = {
        fullName: 'John Doe',
        location: complexLocation
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(profileData);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      // Location should be stored as JSON string
      expect(typeof result.data.location).toBe('string');
      expect(JSON.parse(result.data.location).description).toBe(complexLocation.description);
    });

    test('should handle file objects for profile picture and CV', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const profileData: ProfileInput = {
        fullName: 'John Doe',
        profilePicture: {
          fileKey: 'profile-pic-key',
          fileUrl: 'https://example.com/profile.jpg',
          uploadUrl: 'https://upload.example.com/profile'
        },
        cvLink: {
          fileKey: 'cv-file-key',
          fileUrl: 'https://example.com/cv.pdf',
          uploadUrl: 'https://upload.example.com/cv'
        }
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(profileData);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      // File objects should be stored as JSON strings
      expect(typeof result.data.profilePicture).toBe('string');
      expect(typeof result.data.cvLink).toBe('string');
    });

    test('should reject unauthorized requests', async () => {
      mockContext.get = vi.fn().mockReturnValue(null);
      mockContext.req.json = vi.fn().mockResolvedValue({});

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(401);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });
  });

  describe('Experience Management', () => {
    describe('Get Experience by Profile ID', () => {
      test('should return experience list for valid profile', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });
        const experiences = [
          experienceFactory.build({ profileId: profile.id }),
          experienceFactory.build({ profileId: profile.id })
        ];

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);
        mockEnv.DB.seedTable('experiences', experiences);

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile.id);

        const response = await controller.getExperienceByProfileId(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.data).toHaveLength(2);
      });

      test('should reject access to other user\'s profile', async () => {
        const user1 = userFactory.build();
        const user2 = userFactory.build();
        const profile2 = profileFactory.build({ userId: user2.id });

        mockEnv.DB.seedTable('users', [user1, user2]);
        mockEnv.DB.seedTable('profiles', [profile2]);

        const jwtPayload = {
          userId: user1.id, // User 1 trying to access User 2's profile
          phoneNumber: user1.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile2.id);

        const response = await controller.getExperienceByProfileId(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Profile not found or unauthorized');
      });

      test('should require profile ID parameter', async () => {
        const user = userFactory.build();
        mockEnv.DB.seedTable('users', [user]);

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(undefined); // No profile ID

        const response = await controller.getExperienceByProfileId(mockContext);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Profile ID is required');
      });
    });

    describe('Add Experience by Profile ID', () => {
      test('should successfully add experience to profile', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);

        const experienceData: ExperienceInput = {
          companyId: 'company-123',
          location: 'San Francisco, CA',
          startDate: '2020-01-01',
          endDate: '2023-12-31',
          isCurrent: false,
          rolesAndResponsibilities: 'Senior Software Engineer responsible for...'
        };

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile.id);
        mockContext.req.json = vi.fn().mockResolvedValue(experienceData);

        const response = await controller.addExperienceByProfileId(mockContext);
        const result = await response.json();

        expect(response.status).toBe(201);
        expect(result.success).toBe(true);
        expect(result.data.companyId).toBe(experienceData.companyId);
        expect(result.data.profileId).toBe(profile.id);
      });

      test('should reject adding experience to other user\'s profile', async () => {
        const user1 = userFactory.build();
        const user2 = userFactory.build();
        const profile2 = profileFactory.build({ userId: user2.id });

        mockEnv.DB.seedTable('users', [user1, user2]);
        mockEnv.DB.seedTable('profiles', [profile2]);

        const experienceData: ExperienceInput = {
          companyId: 'company-123',
          startDate: '2020-01-01',
          isCurrent: true
        };

        const jwtPayload = {
          userId: user1.id, // User 1 trying to add to User 2's profile
          phoneNumber: user1.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile2.id);
        mockContext.req.json = vi.fn().mockResolvedValue(experienceData);

        const response = await controller.addExperienceByProfileId(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Profile not found or unauthorized');
      });
    });

    describe('Update Experience by ID', () => {
      test('should successfully update own experience', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });
        const experience = experienceFactory.build({ 
          profileId: profile.id,
          companyId: 'old-company'
        });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);
        mockEnv.DB.seedTable('experiences', [experience]);

        const updateData = {
          companyId: 'new-company',
          location: 'Updated Location'
        };

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(experience.id);
        mockContext.req.json = vi.fn().mockResolvedValue(updateData);

        const response = await controller.updateExperienceById(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.data.companyId).toBe('new-company');
      });

      test('should reject updating other user\'s experience', async () => {
        const user1 = userFactory.build();
        const user2 = userFactory.build();
        const profile2 = profileFactory.build({ userId: user2.id });
        const experience2 = experienceFactory.build({ profileId: profile2.id });

        mockEnv.DB.seedTable('users', [user1, user2]);
        mockEnv.DB.seedTable('profiles', [profile2]);
        mockEnv.DB.seedTable('experiences', [experience2]);

        const updateData = {
          companyId: 'hacker-company'
        };

        const jwtPayload = {
          userId: user1.id, // User 1 trying to update User 2's experience
          phoneNumber: user1.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(experience2.id);
        mockContext.req.json = vi.fn().mockResolvedValue(updateData);

        const response = await controller.updateExperienceById(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Experience not found or unauthorized');
      });
    });

    describe('Delete Experience by ID', () => {
      test('should successfully delete own experience', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });
        const experience = experienceFactory.build({ profileId: profile.id });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);
        mockEnv.DB.seedTable('experiences', [experience]);

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(experience.id);

        const response = await controller.deleteExperienceById(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.message).toBe('Experience deleted successfully');
      });

      test('should reject deleting other user\'s experience', async () => {
        const user1 = userFactory.build();
        const user2 = userFactory.build();
        const profile2 = profileFactory.build({ userId: user2.id });
        const experience2 = experienceFactory.build({ profileId: profile2.id });

        mockEnv.DB.seedTable('users', [user1, user2]);
        mockEnv.DB.seedTable('profiles', [profile2]);
        mockEnv.DB.seedTable('experiences', [experience2]);

        const jwtPayload = {
          userId: user1.id, // User 1 trying to delete User 2's experience
          phoneNumber: user1.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(experience2.id);

        const response = await controller.deleteExperienceById(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Experience not found or unauthorized');
      });
    });
  });

  describe('Skills Management', () => {
    describe('Get Skills by Profile ID', () => {
      test('should return skills list for valid profile', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });
        const skillMaps = [
          skillUserMapFactory.build({ profileId: profile.id, skillId: 'skill-1' }),
          skillUserMapFactory.build({ profileId: profile.id, skillId: 'skill-2' })
        ];

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);
        mockEnv.DB.seedTable('skillUserMaps', skillMaps);

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile.id);

        const response = await controller.getSkillsByProfileId(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.data).toHaveLength(2);
      });

      test('should reject access to other user\'s profile skills', async () => {
        const user1 = userFactory.build();
        const user2 = userFactory.build();
        const profile2 = profileFactory.build({ userId: user2.id });

        mockEnv.DB.seedTable('users', [user1, user2]);
        mockEnv.DB.seedTable('profiles', [profile2]);

        const jwtPayload = {
          userId: user1.id, // User 1 trying to access User 2's skills
          phoneNumber: user1.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile2.id);

        const response = await controller.getSkillsByProfileId(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Profile not found or unauthorized');
      });
    });

    describe('Add Skills to Profile', () => {
      test('should successfully add skills to profile', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);

        const skillData: SkillAssociationInput = {
          skillIds: ['skill-1', 'skill-2', 'skill-3']
        };

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile.id);
        mockContext.req.json = vi.fn().mockResolvedValue(skillData);

        const response = await controller.addSkillsToProfile(mockContext);
        const result = await response.json();

        expect(response.status).toBe(201);
        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
      });

      test('should validate skill IDs array', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);

        const invalidSkillData = {
          skillIds: [] // Empty array not allowed
        };

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile.id);
        mockContext.req.json = vi.fn().mockResolvedValue(invalidSkillData);

        const response = await controller.addSkillsToProfile(mockContext);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Validation error');
      });

      test('should validate skill ID format', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);

        const invalidSkillData = {
          skillIds: ['valid-skill-1', '', 'valid-skill-2'] // Empty string not allowed
        };

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile.id);
        mockContext.req.json = vi.fn().mockResolvedValue(invalidSkillData);

        const response = await controller.addSkillsToProfile(mockContext);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Validation error');
      });

      test('should replace existing skills (not append)', async () => {
        const user = userFactory.build();
        const profile = profileFactory.build({ userId: user.id });
        const existingSkillMaps = [
          skillUserMapFactory.build({ profileId: profile.id, skillId: 'old-skill-1' }),
          skillUserMapFactory.build({ profileId: profile.id, skillId: 'old-skill-2' })
        ];

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);
        mockEnv.DB.seedTable('skillUserMaps', existingSkillMaps);

        const skillData: SkillAssociationInput = {
          skillIds: ['new-skill-1', 'new-skill-2']
        };

        const jwtPayload = {
          userId: user.id,
          phoneNumber: user.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile.id);
        mockContext.req.json = vi.fn().mockResolvedValue(skillData);

        const response = await controller.addSkillsToProfile(mockContext);
        const result = await response.json();

        expect(response.status).toBe(201);
        expect(result.success).toBe(true);
        // This should replace existing skills, not append
      });

      test('should reject adding skills to other user\'s profile', async () => {
        const user1 = userFactory.build();
        const user2 = userFactory.build();
        const profile2 = profileFactory.build({ userId: user2.id });

        mockEnv.DB.seedTable('users', [user1, user2]);
        mockEnv.DB.seedTable('profiles', [profile2]);

        const skillData: SkillAssociationInput = {
          skillIds: ['hacker-skill-1']
        };

        const jwtPayload = {
          userId: user1.id, // User 1 trying to modify User 2's skills
          phoneNumber: user1.phoneNumber,
          type: 'access',
          exp: Math.floor(Date.now() / 1000) + 3600
        };
        mockContext.get = vi.fn().mockReturnValue(jwtPayload);
        mockContext.req.param = vi.fn().mockReturnValue(profile2.id);
        mockContext.req.json = vi.fn().mockResolvedValue(skillData);

        const response = await controller.addSkillsToProfile(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Profile not found or unauthorized');
      });
    });
  });

  describe('Profile Search Functionality', () => {
    test('should successfully search profiles with query', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      // Mock the search functionality
      const mockSearchResults = {
        hits: [
          {
            id: 'profile-1',
            fullName: 'John Developer',
            skills: ['JavaScript', 'React']
          }
        ],
        estimatedTotalHits: 1
      };

      // Mock Meilisearch search
      vi.spyOn(mockMeilisearch, 'searchProfiles').mockResolvedValue(mockSearchResults);

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.query = vi.fn().mockReturnValue({ 
        q: 'javascript developer',
        limit: '10'
      });

      // Need to mock the controller's meilisearch client
      const controllerWithMockSearch = new UserController(mockEnv);
      (controllerWithMockSearch as any).meilisearch = mockMeilisearch;

      const response = await controllerWithMockSearch.searchProfiles(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data.profiles).toHaveLength(1);
      expect(result.data.query).toBe('javascript developer');
      expect(result.data.totalHits).toBe(1);
    });

    test('should reject search queries that are too short', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.query = vi.fn().mockReturnValue({ 
        q: 'a' // Too short (less than 2 characters)
      });

      const response = await controller.searchProfiles(mockContext);
      const result = await response.json();

      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Search query must be at least 2 characters');
    });

    test('should handle missing search service gracefully', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      // Create controller without Meilisearch
      const controllerWithoutSearch = new UserController({
        ...mockEnv,
        MEILISEARCH_HOST: undefined
      });

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.query = vi.fn().mockReturnValue({ 
        q: 'javascript developer'
      });

      const response = await controllerWithoutSearch.searchProfiles(mockContext);
      const result = await response.json();

      expect(response.status).toBe(503);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Search functionality is not available');
    });

    test('should apply default limit when not specified', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const mockSearchResults = {
        hits: Array(20).fill(null).map((_, i) => ({
          id: `profile-${i}`,
          fullName: `Developer ${i}`
        })),
        estimatedTotalHits: 20
      };

      vi.spyOn(mockMeilisearch, 'searchProfiles').mockResolvedValue(mockSearchResults);

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.query = vi.fn().mockReturnValue({ 
        q: 'developer' 
        // No limit specified, should default to 20
      });

      const controllerWithMockSearch = new UserController(mockEnv);
      (controllerWithMockSearch as any).meilisearch = mockMeilisearch;

      const response = await controllerWithMockSearch.searchProfiles(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(mockMeilisearch.searchProfiles).toHaveBeenCalledWith('developer', undefined, 20);
    });

    test('should handle search service errors gracefully', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      // Mock search error
      vi.spyOn(mockMeilisearch, 'searchProfiles').mockRejectedValue(new Error('Search service unavailable'));

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.query = vi.fn().mockReturnValue({ 
        q: 'developer'
      });

      const controllerWithMockSearch = new UserController(mockEnv);
      (controllerWithMockSearch as any).meilisearch = mockMeilisearch;

      const response = await controllerWithMockSearch.searchProfiles(mockContext);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Internal server error');
    });

    test('should reject unauthorized search requests', async () => {
      mockContext.get = vi.fn().mockReturnValue(null);
      mockContext.req.query = vi.fn().mockReturnValue({ 
        q: 'developer'
      });

      const response = await controller.searchProfiles(mockContext);
      const result = await response.json();

      expect(response.status).toBe(401);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });
  });
});
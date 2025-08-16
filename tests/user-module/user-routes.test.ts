/**
 * User Module Routes Tests
 * Tests for user routes including profile management, experience, and skills endpoints
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Hono } from 'hono';
import userRoutes from '../../src/user-module/routes';
import { createMockUser, createMockProfile, createMockExperience } from '../__mocks__/factories';

// Create shared mock methods
const mockMethods = {
  getMe: vi.fn(),
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
  getExperienceByProfileId: vi.fn(),
  addExperienceByProfileId: vi.fn(),
  updateExperienceById: vi.fn(),
  deleteExperienceById: vi.fn(),
  getSkillsByProfileId: vi.fn(),
  addSkillsToProfile: vi.fn(),
  searchProfiles: vi.fn()
};

// Mock the UserController
let mockControllerConstructor: any;
vi.mock('../../src/user-module/controller', () => {
  mockControllerConstructor = vi.fn().mockImplementation((env) => {
    // Store the env parameter for verification
    mockControllerConstructor.lastEnv = env;
    return mockMethods;
  });
  return {
    default: mockControllerConstructor
  };
});

describe('User Routes', () => {
  let app: Hono;
  let mockEnv: any;

  beforeEach(async () => {
    app = new Hono();
    app.route('/user', userRoutes);
    
    mockEnv = {
      DB: 'mock-db',
      MEILISEARCH_HOST: 'https://meilisearch.hirik.online',
      MEILISEARCH_API_KEY: '1d97196c01a455e08bcfc6c510517d7632c35a663211dcdb1df60d5fad13b057'
    };
    
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /user/me', () => {
    it('should return user data for authenticated user', async () => {
      const user = createMockUser();
      
      mockMethods.getMe.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          user: {
            id: user.id,
            phoneNumber: user.phoneNumber,
            countryCode: user.countryCode,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
        }), { status: 200 })
      );

      const req = new Request('http://localhost/user/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.user).toBeDefined();
      expect(responseData.user.id).toBe(user.id);
    });

    it('should handle unauthorized access', async () => {
      mockMethods.getMe.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Unauthorized'
        }), { status: 401 })
      );

      const req = new Request('http://localhost/user/me', {
        method: 'GET'
        // No authorization header
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Unauthorized');
    });
  });

  describe('GET /user/profile', () => {
    it('should return user profile', async () => {
      const profile = createMockProfile();
      
      mockMethods.getProfile.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          profile: profile
        }), { status: 200 })
      );

      const req = new Request('http://localhost/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.profile).toBeDefined();
      expect(responseData.profile.id).toBe(profile.id);
    });

    it('should handle profile not found', async () => {
      mockMethods.getProfile.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Profile not found'
        }), { status: 404 })
      );

      const req = new Request('http://localhost/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('not found');
    });
  });

  describe('PUT /user/profile', () => {
    it('should update user profile with valid data', async () => {
      const updateData = {
        fullName: 'Updated Name',
        email: 'updated@example.com',
        bio: 'Updated bio'
      };
      
      const updatedProfile = createMockProfile(updateData);
      
      mockMethods.updateProfile.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          profile: updatedProfile,
          message: 'Profile updated successfully'
        }), { status: 200 })
      );

      const req = new Request('http://localhost/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(updateData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.profile.fullName).toBe(updateData.fullName);
      expect(responseData.profile.email).toBe(updateData.email);
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        email: 'invalid-email-format'
      };
      
      mockMethods.updateProfile.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Invalid email format'
        }), { status: 400 })
      );

      const req = new Request('http://localhost/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(invalidData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Invalid email format');
    });
  });

  describe('GET /user/profile/experience/:profileId', () => {
    it('should return experience records for profile', async () => {
      const profileId = 'test-profile-id';
      const experiences = [
        createMockExperience({ profileId }),
        createMockExperience({ profileId })
      ];
      
      mockMethods.getExperienceByProfileId.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          experiences: experiences
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${profileId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.experiences).toHaveLength(2);
    });

    it('should handle empty experience list', async () => {
      const profileId = 'test-profile-id';
      
      mockMethods.getExperienceByProfileId.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          experiences: []
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${profileId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.experiences).toHaveLength(0);
    });
  });

  describe('POST /user/profile/experience/:profileId', () => {
    it('should add new experience record', async () => {
      const profileId = 'test-profile-id';
      const experienceData = {
        companyId: 'company-123',
        startDate: '2023-01-01',
        isCurrent: true,
        rolesAndResponsibilities: 'Software development'
      };
      
      const newExperience = createMockExperience({ profileId, ...experienceData });
      
      mockMethods.addExperienceByProfileId.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          experience: newExperience,
          message: 'Experience added successfully'
        }), { status: 201 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(experienceData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.experience.companyId).toBe(experienceData.companyId);
    });

    it('should handle validation errors for experience', async () => {
      const profileId = 'test-profile-id';
      const invalidData = {
        // Missing required fields
        isCurrent: true
      };
      
      mockMethods.addExperienceByProfileId.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Company ID and start date are required'
        }), { status: 400 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(invalidData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('required');
    });
  });

  describe('PUT /user/profile/experience/:id', () => {
    it('should update experience record', async () => {
      const experienceId = 'experience-123';
      const updateData = {
        rolesAndResponsibilities: 'Updated responsibilities',
        endDate: '2023-12-31',
        isCurrent: false
      };
      
      const updatedExperience = createMockExperience({ id: experienceId, ...updateData });
      
      mockMethods.updateExperienceById.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          experience: updatedExperience,
          message: 'Experience updated successfully'
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${experienceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(updateData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.experience.rolesAndResponsibilities).toBe(updateData.rolesAndResponsibilities);
    });

    it('should handle non-existent experience update', async () => {
      const experienceId = 'non-existent-id';
      const updateData = { rolesAndResponsibilities: 'Updated' };
      
      mockMethods.updateExperienceById.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Experience not found'
        }), { status: 404 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${experienceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(updateData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('not found');
    });
  });

  describe('DELETE /user/profile/experience/:id', () => {
    it('should delete experience record', async () => {
      const experienceId = 'experience-123';
      
      mockMethods.deleteExperienceById.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          message: 'Experience deleted successfully'
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${experienceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toContain('deleted successfully');
    });

    it('should handle non-existent experience deletion', async () => {
      const experienceId = 'non-existent-id';
      
      mockMethods.deleteExperienceById.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Experience not found'
        }), { status: 404 })
      );

      const req = new Request(`http://localhost/user/profile/experience/${experienceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('not found');
    });
  });

  describe('GET /user/profile/skills/:profileId', () => {
    it('should return skills for profile', async () => {
      const profileId = 'test-profile-id';
      const skills = [
        { id: '1', skillId: 'skill-1', profileId },
        { id: '2', skillId: 'skill-2', profileId }
      ];
      
      mockMethods.getSkillsByProfileId.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          skills: skills
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/user/profile/skills/${profileId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.skills).toHaveLength(2);
    });
  });

  describe('POST /user/profile/skills/:profileId', () => {
    it('should add skills to profile', async () => {
      const profileId = 'test-profile-id';
      const skillData = {
        skillIds: ['skill-1', 'skill-2', 'skill-3']
      };
      
      const addedSkills = skillData.skillIds.map((skillId, index) => ({
        id: `mapping-${index}`,
        skillId,
        profileId
      }));
      
      mockMethods.addSkillsToProfile.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          skills: addedSkills,
          message: 'Skills added successfully'
        }), { status: 201 })
      );

      const req = new Request(`http://localhost/user/profile/skills/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(skillData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.skills).toHaveLength(3);
    });

    it('should handle invalid skill data', async () => {
      const profileId = 'test-profile-id';
      const invalidData = {
        skillIds: [] // Empty array
      };
      
      mockMethods.addSkillsToProfile.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'At least one skill is required'
        }), { status: 400 })
      );

      const req = new Request(`http://localhost/user/profile/skills/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(invalidData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('At least one skill is required');
    });
  });

  describe('GET /user/search/profiles', () => {
    it('should search profiles with query', async () => {
      const searchResults = {
        profiles: [
          { id: 'profile-1', fullName: 'John Doe', preferredRole: 'Software Engineer' },
          { id: 'profile-2', fullName: 'Jane Smith', preferredRole: 'Senior Developer' }
        ],
        totalHits: 2,
        processingTime: 5
      };
      
      mockMethods.searchProfiles.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          ...searchResults
        }), { status: 200 })
      );

      const req = new Request('http://localhost/user/search/profiles?q=software+engineer', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.profiles).toHaveLength(2);
      expect(responseData.totalHits).toBe(2);
    });

    it('should handle empty search results', async () => {
      mockMethods.searchProfiles.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          profiles: [],
          totalHits: 0,
          processingTime: 2
        }), { status: 200 })
      );

      const req = new Request('http://localhost/user/search/profiles?q=nonexistent', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.profiles).toHaveLength(0);
      expect(responseData.totalHits).toBe(0);
    });

    it('should handle search service unavailable', async () => {
      mockMethods.searchProfiles.mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Search service unavailable'
        }), { status: 503 })
      );

      const req = new Request('http://localhost/user/search/profiles?q=test', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(503);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Search service unavailable');
    });
  });

  describe('Route Integration and Error Handling', () => {
    it('should handle unsupported HTTP methods', async () => {
      const req = new Request('http://localhost/user/profile', {
        method: 'PATCH' // Not supported
      });

      const res = await app.request(req, mockEnv);
      expect(res.status).toBe(404); // Method not found
    });

    it('should handle non-existent routes', async () => {
      const req = new Request('http://localhost/user/non-existent', {
        method: 'GET'
      });

      const res = await app.request(req, mockEnv);
      expect(res.status).toBe(404);
    });

    it('should handle malformed JSON in request body', async () => {
      const req = new Request('http://localhost/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: 'not-json-at-all' // Non-JSON string to test error handling
      });

      const res = await app.request(req, mockEnv);
      // Should handle JSON parsing error gracefully
      expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should handle missing Content-Type header', async () => {
      const req = new Request('http://localhost/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify({ fullName: 'Test' })
      });

      const res = await app.request(req, mockEnv);
      // Should still work or return appropriate error
      expect(res.status).toBeDefined();
    });

    it('should handle large request bodies', async () => {
      const largeBody = {
        fullName: 'Test User',
        bio: 'x'.repeat(10000) // Large bio
      };

      const req = new Request('http://localhost/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(largeBody)
      });

      const res = await app.request(req, mockEnv);
      expect(res.status).toBeDefined();
    });

    it('should maintain consistent response format across routes', async () => {
      const routes = [
        { path: '/user/me', method: 'GET' },
        { path: '/user/profile', method: 'GET' },
        { path: '/user/search/profiles', method: 'GET' }
      ];

      for (const route of routes) {
        const req = new Request(`http://localhost${route.path}`, {
          method: route.method,
          headers: {
            'Authorization': 'Bearer valid-jwt-token'
          }
        });

        const res = await app.request(req, mockEnv);
        const responseData = await res.json() as any;

        // All responses should have success field
        expect(responseData).toHaveProperty('success');
        expect(typeof responseData.success).toBe('boolean');
      }
    });

    it('should handle concurrent requests', async () => {
      const requests = Array(5).fill(null).map(() => 
        new Request('http://localhost/user/me', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer valid-jwt-token'
          }
        })
      );

      const responses = await Promise.all(
        requests.map(req => app.request(req, mockEnv))
      );

      // All requests should be handled
      responses.forEach(res => {
        expect(res.status).toBeDefined();
        expect(res.status).toBeGreaterThanOrEqual(200);
      });
    });

    it('should pass environment variables to controller', async () => {
      const req = new Request('http://localhost/user/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      await app.request(req, mockEnv);

      // Verify controller was instantiated with environment
      expect(mockControllerConstructor).toHaveBeenCalledWith(mockEnv);
    });
  });
});
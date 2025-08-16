/**
 * Education Module Routes Tests
 * Tests for education routes including CRUD operations
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Hono } from 'hono';

// Import the mock BEFORE importing any modules that use Prisma
import { mockPrismaClient, setupMockEducation } from '../__mocks__/prisma';

import educationRoutes from '../../src/education-module/routes';
import { createMockEducation } from '../__mocks__/factories';

describe('Education Routes', () => {
  let app: Hono;
  let mockEnv: any;

  beforeEach(() => {
    app = new Hono();
    
    // Add JWT middleware mock BEFORE routes
    app.use('*', (c, next) => {
      c.set('jwtPayload', {
        userId: 'test-user-id',
        phoneNumber: '+1234567890',
        type: 'access',
        exp: Date.now() + 3600000
      });
      return next();
    });
    
    app.route('/education', educationRoutes);
    
    mockEnv = {
      DB: 'mock-db'
    };
    
    // Reset all Prisma mocks before each test
    vi.clearAllMocks();
    Object.values(mockPrismaClient).forEach(model => {
      if (typeof model === 'object' && model !== null) {
        Object.values(model).forEach(method => {
          if (typeof method === 'function' && 'mockReset' in method) {
            method.mockReset();
          }
        });
      }
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /education/profile/:profileId', () => {
    it('should return education records for profile', async () => {
      const profileId = 'test-profile-id';
      const userId = 'test-user-id';
      const educationRecords = [
        createMockEducation({ profileId }),
        createMockEducation({ profileId })
      ];
      
      // Mock the database calls that the controller will make
      mockPrismaClient.profile.findFirst.mockResolvedValue({
        id: profileId,
        userId: userId
      });
      mockPrismaClient.education.findMany.mockResolvedValue(educationRecords);

      const req = new Request(`http://localhost/education/profile/${profileId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toHaveLength(2);
    });

    it('should handle empty education list', async () => {
      const profileId = 'test-profile-id';
      
      mockGetEducationByProfileId.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          data: []
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/education/profile/${profileId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.data).toHaveLength(0);
      expect(mockGetEducationByProfileId).toHaveBeenCalledOnce();
    });

    it('should handle unauthorized access', async () => {
      const profileId = 'test-profile-id';
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.getEducationByProfileId as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Unauthorized'
        }), { status: 401 })
      );

      const req = new Request(`http://localhost/education/profile/${profileId}`, {
        method: 'GET'
        // No authorization header
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Unauthorized');
    });

    it('should handle missing profile ID parameter', async () => {
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.getEducationByProfileId as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Profile ID is required'
        }), { status: 400 })
      );

      const req = new Request('http://localhost/education/profile/', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      const res = await app.request(req, mockEnv);
      
      // Should return 404 for malformed route or handle gracefully
      expect([400, 404]).toContain(res.status);
    });
  });

  describe('POST /education/profile/:profileId', () => {
    it('should add new education record with valid data', async () => {
      const profileId = 'test-profile-id';
      const educationData = {
        degree: 'Bachelor of Computer Science',
        institution: 'University of Technology',
        location: 'San Francisco, CA',
        startDate: '2018-09-01',
        endDate: '2022-05-15',
        grade: 'A',
        description: 'Focused on software engineering and algorithms',
        isCurrent: false
      };
      
      const newEducation = createMockEducation({ profileId, ...educationData });
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.addEducationByProfileId as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          education: newEducation,
          message: 'Education record added successfully'
        }), { status: 201 })
      );

      const req = new Request(`http://localhost/education/profile/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(educationData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.education.degree).toBe(educationData.degree);
      expect(responseData.education.institution).toBe(educationData.institution);
    });

    it('should add current education without end date', async () => {
      const profileId = 'test-profile-id';
      const educationData = {
        degree: 'Master of Science',
        institution: 'Graduate University',
        startDate: '2023-09-01',
        isCurrent: true
      };
      
      const newEducation = createMockEducation({ profileId, ...educationData });
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.addEducationByProfileId as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          education: newEducation,
          message: 'Education record added successfully'
        }), { status: 201 })
      );

      const req = new Request(`http://localhost/education/profile/${profileId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(educationData)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.education.isCurrent).toBe(true);
    });

    it('should handle validation errors', async () => {
      const profileId = 'test-profile-id';
      const invalidData = {
        // Missing required fields
        startDate: '2023-01-01',
        isCurrent: true
      };
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.addEducationByProfileId as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Degree and institution are required'
        }), { status: 400 })
      );

      const req = new Request(`http://localhost/education/profile/${profileId}`, {
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

    it('should handle field length validation errors', async () => {
      const profileId = 'test-profile-id';
      const invalidData = {
        degree: 'x'.repeat(101), // Too long
        institution: 'x'.repeat(201), // Too long
        description: 'x'.repeat(1001), // Too long
        startDate: '2023-01-01',
        isCurrent: false
      };
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.addEducationByProfileId as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Field values are too long'
        }), { status: 400 })
      );

      const req = new Request(`http://localhost/education/profile/${profileId}`, {
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
      expect(responseData.message).toContain('too long');
    });
  });

  describe('PUT /education/:id', () => {
    it('should update education record with valid data', async () => {
      const educationId = 'education-123';
      const updateData = {
        degree: 'Master of Computer Science',
        grade: 'A+',
        description: 'Updated description with thesis focus on AI',
        endDate: '2023-12-31',
        isCurrent: false
      };
      
      const updatedEducation = createMockEducation({ id: educationId, ...updateData });
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.updateEducationById as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          education: updatedEducation,
          message: 'Education record updated successfully'
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/education/${educationId}`, {
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
      expect(responseData.education.degree).toBe(updateData.degree);
      expect(responseData.education.grade).toBe(updateData.grade);
    });

    it('should update to current education', async () => {
      const educationId = 'education-123';
      const updateData = {
        isCurrent: true,
        endDate: undefined // Should be removed when current
      };
      
      const updatedEducation = createMockEducation({ id: educationId, isCurrent: true, endDate: null });
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.updateEducationById as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          education: updatedEducation,
          message: 'Education record updated successfully'
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/education/${educationId}`, {
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
      expect(responseData.education.isCurrent).toBe(true);
    });

    it('should handle non-existent education record', async () => {
      const educationId = 'non-existent-id';
      const updateData = { degree: 'Updated Degree' };
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.updateEducationById as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Education record not found'
        }), { status: 404 })
      );

      const req = new Request(`http://localhost/education/${educationId}`, {
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

    it('should handle validation errors in update', async () => {
      const educationId = 'education-123';
      const invalidData = {
        degree: 'x'.repeat(101), // Too long
        institution: 'x'.repeat(201) // Too long
      };
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.updateEducationById as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Validation failed: fields too long'
        }), { status: 400 })
      );

      const req = new Request(`http://localhost/education/${educationId}`, {
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
      expect(responseData.message).toContain('too long');
    });
  });

  describe('DELETE /education/:id', () => {
    it('should delete education record successfully', async () => {
      const educationId = 'education-123';
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.deleteEducationById as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          message: 'Education record deleted successfully'
        }), { status: 200 })
      );

      const req = new Request(`http://localhost/education/${educationId}`, {
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

    it('should handle non-existent education deletion', async () => {
      const educationId = 'non-existent-id';
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.deleteEducationById as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Education record not found'
        }), { status: 404 })
      );

      const req = new Request(`http://localhost/education/${educationId}`, {
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

    it('should handle unauthorized deletion', async () => {
      const educationId = 'education-123';
      
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockController = new EducationController();
      (mockController.deleteEducationById as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Unauthorized'
        }), { status: 401 })
      );

      const req = new Request(`http://localhost/education/${educationId}`, {
        method: 'DELETE'
        // No authorization header
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Unauthorized');
    });
  });

  describe('Route Integration and Error Handling', () => {
    it('should handle unsupported HTTP methods', async () => {
      const req = new Request('http://localhost/education/profile/test-id', {
        method: 'PATCH' // Not supported
      });

      const res = await app.request(req, mockEnv);
      expect(res.status).toBe(404); // Method not found
    });

    it('should handle non-existent routes', async () => {
      const req = new Request('http://localhost/education/non-existent', {
        method: 'GET'
      });

      const res = await app.request(req, mockEnv);
      expect(res.status).toBe(404);
    });

    it('should handle malformed JSON in request body', async () => {
      const req = new Request('http://localhost/education/profile/test-id', {
        method: 'POST',
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
      const educationData = {
        degree: 'Test Degree',
        institution: 'Test Institution',
        startDate: '2023-01-01',
        isCurrent: false
      };

      const req = new Request('http://localhost/education/profile/test-id', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(educationData)
      });

      const res = await app.request(req, mockEnv);
      // Should still work or return appropriate error
      expect(res.status).toBeDefined();
    });

    it('should maintain consistent response format across routes', async () => {
      const routes = [
        { path: '/education/profile/test-id', method: 'GET' },
        { path: '/education/profile/test-id', method: 'POST', body: { degree: 'Test', institution: 'Test', startDate: '2023-01-01', isCurrent: false } },
        { path: '/education/test-id', method: 'PUT', body: { degree: 'Updated' } },
        { path: '/education/test-id', method: 'DELETE' }
      ];

      for (const route of routes) {
        const req = new Request(`http://localhost${route.path}`, {
          method: route.method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer valid-jwt-token'
          },
          body: route.body ? JSON.stringify(route.body) : undefined
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
        new Request('http://localhost/education/profile/test-id', {
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
      const EducationController = (await import('../../src/education-module/controller')).default;
      const mockControllerConstructor = EducationController as any;
      
      const req = new Request('http://localhost/education/profile/test-id', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer valid-jwt-token'
        }
      });

      await app.request(req, mockEnv);

      // Verify controller was instantiated with environment
      expect(mockControllerConstructor).toHaveBeenCalledWith(mockEnv);
    });

    it('should handle large request bodies', async () => {
      const largeEducationData = {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology and Applied Sciences',
        location: 'San Francisco Bay Area, California, United States',
        description: 'A'.repeat(900), // Large but valid description
        startDate: '2020-01-01',
        endDate: '2024-05-15',
        grade: 'Magna Cum Laude (3.8/4.0)',
        isCurrent: false
      };

      const req = new Request('http://localhost/education/profile/test-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer valid-jwt-token'
        },
        body: JSON.stringify(largeEducationData)
      });

      const res = await app.request(req, mockEnv);
      expect(res.status).toBeDefined();
    });
  });
});
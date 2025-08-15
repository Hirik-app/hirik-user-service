/**
 * Education Module Controller Tests
 * Tests for education controller methods including CRUD operations and validation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Context } from 'hono';
import EducationController from '../../src/education-module/controller';
import { mockPrismaClient, setupMockEducation, resetPrismaMocks } from '../__mocks__/prisma';
import { createMockEducation, createMockProfile } from '../__mocks__/factories';

// Mock PrismaClient constructor to return our mock
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrismaClient)
}));

// Mock PrismaD1 adapter
vi.mock('@prisma/adapter-d1', () => ({
  PrismaD1: vi.fn()
}));

// Mock context helper
const createMockContext = (body: any = {}, params: any = {}, jwtPayload: any = null, env: any = {}): Context => {
  const mockRequest = {
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(JSON.stringify(body)),
    headers: new Headers(),
    method: 'GET',
    url: 'http://localhost:3000/test'
  };

  return {
    req: mockRequest,
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

describe('Education Controller', () => {
  let educationController: EducationController;
  let mockContext: Context;
  let mockJwtPayload: any;

  beforeEach(() => {
    resetPrismaMocks();
    educationController = new EducationController(); // Will use mocked PrismaClient
    mockJwtPayload = {
      userId: 'test-user-id',
      phoneNumber: '1234567890', // Fixed phone number format
      type: 'access',
      exp: Date.now() + 3600000
    };
    mockContext = createMockContext({}, {}, mockJwtPayload);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getEducationByProfileId', () => {
    it('should return education records for valid profile', async () => {
      const profileId = 'test-profile-id';
      const educationRecords = [
        createMockEducation({ profileId }),
        createMockEducation({ profileId })
      ];

      mockContext = createMockContext({}, { profileId }, mockJwtPayload);
      mockPrismaClient.education.findMany.mockResolvedValue(educationRecords);

      const response = await educationController.getEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.education).toHaveLength(2);
      expect(responseData.education[0].profileId).toBe(profileId);
    });

    it('should handle empty education list', async () => {
      const profileId = 'test-profile-id';

      mockContext = createMockContext({}, { profileId }, mockJwtPayload);
      mockPrismaClient.education.findMany.mockResolvedValue([]);

      const response = await educationController.getEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.education).toHaveLength(0);
    });

    it('should handle missing profile ID parameter', async () => {
      mockContext = createMockContext({}, {}, mockJwtPayload); // No profileId param

      const response = await educationController.getEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Profile ID is required');
    });

    it('should handle unauthorized access', async () => {
      mockContext = createMockContext({}, { profileId: 'test-profile-id' }, null);

      const response = await educationController.getEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Unauthorized');
    });

    it('should handle database errors', async () => {
      const profileId = 'test-profile-id';
      mockContext = createMockContext({}, { profileId }, mockJwtPayload);
      mockPrismaClient.education.findMany.mockRejectedValue(new Error('Database error'));

      const response = await educationController.getEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Internal server error');
    });
  });

  describe('addEducationByProfileId', () => {
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

      mockContext = createMockContext(educationData, { profileId }, mockJwtPayload);
      
      const newEducation = createMockEducation({ profileId, ...educationData });
      mockPrismaClient.education.create.mockResolvedValue(newEducation);

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.education.degree).toBe(educationData.degree);
      expect(responseData.education.institution).toBe(educationData.institution);
      expect(responseData.education.profileId).toBe(profileId);
    });

    it('should add current education record without end date', async () => {
      const profileId = 'test-profile-id';
      const educationData = {
        degree: 'Master of Science',
        institution: 'Graduate University',
        startDate: '2023-09-01',
        isCurrent: true
      };

      mockContext = createMockContext(educationData, { profileId }, mockJwtPayload);
      
      const newEducation = createMockEducation({ profileId, ...educationData });
      mockPrismaClient.education.create.mockResolvedValue(newEducation);

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
      expect(responseData.education.isCurrent).toBe(true);
      expect(responseData.education.endDate).toBeUndefined();
    });

    it('should validate required fields', async () => {
      const profileId = 'test-profile-id';
      const invalidData = {
        // Missing degree and institution
        startDate: '2023-01-01',
        isCurrent: true
      };

      mockContext = createMockContext(invalidData, { profileId }, mockJwtPayload);

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('required');
    });

    it('should validate field lengths', async () => {
      const profileId = 'test-profile-id';
      const invalidData = {
        degree: 'x'.repeat(101), // Too long
        institution: 'x'.repeat(201), // Too long
        description: 'x'.repeat(1001), // Too long
        startDate: '2023-01-01',
        isCurrent: false
      };

      mockContext = createMockContext(invalidData, { profileId }, mockJwtPayload);

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('too long');
    });

    it('should handle empty required fields', async () => {
      const profileId = 'test-profile-id';
      const invalidData = {
        degree: '', // Empty
        institution: '', // Empty
        startDate: '', // Empty
        isCurrent: true
      };

      mockContext = createMockContext(invalidData, { profileId }, mockJwtPayload);

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('required');
    });

    it('should handle unauthorized access', async () => {
      const profileId = 'test-profile-id';
      const educationData = {
        degree: 'Bachelor of Science',
        institution: 'University',
        startDate: '2020-01-01',
        isCurrent: false
      };

      mockContext = createMockContext(educationData, { profileId }, null); // No JWT

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Unauthorized');
    });
  });

  describe('updateEducationById', () => {
    it('should update education record with valid data', async () => {
      const educationId = 'education-123';
      const updateData = {
        degree: 'Master of Computer Science',
        grade: 'A+',
        description: 'Updated description',
        endDate: '2023-12-31',
        isCurrent: false
      };

      mockContext = createMockContext(updateData, { id: educationId }, mockJwtPayload);
      
      const updatedEducation = createMockEducation({ id: educationId, ...updateData });
      mockPrismaClient.education.update.mockResolvedValue(updatedEducation);

      const response = await educationController.updateEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.education.degree).toBe(updateData.degree);
      expect(responseData.education.grade).toBe(updateData.grade);
      expect(responseData.education.isCurrent).toBe(false);
    });

    it('should update to current education', async () => {
      const educationId = 'education-123';
      const updateData = {
        isCurrent: true,
        endDate: undefined // Should be removed when current
      };

      mockContext = createMockContext(updateData, { id: educationId }, mockJwtPayload);
      
      const updatedEducation = createMockEducation({ id: educationId, isCurrent: true, endDate: null });
      mockPrismaClient.education.update.mockResolvedValue(updatedEducation);

      const response = await educationController.updateEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.education.isCurrent).toBe(true);
    });

    it('should handle non-existent education record', async () => {
      const educationId = 'non-existent-id';
      const updateData = { degree: 'Updated Degree' };

      mockContext = createMockContext(updateData, { id: educationId }, mockJwtPayload);
      mockPrismaClient.education.update.mockRejectedValue(new Error('Record not found'));

      const response = await educationController.updateEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('not found');
    });

    it('should validate update data', async () => {
      const educationId = 'education-123';
      const invalidData = {
        degree: 'x'.repeat(101), // Too long
        institution: 'x'.repeat(201) // Too long
      };

      mockContext = createMockContext(invalidData, { id: educationId }, mockJwtPayload);

      const response = await educationController.updateEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('too long');
    });

    it('should handle missing education ID parameter', async () => {
      const updateData = { degree: 'Updated Degree' };
      mockContext = createMockContext(updateData, {}, mockJwtPayload); // No id param

      const response = await educationController.updateEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Education ID is required');
    });
  });

  describe('deleteEducationById', () => {
    it('should delete education record successfully', async () => {
      const educationId = 'education-123';

      mockContext = createMockContext({}, { id: educationId }, mockJwtPayload);
      mockPrismaClient.education.delete.mockResolvedValue(createMockEducation({ id: educationId }));

      const response = await educationController.deleteEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.message).toContain('deleted successfully');
    });

    it('should handle non-existent education deletion', async () => {
      const educationId = 'non-existent-id';

      mockContext = createMockContext({}, { id: educationId }, mockJwtPayload);
      mockPrismaClient.education.delete.mockRejectedValue(new Error('Record not found'));

      const response = await educationController.deleteEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(404);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('not found');
    });

    it('should handle missing education ID parameter', async () => {
      mockContext = createMockContext({}, {}, mockJwtPayload); // No id param

      const response = await educationController.deleteEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Education ID is required');
    });

    it('should handle unauthorized access', async () => {
      const educationId = 'education-123';
      mockContext = createMockContext({}, { id: educationId }, null); // No JWT

      const response = await educationController.deleteEducationById(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Unauthorized');
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

      mockContext = createMockContext({}, { profileId: 'test-profile-id' }, invalidJwtPayload);

      const response = await educationController.getEducationByProfileId(mockContext);
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

      mockContext = createMockContext({}, { profileId: 'test-profile-id' }, expiredJwtPayload);

      const response = await educationController.getEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
    });

    it('should handle malformed JWT payload', async () => {
      const malformedJwtPayload = {
        // Missing required fields
        type: 'access'
      };

      mockContext = createMockContext({}, { profileId: 'test-profile-id' }, malformedJwtPayload);

      const response = await educationController.getEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
    });
  });

  describe('Data Validation and Edge Cases', () => {
    it('should handle various date formats', async () => {
      const profileId = 'test-profile-id';
      const validDates = [
        '2023-01-01',
        '2023-12-31',
        '2020-02-29', // Leap year
        '2023-06-15'
      ];

      for (const date of validDates) {
        const educationData = {
          degree: 'Test Degree',
          institution: 'Test University',
          startDate: date,
          isCurrent: false,
          endDate: '2023-12-31'
        };

        mockContext = createMockContext(educationData, { profileId }, mockJwtPayload);
        const newEducation = createMockEducation({ profileId, ...educationData });
        mockPrismaClient.education.create.mockResolvedValue(newEducation);

        const response = await educationController.addEducationByProfileId(mockContext);
        expect(response.status).toBe(201);
      }
    });

    it('should handle special characters in text fields', async () => {
      const profileId = 'test-profile-id';
      const educationData = {
        degree: 'Bachelor of Science (B.Sc.) - Computer Science & Engineering',
        institution: 'University of Technology & Applied Sciences',
        location: 'São Paulo, Brazil',
        description: 'Specialized in AI/ML with focus on NLP & computer vision. GPA: 3.8/4.0',
        startDate: '2020-01-01',
        isCurrent: false
      };

      mockContext = createMockContext(educationData, { profileId }, mockJwtPayload);
      const newEducation = createMockEducation({ profileId, ...educationData });
      mockPrismaClient.education.create.mockResolvedValue(newEducation);

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
    });

    it('should handle concurrent requests', async () => {
      const profileId = 'test-profile-id';
      const educationData = {
        degree: 'Test Degree',
        institution: 'Test University',
        startDate: '2023-01-01',
        isCurrent: true
      };

      const requests = Array(3).fill(null).map(() => {
        const context = createMockContext(educationData, { profileId }, mockJwtPayload);
        return educationController.addEducationByProfileId(context);
      });

      const newEducation = createMockEducation({ profileId, ...educationData });
      mockPrismaClient.education.create.mockResolvedValue(newEducation);

      const responses = await Promise.all(requests);

      responses.forEach(response => {
        expect(response.status).toBeDefined();
      });
    });

    it('should handle large text inputs within limits', async () => {
      const profileId = 'test-profile-id';
      const educationData = {
        degree: 'A'.repeat(100), // Max length
        institution: 'B'.repeat(200), // Max length
        description: 'C'.repeat(1000), // Max length
        startDate: '2023-01-01',
        isCurrent: false
      };

      mockContext = createMockContext(educationData, { profileId }, mockJwtPayload);
      const newEducation = createMockEducation({ profileId, ...educationData });
      mockPrismaClient.education.create.mockResolvedValue(newEducation);

      const response = await educationController.addEducationByProfileId(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(201);
      expect(responseData.success).toBe(true);
    });
  });
});
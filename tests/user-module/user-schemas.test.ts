/**
 * User Module Schemas Tests
 * Tests for user module validation schemas including profile, experience, and skill schemas
 */

import { describe, it, expect } from 'vitest';
import {
  profileSchema,
  experienceSchema,
  skillAssociationSchema,
  type ProfileInput,
  type ExperienceInput,
  type SkillAssociationInput
} from '../../src/user-module/schemas';

describe('User Module Schemas', () => {
  describe('profileSchema', () => {
    it('should validate a complete valid profile', () => {
      const validProfile: ProfileInput = {
        jobRoleId: 'role-123',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Experienced software developer with 5+ years in web development.',
        location: {
          description: 'San Francisco, CA, USA',
          place_id: 'ChIJIQBpAG2ahYAR_6128GcTUEo',
          reference: 'reference-123',
          structured_formatting: {
            main_text: 'San Francisco',
            secondary_text: 'CA, USA'
          },
          types: ['locality', 'political']
        },
        expectedSalary: '120000',
        yearsOfExperience: '5',
        availableToStart: '2024-02-01',
        immediateJoiner: false,
        preferredRole: 'Senior Software Engineer',
        profilePicture: {
          fileKey: 'profile-pics/user-123.jpg',
          fileUrl: 'https://storage.example.com/profile-pics/user-123.jpg'
        },
        cvLink: {
          fileKey: 'cvs/user-123-cv.pdf',
          fileUrl: 'https://storage.example.com/cvs/user-123-cv.pdf'
        }
      };

      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fullName).toBe('John Doe');
        expect(result.data.email).toBe('john.doe@example.com');
      }
    });

    it('should validate minimal valid profile', () => {
      const minimalProfile: ProfileInput = {};

      const result = profileSchema.safeParse(minimalProfile);
      expect(result.success).toBe(true);
    });

    it('should validate profile with string location', () => {
      const profileWithStringLocation: ProfileInput = {
        fullName: 'Jane Smith',
        location: 'New York, NY'
      };

      const result = profileSchema.safeParse(profileWithStringLocation);
      expect(result.success).toBe(true);
    });

    it('should validate profile with string file objects', () => {
      const profileWithStringFiles: ProfileInput = {
        fullName: 'Bob Johnson',
        profilePicture: 'https://example.com/profile.jpg',
        cvLink: 'https://example.com/cv.pdf'
      };

      const result = profileSchema.safeParse(profileWithStringFiles);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email format', () => {
      const invalidEmailProfile: ProfileInput = {
        fullName: 'John Doe',
        email: 'invalid-email-format'
      };

      const result = profileSchema.safeParse(invalidEmailProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Invalid email format');
      }
    });

    it('should reject empty full name', () => {
      const emptyNameProfile: ProfileInput = {
        fullName: ''
      };

      const result = profileSchema.safeParse(emptyNameProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Full name is required');
      }
    });

    it('should reject full name that is too long', () => {
      const longNameProfile: ProfileInput = {
        fullName: 'x'.repeat(101) // 101 characters
      };

      const result = profileSchema.safeParse(longNameProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Full name too long');
      }
    });

    it('should reject bio that is too long', () => {
      const longBioProfile: ProfileInput = {
        fullName: 'John Doe',
        bio: 'x'.repeat(1001) // 1001 characters
      };

      const result = profileSchema.safeParse(longBioProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Bio too long');
      }
    });

    it('should validate complex email formats', () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'user123@example-domain.com',
        'test.email+tag+sorting@example.com'
      ];

      validEmails.forEach(email => {
        const profile: ProfileInput = { email };
        const result = profileSchema.safeParse(profile);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'plainaddress',
        '@missingdomain.com',
        'missing@.com',
        'missing@domain',
        'spaces @domain.com',
        'user@domain .com'
      ];

      invalidEmails.forEach(email => {
        const profile: ProfileInput = { email };
        const result = profileSchema.safeParse(email);
        expect(result.success).toBe(false);
      });
    });

    it('should validate location object structure', () => {
      const profileWithLocation: ProfileInput = {
        location: {
          description: 'London, UK',
          place_id: 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
          reference: 'reference-456',
          structured_formatting: {
            main_text: 'London',
            secondary_text: 'UK'
          },
          types: ['locality', 'political']
        }
      };

      const result = profileSchema.safeParse(profileWithLocation);
      expect(result.success).toBe(true);
    });

    it('should validate file object structure', () => {
      const profileWithFiles: ProfileInput = {
        profilePicture: {
          fileKey: 'pics/profile.jpg',
          fileUrl: 'https://cdn.example.com/pics/profile.jpg',
          uploadUrl: 'https://upload.example.com/pics/profile.jpg'
        },
        cvLink: {
          fileKey: 'docs/cv.pdf'
          // fileUrl and uploadUrl are optional
        }
      };

      const result = profileSchema.safeParse(profileWithFiles);
      expect(result.success).toBe(true);
    });
  });

  describe('experienceSchema', () => {
    it('should validate complete valid experience', () => {
      const validExperience: ExperienceInput = {
        jobRoleId: 'role-456',
        companyId: 'company-123',
        location: 'San Francisco, CA',
        startDate: '2020-01-15',
        endDate: '2023-12-31',
        isCurrent: false,
        rolesAndResponsibilities: 'Led a team of 5 developers in building scalable web applications using React and Node.js. Implemented CI/CD pipelines and improved deployment efficiency by 40%.'
      };

      const result = experienceSchema.safeParse(validExperience);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.companyId).toBe('company-123');
        expect(result.data.isCurrent).toBe(false);
      }
    });

    it('should validate minimal valid experience', () => {
      const minimalExperience: ExperienceInput = {
        companyId: 'company-456',
        startDate: '2023-01-01',
        isCurrent: true
      };

      const result = experienceSchema.safeParse(minimalExperience);
      expect(result.success).toBe(true);
    });

    it('should validate current experience without end date', () => {
      const currentExperience: ExperienceInput = {
        companyId: 'company-789',
        startDate: '2023-06-01',
        isCurrent: true,
        rolesAndResponsibilities: 'Currently working as a senior developer.'
      };

      const result = experienceSchema.safeParse(currentExperience);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isCurrent).toBe(true);
        expect(result.data.endDate).toBeUndefined();
      }
    });

    it('should reject missing company ID', () => {
      const invalidExperience = {
        startDate: '2023-01-01',
        isCurrent: true
        // Missing companyId
      };

      const result = experienceSchema.safeParse(invalidExperience);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('expected string, received undefined');
      }
    });

    it('should reject empty company ID', () => {
      const invalidExperience: ExperienceInput = {
        companyId: '',
        startDate: '2023-01-01',
        isCurrent: true
      };

      const result = experienceSchema.safeParse(invalidExperience);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Company ID is required');
      }
    });

    it('should reject missing start date', () => {
      const invalidExperience = {
        companyId: 'company-123',
        isCurrent: true
        // Missing startDate
      };

      const result = experienceSchema.safeParse(invalidExperience);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('expected string, received undefined');
      }
    });

    it('should reject empty start date', () => {
      const invalidExperience: ExperienceInput = {
        companyId: 'company-123',
        startDate: '',
        isCurrent: true
      };

      const result = experienceSchema.safeParse(invalidExperience);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Start date is required');
      }
    });

    it('should reject roles and responsibilities that are too long', () => {
      const invalidExperience: ExperienceInput = {
        companyId: 'company-123',
        startDate: '2023-01-01',
        isCurrent: true,
        rolesAndResponsibilities: 'x'.repeat(2001) // 2001 characters
      };

      const result = experienceSchema.safeParse(invalidExperience);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Roles and responsibilities too long');
      }
    });

    it('should validate various date formats', () => {
      const validDates = [
        '2023-01-01',
        '2023-12-31',
        '2020-02-29', // Leap year
        '2023-06-15'
      ];

      validDates.forEach(date => {
        const experience: ExperienceInput = {
          companyId: 'company-123',
          startDate: date,
          isCurrent: false,
          endDate: '2023-12-31'
        };
        const result = experienceSchema.safeParse(experience);
        expect(result.success).toBe(true);
      });
    });

    it('should validate boolean isCurrent field', () => {
      const experienceTrue: ExperienceInput = {
        companyId: 'company-123',
        startDate: '2023-01-01',
        isCurrent: true
      };

      const experienceFalse: ExperienceInput = {
        companyId: 'company-123',
        startDate: '2023-01-01',
        isCurrent: false,
        endDate: '2023-12-31'
      };

      expect(experienceSchema.safeParse(experienceTrue).success).toBe(true);
      expect(experienceSchema.safeParse(experienceFalse).success).toBe(true);
    });
  });

  describe('skillAssociationSchema', () => {
    it('should validate valid skill IDs array', () => {
      const validSkillAssociation: SkillAssociationInput = {
        skillIds: ['skill-1', 'skill-2', 'skill-3']
      };

      const result = skillAssociationSchema.safeParse(validSkillAssociation);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.skillIds).toHaveLength(3);
        expect(result.data.skillIds).toContain('skill-1');
      }
    });

    it('should validate single skill ID', () => {
      const singleSkillAssociation: SkillAssociationInput = {
        skillIds: ['skill-1']
      };

      const result = skillAssociationSchema.safeParse(singleSkillAssociation);
      expect(result.success).toBe(true);
    });

    it('should reject empty skill IDs array', () => {
      const emptySkillAssociation: SkillAssociationInput = {
        skillIds: []
      };

      const result = skillAssociationSchema.safeParse(emptySkillAssociation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('At least one skill is required');
      }
    });

    it('should reject empty skill ID strings', () => {
      const invalidSkillAssociation: SkillAssociationInput = {
        skillIds: ['skill-1', '', 'skill-3']
      };

      const result = skillAssociationSchema.safeParse(invalidSkillAssociation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Skill ID cannot be empty');
      }
    });

    it('should reject missing skillIds field', () => {
      const invalidSkillAssociation = {
        // Missing skillIds field
      };

      const result = skillAssociationSchema.safeParse(invalidSkillAssociation);
      expect(result.success).toBe(false);
    });

    it('should validate large skill IDs arrays', () => {
      const largeSkillAssociation: SkillAssociationInput = {
        skillIds: Array.from({ length: 50 }, (_, i) => `skill-${i + 1}`)
      };

      const result = skillAssociationSchema.safeParse(largeSkillAssociation);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.skillIds).toHaveLength(50);
      }
    });

    it('should validate UUID-like skill IDs', () => {
      const uuidSkillAssociation: SkillAssociationInput = {
        skillIds: [
          '123e4567-e89b-12d3-a456-426614174000',
          '987fcdeb-51a2-43d1-9f12-123456789abc'
        ]
      };

      const result = skillAssociationSchema.safeParse(uuidSkillAssociation);
      expect(result.success).toBe(true);
    });

    it('should validate alphanumeric skill IDs', () => {
      const alphanumericSkillAssociation: SkillAssociationInput = {
        skillIds: ['skill123', 'SKILL_456', 'skill-789', 'skill.abc']
      };

      const result = skillAssociationSchema.safeParse(alphanumericSkillAssociation);
      expect(result.success).toBe(true);
    });
  });

  describe('Schema Integration and Edge Cases', () => {
    it('should handle nested validation errors', () => {
      const invalidProfile: ProfileInput = {
        fullName: '', // Invalid: empty
        email: 'invalid-email', // Invalid: bad format
        bio: 'x'.repeat(1001) // Invalid: too long
      };

      const result = profileSchema.safeParse(invalidProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });

    it('should handle complex location object validation', () => {
      const profileWithComplexLocation: ProfileInput = {
        location: {
          description: 'Times Square, New York, NY, USA',
          matched_substrings: [
            { length: 12, offset: 0 }
          ],
          place_id: 'ChIJmQJIxlVYwokRLgeuocVOGVU',
          reference: 'reference-789',
          structured_formatting: {
            main_text: 'Times Square',
            main_text_matched_substrings: [
              { length: 12, offset: 0 }
            ],
            secondary_text: 'New York, NY, USA',
            secondary_text_matched_substrings: [
              { length: 8, offset: 0 }
            ]
          },
          terms: [
            { offset: 0, value: 'Times Square' },
            { offset: 14, value: 'New York' }
          ],
          types: ['establishment', 'point_of_interest', 'tourist_attraction']
        }
      };

      const result = profileSchema.safeParse(profileWithComplexLocation);
      expect(result.success).toBe(true);
    });

    it('should handle type coercion appropriately', () => {
      const profileWithNumbers: any = {
        fullName: 'John Doe',
        expectedSalary: 120000, // Number instead of string
        yearsOfExperience: 5 // Number instead of string
      };

      const result = profileSchema.safeParse(profileWithNumbers);
      // Should fail because schema expects strings
      expect(result.success).toBe(false);
    });

    it('should validate optional fields correctly', () => {
      const profileWithSomeOptionals: ProfileInput = {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        // Other optional fields omitted
      };

      const result = profileSchema.safeParse(profileWithSomeOptionals);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.bio).toBeUndefined();
        expect(result.data.location).toBeUndefined();
        expect(result.data.profilePicture).toBeUndefined();
      }
    });

    it('should maintain type safety with inferred types', () => {
      // This test ensures TypeScript type inference works correctly
      const profile: ProfileInput = {
        fullName: 'Test User',
        email: 'test@example.com'
      };

      const experience: ExperienceInput = {
        companyId: 'company-123',
        startDate: '2023-01-01',
        isCurrent: true
      };

      const skills: SkillAssociationInput = {
        skillIds: ['skill-1', 'skill-2']
      };

      // These should compile without errors
      expect(typeof profile.fullName).toBe('string');
      expect(typeof experience.isCurrent).toBe('boolean');
      expect(Array.isArray(skills.skillIds)).toBe(true);
    });
  });
});
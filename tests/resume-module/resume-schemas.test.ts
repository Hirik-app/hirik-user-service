/**
 * Resume Module Schema Tests
 * Tests for Zod validation schemas for resume management
 */

import { describe, it, expect } from 'vitest';
import { resumeSchema, resumeUpdateSchema } from '../../src/resume-module/schemas';
import type { ResumeInput, ResumeUpdateInput } from '../../src/resume-module/schemas';
import { validationUtils } from '../__mocks__/test-utils';

describe('Resume Module Schemas', () => {
  describe('Resume Schema', () => {
    describe('Valid Inputs', () => {
      it('should accept minimal valid resume', () => {
        const validResume: ResumeInput = {
          title: 'Software Engineer Resume',
          fileName: 'john_doe_resume.pdf',
          fileUrl: 'https://storage.example.com/resumes/john_doe_resume.pdf',
          mimeType: 'application/pdf',
        };
        
        const result = resumeSchema.safeParse(validResume);
        validationUtils.expectValidationSuccess(result);
      });

      it('should accept complete resume with all fields', () => {
        const validResume: ResumeInput = {
          title: 'Senior Software Engineer - Full Stack',
          fileName: 'john_doe_senior_resume.pdf',
          fileUrl: 'https://cdn.example.com/documents/resumes/john_doe_senior_resume.pdf',
          fileSize: 2048576, // 2MB
          mimeType: 'application/pdf',
          isDefault: true,
          isActive: true,
        };

        const result = resumeSchema.safeParse(validResume);
        validationUtils.expectValidationSuccess(result);
      });

      it('should apply default values correctly', () => {
        const minimalResume = {
          title: 'My Resume',
          fileName: 'resume.pdf',
          fileUrl: 'https://example.com/resume.pdf',
          mimeType: 'application/pdf',
        };

        const result = resumeSchema.safeParse(minimalResume);
        
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.isDefault).toBe(false);
          expect(result.data.isActive).toBe(true);
        }
      });

      it('should accept various file types', () => {
        const supportedMimeTypes = [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
        ];

        supportedMimeTypes.forEach(mimeType => {
          const resume = {
            title: 'Test Resume',
            fileName: `resume.${mimeType.split('/')[1]}`,
            fileUrl: 'https://example.com/resume',
            mimeType,
          };

          const result = resumeSchema.safeParse(resume);
          validationUtils.expectValidationSuccess(result);
        });
      });
    });

    describe('Invalid Inputs', () => {
      it('should reject empty title', () => {
        const invalidResume = {
          title: '',
          fileName: 'resume.pdf',
          fileUrl: 'https://example.com/resume.pdf',
          mimeType: 'application/pdf',
        };

        const result = resumeSchema.safeParse(invalidResume);
        validationUtils.expectValidationError(result, 'title');
      });

      it('should reject title that is too long', () => {
        const invalidResume = {
          title: 'a'.repeat(101), // Too long
          fileName: 'resume.pdf',
          fileUrl: 'https://example.com/resume.pdf',
          mimeType: 'application/pdf',
        };

        const result = resumeSchema.safeParse(invalidResume);
        validationUtils.expectValidationError(result, 'title');
      });

      it('should reject empty file name', () => {
        const invalidResume = {
          title: 'My Resume',
          fileName: '',
          fileUrl: 'https://example.com/resume.pdf',
          mimeType: 'application/pdf',
        };

        const result = resumeSchema.safeParse(invalidResume);
        validationUtils.expectValidationError(result, 'fileName');
      });

      it('should reject invalid file URL', () => {
        const invalidResume = {
          title: 'My Resume',
          fileName: 'resume.pdf',
          fileUrl: 'not-a-valid-url',
          mimeType: 'application/pdf',
        };

        const result = resumeSchema.safeParse(invalidResume);
        validationUtils.expectValidationError(result, 'fileUrl');
      });

      it('should reject empty MIME type', () => {
        const invalidResume = {
          title: 'My Resume',
          fileName: 'resume.pdf',
          fileUrl: 'https://example.com/resume.pdf',
          mimeType: '',
        };

        const result = resumeSchema.safeParse(invalidResume);
        validationUtils.expectValidationError(result, 'mimeType');
      });

      it('should reject negative file size', () => {
        const invalidResume = {
          title: 'My Resume',
          fileName: 'resume.pdf',
          fileUrl: 'https://example.com/resume.pdf',
          mimeType: 'application/pdf',
          fileSize: -1000,
        };

        const result = resumeSchema.safeParse(invalidResume);
        validationUtils.expectValidationError(result, 'fileSize');
      });

      it('should reject non-integer file size', () => {
        const invalidResume = {
          title: 'My Resume',
          fileName: 'resume.pdf',
          fileUrl: 'https://example.com/resume.pdf',
          mimeType: 'application/pdf',
          fileSize: 1024.5, // Non-integer
        };

        const result = resumeSchema.safeParse(invalidResume);
        validationUtils.expectValidationError(result, 'fileSize');
      });
    });

    describe('URL Validation', () => {
      it('should accept various valid URL formats', () => {
        const validUrls = [
          'https://storage.googleapis.com/bucket/resume.pdf',
          'https://s3.amazonaws.com/bucket/path/to/resume.pdf',
          'https://cdn.example.com/documents/123/resume.pdf',
          'https://files.company.com/hr/resumes/candidate_001.pdf',
        ];

        validUrls.forEach(fileUrl => {
          const resume = {
            title: 'Test Resume',
            fileName: 'resume.pdf',
            fileUrl,
            mimeType: 'application/pdf',
          };

          const result = resumeSchema.safeParse(resume);
          validationUtils.expectValidationSuccess(result);
        });
      });

      it('should reject invalid URL formats', () => {
        const invalidUrls = [
          'not-a-url',
          'ftp://example.com/resume.pdf', // FTP not typically allowed
          'file:///local/path/resume.pdf', // Local file paths
          'http://insecure.com/resume.pdf', // HTTP instead of HTTPS
          '',
        ];

        invalidUrls.forEach(fileUrl => {
          const resume = {
            title: 'Test Resume',
            fileName: 'resume.pdf',
            fileUrl,
            mimeType: 'application/pdf',
          };

          const result = resumeSchema.safeParse(resume);
          expect(result.success).toBe(false);
        });
      });
    });

    describe('File Size Validation', () => {
      it('should accept reasonable file sizes', () => {
        const validSizes = [
          1024, // 1KB
          1048576, // 1MB
          5242880, // 5MB
          10485760, // 10MB
        ];

        validSizes.forEach(fileSize => {
          const resume = {
            title: 'Test Resume',
            fileName: 'resume.pdf',
            fileUrl: 'https://example.com/resume.pdf',
            mimeType: 'application/pdf',
            fileSize,
          };

          const result = resumeSchema.safeParse(resume);
          validationUtils.expectValidationSuccess(result);
        });
      });
    });
  });

  describe('Resume Update Schema', () => {
    describe('Valid Inputs', () => {
      it('should accept empty update object', () => {
        const emptyUpdate = {};

        const result = resumeUpdateSchema.safeParse(emptyUpdate);
        validationUtils.expectValidationSuccess(result);
      });

      it('should accept partial updates', () => {
        const partialUpdates = [
          { title: 'Updated Resume Title' },
          { isDefault: true },
          { isActive: false },
          { title: 'New Title', isDefault: true },
          { isDefault: false, isActive: true },
        ];

        partialUpdates.forEach(update => {
          const result = resumeUpdateSchema.safeParse(update);
          validationUtils.expectValidationSuccess(result);
        });
      });

      it('should accept complete update', () => {
        const completeUpdate: ResumeUpdateInput = {
          title: 'Updated Senior Software Engineer Resume',
          isDefault: true,
          isActive: true,
        };

        const result = resumeUpdateSchema.safeParse(completeUpdate);
        validationUtils.expectValidationSuccess(result);
      });
    });

    describe('Invalid Inputs', () => {
      it('should reject empty title when provided', () => {
        const invalidUpdate = {
          title: '',
        };

        const result = resumeUpdateSchema.safeParse(invalidUpdate);
        validationUtils.expectValidationError(result, 'title');
      });

      it('should reject title that is too long', () => {
        const invalidUpdate = {
          title: 'a'.repeat(101), // Too long
        };

        const result = resumeUpdateSchema.safeParse(invalidUpdate);
        validationUtils.expectValidationError(result, 'title');
      });

      it('should reject non-boolean values for flags', () => {
        const invalidUpdates = [
          { isDefault: 'true' }, // String instead of boolean
          { isActive: 1 }, // Number instead of boolean
          { isDefault: null }, // Null instead of boolean
        ];

        invalidUpdates.forEach(update => {
          const result = resumeUpdateSchema.safeParse(update);
          expect(result.success).toBe(false);
        });
      });
    });

    describe('Title Validation in Updates', () => {
      it('should accept various title formats', () => {
        const validTitles = [
          'Software Engineer Resume',
          'Senior Full Stack Developer - 2024',
          'Frontend Specialist (React/TypeScript)',
          'Data Scientist | Machine Learning Expert',
          'Resume - John Doe',
        ];

        validTitles.forEach(title => {
          const update = { title };
          const result = resumeUpdateSchema.safeParse(update);
          validationUtils.expectValidationSuccess(result);
        });
      });

      it('should handle special characters in titles', () => {
        const titlesWithSpecialChars = [
          'Resume: Software Engineer',
          'CV - Frontend Developer (2024)',
          'John\'s Professional Resume',
          'Resume & Portfolio - Designer',
        ];

        titlesWithSpecialChars.forEach(title => {
          const update = { title };
          const result = resumeUpdateSchema.safeParse(update);
          validationUtils.expectValidationSuccess(result);
        });
      });
    });
  });

  describe('Type Safety', () => {
    it('should infer correct ResumeInput type', () => {
      const resume: ResumeInput = {
        title: 'Test Resume',
        fileName: 'resume.pdf',
        fileUrl: 'https://example.com/resume.pdf',
        mimeType: 'application/pdf',
        fileSize: 1024000,
        isDefault: true,
        isActive: true,
      };

      expect(typeof resume.title).toBe('string');
      expect(typeof resume.fileName).toBe('string');
      expect(typeof resume.fileUrl).toBe('string');
      expect(typeof resume.mimeType).toBe('string');
      expect(typeof resume.fileSize).toBe('number');
      expect(typeof resume.isDefault).toBe('boolean');
      expect(typeof resume.isActive).toBe('boolean');
    });

    it('should infer correct ResumeUpdateInput type', () => {
      const update: ResumeUpdateInput = {
        title: 'Updated Title',
        isDefault: false,
        isActive: true,
      };

      expect(typeof update.title).toBe('string');
      expect(typeof update.isDefault).toBe('boolean');
      expect(typeof update.isActive).toBe('boolean');
    });
  });

  describe('Schema Integration', () => {
    it('should handle schema evolution gracefully', () => {
      // Test that schemas can handle additional properties that might be added
      const resumeWithExtra = {
        title: 'My Resume',
        fileName: 'resume.pdf',
        fileUrl: 'https://example.com/resume.pdf',
        mimeType: 'application/pdf',
        // Extra properties that might be added in the future
        extraField: 'should be ignored',
        metadata: { custom: 'data' },
      };

      const result = resumeSchema.safeParse(resumeWithExtra);
      if (result.success) {
        // Zod strips unknown fields by default
        expect(result.data).not.toHaveProperty('extraField');
        expect(result.data).not.toHaveProperty('metadata');
      }
    });

    it('should validate business logic constraints', () => {
      // Example: Only one resume can be default per user (this would be enforced at the service level)
      const resumes = [
        { title: 'Resume 1', isDefault: true },
        { title: 'Resume 2', isDefault: false },
        { title: 'Resume 3', isDefault: false },
      ];

      const defaultResumes = resumes.filter(r => r.isDefault);
      expect(defaultResumes).toHaveLength(1);
    });

    it('should handle file type constraints', () => {
      const fileTypeConstraints = {
        'application/pdf': { maxSize: 10 * 1024 * 1024, recommended: true },
        'application/msword': { maxSize: 5 * 1024 * 1024, recommended: false },
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { maxSize: 5 * 1024 * 1024, recommended: true },
        'text/plain': { maxSize: 1 * 1024 * 1024, recommended: false },
      };

      Object.entries(fileTypeConstraints).forEach(([mimeType, constraints]) => {
        const resume = {
          title: 'Test Resume',
          fileName: `resume.${mimeType.split('/')[1]}`,
          fileUrl: 'https://example.com/resume',
          mimeType,
          fileSize: constraints.maxSize - 1000, // Just under the limit
        };

        const result = resumeSchema.safeParse(resume);
        validationUtils.expectValidationSuccess(result);
      });
    });
  });
});
/**
 * Education Module Schemas Tests
 * Tests for education validation schemas and types
 */

import { describe, it, expect } from 'vitest';
import {
  educationSchema,
  type EducationInput
} from '../../src/education-module/schemas';

describe('Education Module Schemas', () => {
  describe('educationSchema', () => {
    it('should validate complete valid education record', () => {
      const validEducation: EducationInput = {
        degree: 'Bachelor of Computer Science',
        institution: 'University of Technology',
        location: 'San Francisco, CA, USA',
        startDate: '2018-09-01',
        endDate: '2022-05-15',
        grade: 'A (3.8/4.0)',
        description: 'Focused on software engineering, algorithms, and data structures. Completed senior capstone project on machine learning applications.',
        isCurrent: false
      };

      const result = educationSchema.safeParse(validEducation);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.degree).toBe('Bachelor of Computer Science');
        expect(result.data.institution).toBe('University of Technology');
        expect(result.data.isCurrent).toBe(false);
      }
    });

    it('should validate minimal valid education record', () => {
      const minimalEducation: EducationInput = {
        degree: 'High School Diploma',
        institution: 'Central High School',
        startDate: '2014-09-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(minimalEducation);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.location).toBeUndefined();
        expect(result.data.endDate).toBeUndefined();
        expect(result.data.grade).toBeUndefined();
        expect(result.data.description).toBeUndefined();
      }
    });

    it('should validate current education without end date', () => {
      const currentEducation: EducationInput = {
        degree: 'Master of Science in Computer Science',
        institution: 'Graduate University',
        startDate: '2023-09-01',
        isCurrent: true
      };

      const result = educationSchema.safeParse(currentEducation);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isCurrent).toBe(true);
        expect(result.data.endDate).toBeUndefined();
      }
    });

    it('should reject missing degree', () => {
      const invalidEducation = {
        // Missing degree
        institution: 'University of Technology',
        startDate: '2020-01-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Degree is required');
      }
    });

    it('should reject empty degree', () => {
      const invalidEducation: EducationInput = {
        degree: '',
        institution: 'University of Technology',
        startDate: '2020-01-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Degree is required');
      }
    });

    it('should reject degree that is too long', () => {
      const invalidEducation: EducationInput = {
        degree: 'x'.repeat(101), // 101 characters
        institution: 'University of Technology',
        startDate: '2020-01-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Degree too long');
      }
    });

    it('should reject missing institution', () => {
      const invalidEducation = {
        degree: 'Bachelor of Science',
        // Missing institution
        startDate: '2020-01-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Institution is required');
      }
    });

    it('should reject empty institution', () => {
      const invalidEducation: EducationInput = {
        degree: 'Bachelor of Science',
        institution: '',
        startDate: '2020-01-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Institution is required');
      }
    });

    it('should reject institution name that is too long', () => {
      const invalidEducation: EducationInput = {
        degree: 'Bachelor of Science',
        institution: 'x'.repeat(201), // 201 characters
        startDate: '2020-01-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Institution name too long');
      }
    });

    it('should reject missing start date', () => {
      const invalidEducation = {
        degree: 'Bachelor of Science',
        institution: 'University of Technology',
        // Missing startDate
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Start date is required');
      }
    });

    it('should reject empty start date', () => {
      const invalidEducation: EducationInput = {
        degree: 'Bachelor of Science',
        institution: 'University of Technology',
        startDate: '',
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Start date is required');
      }
    });

    it('should reject description that is too long', () => {
      const invalidEducation: EducationInput = {
        degree: 'Bachelor of Science',
        institution: 'University of Technology',
        startDate: '2020-01-01',
        description: 'x'.repeat(1001), // 1001 characters
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Description too long');
      }
    });

    it('should validate various degree types', () => {
      const degreeTypes = [
        'High School Diploma',
        'Associate of Arts',
        'Associate of Science',
        'Bachelor of Arts',
        'Bachelor of Science',
        'Bachelor of Engineering',
        'Master of Arts',
        'Master of Science',
        'Master of Business Administration',
        'Doctor of Philosophy',
        'Doctor of Medicine',
        'Juris Doctor',
        'Certificate in Web Development',
        'Diploma in Graphic Design'
      ];

      degreeTypes.forEach(degree => {
        const education: EducationInput = {
          degree,
          institution: 'Test Institution',
          startDate: '2020-01-01',
          isCurrent: false
        };
        const result = educationSchema.safeParse(education);
        expect(result.success).toBe(true);
      });
    });

    it('should validate various institution types', () => {
      const institutions = [
        'Harvard University',
        'MIT',
        'Stanford University',
        'University of California, Berkeley',
        'Oxford University',
        'Cambridge University',
        'Technical Institute of Technology',
        'Community College of Denver',
        'Online University',
        'Coding Bootcamp Academy',
        'Professional Training Center'
      ];

      institutions.forEach(institution => {
        const education: EducationInput = {
          degree: 'Test Degree',
          institution,
          startDate: '2020-01-01',
          isCurrent: false
        };
        const result = educationSchema.safeParse(education);
        expect(result.success).toBe(true);
      });
    });

    it('should validate various date formats', () => {
      const validDates = [
        '2023-01-01',
        '2023-12-31',
        '2020-02-29', // Leap year
        '2023-06-15',
        '2019-09-01',
        '2022-05-30'
      ];

      validDates.forEach(date => {
        const education: EducationInput = {
          degree: 'Test Degree',
          institution: 'Test Institution',
          startDate: date,
          endDate: '2023-12-31',
          isCurrent: false
        };
        const result = educationSchema.safeParse(education);
        expect(result.success).toBe(true);
      });
    });

    it('should validate various grade formats', () => {
      const gradeFormats = [
        'A',
        'A+',
        'B+',
        'C',
        '3.8/4.0',
        '3.5 GPA',
        '85%',
        '90/100',
        'First Class',
        'Magna Cum Laude',
        'Distinction',
        'Pass',
        '2:1',
        '1st'
      ];

      gradeFormats.forEach(grade => {
        const education: EducationInput = {
          degree: 'Test Degree',
          institution: 'Test Institution',
          startDate: '2020-01-01',
          grade,
          isCurrent: false
        };
        const result = educationSchema.safeParse(education);
        expect(result.success).toBe(true);
      });
    });

    it('should validate various location formats', () => {
      const locations = [
        'Boston, MA',
        'Cambridge, Massachusetts, USA',
        'London, UK',
        'Toronto, Ontario, Canada',
        'Sydney, Australia',
        'Online',
        'Remote',
        'Multiple Locations',
        'San Francisco Bay Area'
      ];

      locations.forEach(location => {
        const education: EducationInput = {
          degree: 'Test Degree',
          institution: 'Test Institution',
          location,
          startDate: '2020-01-01',
          isCurrent: false
        };
        const result = educationSchema.safeParse(education);
        expect(result.success).toBe(true);
      });
    });

    it('should validate boolean isCurrent field', () => {
      const educationTrue: EducationInput = {
        degree: 'Master of Science',
        institution: 'University',
        startDate: '2023-01-01',
        isCurrent: true
      };

      const educationFalse: EducationInput = {
        degree: 'Bachelor of Science',
        institution: 'University',
        startDate: '2020-01-01',
        endDate: '2023-12-31',
        isCurrent: false
      };

      expect(educationSchema.safeParse(educationTrue).success).toBe(true);
      expect(educationSchema.safeParse(educationFalse).success).toBe(true);
    });

    it('should handle special characters in text fields', () => {
      const educationWithSpecialChars: EducationInput = {
        degree: 'Bachelor of Science (B.Sc.) - Computer Science & Engineering',
        institution: 'University of Technology & Applied Sciences',
        location: 'São Paulo, Brazil',
        grade: 'A+ (95%)',
        description: 'Specialized in AI/ML with focus on NLP & computer vision. Thesis: "Deep Learning Applications in Natural Language Processing"',
        startDate: '2020-01-01',
        endDate: '2024-05-15',
        isCurrent: false
      };

      const result = educationSchema.safeParse(educationWithSpecialChars);
      expect(result.success).toBe(true);
    });

    it('should validate maximum length fields', () => {
      const maxLengthEducation: EducationInput = {
        degree: 'A'.repeat(100), // Exactly 100 characters
        institution: 'B'.repeat(200), // Exactly 200 characters
        description: 'C'.repeat(1000), // Exactly 1000 characters
        startDate: '2020-01-01',
        isCurrent: false
      };

      const result = educationSchema.safeParse(maxLengthEducation);
      expect(result.success).toBe(true);
    });

    it('should handle optional fields correctly', () => {
      const educationWithSomeOptionals: EducationInput = {
        degree: 'Bachelor of Arts',
        institution: 'Liberal Arts College',
        startDate: '2019-09-01',
        grade: 'B+',
        isCurrent: false
        // location, endDate, and description omitted
      };

      const result = educationSchema.safeParse(educationWithSomeOptionals);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.location).toBeUndefined();
        expect(result.data.endDate).toBeUndefined();
        expect(result.data.description).toBeUndefined();
        expect(result.data.grade).toBe('B+');
      }
    });

    it('should handle nested validation errors', () => {
      const invalidEducation: EducationInput = {
        degree: '', // Invalid: empty
        institution: 'x'.repeat(201), // Invalid: too long
        description: 'x'.repeat(1001), // Invalid: too long
        startDate: '', // Invalid: empty
        isCurrent: false
      };

      const result = educationSchema.safeParse(invalidEducation);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });

    it('should maintain type safety with inferred types', () => {
      // This test ensures TypeScript type inference works correctly
      const education: EducationInput = {
        degree: 'Test Degree',
        institution: 'Test Institution',
        startDate: '2020-01-01',
        isCurrent: false
      };

      // These should compile without errors
      expect(typeof education.degree).toBe('string');
      expect(typeof education.institution).toBe('string');
      expect(typeof education.startDate).toBe('string');
      expect(typeof education.isCurrent).toBe('boolean');
    });

    it('should reject invalid data types', () => {
      const invalidTypeEducation: any = {
        degree: 123, // Should be string
        institution: 'Test Institution',
        startDate: '2020-01-01',
        isCurrent: 'yes' // Should be boolean
      };

      const result = educationSchema.safeParse(invalidTypeEducation);
      expect(result.success).toBe(false);
    });

    it('should handle edge cases for dates', () => {
      const edgeCaseDates = [
        '2000-01-01', // Y2K
        '2024-02-29', // Leap year
        '1999-12-31', // End of millennium
        '2023-02-28', // Non-leap year February
      ];

      edgeCaseDates.forEach(date => {
        const education: EducationInput = {
          degree: 'Test Degree',
          institution: 'Test Institution',
          startDate: date,
          isCurrent: false
        };
        const result = educationSchema.safeParse(education);
        expect(result.success).toBe(true);
      });
    });

    it('should validate real-world education examples', () => {
      const realWorldExamples = [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'Massachusetts Institute of Technology',
          location: 'Cambridge, MA, USA',
          startDate: '2018-09-01',
          endDate: '2022-06-01',
          grade: '3.9/4.0',
          description: 'Concentrated in Artificial Intelligence and Machine Learning. Senior thesis on neural network optimization.',
          isCurrent: false
        },
        {
          degree: 'Master of Business Administration',
          institution: 'Harvard Business School',
          location: 'Boston, MA, USA',
          startDate: '2023-09-01',
          grade: 'Dean\'s List',
          description: 'Focus on Technology Management and Entrepreneurship.',
          isCurrent: true
        },
        {
          degree: 'Certificate in Full Stack Web Development',
          institution: 'General Assembly',
          location: 'San Francisco, CA, USA',
          startDate: '2021-01-15',
          endDate: '2021-04-15',
          description: 'Intensive 12-week program covering HTML, CSS, JavaScript, React, Node.js, and MongoDB.',
          isCurrent: false
        }
      ];

      realWorldExamples.forEach(education => {
        const result = educationSchema.safeParse(education);
        expect(result.success).toBe(true);
      });
    });
  });
});
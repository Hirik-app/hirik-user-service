import { z } from 'zod';

// File object schema for profile picture and CV
const fileObjectSchema = z.object({
  fileKey: z.string().optional(),
  fileUrl: z.string().optional(),
  uploadUrl: z.string().optional()
});

// Google Places location schema
const locationSchema = z.object({
  description: z.string(),
  matched_substrings: z.array(z.object({
    length: z.number(),
    offset: z.number()
  })).optional(),
  place_id: z.string(),
  reference: z.string(),
  structured_formatting: z.object({
    main_text: z.string(),
    main_text_matched_substrings: z.array(z.object({
      length: z.number(),
      offset: z.number()
    })).optional(),
    secondary_text: z.string().optional(),
    secondary_text_matched_substrings: z.array(z.object({
      length: z.number(),
      offset: z.number()
    })).optional()
  }).optional(),
  terms: z.array(z.object({
    offset: z.number(),
    value: z.string()
  })).optional(),
  types: z.array(z.string()).optional()
});

// Profile validation schemas
export const profileSchema = z.object({
  jobRoleId: z.string().optional(),
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name too long').optional(),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format').optional(),
  bio: z.string().max(1000, 'Bio too long').optional(),
  location: z.union([z.string(), locationSchema]).optional(),
  expectedSalary: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  availableToStart: z.string().optional(),
  immediateJoiner: z.boolean().optional(),
  preferredRole: z.string().optional(),
  profilePicture: z.union([z.string(), fileObjectSchema]).optional(),
  cvLink: z.union([z.string(), fileObjectSchema]).optional()
});

// Experience validation schema
export const experienceSchema = z.object({
  jobRoleId: z.string().optional(),
  companyId: z.string().min(1, 'Company ID is required'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  isCurrent: z.boolean(),
  rolesAndResponsibilities: z.string().max(2000, 'Roles and responsibilities too long').optional()
});

// Skill association schema
export const skillAssociationSchema = z.object({
  skillIds: z.array(z.string().min(1, 'Skill ID cannot be empty')).min(1, 'At least one skill is required')
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type SkillAssociationInput = z.infer<typeof skillAssociationSchema>;
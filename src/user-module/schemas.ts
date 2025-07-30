import { z } from 'zod';

// Profile validation schemas
export const profileSchema = z.object({
  jobRoleId: z.string().optional(),
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name too long').optional(),
  email: z.string().email('Invalid email format').optional(),
  bio: z.string().max(1000, 'Bio too long').optional(),
  location: z.string().optional(),
  expectedSalary: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  availableToStart: z.string().optional(),
  immediateJoiner: z.boolean().optional(),
  preferredRole: z.string().optional(),
  profilePicture: z.string().optional(),
  cvLink: z.string().optional()
});

// Education validation schema
export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required').max(100, 'Degree too long'),
  institution: z.string().min(1, 'Institution is required').max(200, 'Institution name too long'),
  location: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  grade: z.string().optional(),
  description: z.string().max(1000, 'Description too long').optional(),
  isCurrent: z.boolean()
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

// Job search preferences schema
export const jobSearchPreferencesSchema = z.object({
  desiredJobTypes: z.string().min(1, 'Desired job types required'),
  minSalary: z.number().min(0, 'Minimum salary must be positive').optional(),
  maxSalary: z.number().min(0, 'Maximum salary must be positive').optional(),
  salaryCurrency: z.string().default('USD'),
  salaryPeriod: z.enum(['yearly', 'monthly', 'hourly']).default('yearly'),
  desiredLocations: z.string().optional(),
  isRemoteOnly: z.boolean().default(false),
  isWillingToRelocate: z.boolean().default(false),
  maxCommuteMiles: z.number().min(0, 'Max commute miles must be positive').optional(),
  desiredRoles: z.string().min(1, 'Desired roles required'),
  desiredSkills: z.string().min(1, 'Desired skills required'),
  yearsOfExperience: z.string().optional(),
  desiredIndustries: z.string().min(1, 'Desired industries required'),
  minCompanySize: z.number().min(1, 'Minimum company size must be positive').optional(),
  maxCompanySize: z.number().min(1, 'Maximum company size must be positive').optional(),
  excludedCompanies: z.string().default('[]'),
  isSearchActive: z.boolean().default(true),
  savedSearches: z.string().optional()
});

// Notification preferences schema
export const notificationPreferencesSchema = z.object({
  jobMatches: z.boolean().default(true),
  applications: z.boolean().default(true),
  interviews: z.boolean().default(true),
  messages: z.boolean().default(true),
  emailEnabled: z.boolean().default(true),
  pushEnabled: z.boolean().default(true),
  quietHours: z.string().optional(),
  frequency: z.enum(['immediate', 'daily', 'weekly']).default('immediate')
});

// FCM Token schema
export const fcmTokenSchema = z.object({
  token: z.string().min(1, 'FCM token is required'),
  platform: z.enum(['ios', 'android'])
});

// Recruiter profile schema
export const recruiterProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name too long').optional(),
  companyId: z.string().optional(),
  jobRoleId: z.string().optional(),
  workEmail: z.string().email('Invalid work email format').optional(),
  location: z.string().optional(),
  verificationDetails: z.string().optional()
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type SkillAssociationInput = z.infer<typeof skillAssociationSchema>;
export type JobSearchPreferencesInput = z.infer<typeof jobSearchPreferencesSchema>;
export type NotificationPreferencesInput = z.infer<typeof notificationPreferencesSchema>;
export type FCMTokenInput = z.infer<typeof fcmTokenSchema>;
export type RecruiterProfileInput = z.infer<typeof recruiterProfileSchema>;
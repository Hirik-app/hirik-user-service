import { z } from 'zod';

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

export type JobSearchPreferencesInput = z.infer<typeof jobSearchPreferencesSchema>;
export type NotificationPreferencesInput = z.infer<typeof notificationPreferencesSchema>;
export type FCMTokenInput = z.infer<typeof fcmTokenSchema>;
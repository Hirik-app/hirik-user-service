import { z } from 'zod';

// Recruiter profile schema
export const recruiterProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name too long').optional(),
  companyId: z.string().optional(),
  jobRoleId: z.string().optional(),
  workEmail: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid work email format').optional(),
  location: z.string().optional(),
  verificationDetails: z.string().optional()
});

export type RecruiterProfileInput = z.infer<typeof recruiterProfileSchema>;
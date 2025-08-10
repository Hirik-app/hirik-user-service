import { z } from 'zod';

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
// Recruiter profile schema
export const recruiterProfileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Full name too long').optional(),
  companyId: z.string().optional(),
  jobRoleId: z.string().optional(),
  workEmail: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid work email format').optional(),
  location: z.union([z.string(), locationSchema]).optional(),
  verificationDetails: z.string().optional()
});

export type RecruiterProfileInput = z.infer<typeof recruiterProfileSchema>;

export const sendVerificationEmailSchema = z.object({
	workEmail: z.string().email({ message: 'Invalid work email format' }),
});

export const verifyEmailSchema = z.object({
	token: z.string().min(1, 'Verification token is required'),
});

export type SendVerificationEmailInput = z.infer<typeof sendVerificationEmailSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

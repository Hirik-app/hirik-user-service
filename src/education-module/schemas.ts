import { z } from 'zod';

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

export type EducationInput = z.infer<typeof educationSchema>;
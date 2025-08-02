import { z } from 'zod';

export const resumeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
  fileName: z.string().min(1, 'File name is required'),
  fileUrl: z.string().url('Invalid file URL'),
  fileSize: z.number().int().positive().optional(),
  mimeType: z.string().min(1, 'MIME type is required'),
  isDefault: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true)
});

export const resumeUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title too long').optional(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional()
});

export type ResumeInput = z.infer<typeof resumeSchema>;
export type ResumeUpdateInput = z.infer<typeof resumeUpdateSchema>;
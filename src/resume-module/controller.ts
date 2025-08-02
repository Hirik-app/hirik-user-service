import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { resumeSchema, resumeUpdateSchema, type ResumeInput, type ResumeUpdateInput } from './schemas';

interface JWTPayload {
    userId: string;
    phoneNumber: string;
    type: string;
    exp: number;
}

class ResumeController {
    private prisma: PrismaClient;

    constructor(env?: any) {
        if (env?.DB) {
            const adapter = new PrismaD1(env.DB);
            this.prisma = new PrismaClient({ adapter });
        } else {
            this.prisma = new PrismaClient();
        }
    }

    private getUserFromJWT(c: Context): { userId: string; phoneNumber: string } | null {
        try {
            const payload = c.get('jwtPayload') as JWTPayload;

            if (!payload || payload.type !== 'access') {
                return null;
            }

            return {
                userId: payload.userId,
                phoneNumber: payload.phoneNumber
            };
        } catch (error) {
            console.error('Error extracting user from JWT:', error);
            return null;
        }
    }

    private async getProfileByUserId(userId: string) {
        return this.prisma.profile.findFirst({
            where: { userId }
        });
    }

    async getResumes(c: Context) {
        try {
            const user = this.getUserFromJWT(c);
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const profile = await this.getProfileByUserId(user.userId);
            if (!profile) {
                return c.json({ error: 'Profile not found' }, 404);
            }

            const resumes = await this.prisma.resume.findMany({
                where: {
                    profileId: profile.id,
                    isActive: true
                },
                orderBy: [
                    { isDefault: 'desc' },
                    { uploadedAt: 'desc' }
                ]
            });

            return c.json({ resumes });
        } catch (error) {
            console.error('Error fetching resumes:', error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    }

    async getResumeById(c: Context) {
        try {
            const user = this.getUserFromJWT(c);
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const resumeId = c.req.param('resumeId');
            if (!resumeId) {
                return c.json({ error: 'Resume ID is required' }, 400);
            }

            const profile = await this.getProfileByUserId(user.userId);
            if (!profile) {
                return c.json({ error: 'Profile not found' }, 404);
            }

            const resume = await this.prisma.resume.findFirst({
                where: {
                    id: resumeId,
                    profileId: profile.id,
                    isActive: true
                }
            });

            if (!resume) {
                return c.json({ error: 'Resume not found' }, 404);
            }

            return c.json({ resume });
        } catch (error) {
            console.error('Error fetching resume:', error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    }

    async createResume(c: Context) {
        try {
            const user = this.getUserFromJWT(c);
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const body = await c.req.json();
            const validatedData = resumeSchema.parse(body);

            const profile = await this.getProfileByUserId(user.userId);
            if (!profile) {
                return c.json({ error: 'Profile not found' }, 404);
            }

            // If this is being set as default, unset other default resumes
            if (validatedData.isDefault) {
                await this.prisma.resume.updateMany({
                    where: {
                        profileId: profile.id,
                        isDefault: true
                    },
                    data: { isDefault: false }
                });
            }

            const resume = await this.prisma.resume.create({
                data: {
                    ...validatedData,
                    profileId: profile.id
                }
            });

            return c.json({ resume }, 201);
        } catch (error) {
            if (error instanceof Error && 'issues' in error) {
                return c.json({
                    error: 'Validation failed',
                    details: (error as any).issues
                }, 400);
            }
            console.error('Error creating resume:', error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    }

    async updateResume(c: Context) {
        try {
            const user = this.getUserFromJWT(c);
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const resumeId = c.req.param('resumeId');
            if (!resumeId) {
                return c.json({ error: 'Resume ID is required' }, 400);
            }

            const body = await c.req.json();
            const validatedData = resumeUpdateSchema.parse(body);

            const profile = await this.getProfileByUserId(user.userId);
            if (!profile) {
                return c.json({ error: 'Profile not found' }, 404);
            }

            // Check if resume exists and belongs to user
            const existingResume = await this.prisma.resume.findFirst({
                where: {
                    id: resumeId,
                    profileId: profile.id,
                    isActive: true
                }
            });

            if (!existingResume) {
                return c.json({ error: 'Resume not found' }, 404);
            }

            // If this is being set as default, unset other default resumes
            if (validatedData.isDefault) {
                await this.prisma.resume.updateMany({
                    where: {
                        profileId: profile.id,
                        isDefault: true,
                        id: { not: resumeId }
                    },
                    data: { isDefault: false }
                });
            }

            const updatedResume = await this.prisma.resume.update({
                where: { id: resumeId },
                data: validatedData
            });

            return c.json({ resume: updatedResume });
        } catch (error) {
            if (error instanceof Error && 'issues' in error) {
                return c.json({
                    error: 'Validation failed',
                    details: (error as any).issues
                }, 400);
            }
            console.error('Error updating resume:', error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    }

    async deleteResume(c: Context) {
        try {
            const user = this.getUserFromJWT(c);
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const resumeId = c.req.param('resumeId');
            if (!resumeId) {
                return c.json({ error: 'Resume ID is required' }, 400);
            }

            const profile = await this.getProfileByUserId(user.userId);
            if (!profile) {
                return c.json({ error: 'Profile not found' }, 404);
            }

            // Check if resume exists and belongs to user
            const existingResume = await this.prisma.resume.findFirst({
                where: {
                    id: resumeId,
                    profileId: profile.id,
                    isActive: true
                }
            });

            if (!existingResume) {
                return c.json({ error: 'Resume not found' }, 404);
            }

            // Soft delete by setting isActive to false
            await this.prisma.resume.update({
                where: { id: resumeId },
                data: { isActive: false }
            });

            return c.json({ message: 'Resume deleted successfully' });
        } catch (error) {
            console.error('Error deleting resume:', error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    }

    async setDefaultResume(c: Context) {
        try {
            const user = this.getUserFromJWT(c);
            if (!user) {
                return c.json({ error: 'Unauthorized' }, 401);
            }

            const resumeId = c.req.param('resumeId');
            if (!resumeId) {
                return c.json({ error: 'Resume ID is required' }, 400);
            }

            const profile = await this.getProfileByUserId(user.userId);
            if (!profile) {
                return c.json({ error: 'Profile not found' }, 404);
            }

            // Check if resume exists and belongs to user
            const existingResume = await this.prisma.resume.findFirst({
                where: {
                    id: resumeId,
                    profileId: profile.id,
                    isActive: true
                }
            });

            if (!existingResume) {
                return c.json({ error: 'Resume not found' }, 404);
            }

            // Unset all other default resumes for this profile
            await this.prisma.resume.updateMany({
                where: {
                    profileId: profile.id,
                    isDefault: true
                },
                data: { isDefault: false }
            });

            // Set this resume as default
            const updatedResume = await this.prisma.resume.update({
                where: { id: resumeId },
                data: { isDefault: true }
            });

            return c.json({ resume: updatedResume });
        } catch (error) {
            console.error('Error setting default resume:', error);
            return c.json({ error: 'Internal server error' }, 500);
        }
    }
}

export default ResumeController;
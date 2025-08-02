import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { educationSchema, type EducationInput } from './schemas';

interface JWTPayload {
    userId: string;
    phoneNumber: string;
    type: string;
    exp: number;
}

class EducationController {
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
            console.error('JWT payload extraction error:', error);
            return null;
        }
    }

    async getEducationByProfileId(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const profileId = c.req.param('profileId');

            if (!profileId) {
                return c.json({
                    success: false,
                    message: 'Profile ID is required'
                }, 400);
            }

            // Verify profile belongs to user
            const profile = await this.prisma.profile.findFirst({
                where: {
                    id: profileId,
                    userId: userInfo.userId
                }
            });

            if (!profile) {
                return c.json({
                    success: false,
                    message: 'Profile not found or unauthorized'
                }, 404);
            }

            const education = await this.prisma.education.findMany({
                where: {
                    profileId
                },
                orderBy: {
                    startDate: 'desc'
                }
            });

            return c.json({
                success: true,
                data: education
            }, 200);

        } catch (error) {
            console.error('Get education error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async addEducationByProfileId(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const profileId = c.req.param('profileId');
            const body = await c.req.json();

            if (!profileId) {
                return c.json({
                    success: false,
                    message: 'Profile ID is required'
                }, 400);
            }

            // Validate input
            const validationResult = educationSchema.safeParse(body);
            if (!validationResult.success) {
                return c.json({
                    success: false,
                    message: 'Validation error',
                    errors: validationResult.error.issues
                }, 400);
            }

            // Verify profile belongs to user
            const profile = await this.prisma.profile.findFirst({
                where: {
                    id: profileId,
                    userId: userInfo.userId
                }
            });

            if (!profile) {
                return c.json({
                    success: false,
                    message: 'Profile not found or unauthorized'
                }, 404);
            }

            const education = await this.prisma.education.create({
                data: {
                    ...validationResult.data,
                    profileId
                }
            });

            return c.json({
                success: true,
                data: education
            }, 201);

        } catch (error) {
            console.error('Add education error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async updateEducationById(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const educationId = c.req.param('id');
            const body = await c.req.json();

            if (!educationId) {
                return c.json({
                    success: false,
                    message: 'Education ID is required'
                }, 400);
            }

            // Verify education belongs to user's profile
            const education = await this.prisma.education.findFirst({
                where: {
                    id: educationId
                },
                include: {
                    profile: true
                }
            });

            if (!education || education.profile.userId !== userInfo.userId) {
                return c.json({
                    success: false,
                    message: 'Education not found or unauthorized'
                }, 404);
            }

            const updatedEducation = await this.prisma.education.update({
                where: {
                    id: educationId
                },
                data: body
            });

            return c.json({
                success: true,
                data: updatedEducation
            }, 200);

        } catch (error) {
            console.error('Update education error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async deleteEducationById(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const educationId = c.req.param('id');

            if (!educationId) {
                return c.json({
                    success: false,
                    message: 'Education ID is required'
                }, 400);
            }

            // Verify education belongs to user's profile
            const education = await this.prisma.education.findFirst({
                where: {
                    id: educationId
                },
                include: {
                    profile: true
                }
            });

            if (!education || education.profile.userId !== userInfo.userId) {
                return c.json({
                    success: false,
                    message: 'Education not found or unauthorized'
                }, 404);
            }

            await this.prisma.education.delete({
                where: {
                    id: educationId
                }
            });

            return c.json({
                success: true,
                message: 'Education deleted successfully'
            }, 200);

        } catch (error) {
            console.error('Delete education error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }
}

export default EducationController;
import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { recruiterProfileSchema, type RecruiterProfileInput } from './schemas';

interface JWTPayload {
    userId: string;
    phoneNumber: string;
    type: string;
    exp: number;
}

class RecruiterController {
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

    async getRecruiterProfile(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const recruiterProfile = await this.prisma.recruiterProfile.findUnique({
                where: {
                    userId: userInfo.userId
                },
                include: {
                    recruiterVerificationMethods: true
                }
            });

            return c.json({
                success: true,
                data: recruiterProfile
            }, 200);

        } catch (error) {
            console.error('Get recruiter profile error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async updateRecruiterProfile(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const body = await c.req.json();

            // Validate input
            const validationResult = recruiterProfileSchema.safeParse(body);
            if (!validationResult.success) {
                return c.json({
                    success: false,
                    message: 'Validation error',
                    errors: validationResult.error.issues
                }, 400);
            }

            const recruiterProfile = await this.prisma.recruiterProfile.upsert({
                where: {
                    userId: userInfo.userId
                },
                update: {
                    ...validationResult.data,
                    updatedAt: new Date()
                },
                create: {
                    ...validationResult.data,
                    userId: userInfo.userId
                }
            });

            return c.json({
                success: true,
                data: recruiterProfile
            }, 200);

        } catch (error) {
            console.error('Update recruiter profile error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async verifyRecruiter(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const recruiterId = c.req.param('recruiterId');
            const { verificationDetails, methodId } = await c.req.json();

            if (!recruiterId) {
                return c.json({
                    success: false,
                    message: 'Recruiter ID is required'
                }, 400);
            }

            // For now, auto-approve verification (in production, this would be manual review)
            const recruiterProfile = await this.prisma.recruiterProfile.update({
                where: {
                    id: recruiterId
                },
                data: {
                    isVerified: true,
                    verifiedBy: userInfo.userId,
                    verificationDetails: JSON.stringify(verificationDetails),
                    recruiterVerificationMethodsId: methodId,
                    updatedAt: new Date()
                }
            });

            return c.json({
                success: true,
                data: recruiterProfile,
                message: 'Recruiter verified successfully'
            }, 200);

        } catch (error) {
            console.error('Verify recruiter error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }
}

export default RecruiterController;
import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import {
    jobSearchPreferencesSchema,
    notificationPreferencesSchema,
    fcmTokenSchema,
    type JobSearchPreferencesInput,
    type NotificationPreferencesInput,
    type FCMTokenInput
} from './schemas';
import { Index, MeiliSearch } from 'meilisearch';

interface JWTPayload {
    userId: string;
    phoneNumber: string;
    type: string;
    exp: number;
}

class PreferencesController {
    private prisma: PrismaClient;
    private meilisearch: MeiliSearch;
    private jobIndex: Index;

    constructor(env?: any) {
        if (env?.DB) {
            const adapter = new PrismaD1(env.DB);
            this.prisma = new PrismaClient({ adapter });
        } else {
            this.prisma = new PrismaClient();
        }
        this.meilisearch = new MeiliSearch({
            host: env.MEILISEARCH_HOST,
            apiKey: env.MEILISEARCH_API_KEY
        })
        this.jobIndex = this.meilisearch.index('jobs');
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

    // Job Search Preferences
    async getJobSearchPreferences(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const preferences = await this.prisma.jobSearchPreferences.findUnique({
                where: {
                    userId: userInfo.userId
                }
            });

            return c.json({
                success: true,
                data: preferences
            }, 200);

        } catch (error) {
            console.error('Get job search preferences error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async updateJobSearchPreferences(c: Context): Promise<Response> {
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
            const validationResult = jobSearchPreferencesSchema.safeParse(body);
            if (!validationResult.success) {
                return c.json({
                    success: false,
                    message: 'Validation error',
                    errors: validationResult.error.issues
                }, 400);
            }

            const preferences = await this.prisma.jobSearchPreferences.upsert({
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
                data: preferences
            }, 200);

        } catch (error) {
            console.error('Update job search preferences error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    // Notification Preferences
    async getNotificationPreferences(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const preferences = await this.prisma.notificationPreferences.findUnique({
                where: {
                    userId: userInfo.userId
                }
            });

            return c.json({
                success: true,
                data: preferences
            }, 200);

        } catch (error) {
            console.error('Get notification preferences error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async updateNotificationPreferences(c: Context): Promise<Response> {
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
            const validationResult = notificationPreferencesSchema.safeParse(body);
            if (!validationResult.success) {
                return c.json({
                    success: false,
                    message: 'Validation error',
                    errors: validationResult.error.issues
                }, 400);
            }

            const preferences = await this.prisma.notificationPreferences.upsert({
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

            // TODO: Queue notification settings update for processing
            console.log('TODO: Queue notification preferences update for background processing');

            return c.json({
                success: true,
                data: preferences
            }, 200);

        } catch (error) {
            console.error('Update notification preferences error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    // Saved Jobs Management
    async getSavedJobs(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const savedJobs = await this.prisma.savedJob.findMany({
                where: {
                    userId: userInfo.userId
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            const ids = savedJobs.map(job => job.jobId);
            const jobs = await this.jobIndex.getDocuments({ ids })

            return c.json({
                success: true,
                data: jobs
            }, 200);

        } catch (error) {
            console.error('Get saved jobs error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async saveJob(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const { jobId } = await c.req.json();

            if (!jobId) {
                return c.json({
                    success: false,
                    message: 'Job ID is required'
                }, 400);
            }

            const savedJob = await this.prisma.savedJob.create({
                data: {
                    userId: userInfo.userId,
                    jobId
                }
            });

            return c.json({
                success: true,
                data: savedJob
            }, 201);

        } catch (error) {
            console.error('Save job error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async unsaveJob(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const jobId = c.req.param('jobId');

            if (!jobId) {
                return c.json({
                    success: false,
                    message: 'Job ID is required'
                }, 400);
            }

            await this.prisma.savedJob.deleteMany({
                where: {
                    userId: userInfo.userId,
                    jobId
                }
            });

            return c.json({
                success: true,
                message: 'Job unsaved successfully'
            }, 200);

        } catch (error) {
            console.error('Unsave job error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    // FCM Token Management
    async getFCMTokens(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const tokens = await this.prisma.fCMToken.findMany({
                where: {
                    userId: userInfo.userId
                }
            });

            return c.json({
                success: true,
                data: tokens
            }, 200);

        } catch (error) {
            console.error('Get FCM tokens error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async addFCMToken(c: Context): Promise<Response> {
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
            const validationResult = fcmTokenSchema.safeParse(body);
            if (!validationResult.success) {
                return c.json({
                    success: false,
                    message: 'Validation error',
                    errors: validationResult.error.issues
                }, 400);
            }

            const token = await this.prisma.fCMToken.upsert({
                where: {
                    token: validationResult.data.token
                },
                update: {
                    platform: validationResult.data.platform,
                    updatedAt: new Date()
                },
                create: {
                    ...validationResult.data,
                    userId: userInfo.userId
                }
            });

            return c.json({
                success: true,
                data: token
            }, 201);

        } catch (error) {
            console.error('Add FCM token error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async removeFCMToken(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const token = c.req.param('token');

            if (!token) {
                return c.json({
                    success: false,
                    message: 'Token is required'
                }, 400);
            }

            await this.prisma.fCMToken.deleteMany({
                where: {
                    userId: userInfo.userId,
                    token
                }
            });

            return c.json({
                success: true,
                message: 'FCM token removed successfully'
            }, 200);

        } catch (error) {
            console.error('Remove FCM token error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }
}

export default PreferencesController;
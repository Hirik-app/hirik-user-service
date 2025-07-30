import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { 
  profileSchema, educationSchema, experienceSchema, skillAssociationSchema,
  jobSearchPreferencesSchema, notificationPreferencesSchema, fcmTokenSchema,
  recruiterProfileSchema, type ProfileInput, type EducationInput, 
  type ExperienceInput, type SkillAssociationInput, type JobSearchPreferencesInput,
  type NotificationPreferencesInput, type FCMTokenInput, type RecruiterProfileInput
} from './schemas';

interface JWTPayload {
    userId: string;
    phoneNumber: string;
    type: string;
    exp: number;
}

class UserController {
    private prisma: PrismaClient;

    constructor(env?: any) {
        if (env?.DB) {
            // Use D1 adapter for Cloudflare Workers
            const adapter = new PrismaD1(env.DB);
            this.prisma = new PrismaClient({ adapter });
        } else {
            // Fallback for development/testing
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

    async getMe(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const user = await this.prisma.user.findUnique({
                where: {
                    id: userInfo.userId
                }
            });

            if (!user) {
                return c.json({
                    success: false,
                    message: 'User not found'
                }, 404);
            }

            return c.json({
                success: true,
                data: {
                    id: user.id,
                    phoneNumber: user.phoneNumber,
                    countryCode: user.countryCode,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            }, 200);

        } catch (error) {
            console.error('Get me error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async getProfile(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const profile = await this.prisma.profile.findFirst({
                where: {
                    userId: userInfo.userId
                },
                include: {
                    education: true,
                    experience: true,
                    skillUserMap: true
                }
            });

            return c.json({
                success: true,
                data: profile
            }, 200);

        } catch (error) {
            console.error('Get profile error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async updateProfile(c: Context): Promise<Response> {
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
            const validationResult = profileSchema.safeParse(body);
            if (!validationResult.success) {
                return c.json({
                    success: false,
                    message: 'Validation error',
                    errors: validationResult.error.issues
                }, 400);
            }

            // Check if profile exists
            let existingProfile = await this.prisma.profile.findFirst({
                where: {
                    userId: userInfo.userId
                }
            });

            let profile;

            if (existingProfile) {
                // Update existing profile
                profile = await this.prisma.profile.update({
                    where: {
                        id: existingProfile.id
                    },
                    data: {
                        ...validationResult.data,
                        userId: userInfo.userId,
                        updatedAt: new Date()
                    }
                });
            } else {
                // Create new profile
                profile = await this.prisma.profile.create({
                    data: {
                        ...validationResult.data,
                        userId: userInfo.userId
                    }
                });
            }

            return c.json({
                success: true,
                data: profile
            }, 200);

        } catch (error) {
            console.error('Update profile error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    // Education endpoints
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

    // Experience endpoints
    async getExperienceByProfileId(c: Context): Promise<Response> {
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

            const experience = await this.prisma.experience.findMany({
                where: {
                    profileId
                },
                orderBy: {
                    startDate: 'desc'
                }
            });

            return c.json({
                success: true,
                data: experience
            }, 200);

        } catch (error) {
            console.error('Get experience error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async addExperienceByProfileId(c: Context): Promise<Response> {
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

            const experience = await this.prisma.experience.create({
                data: {
                    ...body,
                    profileId
                }
            });

            return c.json({
                success: true,
                data: experience
            }, 201);

        } catch (error) {
            console.error('Add experience error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async updateExperienceById(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const experienceId = c.req.param('id');
            const body = await c.req.json();

            if (!experienceId) {
                return c.json({
                    success: false,
                    message: 'Experience ID is required'
                }, 400);
            }

            // Verify experience belongs to user's profile
            const experience = await this.prisma.experience.findFirst({
                where: {
                    id: experienceId
                },
                include: {
                    profile: true
                }
            });

            if (!experience || experience.profile.userId !== userInfo.userId) {
                return c.json({
                    success: false,
                    message: 'Experience not found or unauthorized'
                }, 404);
            }

            const updatedExperience = await this.prisma.experience.update({
                where: {
                    id: experienceId
                },
                data: body
            });

            return c.json({
                success: true,
                data: updatedExperience
            }, 200);

        } catch (error) {
            console.error('Update experience error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async deleteExperienceById(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const experienceId = c.req.param('id');

            if (!experienceId) {
                return c.json({
                    success: false,
                    message: 'Experience ID is required'
                }, 400);
            }

            // Verify experience belongs to user's profile
            const experience = await this.prisma.experience.findFirst({
                where: {
                    id: experienceId
                },
                include: {
                    profile: true
                }
            });

            if (!experience || experience.profile.userId !== userInfo.userId) {
                return c.json({
                    success: false,
                    message: 'Experience not found or unauthorized'
                }, 404);
            }

            await this.prisma.experience.delete({
                where: {
                    id: experienceId
                }
            });

            return c.json({
                success: true,
                message: 'Experience deleted successfully'
            }, 200);

        } catch (error) {
            console.error('Delete experience error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    // Skill Association endpoints (Phase 1)
    async getSkillsByProfileId(c: Context): Promise<Response> {
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

            const skills = await this.prisma.skillUserMap.findMany({
                where: {
                    profileId
                }
            });

            return c.json({
                success: true,
                data: skills
            }, 200);

        } catch (error) {
            console.error('Get skills error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async addSkillsToProfile(c: Context): Promise<Response> {
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
            const validationResult = skillAssociationSchema.safeParse(body);
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

            // Remove existing skills and add new ones
            await this.prisma.skillUserMap.deleteMany({
                where: { profileId }
            });

            const skillMaps = validationResult.data.skillIds.map(skillId => ({
                skillId,
                profileId
            }));

            const skills = await this.prisma.skillUserMap.createMany({
                data: skillMaps
            });

            return c.json({
                success: true,
                data: skills
            }, 201);

        } catch (error) {
            console.error('Add skills error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    // Phase 2: Job Search Preferences
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

    // Phase 2: Notification Preferences  
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

    // Phase 2: Saved Jobs Management
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

            return c.json({
                success: true,
                data: savedJobs
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

    // Phase 2: FCM Token Management
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

    // Phase 4: Recruiter Profile System
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

export default UserController;
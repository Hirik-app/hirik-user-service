import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import {
    profileSchema, experienceSchema, skillAssociationSchema,
    type ProfileInput, type ExperienceInput, type SkillAssociationInput
} from './schemas';
import { createMeiliSearchClient, MeiliSearchClient } from '../utils/meilisearch';

interface JWTPayload {
    userId: string;
    phoneNumber: string;
    type: string;
    exp: number;
}

class UserController {
    private prisma: PrismaClient;
    private meilisearch: MeiliSearchClient | null;

    constructor(env?: any) {
        if (env?.DB) {
            // Use D1 adapter for Cloudflare Workers
            const adapter = new PrismaD1(env.DB);
            this.prisma = new PrismaClient({ adapter });
        } else {
            // Fallback for development/testing
            this.prisma = new PrismaClient();
        }
        
        // Initialize Meilisearch client
        this.meilisearch = createMeiliSearchClient(env);
        
        // Ensure indexes exist if Meilisearch is available
        if (this.meilisearch) {
            this.meilisearch.ensureProfilesIndexExists().catch(error => {
                console.error('Failed to ensure profiles index exists:', error);
            });
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

            // Check if user has a candidate profile
            const candidateProfile = await this.prisma.profile.findFirst({
                where: {
                    userId: userInfo.userId
                }
            });

            // Check if user has a recruiter profile
            const recruiterProfile = await this.prisma.recruiterProfile.findFirst({
                where: {
                    userId: userInfo.userId
                }
            });

            // Determine onboarding and verification status
            let isOnboardingComplete = false;
            let isVerified = false;

            if (recruiterProfile) {
                // For recruiters: onboarding is complete if they have basic profile info
                isOnboardingComplete = !!(recruiterProfile.fullName && recruiterProfile.workEmail);
                // Verification status from recruiter profile
                isVerified = recruiterProfile.isVerified;
            } else if (candidateProfile) {
                // For candidates: onboarding is complete if they have basic profile info
                isOnboardingComplete = !!(candidateProfile.fullName && candidateProfile.email);
                // Candidates are considered verified once they complete their profile
                isVerified = isOnboardingComplete;
            }

            return c.json({
                success: true,
                data: {
                    id: user.id,
                    phoneNumber: user.phoneNumber,
                    countryCode: user.countryCode,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    isOnboardingComplete,
                    isVerified
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

            let jobRole = null;
            if (this.meilisearch && profile?.jobRoleId) {
                try {
                    jobRole = await this.meilisearch.getClient().index('job_roles').getDocument(profile.jobRoleId);
                } catch (error) {
                    console.error('Error fetching job role from Meilisearch:', error);
                    // Continue without job role data
                }
            }

            return c.json({
                success: true,
                data: {
                    ...profile,
                    jobRole
                }
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

            // Transform complex objects to JSON strings for database storage
            const profileData = {
                ...validationResult.data,
                location: validationResult.data.location ?
                    (typeof validationResult.data.location === 'string' ?
                        validationResult.data.location :
                        JSON.stringify(validationResult.data.location)) :
                    undefined,
                profilePicture: validationResult.data.profilePicture ?
                    (typeof validationResult.data.profilePicture === 'string' ?
                        validationResult.data.profilePicture :
                        JSON.stringify(validationResult.data.profilePicture)) :
                    undefined,
                cvLink: validationResult.data.cvLink ?
                    (typeof validationResult.data.cvLink === 'string' ?
                        validationResult.data.cvLink :
                        JSON.stringify(validationResult.data.cvLink)) :
                    undefined
            };

            let profile;

            if (existingProfile) {
                // Update existing profile
                profile = await this.prisma.profile.update({
                    where: {
                        id: existingProfile.id
                    },
                    data: {
                        ...profileData,
                        userId: userInfo.userId,
                        updatedAt: new Date()
                    }
                });
            } else {
                // Create new profile
                profile = await this.prisma.profile.create({
                    data: {
                        ...profileData,
                        userId: userInfo.userId
                    }
                });
            }

            // Index profile in Meilisearch for search functionality
            if (this.meilisearch) {
                try {
                    await this.meilisearch.addOrUpdateProfile(profile);
                } catch (error) {
                    console.error('Error indexing profile in Meilisearch:', error);
                    // Continue without search indexing - don't break the profile update
                }
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



    // Search profiles functionality
    async searchProfiles(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            if (!this.meilisearch) {
                return c.json({
                    success: false,
                    message: 'Search functionality is not available'
                }, 503);
            }

            const query = c.req.query();
            const search = query.q as string || query.search as string;
            const limit = parseInt(query.limit as string) || 20;
            const filters = query.filters as string;

            if (!search || search.length < 2) {
                return c.json({
                    success: false,
                    message: 'Search query must be at least 2 characters'
                }, 400);
            }

            const searchResults = await this.meilisearch.searchProfiles(search, filters, limit);

            return c.json({
                success: true,
                data: {
                    profiles: searchResults.hits,
                    count: searchResults.hits.length,
                    totalHits: searchResults.estimatedTotalHits,
                    query: search
                }
            }, 200);

        } catch (error) {
            console.error('Search profiles error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }
}

export default UserController;
import { Context } from 'hono';
import { PrismaD1 } from '@prisma/adapter-d1';
import {
    recruiterProfileSchema,
    sendVerificationEmailSchema,
    verifyEmailSchema,
    type RecruiterProfileInput,
    type SendVerificationEmailInput,
    type VerifyEmailInput,
} from './schemas';
import EmailService from '../services/email';
import { PrismaClient } from '../generated/prisma';

interface JWTPayload {
    userId: string;
    phoneNumber: string;
    type: string;
    exp: number;
}

class RecruiterController {
    private prisma: PrismaClient;
    private emailService: EmailService;

    constructor(env?: any) {
        if (env?.DB) {
            const adapter = new PrismaD1(env.DB);
            this.prisma = new PrismaClient({ adapter });
        } else {
            this.prisma = new PrismaClient();
        }
        this.emailService = new EmailService(env);
        const getData = async () => {
            const recruiterProfile = await this.prisma.recruiterProfile.findMany({

            });
            console.log({ recruiterProfile });
        }
        getData()

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
            });

            console.log({ recruiterProfile });

            // If recruiterProfile has a companyId, fetch company details and admin access info
            let enrichedProfile = recruiterProfile;
            if (recruiterProfile && recruiterProfile.companyId) {
                console.log('Found companyId:', recruiterProfile.companyId);
                console.log('COMPANY_SERVICE_URL:', c.env.COMPANY_SERVICE_URL);
                try {
                    let companyDetails = await this.getCompanyById(recruiterProfile.companyId, c);
                    let adminAccessInfo = await this.getAdminAccessInfo(recruiterProfile.companyId, c);
                    
                    // TEMPORARY: Mock company data for testing if service is unavailable
                    if (!companyDetails && recruiterProfile.companyId === 'aa47fbf0-d42c-4613-91bd-0b4083421a7b') {
                        companyDetails = {
                            id: 'aa47fbf0-d42c-4613-91bd-0b4083421a7b',
                            name: 'Stripe',
                            industry: 'Fintech',
                            description: 'Online payment processing company',
                            website: 'https://stripe.com',
                            location: 'San Francisco, CA',
                            isVerified: true
                        };
                        console.log('Using mock company data for testing');
                    }

                    // Mock admin access info if service is unavailable
                    if (!adminAccessInfo) {
                        adminAccessInfo = {
                            hasAccess: false,
                            currentRole: null,
                            canRequestAdmin: true,
                            hasAdmins: false,
                            hasPendingRequest: false,
                            reason: 'Company has no admins - you can request admin access'
                        };
                        console.log('Using mock admin access data for testing');
                    }
                    
                    console.log('Company details fetched:', companyDetails);
                    console.log('Admin access info fetched:', adminAccessInfo);
                    
                    if (companyDetails) {
                        enrichedProfile = {
                            ...recruiterProfile,
                            company: companyDetails,
                            adminAccess: adminAccessInfo
                        };
                    }
                } catch (error) {
                    console.warn('Failed to fetch company details:', error);
                    // Continue without company details if service is unavailable
                }
            }

            return c.json({
                success: true,
                data: enrichedProfile
            }, 200);

        } catch (error) {
            console.error('Get recruiter profile error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    private async getCompanyById(companyId: string, c: Context): Promise<any> {
        try {
            // For development, use localhost. In production, use environment variable
            const companyServiceUrl = c.env.COMPANY_SERVICE_URL || 'http://localhost:3001/api/v1';
            console.log('Using company service URL:', companyServiceUrl);

            const token = c.req.header('Authorization');
            if (!token) {
                console.warn('No authorization token available for company service call');
                return null;
            }

            const fullUrl = `${companyServiceUrl}/search/companies/${companyId}`;
            console.log('Fetching from:', fullUrl);

            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Company service response status:', response.status);

            if (!response.ok) {
                const responseText = await response.text();
                console.warn(`Company service returned ${response.status}: ${response.statusText}`, responseText);
                return null;
            }

            const data = await response.json();
            console.log('Company service response data:', data);
            
            if (data.success && data.data?.company) {
                return data.data.company;
            }

            return null;
        } catch (error) {
            console.error('Error fetching company details:', error);
            return null;
        }
    }

    private async getAdminAccessInfo(companyId: string, c: Context): Promise<any> {
        try {
            // For development, use localhost. In production, use environment variable
            const companyServiceUrl = c.env.COMPANY_SERVICE_URL || 'http://localhost:3001/api/v1';
            console.log('Using company service URL for admin access check:', companyServiceUrl);

            const token = c.req.header('Authorization');
            if (!token) {
                console.warn('No authorization token available for admin access check');
                return null;
            }

            const fullUrl = `${companyServiceUrl}/team/${companyId}/admin-access`;
            console.log('Fetching admin access info from:', fullUrl);

            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Admin access service response status:', response.status);

            if (!response.ok) {
                const responseText = await response.text();
                console.warn(`Admin access service returned ${response.status}: ${response.statusText}`, responseText);
                return null;
            }

            const data = await response.json();
            console.log('Admin access service response data:', data);
            
            if (data.success && data.data) {
                return data.data;
            }

            return null;
        } catch (error) {
            console.error('Error fetching admin access info:', error);
            return null;
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
            console.log({ body });


            // Validate input
            const validationResult = recruiterProfileSchema.safeParse(body);
            if (!validationResult.success) {
                return c.json({
                    success: false,
                    message: 'Validation error',
                    errors: validationResult.error.issues
                }, 400);
            }
            console.log({ validationResult });


            // Update or create recruiter profile);


            const recruiterProfile = await this.prisma.recruiterProfile.upsert({
                where: {
                    userId: userInfo.userId
                },
                update: {
                    ...validationResult.data,
                    location: JSON.stringify(validationResult.data.location),
                    updatedAt: new Date()
                },
                create: {
                    ...validationResult.data,
                    location: JSON.stringify(validationResult.data.location),
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

    async sendVerificationEmail(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const { workEmail } = await c.req.json();

            const recruiter = await this.prisma.recruiterProfile.findFirst({
                where: {
                    userId: userInfo.userId,
                    workEmail
                }
            })

            if (!recruiter) {
                return c.json({
                    success: false,
                    message: 'Recruiter not found'
                }, 404);
            }

            if (recruiter.workEmailVerified) {
                return c.json({
                    success: false,
                    message: 'Email is already verified'
                }, 400);
            }

            const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const expires = new Date(Date.now() + 3600000); // 1 hour

            await this.prisma.recruiterProfile.update({
                where: {
                    id: recruiter.id
                },
                data: {
                    emailVerificationToken: token,
                    emailVerificationTokenExpiresAt: expires
                }
            });

            await this.emailService.sendRecruiterVerificationEmail(workEmail, token);

            return c.json({
                success: true,
                message: 'Verification email sent successfully'
            }, 200);

        } catch (error) {
            console.error('Send verification email error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async verifyEmail(c: Context): Promise<Response> {
        try {

            const token = c.req.param('token');

            if (!token) {
                return c.json({
                    success: false,
                    message: 'Verification token is required'
                }, 400);
            }

            const recruiter = await this.prisma.recruiterProfile.findFirst({
                where: {
                    emailVerificationToken: token,
                }
            });

            if (!recruiter || !recruiter.emailVerificationTokenExpiresAt || recruiter.emailVerificationTokenExpiresAt < new Date()) {
                return c.json({
                    success: false,
                    message: 'Invalid or expired verification token'
                }, 400);
            }

            await this.prisma.recruiterProfile.update({
                where: {
                    id: recruiter.id
                },
                data: {
                    workEmailVerified: true,
                    emailVerificationToken: null,
                    emailVerificationTokenExpiresAt: null,
                    updatedAt: new Date()
                }
            });

            return c.json({
                success: true,
                message: 'Email verified successfully'
            }, 200);

        } catch (error) {
            console.error('Verify email error:', error);
            return c.json({
                success: false,
                message: 'Internal server error'
            }, 500);
        }
    }

    async sendEmailOtp(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const { email } = await c.req.json();

            if (!email) {
                return c.json({
                    success: false,
                    message: 'Email is required'
                }, 400);
            }

            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            // Store OTP in database
            await this.prisma.emailOTP.upsert({
                where: { email },
                update: {
                    otp,
                    expiresAt,
                    attempts: 0,
                    verified: false,
                    userId: userInfo.userId,
                    updatedAt: new Date()
                },
                create: {
                    email,
                    otp,
                    expiresAt,
                    userId: userInfo.userId
                }
            });

            // Send OTP via email
            await this.emailService.sendRecruiterOtpEmail(email, otp);

            return c.json({
                success: true,
                message: 'OTP sent to your email successfully'
            }, 200);

        } catch (error) {
            console.error('Send email OTP error:', error);
            return c.json({
                success: false,
                message: 'Failed to send OTP. Please try again.'
            }, 500);
        }
    }

    async verifyEmailOtp(c: Context): Promise<Response> {
        try {
            const userInfo = this.getUserFromJWT(c);
            if (!userInfo) {
                return c.json({
                    success: false,
                    message: 'Unauthorized'
                }, 401);
            }

            const { email, otp } = await c.req.json();

            if (!email || !otp) {
                return c.json({
                    success: false,
                    message: 'Email and OTP are required'
                }, 400);
            }

            // Find the OTP record
            const emailOtpRecord = await this.prisma.emailOTP.findUnique({
                where: { email }
            });

            if (!emailOtpRecord) {
                return c.json({
                    success: false,
                    message: 'No OTP found for this email'
                }, 400);
            }

            // Check if OTP is expired
            if (emailOtpRecord.expiresAt < new Date()) {
                return c.json({
                    success: false,
                    message: 'OTP has expired. Please request a new one.'
                }, 400);
            }

            // Check attempts
            if (emailOtpRecord.attempts >= 3) {
                return c.json({
                    success: false,
                    message: 'Too many failed attempts. Please request a new OTP.'
                }, 400);
            }

            // Verify OTP
            if (emailOtpRecord.otp !== otp) {
                // Increment attempts
                await this.prisma.emailOTP.update({
                    where: { email },
                    data: {
                        attempts: emailOtpRecord.attempts + 1,
                        updatedAt: new Date()
                    }
                });

                return c.json({
                    success: false,
                    message: 'Invalid OTP. Please try again.',
                    attemptsLeft: 3 - (emailOtpRecord.attempts + 1)
                }, 400);
            }

            // OTP is valid - mark as verified and update recruiter profile
            await this.prisma.emailOTP.update({
                where: { email },
                data: {
                    verified: true,
                    updatedAt: new Date()
                }
            });

            // Update recruiter profile to mark email as verified and profile as verified
            await this.prisma.recruiterProfile.updateMany({
                where: {
                    userId: userInfo.userId,
                    workEmail: email
                },
                data: {
                    workEmailVerified: true,
                    isVerified: true,
                    updatedAt: new Date()
                }
            });

            return c.json({
                success: true,
                message: 'Email verified successfully'
            }, 200);

        } catch (error) {
            console.error('Verify email OTP error:', error);
            return c.json({
                success: false,
                message: 'Failed to verify OTP. Please try again.'
            }, 500);
        }
    }
}

export default RecruiterController;

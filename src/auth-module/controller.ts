import { Context } from 'hono';
import { sign, verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';
import { LoginWithPhoneRequest, LoginWithPhoneResponse, VerifyOTPResponse } from './types';

class UserController {
  private prisma: PrismaClient;
  private otpAttempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private readonly MAX_OTP_ATTEMPTS = 5;
  private readonly OTP_LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private readonly OTP_GENERATION_LIMIT = 3; // Max OTPs per phone number per 15 minutes

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

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Phase 3: Rate limiting functionality
  private checkRateLimit(phoneNumber: string): { allowed: boolean; remainingAttempts?: number; lockoutUntil?: number } {
    const key = phoneNumber;
    const now = Date.now();
    const attemptData = this.otpAttempts.get(key);

    if (!attemptData) {
      return { allowed: true };
    }

    // Check if lockout period has expired
    if (now - attemptData.lastAttempt > this.OTP_LOCKOUT_DURATION) {
      this.otpAttempts.delete(key);
      return { allowed: true };
    }

    // Check if user has exceeded max attempts
    if (attemptData.count >= this.MAX_OTP_ATTEMPTS) {
      const lockoutUntil = attemptData.lastAttempt + this.OTP_LOCKOUT_DURATION;
      return { 
        allowed: false, 
        lockoutUntil 
      };
    }

    return { 
      allowed: true, 
      remainingAttempts: this.MAX_OTP_ATTEMPTS - attemptData.count 
    };
  }

  private recordFailedAttempt(phoneNumber: string): void {
    const key = phoneNumber;
    const now = Date.now();
    const attemptData = this.otpAttempts.get(key);

    if (!attemptData) {
      this.otpAttempts.set(key, { count: 1, lastAttempt: now });
    } else {
      // Reset counter if more than lockout duration has passed
      if (now - attemptData.lastAttempt > this.OTP_LOCKOUT_DURATION) {
        this.otpAttempts.set(key, { count: 1, lastAttempt: now });
      } else {
        this.otpAttempts.set(key, { 
          count: attemptData.count + 1, 
          lastAttempt: now 
        });
      }
    }
  }

  private clearFailedAttempts(phoneNumber: string): void {
    this.otpAttempts.delete(phoneNumber);
  }

  // Phase 3: Security logging
  private logSecurityEvent(event: string, phoneNumber: string, userId?: string, additionalInfo?: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      phoneNumber,
      userId,
      ...additionalInfo
    };
    
    // In production, this would be sent to a security monitoring system
    console.log('SECURITY_EVENT:', JSON.stringify(logEntry));
  }

  // Phase 3: Enhanced SMS integration (placeholder)
  private async sendSMS(phoneNumber: string, message: string): Promise<boolean> {
    // TODO: Replace with actual SMS service (Twilio, AWS SNS, etc.)
    console.log(`SMS to ${phoneNumber}: ${message}`);
    
    // Simulate SMS sending delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true; // In production, return actual success status
  }

  private async generateAccessToken(userId: string, phoneNumber: string, ACCESS_TOKEN_SECRET: string): Promise<string> {
    const payload = {
      userId,
      phoneNumber,
      type: 'access',
      exp: Math.floor(Date.now() / 1000) + (15 * 60) // 15 minutes
    };

    return await sign(
      payload,
      ACCESS_TOKEN_SECRET || 'access_secret_key'
    );
  }

  private async generateRefreshToken(userId: string, phoneNumber: string, REFRESH_TOKEN_SECRET: string): Promise<string> {
    const payload = {
      userId,
      phoneNumber,
      type: 'refresh',
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) // 7 days
    };

    return await sign(
      payload,
      REFRESH_TOKEN_SECRET || 'refresh_secret_key'
    );
  }

  private async sendOTP(phoneNumber: string, countryCode: string, otp: string): Promise<boolean> {
    // TODO: Implement SMS service integration (Twilio, AWS SNS, etc.)
    console.log(`Sending OTP ${otp} to ${countryCode}${phoneNumber}`);

    // For now, just log the OTP - replace with actual SMS service
    return true;
  }

  async loginWithPhone(c: Context): Promise<Response> {
    try {
      const body = await c.req.json() as LoginWithPhoneRequest;
      const { phoneNumber, countryCode } = body;

      // Validate input
      if (!phoneNumber || !countryCode) {
        this.logSecurityEvent('LOGIN_ATTEMPT_INVALID_INPUT', phoneNumber || 'unknown');
        return c.json({
          success: false,
          message: 'Phone number and country code are required'
        } as LoginWithPhoneResponse, 400);
      }

      // Validate phone number format (basic validation)
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(phoneNumber)) {
        this.logSecurityEvent('LOGIN_ATTEMPT_INVALID_FORMAT', phoneNumber);
        return c.json({
          success: false,
          message: 'Invalid phone number format'
        } as LoginWithPhoneResponse, 400);
      }

      // Phase 3: Check rate limiting
      const rateCheck = this.checkRateLimit(phoneNumber);
      if (!rateCheck.allowed) {
        this.logSecurityEvent('LOGIN_RATE_LIMITED', phoneNumber, undefined, { 
          lockoutUntil: rateCheck.lockoutUntil 
        });
        return c.json({
          success: false,
          message: 'Too many attempts. Please try again later.',
          lockoutUntil: rateCheck.lockoutUntil
        } as LoginWithPhoneResponse, 429);
      }

      // Check if user exists
      let user = await this.prisma.user.findUnique({
        where: {
          phoneNumber_countryCode: {
            phoneNumber,
            countryCode
          }
        }
      });

      let isNewUser = false;
      let userId: string;

      // Create user if doesn't exist
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            phoneNumber,
            countryCode
          }
        });
        isNewUser = true;
      }

      userId = user.id;

      // Generate OTP
      const otp = this.generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // Store or update OTP
      await this.prisma.oTP.upsert({
        where: {
          phoneNumber_countryCode: {
            phoneNumber,
            countryCode
          }
        },
        update: {
          otp,
          expiresAt,
          attempts: 0,
          verified: false,
          userId
        },
        create: {
          phoneNumber,
          countryCode,
          otp,
          expiresAt,
          userId
        }
      });

      // Send OTP via SMS (Phase 3: Enhanced SMS integration)
      const otpMessage = `Your Hirik verification code is: ${otp}. Valid for 10 minutes.`;
      const otpSent = await this.sendSMS(`${countryCode}${phoneNumber}`, otpMessage);

      if (!otpSent) {
        this.logSecurityEvent('SMS_SEND_FAILED', phoneNumber, userId);
        return c.json({
          success: false,
          message: 'Failed to send OTP. Please try again.'
        } as LoginWithPhoneResponse, 500);
      }

      // Log successful OTP generation
      this.logSecurityEvent('OTP_GENERATED', phoneNumber, userId, { 
        isNewUser 
      });

      return c.json({
        success: true,
        message: isNewUser ? 'Account created successfully. OTP sent to your phone.' : 'OTP sent to your phone.',
        userId,
        isNewUser,
        otpSent: true
      } as LoginWithPhoneResponse, 200);

    } catch (error) {
      console.error('Login with phone error:', error);
      return c.json({
        success: false,
        message: 'Internal server error'
      } as LoginWithPhoneResponse, 500);
    }
  }

  async verifyOTP(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();
      const { phoneNumber, countryCode, otp } = body;

      // Validate input
      if (!phoneNumber || !countryCode || !otp) {
        this.logSecurityEvent('OTP_VERIFY_INVALID_INPUT', phoneNumber || 'unknown');
        return c.json({
          success: false,
          message: 'Phone number, country code, and OTP are required'
        }, 400);
      }

      // Phase 3: Check rate limiting for OTP verification
      const rateCheck = this.checkRateLimit(`verify_${phoneNumber}`);
      if (!rateCheck.allowed) {
        this.logSecurityEvent('OTP_VERIFY_RATE_LIMITED', phoneNumber, undefined, { 
          lockoutUntil: rateCheck.lockoutUntil 
        });
        return c.json({
          success: false,
          message: 'Too many verification attempts. Please try again later.',
          lockoutUntil: rateCheck.lockoutUntil
        }, 429);
      }

      // Find OTP record
      const otpRecord = await this.prisma.oTP.findUnique({
        where: {
          phoneNumber_countryCode: {
            phoneNumber,
            countryCode
          }
        }
      });

      if (!otpRecord) {
        this.logSecurityEvent('OTP_NOT_FOUND', phoneNumber);
        return c.json({
          success: false,
          message: 'OTP not found. Please request a new one.'
        }, 404);
      }

      // Check if OTP is expired
      if (new Date() > otpRecord.expiresAt) {
        this.logSecurityEvent('OTP_EXPIRED', phoneNumber, otpRecord.userId || undefined);
        return c.json({
          success: false,
          message: 'OTP has expired. Please request a new one.'
        }, 400);
      }

      // Check if too many attempts
      if (otpRecord.attempts >= 3) {
        this.logSecurityEvent('OTP_MAX_ATTEMPTS', phoneNumber, otpRecord.userId || undefined);
        return c.json({
          success: false,
          message: 'Too many failed attempts. Please request a new OTP.'
        }, 400);
      }

      // Verify OTP
      if (otpRecord.otp !== otp) {
        // Record failed attempt and increment counter
        this.recordFailedAttempt(`verify_${phoneNumber}`);
        this.logSecurityEvent('OTP_INVALID', phoneNumber, otpRecord.userId || undefined, {
          attempts: otpRecord.attempts + 1
        });

        // Increment attempts in database
        await this.prisma.oTP.update({
          where: {
            phoneNumber_countryCode: {
              phoneNumber,
              countryCode
            }
          },
          data: {
            attempts: {
              increment: 1
            }
          }
        });

        return c.json({
          success: false,
          message: 'Invalid OTP. Please try again.'
        }, 400);
      }

      // OTP is valid - clear failed attempts and mark as verified
      this.clearFailedAttempts(`verify_${phoneNumber}`);
      this.clearFailedAttempts(phoneNumber);
      
      await this.prisma.oTP.update({
        where: {
          phoneNumber_countryCode: {
            phoneNumber,
            countryCode
          }  
        },
        data: {
          verified: true
        }
      });

      // Get user
      const user = await this.prisma.user.findUnique({
        where: {
          phoneNumber_countryCode: {
            phoneNumber,
            countryCode
          }
        }
      });

      if (!user) {
        return c.json({
          success: false,
          message: 'User not found'
        }, 404);
      }

      // Generate JWT tokens
      const accessToken = await this.generateAccessToken(user.id, user.phoneNumber, c.env.ACCESS_TOKEN_SECRET);
      const refreshToken = await this.generateRefreshToken(user.id, user.phoneNumber, c.env.REFRESH_TOKEN_SECRET);

      // Check if user has completed onboarding (has a profile)
      const profile = await this.prisma.profile.findFirst({
        where: {
          userId: user.id
        }
      });

      const isOnboardingComplete = profile !== null;

      // Log successful verification
      this.logSecurityEvent('OTP_VERIFIED_SUCCESS', phoneNumber, user.id, {
        isOnboardingComplete
      });

      return c.json({
        success: true,
        message: 'OTP verified successfully',
        accessToken,
        refreshToken,
        isOnboardingComplete,
        user: {
          id: user.id,
          phoneNumber: user.phoneNumber,
          countryCode: user.countryCode,
          createdAt: user.createdAt
        }
      } as VerifyOTPResponse, 200);

    } catch (error) {
      console.error('Verify OTP error:', error);
      return c.json({
        success: false,
        message: 'Internal server error'
      }, 500);
    }
  }

  // Phase 3: Enhanced token refresh with security logging
  async refreshToken(c: Context): Promise<Response> {
    try {
      const body = await c.req.json();
      const { refreshToken } = body;

      if (!refreshToken) {
        this.logSecurityEvent('TOKEN_REFRESH_NO_TOKEN', 'unknown');
        return c.json({
          success: false,
          message: 'Refresh token is required'
        }, 400);
      }

      // Verify refresh token
      let decoded: any;
      try {
        decoded = await verify(refreshToken, c.env.REFRESH_TOKEN_SECRET || 'refresh_secret_key');
      } catch (error) {
        this.logSecurityEvent('TOKEN_REFRESH_INVALID', 'unknown', undefined, { error: String(error) });
        return c.json({
          success: false,
          message: 'Invalid or expired refresh token'
        }, 401);
      }

      if (decoded.type !== 'refresh') {
        this.logSecurityEvent('TOKEN_REFRESH_WRONG_TYPE', decoded.phoneNumber || 'unknown', decoded.userId);
        return c.json({
          success: false,
          message: 'Invalid token type'
        }, 401);
      }

      // Get user from database to ensure they still exist
      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.userId
        }
      });

      if (!user) {
        this.logSecurityEvent('TOKEN_REFRESH_USER_NOT_FOUND', decoded.phoneNumber || 'unknown', decoded.userId);
        return c.json({
          success: false,
          message: 'User not found'
        }, 404);
      }

      // Generate new tokens (token rotation for better security)
      const newAccessToken = await this.generateAccessToken(user.id, user.phoneNumber, c.env.ACCESS_TOKEN_SECRET);
      const newRefreshToken = await this.generateRefreshToken(user.id, user.phoneNumber, c.env.REFRESH_TOKEN_SECRET);

      // Log successful token refresh
      this.logSecurityEvent('TOKEN_REFRESH_SUCCESS', user.phoneNumber, user.id);

      return c.json({
        success: true,
        message: 'Tokens refreshed successfully',
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }, 200);

    } catch (error) {
      console.error('Refresh token error:', error);
      return c.json({
        success: false,
        message: 'Internal server error'
      }, 500);
    }
  }
}

export default UserController;
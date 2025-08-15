// Comprehensive tests for Authentication Module
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { Context } from 'hono';

// Import our factories and mocking infrastructure
import {
  userFactory,
  otpFactory,
  profileFactory
} from './factories/index';

import {
  CloudflareMockUtils
} from './mocks/cloudflare-env';

import {
  MockTimeUtils,
  MockJWTUtils,
  MockAuthHeaders,
  MockOTPUtils
} from './mocks/jwt-utils';

import {
  MockSMSService
} from './mocks/external-services';

// Import auth controller and types
import UserController from '../src/auth-module/controller';
import { LoginWithPhoneRequest, VerifyOTPRequest } from '../src/auth-module/types';

describe('Authentication Module', () => {
  let mockEnv: any;
  let mockContext: any;
  let controller: UserController;
  let mockSMSService: MockSMSService;

  beforeEach(() => {
    // Create fresh mock environment for each test
    mockEnv = CloudflareMockUtils.createEnv();
    mockContext = CloudflareMockUtils.createContext({}, mockEnv);
    controller = new UserController(mockEnv);
    mockSMSService = new MockSMSService();
    
    // Mock console.log to avoid test output noise
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // Clean up mocks
    mockEnv.__testUtils?.reset();
    MockTimeUtils.restoreTime();
    vi.restoreAllMocks();
  });

  describe('OTP Generation and Validation', () => {
    test('should generate valid OTP format', () => {
      const controller = new UserController();
      // Access private method via reflection for testing
      const generateOTP = (controller as any).generateOTP;
      const otp = generateOTP.call(controller);
      
      expect(otp).toMatch(/^\d{6}$/);
      expect(parseInt(otp)).toBeGreaterThanOrEqual(100000);
      expect(parseInt(otp)).toBeLessThanOrEqual(999999);
    });

    test('should create OTP with correct expiration time', () => {
      const fixedTime = new Date('2023-06-15T12:00:00Z');
      MockTimeUtils.freezeTime(fixedTime);
      
      const otpData = MockOTPUtils.createOTPData();
      const expectedExpiry = new Date(fixedTime.getTime() + (15 * 60 * 1000));
      
      expect(otpData.expiresAt.getTime()).toBe(expectedExpiry.getTime());
    });

    test('should detect expired OTPs correctly', () => {
      const expiredOTP = MockTimeUtils.createExpiredOTP();
      const now = Date.now();
      
      expect(expiredOTP.expiresAt.getTime()).toBeLessThan(now);
    });

    test('should handle OTP attempt limits', () => {
      const maxAttemptsOTP = MockOTPUtils.createMaxAttemptsOTPData();
      
      expect(maxAttemptsOTP.attempts).toBe(3);
      expect(maxAttemptsOTP.verified).toBe(false);
    });
  });

  describe('JWT Token Creation and Validation', () => {
    test('should create valid access tokens with correct payload', () => {
      const userId = 'test-user-123';
      const phoneNumber = '1234567890';
      const token = MockJWTUtils.createValidToken({
        userId,
        phoneNumber,
        role: 'user'
      });

      expect(token).toMatch(/^mock\.jwt\./);
      
      const decoded = MockJWTUtils.decodeToken(token);
      expect(decoded?.userId).toBe(userId);
      expect(decoded?.phoneNumber).toBe(phoneNumber);
      expect(decoded?.role).toBe('user');
    });

    test('should create refresh tokens with extended expiration', () => {
      const refreshToken = MockJWTUtils.createRefreshToken();
      const decoded = MockJWTUtils.decodeToken(refreshToken);
      
      expect(decoded?.exp).toBeGreaterThan(Math.floor(Date.now() / 1000) + (6 * 24 * 60 * 60));
    });

    test('should detect expired tokens correctly', () => {
      const expiredToken = MockJWTUtils.createExpiredToken();
      
      expect(MockJWTUtils.isTokenExpired(expiredToken)).toBe(true);
      expect(MockJWTUtils.isTokenValid(expiredToken)).toBe(false);
    });

    test('should handle invalid token formats', () => {
      const invalidToken = MockJWTUtils.createInvalidToken();
      
      expect(MockJWTUtils.decodeToken(invalidToken)).toBe(null);
      expect(MockJWTUtils.isTokenValid(invalidToken)).toBe(false);
    });

    test('should create role-based tokens correctly', () => {
      const adminToken = MockJWTUtils.createTokenWithRole('admin');
      const recruiterToken = MockJWTUtils.createTokenWithRole('recruiter');
      const userToken = MockJWTUtils.createTokenWithRole('user');

      expect(MockJWTUtils.decodeToken(adminToken)?.role).toBe('admin');
      expect(MockJWTUtils.decodeToken(recruiterToken)?.role).toBe('recruiter');
      expect(MockJWTUtils.decodeToken(userToken)?.role).toBe('user');
    });
  });

  describe('Phone-Based Authentication Workflow', () => {
    describe('Login with Phone', () => {
      test('should successfully initiate login for new user', async () => {
        const loginRequest: LoginWithPhoneRequest = {
          phoneNumber: '1234567890',
          countryCode: '+1'
        };

        // Mock the request context
        mockContext.req.json = vi.fn().mockResolvedValue(loginRequest);
        
        const response = await controller.loginWithPhone(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.isNewUser).toBe(true);
        expect(result.userId).toBeDefined();
        expect(result.otpSent).toBe(true);
      });

      test('should successfully initiate login for existing user', async () => {
        // Create existing user first
        const existingUser = userFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });
        
        mockEnv.DB.seedTable('users', [existingUser]);

        const loginRequest: LoginWithPhoneRequest = {
          phoneNumber: '1234567890',
          countryCode: '+1'
        };

        mockContext.req.json = vi.fn().mockResolvedValue(loginRequest);
        
        const response = await controller.loginWithPhone(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.isNewUser).toBe(false);
        expect(result.userId).toBe(existingUser.id);
        expect(result.otpSent).toBe(true);
      });

      test('should reject invalid phone number formats', async () => {
        const invalidRequests = [
          { phoneNumber: '123', countryCode: '+1' }, // Too short
          { phoneNumber: '12345678901234567890', countryCode: '+1' }, // Too long
          { phoneNumber: 'abc1234567', countryCode: '+1' }, // Contains letters
          { phoneNumber: '123-456-7890', countryCode: '+1' }, // Contains dashes
        ];

        for (const request of invalidRequests) {
          mockContext.req.json = vi.fn().mockResolvedValue(request);
          
          const response = await controller.loginWithPhone(mockContext);
          const result = await response.json();

          expect(response.status).toBe(400);
          expect(result.success).toBe(false);
          expect(result.message).toContain('Invalid phone number format');
        }
      });

      test('should require both phone number and country code', async () => {
        const incompleteRequests = [
          { phoneNumber: '1234567890' }, // Missing country code
          { countryCode: '+1' }, // Missing phone number
          {}, // Missing both
        ];

        for (const request of incompleteRequests) {
          mockContext.req.json = vi.fn().mockResolvedValue(request);
          
          const response = await controller.loginWithPhone(mockContext);
          const result = await response.json();

          expect(response.status).toBe(400);
          expect(result.success).toBe(false);
          expect(result.message).toContain('required');
        }
      });

      test('should handle database errors gracefully', async () => {
        // Mock database error
        const brokenEnv = CloudflareMockUtils.createEnv();
        brokenEnv.DB = null; // This will cause an error
        
        const brokenController = new UserController(brokenEnv);
        
        mockContext.req.json = vi.fn().mockResolvedValue({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });

        const response = await brokenController.loginWithPhone(mockContext);
        const result = await response.json();

        expect(response.status).toBe(500);
        expect(result.success).toBe(false);
        expect(result.message).toBe('Internal server error');
      });
    });

    describe('OTP Verification', () => {
      test('should successfully verify correct OTP', async () => {
        // Create user and OTP data
        const user = userFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });
        
        const validOTP = otpFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1',
          userId: user.id,
          otp: '123456',
          expiresAt: new Date(Date.now() + (10 * 60 * 1000)),
          attempts: 0,
          verified: false
        });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('oTPs', [validOTP]);

        const verifyRequest: VerifyOTPRequest = {
          phoneNumber: '1234567890',
          countryCode: '+1',
          otp: '123456'
        };

        mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
        
        const response = await controller.verifyOTP(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.accessToken).toBeDefined();
        expect(result.refreshToken).toBeDefined();
        expect(result.user).toBeDefined();
        expect(result.user.id).toBe(user.id);
        expect(result.isOnboardingComplete).toBe(false);
      });

      test('should reject incorrect OTP', async () => {
        const user = userFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });
        
        const validOTP = otpFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1',
          userId: user.id,
          otp: '123456',
          expiresAt: new Date(Date.now() + (10 * 60 * 1000)),
          attempts: 0,
          verified: false
        });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('oTPs', [validOTP]);

        const verifyRequest: VerifyOTPRequest = {
          phoneNumber: '1234567890',
          countryCode: '+1',
          otp: '654321' // Wrong OTP
        };

        mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
        
        const response = await controller.verifyOTP(mockContext);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Invalid OTP');
      });

      test('should reject expired OTP', async () => {
        const user = userFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });
        
        const expiredOTP = otpFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1',
          userId: user.id,
          otp: '123456',
          expiresAt: new Date(Date.now() - (5 * 60 * 1000)), // 5 minutes ago
          attempts: 0,
          verified: false
        });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('oTPs', [expiredOTP]);

        const verifyRequest: VerifyOTPRequest = {
          phoneNumber: '1234567890',
          countryCode: '+1',
          otp: '123456'
        };

        mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
        
        const response = await controller.verifyOTP(mockContext);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.message).toContain('expired');
      });

      test('should reject after maximum attempts', async () => {
        const user = userFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });
        
        const maxAttemptsOTP = otpFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1',
          userId: user.id,
          otp: '123456',
          expiresAt: new Date(Date.now() + (10 * 60 * 1000)),
          attempts: 3, // Max attempts reached
          verified: false
        });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('oTPs', [maxAttemptsOTP]);

        const verifyRequest: VerifyOTPRequest = {
          phoneNumber: '1234567890',
          countryCode: '+1',
          otp: '123456'
        };

        mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
        
        const response = await controller.verifyOTP(mockContext);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Too many failed attempts');
      });

      test('should handle missing OTP record', async () => {
        const verifyRequest: VerifyOTPRequest = {
          phoneNumber: '9999999999',
          countryCode: '+1',
          otp: '123456'
        };

        mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
        
        const response = await controller.verifyOTP(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toContain('OTP not found');
      });

      test('should detect completed onboarding', async () => {
        const user = userFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });
        
        const profile = profileFactory.build({
          userId: user.id
        });
        
        const validOTP = otpFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1',
          userId: user.id,
          otp: '123456',
          expiresAt: new Date(Date.now() + (10 * 60 * 1000)),
          attempts: 0,
          verified: false
        });

        mockEnv.DB.seedTable('users', [user]);
        mockEnv.DB.seedTable('profiles', [profile]);
        mockEnv.DB.seedTable('oTPs', [validOTP]);

        const verifyRequest: VerifyOTPRequest = {
          phoneNumber: '1234567890',
          countryCode: '+1',
          otp: '123456'
        };

        mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
        
        const response = await controller.verifyOTP(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.isOnboardingComplete).toBe(true);
      });
    });

    describe('Token Refresh', () => {
      test('should successfully refresh valid tokens', async () => {
        const user = userFactory.build({
          phoneNumber: '1234567890',
          countryCode: '+1'
        });

        mockEnv.DB.seedTable('users', [user]);

        const validRefreshToken = MockJWTUtils.createRefreshToken({
          userId: user.id,
          phoneNumber: user.phoneNumber
        });

        const refreshRequest = {
          refreshToken: validRefreshToken
        };

        mockContext.req.json = vi.fn().mockResolvedValue(refreshRequest);
        
        const response = await controller.refreshToken(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
        expect(result.accessToken).toBeDefined();
        expect(result.refreshToken).toBeDefined();
        expect(result.refreshToken).not.toBe(validRefreshToken); // Token rotation
      });

      test('should reject expired refresh token', async () => {
        const expiredRefreshToken = MockJWTUtils.createExpiredToken({
          type: 'refresh'
        });

        const refreshRequest = {
          refreshToken: expiredRefreshToken
        };

        mockContext.req.json = vi.fn().mockResolvedValue(refreshRequest);
        
        const response = await controller.refreshToken(mockContext);
        const result = await response.json();

        expect(response.status).toBe(401);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Invalid or expired');
      });

      test('should reject access token used as refresh token', async () => {
        const accessToken = MockJWTUtils.createValidToken({
          type: 'access'
        });

        const refreshRequest = {
          refreshToken: accessToken
        };

        mockContext.req.json = vi.fn().mockResolvedValue(refreshRequest);
        
        const response = await controller.refreshToken(mockContext);
        const result = await response.json();

        expect(response.status).toBe(401);
        expect(result.success).toBe(false);
        expect(result.message).toContain('Invalid token type');
      });

      test('should handle missing refresh token', async () => {
        const refreshRequest = {};

        mockContext.req.json = vi.fn().mockResolvedValue(refreshRequest);
        
        const response = await controller.refreshToken(mockContext);
        const result = await response.json();

        expect(response.status).toBe(400);
        expect(result.success).toBe(false);
        expect(result.message).toContain('required');
      });

      test('should handle deleted user', async () => {
        // Create refresh token for user that doesn't exist in database
        const validRefreshToken = MockJWTUtils.createRefreshToken({
          userId: 'non-existent-user',
          phoneNumber: '1234567890'
        });

        const refreshRequest = {
          refreshToken: validRefreshToken
        };

        mockContext.req.json = vi.fn().mockResolvedValue(refreshRequest);
        
        const response = await controller.refreshToken(mockContext);
        const result = await response.json();

        expect(response.status).toBe(404);
        expect(result.success).toBe(false);
        expect(result.message).toContain('User not found');
      });
    });
  });
});
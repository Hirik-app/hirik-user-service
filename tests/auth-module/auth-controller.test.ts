/**
 * Auth Module Controller Tests
 * Tests for authentication controller methods including login, OTP verification, and token management
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Context } from 'hono';
import UserController from '../../src/auth-module/controller';
import { mockPrismaClient, setupMockUser, resetPrismaMocks } from '../__mocks__/prisma';
import { createMockUser, createMockOTP } from '../__mocks__/factories';

// Mock PrismaClient constructor to return our mock
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => mockPrismaClient)
}));

// Mock PrismaD1 adapter
vi.mock('@prisma/adapter-d1', () => ({
  PrismaD1: vi.fn()
}));

// Mock Hono context
const createMockContext = (body: any = {}, env: any = {}): Context => {
  const mockRequest = {
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(JSON.stringify(body)),
    headers: new Headers(),
    method: 'POST',
    url: 'http://localhost:3000/test'
  } as any;

  return {
    req: mockRequest,
    env: { 
      ...env, 
      DB: null, // Force fallback to regular PrismaClient which will be mocked
      ACCESS_TOKEN_SECRET: 'test-access-secret',
      REFRESH_TOKEN_SECRET: 'test-refresh-secret'
    },
    json: vi.fn().mockImplementation((data, status) => 
      new Response(JSON.stringify(data), { 
        status: status || 200,
        headers: { 'Content-Type': 'application/json' }
      })
    ),
    text: vi.fn().mockImplementation((text, status) => 
      new Response(text, { status: status || 200 })
    ),
    status: vi.fn().mockReturnThis(),
    header: vi.fn().mockReturnThis(),
    get: vi.fn(),
    set: vi.fn(),
    var: vi.fn(),
    newResponse: vi.fn()
  } as any;
};

// Mock JWT functions
vi.mock('hono/jwt', () => ({
  sign: vi.fn().mockResolvedValue('mock-jwt-token'),
  verify: vi.fn().mockResolvedValue({ userId: 'test-user-id', phoneNumber: '1234567890' })
}));

// Mock SMS sending
const mockSendSMS = vi.fn().mockResolvedValue(true);
vi.mock('@/services/sms', () => ({
  sendSMS: mockSendSMS
}));

describe('Auth Controller', () => {
  let userController: UserController;
  let mockContext: Context;

  beforeEach(() => {
    resetPrismaMocks();
    userController = new UserController(); // Will use mocked PrismaClient
    mockContext = createMockContext();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('loginWithPhone', () => {
    it('should create new user and send OTP for first-time login', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      
      mockContext = createMockContext({
        phoneNumber,
        countryCode
      });

      // Mock user not found (new user)
      mockPrismaClient.user.findUnique.mockResolvedValue(null);
      
      // Mock user creation
      const newUser = createMockUser({ phoneNumber, countryCode });
      mockPrismaClient.user.create.mockResolvedValue(newUser);
      
      // Mock OTP creation
      const otpData = createMockOTP({ phoneNumber, countryCode });
      mockPrismaClient.oTP.create.mockResolvedValue(otpData);

      const response = await userController.loginWithPhone(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.isNewUser).toBe(true);
      expect(responseData.otpSent).toBe(true);
      expect(responseData.message).toContain('OTP sent');
      
      // Verify user was created
      expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
        data: {
          phoneNumber,
          countryCode
        }
      });
      
      // Verify OTP was created
      expect(mockPrismaClient.oTP.create).toHaveBeenCalled();
    });

    it('should send OTP for existing user login', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      
      mockContext = createMockContext({
        phoneNumber,
        countryCode
      });

      // Mock existing user
      const existingUser = createMockUser({ phoneNumber, countryCode });
      mockPrismaClient.user.findUnique.mockResolvedValue(existingUser);
      
      // Mock OTP creation
      const otpData = createMockOTP({ phoneNumber, countryCode, userId: existingUser.id });
      mockPrismaClient.oTP.create.mockResolvedValue(otpData);

      const response = await userController.loginWithPhone(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.isNewUser).toBe(false);
      expect(responseData.otpSent).toBe(true);
      expect(responseData.userId).toBe(existingUser.id);
      
      // Verify user was not created again
      expect(mockPrismaClient.user.create).not.toHaveBeenCalled();
    });

    it('should handle invalid phone number format', async () => {
      mockContext = createMockContext({
        phoneNumber: 'invalid-phone',
        countryCode: '+1'
      });

      const response = await userController.loginWithPhone(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Invalid phone number');
    });

    it('should handle missing required fields', async () => {
      mockContext = createMockContext({
        phoneNumber: '1234567890'
        // Missing countryCode
      });

      const response = await userController.loginWithPhone(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('required');
    });

    it('should handle rate limiting for too many OTP requests', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      
      mockContext = createMockContext({
        phoneNumber,
        countryCode
      });

      // Mock existing user
      const existingUser = createMockUser({ phoneNumber, countryCode });
      mockPrismaClient.user.findUnique.mockResolvedValue(existingUser);
      
      // Simulate multiple rapid requests to trigger rate limiting
      for (let i = 0; i < 6; i++) {
        await userController.loginWithPhone(mockContext);
      }

      const response = await userController.loginWithPhone(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(429);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('rate limit');
    });

    it('should handle database errors gracefully', async () => {
      mockContext = createMockContext({
        phoneNumber: '1234567890',
        countryCode: '+1'
      });

      // Mock database error
      mockPrismaClient.user.findUnique.mockRejectedValue(new Error('Database connection failed'));

      const response = await userController.loginWithPhone(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(500);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Internal server error');
    });
  });

  describe('verifyOTP', () => {
    it('should verify valid OTP and return tokens', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      const otp = '123456';
      
      mockContext = createMockContext({
        phoneNumber,
        countryCode,
        otp
      }, {
        ACCESS_TOKEN_SECRET: 'test-access-secret',
        REFRESH_TOKEN_SECRET: 'test-refresh-secret'
      });

      // Mock user and OTP data
      const user = createMockUser({ phoneNumber, countryCode });
      const otpData = createMockOTP({ 
        phoneNumber, 
        countryCode, 
        otp, 
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        verified: false
      });
      
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      mockPrismaClient.oTP.findUnique.mockResolvedValue(otpData);
      mockPrismaClient.oTP.update.mockResolvedValue({ ...otpData, verified: true });

      const response = await userController.verifyOTP(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.accessToken).toBeDefined();
      expect(responseData.refreshToken).toBeDefined();
      expect(responseData.user).toEqual({
        id: user.id,
        phoneNumber: user.phoneNumber,
        countryCode: user.countryCode,
        createdAt: user.createdAt
      });
      
      // Verify OTP was marked as verified
      expect(mockPrismaClient.oTP.update).toHaveBeenCalledWith({
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
    });

    it('should reject invalid OTP', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      const otp = '123456';
      const wrongOtp = '654321';
      
      mockContext = createMockContext({
        phoneNumber,
        countryCode,
        otp: wrongOtp
      });

      // Mock user and OTP data with different OTP
      const user = createMockUser({ phoneNumber, countryCode });
      const otpData = createMockOTP({ 
        phoneNumber, 
        countryCode, 
        otp, // Correct OTP in database
        userId: user.id,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      });
      
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      mockPrismaClient.oTP.findUnique.mockResolvedValue(otpData);

      const response = await userController.verifyOTP(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Invalid OTP');
      expect(responseData.accessToken).toBeUndefined();
    });

    it('should reject expired OTP', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      const otp = '123456';
      
      mockContext = createMockContext({
        phoneNumber,
        countryCode,
        otp
      });

      // Mock user and expired OTP data
      const user = createMockUser({ phoneNumber, countryCode });
      const expiredOtpData = createMockOTP({ 
        phoneNumber, 
        countryCode, 
        otp,
        userId: user.id,
        expiresAt: new Date(Date.now() - 10 * 60 * 1000) // 10 minutes ago (expired)
      });
      
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      mockPrismaClient.oTP.findUnique.mockResolvedValue(expiredOtpData);

      const response = await userController.verifyOTP(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('expired');
    });

    it('should handle too many failed OTP attempts', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      const otp = '123456';
      const wrongOtp = '654321';
      
      mockContext = createMockContext({
        phoneNumber,
        countryCode,
        otp: wrongOtp
      });

      // Mock user and OTP data with high attempt count
      const user = createMockUser({ phoneNumber, countryCode });
      const otpData = createMockOTP({ 
        phoneNumber, 
        countryCode, 
        otp,
        userId: user.id,
        attempts: 5, // Max attempts reached
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      });
      
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      mockPrismaClient.oTP.findUnique.mockResolvedValue(otpData);

      const response = await userController.verifyOTP(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(429);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('too many attempts');
    });

    it('should handle missing OTP record', async () => {
      mockContext = createMockContext({
        phoneNumber: '1234567890',
        countryCode: '+1',
        otp: '123456'
      });

      // Mock user exists but no OTP record
      const user = createMockUser();
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      mockPrismaClient.oTP.findUnique.mockResolvedValue(null);

      const response = await userController.verifyOTP(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('No OTP found');
    });
  });

  describe('refreshToken', () => {
    it('should generate new access token with valid refresh token', async () => {
      const refreshToken = 'valid-refresh-token';
      
      mockContext = createMockContext({
        refreshToken
      }, {
        REFRESH_TOKEN_SECRET: 'test-refresh-secret',
        ACCESS_TOKEN_SECRET: 'test-access-secret'
      });

      // Mock JWT verification
      const { verify } = await import('hono/jwt');
      (verify as any).mockResolvedValue({
        userId: 'test-user-id',
        phoneNumber: '1234567890'
      });

      const response = await userController.refreshToken(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.accessToken).toBeDefined();
      expect(responseData.message).toContain('Access token refreshed');
    });

    it('should reject invalid refresh token', async () => {
      const invalidRefreshToken = 'invalid-refresh-token';
      
      mockContext = createMockContext({
        refreshToken: invalidRefreshToken
      }, {
        REFRESH_TOKEN_SECRET: 'test-refresh-secret'
      });

      // Mock JWT verification failure
      const { verify } = await import('hono/jwt');
      (verify as any).mockRejectedValue(new Error('Invalid token'));

      const response = await userController.refreshToken(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Invalid refresh token');
    });

    it('should handle missing refresh token', async () => {
      mockContext = createMockContext({
        // Missing refreshToken
      });

      const response = await userController.refreshToken(mockContext);
      const responseData = await response.json() as any;

      expect(response.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Refresh token is required');
    });
  });

  describe('Security Features', () => {
    it('should implement rate limiting correctly', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';
      
      // Test rate limiting by making multiple requests
      const requests = Array(6).fill(null).map(() => 
        userController.loginWithPhone(createMockContext({
          phoneNumber,
          countryCode
        }))
      );

      const responses = await Promise.all(requests);
      const lastResponse = responses[responses.length - 1];
      const responseData = await lastResponse.json() as any;

      // Should be rate limited after too many attempts
      expect(lastResponse.status).toBe(429);
      expect(responseData.success).toBe(false);
    });

    it('should log security events', async () => {
      const consoleSpy = vi.spyOn(console, 'log');
      
      mockContext = createMockContext({
        phoneNumber: '1234567890',
        countryCode: '+1',
        otp: 'wrong-otp'
      });

      // Mock failed OTP verification
      const user = createMockUser();
      const otpData = createMockOTP({ otp: 'correct-otp' });
      
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      mockPrismaClient.oTP.findUnique.mockResolvedValue(otpData);

      await userController.verifyOTP(mockContext);

      // Should log security event for failed OTP
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          event: expect.stringContaining('FAILED_OTP_VERIFICATION'),
          phoneNumber: '1234567890'
        })
      );
    });
  });
});
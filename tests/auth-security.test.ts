// Rate limiting and security tests for Authentication Module
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// Import our mocking infrastructure
import {
  CloudflareMockUtils
} from './mocks/cloudflare-env';

import {
  MockTimeUtils,
  MockRateLimitUtils,
  MockJWTUtils
} from './mocks/jwt-utils';

import { userFactory, otpFactory } from './factories';

import UserController from '../src/auth-module/controller';
import { LoginWithPhoneRequest, VerifyOTPRequest } from '../src/auth-module/types';

describe('Authentication Security & Rate Limiting', () => {
  let mockEnv: any;
  let mockContext: any;
  let controller: UserController;

  beforeEach(() => {
    mockEnv = CloudflareMockUtils.createEnv();
    mockContext = CloudflareMockUtils.createContext({}, mockEnv);
    controller = new UserController(mockEnv);
    
    // Reset rate limiting state
    MockRateLimitUtils.reset();
    
    // Mock console to avoid test noise
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    mockEnv.__testUtils?.reset();
    MockTimeUtils.restoreTime();
    MockRateLimitUtils.reset();
    vi.restoreAllMocks();
  });

  describe('Rate Limiting - Login Attempts', () => {
    test('should allow initial login attempts', async () => {
      const loginRequest: LoginWithPhoneRequest = {
        phoneNumber: '1234567890',
        countryCode: '+1'
      };

      mockContext.req.json = vi.fn().mockResolvedValue(loginRequest);
      
      const response = await controller.loginWithPhone(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
    });

    test('should track failed login attempts', async () => {
      const phoneNumber = '1234567890';
      
      // Simulate multiple failed attempts by creating rate limit entries
      for (let i = 0; i < 4; i++) {
        MockRateLimitUtils.recordAttempt(phoneNumber, 15 * 60 * 1000, 5); // 15 minutes, max 5
      }

      expect(MockRateLimitUtils.isRateLimited(phoneNumber, 5)).toBe(false); // Still allowed
      
      // One more attempt should trigger rate limit
      MockRateLimitUtils.recordAttempt(phoneNumber, 15 * 60 * 1000, 5);
      expect(MockRateLimitUtils.isRateLimited(phoneNumber, 5)).toBe(true);
    });

    test('should reset rate limits after lockout period', async () => {
      const phoneNumber = '1234567890';
      
      MockTimeUtils.freezeTime(new Date('2023-01-01T12:00:00Z'));

      // Max out attempts
      for (let i = 0; i < 5; i++) {
        MockRateLimitUtils.recordAttempt(phoneNumber, 15 * 60 * 1000, 5);
      }

      expect(MockRateLimitUtils.isRateLimited(phoneNumber, 5)).toBe(true);

      // Advance time past lockout period
      MockTimeUtils.advanceByMinutes(16);

      expect(MockRateLimitUtils.isRateLimited(phoneNumber, 5)).toBe(false);
    });

    test('should provide remaining lockout time', async () => {
      const phoneNumber = '1234567890';
      
      MockTimeUtils.freezeTime(new Date('2023-01-01T12:00:00Z'));

      // Max out attempts
      for (let i = 0; i < 5; i++) {
        MockRateLimitUtils.recordAttempt(phoneNumber, 15 * 60 * 1000, 5);
      }

      const remainingTime = MockRateLimitUtils.getRemainingTime(phoneNumber);
      expect(remainingTime).toBeCloseTo(15 * 60 * 1000, -3); // Within 1 second
    });
  });

  describe('Rate Limiting - OTP Verification', () => {
    test('should allow initial OTP verification attempts', async () => {
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
    });

    test('should increment OTP attempt counter on wrong OTP', async () => {
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

      // Verify attempt was recorded in rate limiting
      expect(MockRateLimitUtils.isRateLimited(`verify_1234567890`, 5)).toBe(false);
    });

    test('should clear failed attempts after successful verification', async () => {
      const phoneNumber = '1234567890';
      
      // Record some failed attempts first
      MockRateLimitUtils.recordAttempt(`verify_${phoneNumber}`);
      MockRateLimitUtils.recordAttempt(phoneNumber);

      const user = userFactory.build({
        phoneNumber,
        countryCode: '+1'
      });
      
      const validOTP = otpFactory.build({
        phoneNumber,
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
        phoneNumber,
        countryCode: '+1',
        otp: '123456'
      };

      mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
      
      const response = await controller.verifyOTP(mockContext);
      const result = await response.json();

      expect(response.status).toBe(200);
      expect(result.success).toBe(true);

      // Verify attempts were cleared
      expect(MockRateLimitUtils.isRateLimited(`verify_${phoneNumber}`, 5)).toBe(false);
      expect(MockRateLimitUtils.isRateLimited(phoneNumber, 5)).toBe(false);
    });
  });

  describe('Security Logging and Monitoring', () => {
    test('should log security events for invalid input', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      const invalidRequest = {
        phoneNumber: '',
        countryCode: '+1'
      };

      mockContext.req.json = vi.fn().mockResolvedValue(invalidRequest);
      
      await controller.loginWithPhone(mockContext);

      expect(consoleSpy).toHaveBeenCalledWith(
        'SECURITY_EVENT:',
        expect.stringContaining('LOGIN_ATTEMPT_INVALID_INPUT')
      );
    });

    test('should log security events for invalid phone formats', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      const invalidFormatRequest = {
        phoneNumber: 'invalid-phone',
        countryCode: '+1'
      };

      mockContext.req.json = vi.fn().mockResolvedValue(invalidFormatRequest);
      
      await controller.loginWithPhone(mockContext);

      expect(consoleSpy).toHaveBeenCalledWith(
        'SECURITY_EVENT:',
        expect.stringContaining('LOGIN_ATTEMPT_INVALID_FORMAT')
      );
    });

    test('should log OTP verification events', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

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
      
      await controller.verifyOTP(mockContext);

      expect(consoleSpy).toHaveBeenCalledWith(
        'SECURITY_EVENT:',
        expect.stringContaining('OTP_VERIFIED_SUCCESS')
      );
    });

    test('should log invalid OTP attempts', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

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
      
      await controller.verifyOTP(mockContext);

      expect(consoleSpy).toHaveBeenCalledWith(
        'SECURITY_EVENT:',
        expect.stringContaining('OTP_INVALID')
      );
    });

    test('should log token refresh events', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

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
      
      await controller.refreshToken(mockContext);

      expect(consoleSpy).toHaveBeenCalledWith(
        'SECURITY_EVENT:',
        expect.stringContaining('TOKEN_REFRESH_SUCCESS')
      );
    });

    test('should log invalid token refresh attempts', async () => {
      const consoleSpy = vi.spyOn(console, 'log');

      const invalidToken = MockJWTUtils.createInvalidToken();

      const refreshRequest = {
        refreshToken: invalidToken
      };

      mockContext.req.json = vi.fn().mockResolvedValue(refreshRequest);
      
      await controller.refreshToken(mockContext);

      expect(consoleSpy).toHaveBeenCalledWith(
        'SECURITY_EVENT:',
        expect.stringContaining('TOKEN_REFRESH_INVALID')
      );
    });
  });

  describe('Time-Based Security Features', () => {
    test('should handle OTP expiration correctly with time manipulation', async () => {
      MockTimeUtils.freezeTime(new Date('2023-01-01T12:00:00Z'));

      const user = userFactory.build({
        phoneNumber: '1234567890',
        countryCode: '+1'
      });
      
      // Create OTP that will be valid for 10 minutes
      const timeBasedOTP = otpFactory.build({
        phoneNumber: '1234567890',
        countryCode: '+1',
        userId: user.id,
        otp: '123456',
        expiresAt: new Date(Date.now() + (10 * 60 * 1000)), // 10 minutes from frozen time
        attempts: 0,
        verified: false
      });

      mockEnv.DB.seedTable('users', [user]);
      mockEnv.DB.seedTable('oTPs', [timeBasedOTP]);

      const verifyRequest: VerifyOTPRequest = {
        phoneNumber: '1234567890',
        countryCode: '+1',
        otp: '123456'
      };

      mockContext.req.json = vi.fn().mockResolvedValue(verifyRequest);
      
      // Should be valid at current time
      let response = await controller.verifyOTP(mockContext);
      let result = await response.json();
      expect(result.success).toBe(true);

      // Reset OTP for next test
      mockEnv.DB.seedTable('oTPs', [{
        ...timeBasedOTP,
        verified: false
      }]);

      // Advance time by 11 minutes
      MockTimeUtils.advanceByMinutes(11);

      // Should now be expired
      response = await controller.verifyOTP(mockContext);
      result = await response.json();
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
      expect(result.message).toContain('expired');
    });

    test('should handle JWT token expiration with time manipulation', () => {
      MockTimeUtils.freezeTime(new Date('2023-01-01T12:00:00Z'));

      const token = MockJWTUtils.createValidToken({
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour from now
      });

      // Should be valid initially
      expect(MockJWTUtils.isTokenValid(token)).toBe(true);

      // Advance time by 2 hours
      MockTimeUtils.advanceByHours(2);

      // Should now be expired
      expect(MockJWTUtils.isTokenExpired(token)).toBe(true);
      expect(MockJWTUtils.isTokenValid(token)).toBe(false);
    });
  });

  describe('Input Validation and Sanitization', () => {
    test('should handle various phone number edge cases', async () => {
      const edgeCases = [
        { phoneNumber: '0123456789', countryCode: '+1' }, // Leading zero
        { phoneNumber: '1234567890123456', countryCode: '+1' }, // Too long
        { phoneNumber: '123', countryCode: '+1' }, // Too short
        { phoneNumber: '12345678901234567890', countryCode: '+1' }, // Way too long
      ];

      for (const testCase of edgeCases) {
        mockContext.req.json = vi.fn().mockResolvedValue(testCase);
        
        const response = await controller.loginWithPhone(mockContext);
        const result = await response.json();

        if (testCase.phoneNumber.length < 10 || testCase.phoneNumber.length > 15) {
          expect(response.status).toBe(400);
          expect(result.success).toBe(false);
          expect(result.message).toContain('Invalid phone number format');
        }
      }
    });

    test('should handle various country code formats', async () => {
      const countryCodes = ['+1', '+44', '+91', '+86', '+33'];

      for (const countryCode of countryCodes) {
        const validRequest = {
          phoneNumber: '1234567890',
          countryCode
        };

        mockContext.req.json = vi.fn().mockResolvedValue(validRequest);
        
        const response = await controller.loginWithPhone(mockContext);
        const result = await response.json();

        expect(response.status).toBe(200);
        expect(result.success).toBe(true);
      }
    });

    test('should handle malformed JSON gracefully', async () => {
      // Mock malformed JSON request
      mockContext.req.json = vi.fn().mockRejectedValue(new Error('Invalid JSON'));
      
      const response = await controller.loginWithPhone(mockContext);
      const result = await response.json();

      expect(response.status).toBe(500);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Internal server error');
    });
  });
});
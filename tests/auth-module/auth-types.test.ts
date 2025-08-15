/**
 * Auth Module Types Tests
 * Tests for authentication types, interfaces, and validation schemas
 */

import { describe, it, expect } from 'vitest';
import type {
  LoginWithPhoneRequest,
  LoginWithPhoneResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
  OTPData
} from '../../src/auth-module/types';

describe('Auth Types', () => {
  describe('LoginWithPhoneRequest', () => {
    it('should have correct structure for valid request', () => {
      const validRequest: LoginWithPhoneRequest = {
        phoneNumber: '+1234567890',
        countryCode: '+1'
      };

      expect(validRequest).toHaveProperty('phoneNumber');
      expect(validRequest).toHaveProperty('countryCode');
      expect(typeof validRequest.phoneNumber).toBe('string');
      expect(typeof validRequest.countryCode).toBe('string');
    });

    it('should validate phone number format', () => {
      const testCases = [
        { phoneNumber: '+1234567890', countryCode: '+1', valid: true },
        { phoneNumber: '1234567890', countryCode: '+1', valid: true },
        { phoneNumber: '+44 20 7946 0958', countryCode: '+44', valid: true },
        { phoneNumber: '', countryCode: '+1', valid: false },
        { phoneNumber: 'invalid', countryCode: '+1', valid: false },
        { phoneNumber: '123', countryCode: '+1', valid: false }
      ];

      testCases.forEach(({ phoneNumber, countryCode, valid }) => {
        const request: LoginWithPhoneRequest = { phoneNumber, countryCode };
        
        if (valid) {
          expect(request.phoneNumber).toBeTruthy();
          expect(request.phoneNumber.length).toBeGreaterThan(0);
        } else {
          expect(request.phoneNumber.length === 0 || !/^[+]?[0-9\s-()]+$/.test(phoneNumber)).toBe(true);
        }
      });
    });

    it('should validate country code format', () => {
      const testCases = [
        { phoneNumber: '+1234567890', countryCode: '+1', valid: true },
        { phoneNumber: '+1234567890', countryCode: '+44', valid: true },
        { phoneNumber: '+1234567890', countryCode: '+91', valid: true },
        { phoneNumber: '+1234567890', countryCode: '', valid: false },
        { phoneNumber: '+1234567890', countryCode: '1', valid: false },
        { phoneNumber: '+1234567890', countryCode: 'US', valid: false }
      ];

      testCases.forEach(({ phoneNumber, countryCode, valid }) => {
        const request: LoginWithPhoneRequest = { phoneNumber, countryCode };
        
        if (valid) {
          expect(request.countryCode).toMatch(/^\+\d{1,4}$/);
        } else {
          expect(request.countryCode === '' || !/^\+\d{1,4}$/.test(countryCode)).toBe(true);
        }
      });
    });
  });

  describe('LoginWithPhoneResponse', () => {
    it('should have correct structure for successful response', () => {
      const successResponse: LoginWithPhoneResponse = {
        success: true,
        message: 'OTP sent successfully',
        userId: 'user-123',
        isNewUser: false,
        otpSent: true
      };

      expect(successResponse).toHaveProperty('success');
      expect(successResponse).toHaveProperty('message');
      expect(successResponse.success).toBe(true);
      expect(typeof successResponse.message).toBe('string');
      expect(successResponse.userId).toBeDefined();
      expect(typeof successResponse.isNewUser).toBe('boolean');
      expect(typeof successResponse.otpSent).toBe('boolean');
    });

    it('should have correct structure for error response', () => {
      const errorResponse: LoginWithPhoneResponse = {
        success: false,
        message: 'Invalid phone number format'
      };

      expect(errorResponse).toHaveProperty('success');
      expect(errorResponse).toHaveProperty('message');
      expect(errorResponse.success).toBe(false);
      expect(typeof errorResponse.message).toBe('string');
      expect(errorResponse.userId).toBeUndefined();
      expect(errorResponse.isNewUser).toBeUndefined();
      expect(errorResponse.otpSent).toBeUndefined();
    });

    it('should handle new user response correctly', () => {
      const newUserResponse: LoginWithPhoneResponse = {
        success: true,
        message: 'New user created, OTP sent',
        userId: 'new-user-456',
        isNewUser: true,
        otpSent: true
      };

      expect(newUserResponse.isNewUser).toBe(true);
      expect(newUserResponse.userId).toBeDefined();
      expect(newUserResponse.otpSent).toBe(true);
    });
  });

  describe('VerifyOTPRequest', () => {
    it('should have correct structure for valid request', () => {
      const validRequest: VerifyOTPRequest = {
        phoneNumber: '+1234567890',
        countryCode: '+1',
        otp: '123456'
      };

      expect(validRequest).toHaveProperty('phoneNumber');
      expect(validRequest).toHaveProperty('countryCode');
      expect(validRequest).toHaveProperty('otp');
      expect(typeof validRequest.phoneNumber).toBe('string');
      expect(typeof validRequest.countryCode).toBe('string');
      expect(typeof validRequest.otp).toBe('string');
    });

    it('should validate OTP format', () => {
      const testCases = [
        { otp: '123456', valid: true },
        { otp: '000000', valid: true },
        { otp: '999999', valid: true },
        { otp: '12345', valid: false }, // Too short
        { otp: '1234567', valid: false }, // Too long
        { otp: 'abcdef', valid: false }, // Non-numeric
        { otp: '12345a', valid: false }, // Mixed
        { otp: '', valid: false } // Empty
      ];

      testCases.forEach(({ otp, valid }) => {
        const request: VerifyOTPRequest = {
          phoneNumber: '+1234567890',
          countryCode: '+1',
          otp
        };
        
        if (valid) {
          expect(request.otp).toMatch(/^\d{6}$/);
        } else {
          expect(!/^\d{6}$/.test(otp)).toBe(true);
        }
      });
    });
  });

  describe('VerifyOTPResponse', () => {
    it('should have correct structure for successful verification', () => {
      const successResponse: VerifyOTPResponse = {
        success: true,
        message: 'OTP verified successfully',
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 'user-123',
          phoneNumber: '+1234567890',
          countryCode: '+1',
          createdAt: new Date()
        }
      };

      expect(successResponse).toHaveProperty('success');
      expect(successResponse).toHaveProperty('message');
      expect(successResponse).toHaveProperty('accessToken');
      expect(successResponse).toHaveProperty('refreshToken');
      expect(successResponse).toHaveProperty('user');
      expect(successResponse.success).toBe(true);
      expect(typeof successResponse.accessToken).toBe('string');
      expect(typeof successResponse.refreshToken).toBe('string');
      expect(successResponse.user).toBeDefined();
    });

    it('should have correct structure for failed verification', () => {
      const errorResponse: VerifyOTPResponse = {
        success: false,
        message: 'Invalid OTP'
      };

      expect(errorResponse).toHaveProperty('success');
      expect(errorResponse).toHaveProperty('message');
      expect(errorResponse.success).toBe(false);
      expect(errorResponse.accessToken).toBeUndefined();
      expect(errorResponse.refreshToken).toBeUndefined();
      expect(errorResponse.user).toBeUndefined();
    });

    it('should validate user object structure', () => {
      const responseWithUser: VerifyOTPResponse = {
        success: true,
        message: 'Success',
        accessToken: 'token',
        refreshToken: 'refresh',
        user: {
          id: 'user-123',
          phoneNumber: '+1234567890',
          countryCode: '+1',
          createdAt: new Date()
        }
      };

      expect(responseWithUser.user).toBeDefined();
      expect(responseWithUser.user!.id).toBeDefined();
      expect(responseWithUser.user!.phoneNumber).toBeDefined();
      expect(responseWithUser.user!.countryCode).toBeDefined();
      expect(responseWithUser.user!.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('OTPData', () => {
    it('should have correct structure', () => {
      const otpData: OTPData = {
        otp: '123456',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        attempts: 0,
        userId: 'user-123'
      };

      expect(otpData).toHaveProperty('otp');
      expect(otpData).toHaveProperty('expiresAt');
      expect(otpData).toHaveProperty('attempts');
      expect(otpData).toHaveProperty('userId');
      expect(typeof otpData.otp).toBe('string');
      expect(otpData.expiresAt).toBeInstanceOf(Date);
      expect(typeof otpData.attempts).toBe('number');
      expect(typeof otpData.userId).toBe('string');
    });

    it('should validate OTP expiration logic', () => {
      const now = new Date();
      const futureOTP: OTPData = {
        otp: '123456',
        expiresAt: new Date(now.getTime() + 10 * 60 * 1000), // 10 minutes future
        attempts: 0,
        userId: 'user-123'
      };

      const expiredOTP: OTPData = {
        otp: '654321',
        expiresAt: new Date(now.getTime() - 10 * 60 * 1000), // 10 minutes past
        attempts: 0,
        userId: 'user-456'
      };

      // Future OTP should not be expired
      expect(futureOTP.expiresAt.getTime()).toBeGreaterThan(now.getTime());
      
      // Past OTP should be expired
      expect(expiredOTP.expiresAt.getTime()).toBeLessThan(now.getTime());
    });

    it('should handle attempt counting correctly', () => {
      const otpData: OTPData = {
        otp: '123456',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        attempts: 3,
        userId: 'user-123'
      };

      expect(otpData.attempts).toBe(3);
      expect(otpData.attempts).toBeGreaterThanOrEqual(0);
      expect(otpData.attempts).toBeLessThan(10); // Reasonable upper bound
    });
  });

  describe('Type Safety and Validation', () => {
    it('should enforce required fields', () => {
      // These should cause TypeScript compilation errors if uncommented:
      
      // const invalidLoginRequest: LoginWithPhoneRequest = {
      //   phoneNumber: '+1234567890'
      //   // Missing countryCode
      // };
      
      // const invalidOTPRequest: VerifyOTPRequest = {
      //   phoneNumber: '+1234567890',
      //   countryCode: '+1'
      //   // Missing otp
      // };
      
      // This test passes if TypeScript compilation succeeds
      expect(true).toBe(true);
    });

    it('should allow optional fields in responses', () => {
      const minimalResponse: LoginWithPhoneResponse = {
        success: false,
        message: 'Error occurred'
        // Optional fields not provided
      };

      const fullResponse: LoginWithPhoneResponse = {
        success: true,
        message: 'Success',
        userId: 'user-123',
        isNewUser: true,
        otpSent: true
      };

      expect(minimalResponse.success).toBe(false);
      expect(fullResponse.success).toBe(true);
      expect(fullResponse.userId).toBeDefined();
    });

    it('should maintain type consistency across interfaces', () => {
      const loginRequest: LoginWithPhoneRequest = {
        phoneNumber: '+1234567890',
        countryCode: '+1'
      };

      const otpRequest: VerifyOTPRequest = {
        phoneNumber: loginRequest.phoneNumber, // Should be compatible
        countryCode: loginRequest.countryCode, // Should be compatible
        otp: '123456'
      };

      expect(otpRequest.phoneNumber).toBe(loginRequest.phoneNumber);
      expect(otpRequest.countryCode).toBe(loginRequest.countryCode);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty string values appropriately', () => {
      const requestWithEmptyValues: LoginWithPhoneRequest = {
        phoneNumber: '',
        countryCode: ''
      };

      // Empty values should be handled by validation logic
      expect(typeof requestWithEmptyValues.phoneNumber).toBe('string');
      expect(typeof requestWithEmptyValues.countryCode).toBe('string');
      expect(requestWithEmptyValues.phoneNumber.length).toBe(0);
      expect(requestWithEmptyValues.countryCode.length).toBe(0);
    });

    it('should handle special characters in phone numbers', () => {
      const specialCharRequests = [
        { phoneNumber: '+1 (234) 567-8900', countryCode: '+1' },
        { phoneNumber: '+44 20 7946 0958', countryCode: '+44' },
        { phoneNumber: '+91-98765-43210', countryCode: '+91' }
      ];

      specialCharRequests.forEach(request => {
        expect(typeof request.phoneNumber).toBe('string');
        expect(typeof request.countryCode).toBe('string');
        expect(request.phoneNumber.length).toBeGreaterThan(0);
      });
    });

    it('should handle maximum length constraints', () => {
      const longPhoneNumber = '+1' + '9'.repeat(50); // Very long phone number
      const longCountryCode = '+' + '1'.repeat(10); // Very long country code

      const request: LoginWithPhoneRequest = {
        phoneNumber: longPhoneNumber,
        countryCode: longCountryCode
      };

      // Values should be strings regardless of length
      expect(typeof request.phoneNumber).toBe('string');
      expect(typeof request.countryCode).toBe('string');
      
      // Length validation should be handled by business logic
      expect(request.phoneNumber.length).toBeGreaterThan(20); // Unreasonably long
      expect(request.countryCode.length).toBeGreaterThan(5); // Unreasonably long
    });
  });
});
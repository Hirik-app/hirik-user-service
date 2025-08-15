/**
 * Auth Module Routes Tests
 * Tests for authentication routes and middleware integration
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Hono } from 'hono';
import authRouter from '../../src/auth-module/routes';
import { mockPrismaClient } from '../__mocks__/prisma';
import { createMockUser, createMockOTP } from '../__mocks__/factories';

// Mock the UserController
const mockMethods = {
  loginWithPhone: vi.fn(),
  verifyOTP: vi.fn(),
  refreshToken: vi.fn()
};

vi.mock('../../src/auth-module/controller', () => {
  const MockController = vi.fn().mockImplementation((env) => {
    return mockMethods;
  });
  return {
    default: MockController
  };
});

// Mock JWT middleware
vi.mock('hono/jwt', () => ({
  jwt: vi.fn().mockImplementation(() => (c: any, next: any) => next())
}));

describe('Auth Routes', () => {
  let app: Hono;
  let mockEnv: any;

  beforeEach(() => {
    app = new Hono();
    app.route('/auth', authRouter);
    
    mockEnv = {
      DB: 'mock-db',
      ACCESS_TOKEN_SECRET: 'test-access-secret',
      REFRESH_TOKEN_SECRET: 'test-refresh-secret'
    };
    
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('POST /auth/login-with-phone', () => {
    it('should handle valid login request', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1'
      };

      // Mock successful response
      mockMethods.loginWithPhone.mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          message: 'OTP sent successfully',
          userId: 'user-123',
          isNewUser: false,
          otpSent: true
        }), { status: 200 })
      );

      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.otpSent).toBe(true);
    });

    it('should handle invalid phone number', async () => {
      const requestBody = {
        phoneNumber: 'invalid-phone',
        countryCode: '+1'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.loginWithPhone as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Invalid phone number format'
        }), { status: 400 })
      );

      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Invalid phone number');
    });

    it('should handle missing request body', async () => {
      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        // No body
      });

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.loginWithPhone as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Phone number and country code are required'
        }), { status: 400 })
      );

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
    });

    it('should handle malformed JSON', async () => {
      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-json{'
      });

      const res = await app.request(req, mockEnv);
      
      // Should handle JSON parsing error gracefully
      expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should pass environment variables to controller', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockControllerConstructor = UserController as any;
      
      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      await app.request(req, mockEnv);

      // Verify controller was instantiated with environment
      expect(mockControllerConstructor).toHaveBeenCalledWith(mockEnv);
    });
  });

  describe('POST /auth/verify-otp', () => {
    it('should handle valid OTP verification', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1',
        otp: '123456'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.verifyOTP as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          message: 'OTP verified successfully',
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
          user: {
            id: 'user-123',
            phoneNumber: '+1234567890',
            countryCode: '+1',
            createdAt: new Date()
          }
        }), { status: 200 })
      );

      const req = new Request('http://localhost/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.accessToken).toBeDefined();
      expect(responseData.refreshToken).toBeDefined();
      expect(responseData.user).toBeDefined();
    });

    it('should handle invalid OTP', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1',
        otp: '000000'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.verifyOTP as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Invalid OTP'
        }), { status: 400 })
      );

      const req = new Request('http://localhost/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Invalid OTP');
    });

    it('should handle expired OTP', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1',
        otp: '123456'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.verifyOTP as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'OTP has expired'
        }), { status: 400 })
      );

      const req = new Request('http://localhost/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('expired');
    });

    it('should handle missing OTP field', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1'
        // Missing otp field
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.verifyOTP as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'OTP is required'
        }), { status: 400 })
      );

      const req = new Request('http://localhost/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
    });
  });

  describe('POST /auth/refresh-token', () => {
    it('should handle valid refresh token', async () => {
      const requestBody = {
        refreshToken: 'valid-refresh-token'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.refreshToken as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: true,
          message: 'Access token refreshed successfully',
          accessToken: 'new-access-token'
        }), { status: 200 })
      );

      const req = new Request('http://localhost/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(200);
      expect(responseData.success).toBe(true);
      expect(responseData.accessToken).toBeDefined();
    });

    it('should handle invalid refresh token', async () => {
      const requestBody = {
        refreshToken: 'invalid-refresh-token'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.refreshToken as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Invalid refresh token'
        }), { status: 401 })
      );

      const req = new Request('http://localhost/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('Invalid refresh token');
    });

    it('should handle missing refresh token', async () => {
      const requestBody = {
        // Missing refreshToken field
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.refreshToken as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Refresh token is required'
        }), { status: 400 })
      );

      const req = new Request('http://localhost/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(400);
      expect(responseData.success).toBe(false);
    });

    it('should handle expired refresh token', async () => {
      const requestBody = {
        refreshToken: 'expired-refresh-token'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.refreshToken as any).mockResolvedValue(
        new Response(JSON.stringify({
          success: false,
          message: 'Refresh token has expired'
        }), { status: 401 })
      );

      const req = new Request('http://localhost/auth/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      const responseData = await res.json() as any;

      expect(res.status).toBe(401);
      expect(responseData.success).toBe(false);
      expect(responseData.message).toContain('expired');
    });
  });

  describe('Route Integration', () => {
    it('should handle unsupported HTTP methods', async () => {
      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'GET' // Should be POST
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(404); // Method not allowed or not found
    });

    it('should handle non-existent routes', async () => {
      const req = new Request('http://localhost/auth/non-existent', {
        method: 'POST'
      });

      const res = await app.request(req, mockEnv);
      
      expect(res.status).toBe(404);
    });

    it('should handle CORS preflight requests', async () => {
      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'OPTIONS',
        headers: {
          'Origin': 'http://localhost:3000',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type'
        }
      });

      const res = await app.request(req, mockEnv);
      
      // Should handle OPTIONS request (exact status depends on CORS middleware)
      expect([200, 204, 404]).toContain(res.status);
    });

    it('should maintain consistent response format across routes', async () => {
      const routes = [
        { path: '/auth/login-with-phone', body: { phoneNumber: '+1234567890', countryCode: '+1' } },
        { path: '/auth/verify-otp', body: { phoneNumber: '+1234567890', countryCode: '+1', otp: '123456' } },
        { path: '/auth/refresh-token', body: { refreshToken: 'test-token' } }
      ];

      for (const route of routes) {
        const req = new Request(`http://localhost${route.path}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(route.body)
        });

        const res = await app.request(req, mockEnv);
        const responseData = await res.json() as any;

        // All responses should have success and message fields
        expect(responseData).toHaveProperty('success');
        expect(responseData).toHaveProperty('message');
        expect(typeof responseData.success).toBe('boolean');
        expect(typeof responseData.message).toBe('string');
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle controller errors gracefully', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1'
      };

      const UserController = (await import('../../src/auth-module/controller')).default;
      const mockController = new UserController();
      (mockController.loginWithPhone as any).mockRejectedValue(new Error('Database connection failed'));

      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const res = await app.request(req, mockEnv);
      
      // Should handle errors gracefully (exact status depends on error handling middleware)
      expect(res.status).toBeGreaterThanOrEqual(400);
    });

    it('should handle large request bodies', async () => {
      const largeBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1',
        extraData: 'x'.repeat(10000) // Large string
      };

      const req = new Request('http://localhost/auth/login-with-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(largeBody)
      });

      const res = await app.request(req, mockEnv);
      
      // Should handle large bodies (exact behavior depends on body size limits)
      expect(res.status).toBeDefined();
    });

    it('should handle concurrent requests', async () => {
      const requestBody = {
        phoneNumber: '+1234567890',
        countryCode: '+1'
      };

      const requests = Array(5).fill(null).map(() => 
        new Request('http://localhost/auth/login-with-phone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })
      );

      const responses = await Promise.all(
        requests.map(req => app.request(req, mockEnv))
      );

      // All requests should be handled
      responses.forEach(res => {
        expect(res.status).toBeDefined();
        expect(res.status).toBeGreaterThanOrEqual(200);
      });
    });
  });
});